import type { NDKSvelte } from '@nostr-dev-kit/svelte';
import { isAgoraRelay, AGORA_RELAYS } from './relayUtils';

export interface IntroductionPost {
  event: import('@nostr-dev-kit/ndk').NDKEvent;
  engagementCount: number;
}

export function createIntroductionPostsManager(ndk: NDKSvelte, inviteRelay?: string) {
  const relayUrls = (() => {
    if (inviteRelay && isAgoraRelay(inviteRelay)) {
      return [inviteRelay];
    }
    return [...AGORA_RELAYS];
  })();

  const twelveHoursAgo = Math.floor(Date.now() / 1000) - (12 * 60 * 60);

  const introEvents = ndk.$fetchEvents(() => ({
    filters: {
      kinds: [1],
      "#t": ["introduction"],
      since: twelveHoursAgo,
    },
    relayUrls
  }));

  const eventIds = $derived(introEvents ? Array.from(introEvents).map(e => e.id) : []);

  const taggingEvents = ndk.$fetchEvents(() => eventIds.length > 0 ? {
    filters: {
      "#e": eventIds,
    },
    relayUrls
  } : undefined);

  const introductionPosts = $derived.by(() => {
    if (!introEvents || introEvents.length === 0) return [];

    const engagementMap = new Map<string, number>();

    if (taggingEvents) {
      for (const event of taggingEvents) {
        const eTags = event.tags.filter(tag => tag[0] === 'e');
        for (const tag of eTags) {
          const eventId = tag[1];
          if (eventIds.includes(eventId)) {
            engagementMap.set(eventId, (engagementMap.get(eventId) || 0) + 1);
          }
        }
      }
    }

    return Array.from(introEvents)
      .map(event => ({
        event,
        engagementCount: engagementMap.get(event.id) || 0
      }))
      .sort((a, b) => b.engagementCount - a.engagementCount)
      .slice(0, 10);
  });

  return {
    introductionPosts
  };
}
