import 'clsx';
import { N as NOTIFICATION_KINDS, K as KIND_TEXT_NOTE, a as KIND_REPLY, b as KIND_REACTION, c as KIND_REPOST, d as KIND_GENERIC_REPOST, e as KIND_ZAP, f as KIND_INVITE_ACCEPTANCE } from './nostr-UslzAMIC.js';

function categorizeEvent(event, userEventIds) {
  if (event.kind === KIND_REACTION) return "reaction";
  if (event.kind === KIND_REPOST || event.kind === KIND_GENERIC_REPOST) return "repost";
  if (event.kind === KIND_ZAP) return "zap";
  if (event.kind === KIND_INVITE_ACCEPTANCE) return "invite_acceptance";
  if (event.kind === KIND_TEXT_NOTE || event.kind === KIND_REPLY) {
    const qTag = event.tags.find((t) => t[0] === "q");
    if (qTag && userEventIds.has(qTag[1])) {
      return "quote";
    }
    const replyMarker = event.tags.find((t) => t[0] === "e" && t[3] === "reply");
    if (replyMarker && userEventIds.has(replyMarker[1])) {
      return "reply";
    }
    return "mention";
  }
  return null;
}
const notificationProcessors = {
  reply: (events) => {
    return events.map((event) => ({
      id: `reply-${event.id}`,
      type: "reply",
      timestamp: event.created_at || 0,
      event,
      replyToEventId: event.tags.find((t) => t[0] === "e" && t[3] === "reply")?.[1] || ""
    }));
  },
  mention: (events) => {
    return events.map((event) => ({
      id: `mention-${event.id}`,
      type: "mention",
      timestamp: event.created_at || 0,
      event
    }));
  },
  quote: (events) => {
    return events.map((event) => ({
      id: `quote-${event.id}`,
      type: "quote",
      timestamp: event.created_at || 0,
      event,
      quotedEventId: event.tags.find((t) => t[0] === "q")?.[1] || ""
    }));
  },
  reaction: (events, userEventIds) => {
    const reactionGroups = /* @__PURE__ */ new Map();
    events.forEach((reaction) => {
      const targetId = reaction.tags.find((t) => t[0] === "e")?.[1];
      if (!targetId || !userEventIds.has(targetId)) return;
      let emoji = reaction.content || "👍";
      if (emoji === "+") {
        emoji = "❤️";
      }
      const key = `${targetId}-${emoji}`;
      if (!reactionGroups.has(key)) {
        reactionGroups.set(key, {
          targetEventId: targetId,
          emoji,
          reactors: [],
          timestamp: reaction.created_at || 0
        });
      }
      const group = reactionGroups.get(key);
      group.reactors.push({ pubkey: reaction.pubkey, event: reaction });
      if (reaction.created_at && reaction.created_at > group.timestamp) {
        group.timestamp = reaction.created_at;
      }
    });
    return Array.from(reactionGroups.entries()).map(([key, group]) => ({
      id: `reaction-${key}`,
      type: "reaction",
      timestamp: group.timestamp,
      targetEventId: group.targetEventId,
      emoji: group.emoji,
      reactors: group.reactors
    }));
  },
  repost: (events, userEventIds) => {
    const repostGroups = /* @__PURE__ */ new Map();
    events.forEach((repost) => {
      const targetId = repost.tags.find((t) => t[0] === "e")?.[1];
      if (!targetId || !userEventIds.has(targetId)) return;
      if (!repostGroups.has(targetId)) {
        repostGroups.set(targetId, {
          targetEventId: targetId,
          reposts: [],
          timestamp: repost.created_at || 0
        });
      }
      const group = repostGroups.get(targetId);
      group.reposts.push(repost);
      if (repost.created_at && repost.created_at > group.timestamp) {
        group.timestamp = repost.created_at;
      }
    });
    return Array.from(repostGroups.values()).map((group) => ({
      id: `repost-${group.targetEventId}`,
      type: "repost",
      timestamp: group.timestamp,
      targetEventId: group.targetEventId,
      reposts: group.reposts
    }));
  },
  zap: (events, userEventIds) => {
    const zapGroups = /* @__PURE__ */ new Map();
    events.forEach((zap) => {
      const targetId = zap.tags.find((t) => t[0] === "e")?.[1];
      if (!targetId || !userEventIds.has(targetId)) return;
      const bolt11Tag = zap.tags.find((t) => t[0] === "bolt11")?.[1];
      const amount = extractAmountFromBolt11(bolt11Tag);
      const descriptionTag = zap.tags.find((t) => t[0] === "description")?.[1];
      let sender = zap.pubkey;
      if (descriptionTag) {
        try {
          const parsed = JSON.parse(descriptionTag);
          sender = parsed.pubkey || sender;
        } catch {
        }
      }
      if (!zapGroups.has(targetId)) {
        zapGroups.set(targetId, {
          targetEventId: targetId,
          zaps: [],
          timestamp: zap.created_at || 0
        });
      }
      const group = zapGroups.get(targetId);
      group.zaps.push({ event: zap, amount, sender });
      if (zap.created_at && zap.created_at > group.timestamp) {
        group.timestamp = zap.created_at;
      }
    });
    return Array.from(zapGroups.values()).map((group) => ({
      id: `zap-${group.targetEventId}`,
      type: "zap",
      timestamp: group.timestamp,
      targetEventId: group.targetEventId,
      zaps: group.zaps
    }));
  },
  invite_acceptance: (events) => {
    return events.map((event) => {
      const inviteEventId = event.tags.find((t) => t[0] === "e")?.[1] || "";
      return {
        id: `invite-${event.id}`,
        type: "invite_acceptance",
        timestamp: event.created_at || 0,
        event,
        inviteeEventId: inviteEventId,
        inviteePubkey: event.pubkey
        // Primary actor who accepted the invite
      };
    });
  }
};
function createNotificationsManager(ndk) {
  const notificationsSubscription = ndk.$subscribe(() => {
    if (!ndk.$currentUser) {
      return void 0;
    }
    return {
      filters: [
        {
          kinds: [...NOTIFICATION_KINDS],
          "#p": [ndk.$currentUser.pubkey],
          since: Math.floor(Date.now() / 1e3) - 60 * 60 * 24 * 30,
          // last 30 days
          limit: 500
        }
      ],
      subId: "notifications"
    };
  });
  const userEventsSubscription = ndk.$subscribe(() => {
    if (!ndk.$currentUser) {
      return void 0;
    }
    return {
      filters: [
        {
          kinds: [KIND_TEXT_NOTE, KIND_REPLY, 30023],
          // text, reply, article
          authors: [ndk.$currentUser.pubkey],
          since: Math.floor(Date.now() / 1e3) - 60 * 60 * 24 * 30
          // last 30 days
        }
      ],
      subId: "user-events"
    };
  });
  const userEventIds = (() => {
    const events = Array.from(userEventsSubscription.events ?? []);
    const ids = new Set(events.map((e) => e.id));
    return ids;
  })();
  const targetEventsCache = /* @__PURE__ */ new Map();
  let currentFilter = "all";
  const notificationGroups = (() => {
    if (!ndk.$currentUser) {
      return [];
    }
    const events = Array.from(notificationsSubscription.events ?? []);
    const groups = [];
    const categorizedEvents = {
      reply: [],
      mention: [],
      quote: [],
      reaction: [],
      repost: [],
      zap: [],
      invite_acceptance: []
    };
    events.forEach((event) => {
      const category = categorizeEvent(event, userEventIds);
      if (category) {
        categorizedEvents[category].push(event);
      }
    });
    groups.push(...notificationProcessors.reply(categorizedEvents.reply));
    groups.push(...notificationProcessors.mention(categorizedEvents.mention));
    groups.push(...notificationProcessors.quote(categorizedEvents.quote));
    groups.push(...notificationProcessors.reaction(categorizedEvents.reaction, userEventIds));
    groups.push(...notificationProcessors.repost(categorizedEvents.repost, userEventIds));
    groups.push(...notificationProcessors.zap(categorizedEvents.zap, userEventIds));
    groups.push(...notificationProcessors.invite_acceptance(categorizedEvents.invite_acceptance));
    const sorted = groups.sort((a, b) => b.timestamp - a.timestamp);
    return sorted;
  })();
  const filteredNotifications = (() => {
    if (currentFilter === "all") {
      return notificationGroups;
    }
    if (currentFilter === "invite") {
      const filtered2 = notificationGroups.filter((group) => group.type === "invite_acceptance");
      return filtered2;
    }
    const filtered = notificationGroups.filter((group) => group.type === currentFilter);
    return filtered;
  })();
  const counts = (() => {
    const result = {
      all: notificationGroups.length,
      reply: 0,
      mention: 0,
      quote: 0,
      reaction: 0,
      repost: 0,
      zap: 0,
      invite: 0
    };
    notificationGroups.forEach((group) => {
      if (group.type === "invite_acceptance") {
        result.invite++;
      } else {
        result[group.type]++;
      }
    });
    return result;
  })();
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
    get targetEventsCache() {
      return targetEventsCache;
    },
    setFilter(filter) {
      currentFilter = filter;
    }
  };
}
function extractAmountFromBolt11(bolt11) {
  if (!bolt11) return 0;
  try {
    const match = bolt11.match(/lnbc(\d+)([a-z])?/i);
    if (!match) return 0;
    const amount = parseInt(match[1], 10);
    const multiplier = match[2];
    let sats = amount;
    switch (multiplier) {
      case "m":
        sats = amount * 1e5;
        break;
      case "u":
        sats = amount * 100;
        break;
      case "n":
        sats = amount / 10;
        break;
      case "p":
        sats = amount / 1e4;
        break;
    }
    return Math.floor(sats);
  } catch {
    return 0;
  }
}

export { createNotificationsManager as c };
//# sourceMappingURL=useNotifications.svelte-DLvlGrAk.js.map
