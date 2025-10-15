import type { NDKEvent } from '@nostr-dev-kit/ndk';
import type { NDKSvelte } from '@nostr-dev-kit/svelte';

/**
 * Notification type definitions
 */
type BaseNotification = {
  id: string;
  timestamp: number;
};

export type ReplyNotification = BaseNotification & {
  type: 'reply';
  event: NDKEvent;
  replyToEventId: string;
};

export type MentionNotification = BaseNotification & {
  type: 'mention';
  event: NDKEvent;
};

export type QuoteNotification = BaseNotification & {
  type: 'quote';
  event: NDKEvent;
  quotedEventId: string;
};

export type ReactionNotification = BaseNotification & {
  type: 'reaction';
  targetEventId: string;
  emoji: string;
  reactors: Array<{ pubkey: string; event: NDKEvent }>;
};

export type RepostNotification = BaseNotification & {
  type: 'repost';
  targetEventId: string;
  reposts: NDKEvent[];
};

export type ZapNotification = BaseNotification & {
  type: 'zap';
  targetEventId: string;
  zaps: Array<{ event: NDKEvent; amount: number; sender: string }>;
};

export type NotificationGroup =
  | ReplyNotification
  | MentionNotification
  | QuoteNotification
  | ReactionNotification
  | RepostNotification
  | ZapNotification;

export type NotificationFilter = 'all' | 'replies' | 'mentions' | 'quotes' | 'reactions' | 'reposts' | 'zaps';

/**
 * Creates a notifications manager that aggregates and groups notifications
 */
