import type { NDKSvelte } from '@nostr-dev-kit/svelte';
import { NDKRelayFeedList, NDKRelayList } from '@nostr-dev-kit/ndk';
import { normalizeRelayUrl } from '@nostr-dev-kit/ndk';

export interface RelayWithCount {
  url: string;
  count: number;
  percentage: number;
  pubkeys: string[]; // List of pubkeys that use this relay
}

/**
 * Aggregates relay lists (kind 10012) from user's follows
 * Returns relays sorted by usage count
 */
export function createFollowsRelayAggregator(ndk: NDKSvelte) {
  const follows = $derived(ndk.$sessions?.follows || new Set<string>());
  const followsArray = $derived(Array.from(follows));

  const subscription = ndk.$subscribe<NDKRelayFeedList>(() => {
    if (followsArray.length === 0) return undefined;

    return {
      filters: [{ kinds: [10012], authors: followsArray }],
      subId: "follows-relay-lists",
      wrap: true,
    };
  });

  const aggregatedRelays = $derived.by(() => {
    const totalFollows = followsArray.length;

    if (totalFollows === 0) return [];

    const relayDataMap = new Map<string, { count: number; pubkeys: string[] }>();

    // Process all relay list events from the subscription
    for (const event of subscription.events) {
      const relayList = event;
      const authorPubkey = event.pubkey;

      if (relayList.relayUrls) {
        for (const url of relayList.relayUrls) {
          const normalized = normalizeRelayUrl(url);
          const existing = relayDataMap.get(normalized);

          if (existing) {
            existing.count++;
            if (!existing.pubkeys.includes(authorPubkey)) {
              existing.pubkeys.push(authorPubkey);
            }
          } else {
            relayDataMap.set(normalized, {
              count: 1,
              pubkeys: [authorPubkey]
            });
          }
        }
      }
    }

    // Convert to array and sort by count
    return Array.from(relayDataMap.entries())
      .map(([url, data]) => ({
        url,
        count: data.count,
        percentage: totalFollows > 0 ? (data.count / totalFollows) * 100 : 0,
        pubkeys: data.pubkeys
      }))
      .sort((a, b) => b.count - a.count);
  });

  return {
    get relays() {
      return aggregatedRelays;
    },
    get totalFollows() {
      return followsArray.length;
    },
    get eventsCount() {
      return subscription.events.length;
    },
    // Get top N relays by count
    getTopRelays(n: number = 10): RelayWithCount[] {
      return aggregatedRelays.slice(0, n);
    },
    // Get relays used by at least X% of follows
    getRelaysByThreshold(minPercentage: number): RelayWithCount[] {
      return aggregatedRelays.filter(r => r.percentage >= minPercentage);
    }
  };
}