export function createNotificationsManager(ndk: NDKSvelte) {
  const currentUser = ndk.$currentUser;

  // Subscription for all notification events
  const notificationsSubscription = ndk.$subscribe(() => {
    if (!currentUser) return undefined;

    return {
      filters: [
        {
          kinds: [1, 1111, 6, 16, 7, 9735], // text, reply, repost, generic-repost, reaction, zap
          '#p': [currentUser.pubkey],
          since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30, // last 30 days
          limit: 500,
        },
      ],
      subId: 'notifications',
    };
  });

  // Subscription for user's own events (to identify replies vs mentions)
  const userEventsSubscription = ndk.$subscribe(() => {
    if (!currentUser) return undefined;

    return {
      filters: [
        {
          kinds: [1, 1111, 30023], // text, reply, article
          authors: [currentUser.pubkey],
          since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30, // last 30 days
        },
      ],
      subId: 'user-events',
    };
  });

  // Build a Set of user's event IDs for quick lookup
  const userEventIds = $derived.by(() => {
    const events = Array.from(userEventsSubscription.events ?? []);
    return new Set(events.map((e) => e.id));
  });

  // Cache for fetched target events
  const targetEventsCache = $state(new Map<string, NDKEvent>());

  // Filter state
  let currentFilter = $state<NotificationFilter>('all');

  /**
   * Aggregate raw notification events into groups
   */
  const notificationGroups = $derived.by(() => {
    if (!currentUser) return [];

    const events = Array.from(notificationsSubscription.events ?? []);
    const groups: NotificationGroup[] = [];

    // Categorize events
    const replies: NDKEvent[] = [];
    const mentions: NDKEvent[] = [];
    const quotes: NDKEvent[] = [];
    const reposts: NDKEvent[] = [];
    const reactions: NDKEvent[] = [];
    const zaps: NDKEvent[] = [];

    events.forEach((event) => {
      if (event.kind === 7) {
        reactions.push(event);
      } else if (event.kind === 6 || event.kind === 16) {
        reposts.push(event);
      } else if (event.kind === 9735) {
        zaps.push(event);
      } else if (event.kind === 1 || event.kind === 1111) {
        // Check if it's a quote
        const qTag = event.tags.find((t) => t[0] === 'q');
        if (qTag && userEventIds.has(qTag[1])) {
          quotes.push(event);
          return;
        }

        // Check if it's a reply
        const replyMarker = event.tags.find((t) => t[0] === 'e' && t[3] === 'reply');
        if (replyMarker && userEventIds.has(replyMarker[1])) {
          replies.push(event);
        } else {
          // It's a mention
          mentions.push(event);
        }
      }
    });

    // Process replies
    replies.forEach((event) => {
      const replyToEventId = event.tags.find((t) => t[0] === 'e' && t[3] === 'reply')?.[1] || '';
      groups.push({
        id: `reply-${event.id}`,
        type: 'reply',
        timestamp: event.created_at || 0,
        event,
        replyToEventId,
      });
    });

    // Process mentions
    mentions.forEach((event) => {
      groups.push({
        id: `mention-${event.id}`,
        type: 'mention',
        timestamp: event.created_at || 0,
        event,
      });
    });

    // Process quotes
    quotes.forEach((event) => {
      const quotedEventId = event.tags.find((t) => t[0] === 'q')?.[1] || '';
      groups.push({
        id: `quote-${event.id}`,
        type: 'quote',
        timestamp: event.created_at || 0,
        event,
        quotedEventId,
      });
    });

    // Process reactions - GROUP by target event + emoji
    const reactionGroups = new Map<string, { targetEventId: string; emoji: string; reactors: Array<{ pubkey: string; event: NDKEvent }>; timestamp: number }>();

    reactions.forEach((reaction) => {
      const targetId = reaction.tags.find((t) => t[0] === 'e')?.[1];
      if (!targetId) return;

      // Check if this is a reaction to user's event
      if (!userEventIds.has(targetId)) return;

      const emoji = reaction.content || '👍';
      const key = `${targetId}-${emoji}`;

      if (!reactionGroups.has(key)) {
        reactionGroups.set(key, {
          targetEventId: targetId,
          emoji,
          reactors: [],
          timestamp: reaction.created_at || 0,
        });
      }

      const group = reactionGroups.get(key)!;
      group.reactors.push({ pubkey: reaction.pubkey, event: reaction });
      // Update timestamp to most recent reaction
      if (reaction.created_at && reaction.created_at > group.timestamp) {
        group.timestamp = reaction.created_at;
      }
    });

    reactionGroups.forEach((group, key) => {
      groups.push({
        id: `reaction-${key}`,
        type: 'reaction',
        timestamp: group.timestamp,
        targetEventId: group.targetEventId,
        emoji: group.emoji,
        reactors: group.reactors,
      });
    });

    // Process reposts - GROUP by target event
    const repostGroups = new Map<string, { targetEventId: string; reposts: NDKEvent[]; timestamp: number }>();

    reposts.forEach((repost) => {
      const targetId = repost.tags.find((t) => t[0] === 'e')?.[1];
      if (!targetId) return;

      // Check if this is a repost of user's event
      if (!userEventIds.has(targetId)) return;

      if (!repostGroups.has(targetId)) {
        repostGroups.set(targetId, {
          targetEventId: targetId,
          reposts: [],
          timestamp: repost.created_at || 0,
        });
      }

      const group = repostGroups.get(targetId)!;
      group.reposts.push(repost);
      // Update timestamp to most recent repost
      if (repost.created_at && repost.created_at > group.timestamp) {
        group.timestamp = repost.created_at;
      }
    });

    repostGroups.forEach((group) => {
      groups.push({
        id: `repost-${group.targetEventId}`,
        type: 'repost',
        timestamp: group.timestamp,
        targetEventId: group.targetEventId,
        reposts: group.reposts,
      });
    });

    // Process zaps - GROUP by target event
    const zapGroups = new Map<string, { targetEventId: string; zaps: Array<{ event: NDKEvent; amount: number; sender: string }>; timestamp: number }>();

    zaps.forEach((zap) => {
      const targetId = zap.tags.find((t) => t[0] === 'e')?.[1];
      if (!targetId) return;

      // Check if this is a zap to user's event
      if (!userEventIds.has(targetId)) return;

      // Extract amount from bolt11 tag
      const bolt11Tag = zap.tags.find((t) => t[0] === 'bolt11')?.[1];
      const amount = extractAmountFromBolt11(bolt11Tag);

      // Extract sender (the person who zapped, from description tag)
      const descriptionTag = zap.tags.find((t) => t[0] === 'description')?.[1];
      let sender = zap.pubkey;
      if (descriptionTag) {
        try {
          const parsed = JSON.parse(descriptionTag);
          sender = parsed.pubkey || sender;
        } catch {}
      }

      if (!zapGroups.has(targetId)) {
        zapGroups.set(targetId, {
          targetEventId: targetId,
          zaps: [],
          timestamp: zap.created_at || 0,
        });
      }

      const group = zapGroups.get(targetId)!;
      group.zaps.push({ event: zap, amount, sender });
      // Update timestamp to most recent zap
      if (zap.created_at && zap.created_at > group.timestamp) {
        group.timestamp = zap.created_at;
      }
    });

    zapGroups.forEach((group) => {
      groups.push({
        id: `zap-${group.targetEventId}`,
        type: 'zap',
        timestamp: group.timestamp,
        targetEventId: group.targetEventId,
        zaps: group.zaps,
      });
    });

    // Sort by timestamp (most recent first)
    return groups.sort((a, b) => b.timestamp - a.timestamp);
  });

  // Fetch target events that are referenced but not yet loaded
  $effect(() => {
    const targetEventIds = new Set<string>();

    notificationGroups.forEach((group) => {
      if (group.type === 'reply') {
        targetEventIds.add(group.replyToEventId);
      } else if (group.type === 'quote') {
        targetEventIds.add(group.quotedEventId);
      } else if (group.type === 'reaction' || group.type === 'repost' || group.type === 'zap') {
        targetEventIds.add(group.targetEventId);
      }
    });

    // Find missing events
    const missing = Array.from(targetEventIds).filter((id) => !targetEventsCache.has(id));

    if (missing.length > 0) {
      // Fetch missing events
      Promise.all(missing.map((id) => ndk.fetchEvent(id))).then((events) => {
        events.forEach((event, index) => {
          if (event) {
            targetEventsCache.set(missing[index], event);
          }
        });
      });
    }
  });

  // Filtered notifications
  const filteredNotifications = $derived.by(() => {
    if (currentFilter === 'all') return notificationGroups;
    return notificationGroups.filter((group) => group.type === currentFilter);
  });

  // Counts by type
  const counts = $derived.by(() => {
    const result = {
      all: notificationGroups.length,
      replies: 0,
      mentions: 0,
      quotes: 0,
      reactions: 0,
      reposts: 0,
      zaps: 0,
    };

    notificationGroups.forEach((group) => {
      result[group.type]++;
    });

    return result;
  });

  return {
    get notifications() {
      return filteredNotifications;
    },
    get filter() {
      return currentFilter;
    },
    get counts() {
      return counts;
    },
    get isLoading() {
      return !notificationsSubscription.eosed || !userEventsSubscription.eosed;
    },
    get targetEventsCache() {
      return targetEventsCache;
    },
    setFilter(filter: NotificationFilter) {
      currentFilter = filter;
    },
  };
}

/**
 * Extract amount in sats from a bolt11 invoice
 */
function extractAmountFromBolt11(bolt11?: string): number {
  if (!bolt11) return 0;

  try {
    // bolt11 format: lnbc{amount}{multiplier}...
    const match = bolt11.match(/lnbc(\d+)([a-z])?/i);
    if (!match) return 0;

    const amount = parseInt(match[1], 10);
    const multiplier = match[2];

    // Convert to sats
    let sats = amount;
    switch (multiplier) {
      case 'm': // milli-btc
        sats = amount * 100000;
        break;
      case 'u': // micro-btc
        sats = amount * 100;
        break;
      case 'n': // nano-btc
        sats = amount / 10;
        break;
      case 'p': // pico-btc
        sats = amount / 10000;
        break;
    }

    return Math.floor(sats);
  } catch {
    return 0;
  }
}
