# Relay Selector - Code Snippets & Implementation Details

## 1. RelaySelector Component - "Other relays" Section

**File:** `/Users/pablofernandez/tenex/Voces-v53qhx/src/lib/components/RelaySelector.svelte` (Lines 418-450)

```svelte
<!-- Other relays section -->
{#if otherRelays.length > 0}
  <div class="border-t border-border my-1"></div>
  <div class="px-2 py-1">
    <div class="text-xs text-muted-foreground px-2 py-1 font-medium">Other relays</div>
    {#each otherRelays as relay (relay.url)}
      {@const relayInfo = useRelayInfoCached(relay.url)}
      <button
        onclick={() => selectRelay(relay.url)}
        class="w-full px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left flex items-center gap-3 {settings.selectedRelay === relay.url ? 'bg-muted/50' : ''}"
      >
        <RelayIcon relayUrl={relay.url} size="md" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1.5">
            <div class="text-sm font-medium text-foreground truncate">
              {relayInfo.info?.name || relay.url.replace('wss://', '').replace('ws://', '')}
            </div>
          </div>
          {#if relayInfo.info?.description}
            <div class="text-xs text-muted-foreground truncate">
              {relayInfo.info.description}
            </div>
          {/if}
        </div>
        {#if settings.selectedRelay === relay.url}
          <svg class="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        {/if}
      </button>
    {/each}
  </div>
{/if}
```

**Data Source:**
```typescript
let otherRelays = $derived(enabledRelays.filter(r => !isAgoraRelay(r.url)));  // Line 25
let enabledRelays = $derived(settings.relays.filter(r => r.enabled && r.read));  // Line 24
```

---

## 2. "Favorite Relays" Section - Kind 10012 Integration

**File:** `/Users/pablofernandez/tenex/Voces-v53qhx/src/lib/components/RelaySelector.svelte` (Lines 281-321)

```svelte
<!-- Favorite Relays (kind 10012) -->
{#if relayFeeds && relayFeeds.relays.length > 0}
  <div class="border-t border-border my-1"></div>
  <div class="px-2 py-1">
    <div class="text-xs text-muted-foreground px-2 py-1 font-medium flex items-center justify-between">
      <span>Favorite Relays</span>
      <svg class="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    </div>
    {#each relayFeeds.relays as relayUrl (relayUrl)}
      {@const relayInfo = useRelayInfoCached(relayUrl)}
      <button
        onclick={() => selectRelay(relayUrl)}
        class="w-full px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left flex items-center gap-3 {settings.selectedRelay === relayUrl ? 'bg-muted/50' : ''}"
      >
        <RelayIcon {relayUrl} size="md" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1.5">
            <div class="text-sm font-medium text-foreground truncate">
              {relayInfo.info?.name || relayUrl.replace('wss://', '').replace('ws://', '')}
            </div>
            <svg class="w-3.5 h-3.5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          {#if relayInfo.info?.description}
            <div class="text-xs text-muted-foreground truncate">
              {relayInfo.info.description}
            </div>
          {/if}
        </div>
        {#if settings.selectedRelay === relayUrl}
          <svg class="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        {/if}
      </button>
    {/each}
  </div>
{/if}
```

**Data Source:**
```typescript
import { ndk, relayFeeds } from '$lib/ndk.svelte';  // Line 8

// relayFeeds.relays contains the parsed 10012 event relay URLs
```

---

## 3. RelayFeedsStore - Accessing Kind 10012 Events

**File:** `/Users/pablofernandez/tenex/Voces-v53qhx/src/lib/stores/relayFeeds.svelte.ts`

```typescript
import type { NDKSvelte } from '@nostr-dev-kit/svelte';
import { NDKRelayFeedList } from '@nostr-dev-kit/ndk';

class RelayFeedsStore {
  constructor(private ndk: any) {}

  // Access the kind 10012 event from session
  get list(): NDKRelayFeedList | null {
    const session = this.ndk.$sessions;
    if (!session) return null;
    return session.relayFeedList || null;  // The 10012 event object
  }

  // Extract relay URLs from the event
  get relays(): string[] {
    if (!this.list) return [];
    const relays: string[] = [];

    // Iterate through tags looking for relay entries
    for (const tag of this.list.tags) {
      if (tag[0] === 'relay' && tag[1]) {
        relays.push(tag[1]);
      }
    }
    return relays;
  }

  // Extract relay sets (kind references)
  get relaySets(): string[] {
    if (!this.list) return [];
    const sets: string[] = [];

    for (const tag of this.list.tags) {
      if (tag[0] === 'a' && tag[1]) {
        sets.push(tag[1]);
      }
    }
    return sets;
  }

  // Check if a relay is in favorites
  isFavorite(relayUrl: string): boolean {
    return this.relays.includes(relayUrl);
  }

  // Add relay to favorites (publishes 10012 event)
  async addRelay(relayUrl: string): Promise<void> {
    let list = this.list;

    if (!list) {
      // Create new 10012 event if doesn't exist
      list = new NDKRelayFeedList(this.ndk);
    }

    if (this.isFavorite(relayUrl)) return;

    // Add relay tag
    list.tags.push(['relay', relayUrl]);

    // Publish to Nostr
    await list.publish();

    // Update session cache
    const session = this.ndk.$sessions;
    if (session) {
      session.relayFeedList = list;
    }
  }

  // Remove relay from favorites
  async removeRelay(relayUrl: string): Promise<void> {
    const list = this.list;
    if (!list) return;

    // Filter out the relay tag
    list.tags = list.tags.filter(tag => {
      if (tag[0] === 'relay' && tag[1] === relayUrl) return false;
      return true;
    });

    // Publish updated event
    await list.publish();
  }

  // Add relay set (kind address reference)
  async addRelaySet(relaySetNaddr: string): Promise<void> {
    let list = this.list;

    if (!list) {
      list = new NDKRelayFeedList(this.ndk);
    }

    const existing = this.relaySets.includes(relaySetNaddr);
    if (existing) return;

    // Add relay set tag
    list.tags.push(['a', relaySetNaddr]);
    await list.publish();

    const session = this.ndk.$sessions;
    if (session) {
      session.relayFeedList = list;
    }
  }

  async removeRelaySet(relaySetNaddr: string): Promise<void> {
    const list = this.list;
    if (!list) return;

    list.tags = list.tags.filter(tag => {
      if (tag[0] === 'a' && tag[1] === relaySetNaddr) return false;
      return true;
    });

    await list.publish();
  }
}

export function createRelayFeedsStore(ndk: any) {
  return new RelayFeedsStore(ndk);
}
```

---

## 4. NDK Session Configuration - Kind 10012 Auto-Fetching

**File:** `/Users/pablofernandez/tenex/Voces-v53qhx/src/lib/ndk.svelte.ts` (Lines 29-49)

```typescript
import NDKCacheSqliteWasm from "@nostr-dev-kit/cache-sqlite-wasm";
import { createNDK } from '@nostr-dev-kit/svelte';
import { LocalStorage } from '@nostr-dev-kit/sessions';
import { 
  NDKEvent, 
  NDKKind, 
  NDKBlossomList, 
  NDKInterestList, 
  NDKRelayFeedList  // Kind 10012
} from '@nostr-dev-kit/ndk';

export const ndk = createNDK({
  explicitRelayUrls: DEFAULT_RELAYS,
  autoConnectUserRelays: true,
  cacheAdapter,
  signatureVerificationWorker: sigVerifyWorker,
  initialValidationRatio: 1.0,
  lowestValidationRatio: 0.1,
  aiGuardrails: false,
  futureTimestampGrace: 30,
  session: {
    storage: new LocalStorage(),
    autoSave: true,
    fetches: {
      follows: true,
      mutes: true,
      wallet: true,
      relayList: true,
      eventConstructors: [
        NDKBlossomList, 
        NDKInterestList, 
        NDKRelayFeedList  // This ensures 10012 is parsed as NDKRelayFeedList
      ],
    }
  }
});
```

**What This Does:**
- When user logs in, NDK automatically fetches their 10012 event
- `eventConstructors: [NDKRelayFeedList]` tells NDK to parse kind 10012 as NDKRelayFeedList
- Stores in `ndk.$sessions.relayFeedList`
- Automatically subscribes to updates

---

## 5. Aggregating Follows' Relays - Kind 10012 Subscription

**File:** `/Users/pablofernandez/tenex/Voces-v53qhx/src/lib/utils/aggregateFollowsRelays.svelte.ts`

```typescript
import type { NDKSvelte } from '@nostr-dev-kit/svelte';
import { NDKRelayFeedList, normalizeRelayUrl } from '@nostr-dev-kit/ndk';

export interface RelayWithCount {
  url: string;
  count: number;
  percentage: number;
  pubkeys: string[]; // List of pubkeys that use this relay
}

export function createFollowsRelayAggregator(ndk: NDKSvelte) {
  // Get user's follows from session
  const follows = $derived(ndk.$sessions?.follows || new Set<string>());
  const followsArray = $derived(Array.from(follows));

  // Subscribe to all 10012 events from follows
  const subscription = ndk.$subscribe<NDKRelayFeedList>(() => {
    if (followsArray.length === 0) return undefined;

    return {
      filters: [{ kinds: [10012], authors: followsArray }],  // Fetch kind 10012 from all follows
      subId: "follows-relay-lists",
      wrap: true,
    };
  });

  // Aggregate the relay data
  const aggregatedRelays = $derived.by(() => {
    const totalFollows = followsArray.length;

    if (totalFollows === 0) return [];

    const relayDataMap = new Map<string, { count: number; pubkeys: string[] }>();

    // Process all 10012 events from the subscription
    for (const event of subscription.events) {
      const relayList = event as NDKRelayFeedList;
      const authorPubkey = event.pubkey;

      if (relayList.relayUrls) {
        // Extract relay URLs from the 10012 event
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

    // Convert to array and sort by count (most used first)
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
    getTopRelays(n: number = 10): RelayWithCount[] {
      return aggregatedRelays.slice(0, n);
    },
    getRelaysByThreshold(minPercentage: number): RelayWithCount[] {
      return aggregatedRelays.filter(r => r.percentage >= minPercentage);
    }
  };
}
```

**Key Points:**
- Subscribes to kind 10012 events from all follows
- Each event contains a list of relay URLs
- Aggregates counts and tracks which pubkeys use each relay
- Returns sorted list with percentages

---

## 6. "Follows' Relays" Display in RelaySelector

**File:** `/Users/pablofernandez/tenex/Voces-v53qhx/src/lib/components/RelaySelector.svelte` (Lines 327-382)

```svelte
<!-- Follows' Relays section -->
{#if shouldShowFollowing && followsRelayAggregator.relays.length > 0}
  <div class="px-2 py-1">
    <div class="flex items-center justify-between px-2 py-1">
      <div class="text-xs text-muted-foreground font-medium">Follows' Relays</div>
      <div class="text-xs text-muted-foreground">
        {followsRelayAggregator.eventsCount}/{followsRelayAggregator.totalFollows} follows
      </div>
    </div>
    {#each followsRelayAggregator.getTopRelays(10) as relayData (relayData.url)}
      {@const relayInfo = useRelayInfoCached(relayData.url)}
      {@const isSelected = settings.selectedRelay === relayData.url}
      {@const isInUserRelays = settings.relays.some(r => r.url === relayData.url)}
      <button
        onclick={() => selectRelay(relayData.url)}
        class="w-full px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left flex items-center gap-3 {isSelected ? 'bg-muted/50' : ''}"
      >
        <RelayIcon relayUrl={relayData.url} size="md" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1.5">
            <div class="text-sm font-medium text-foreground truncate">
              {relayInfo.info?.name || relayData.url.replace('wss://', '').replace('ws://', '')}
            </div>
            {#if !isInUserRelays}
              <span class="flex-shrink-0 px-1.5 py-0.5 text-[10px] font-semibold bg-blue-500/20 text-blue-500 rounded uppercase tracking-wide">
                New
              </span>
            {/if}
          </div>
          <div class="flex items-center gap-2">
            <div class="flex -space-x-1.5">
              {#each relayData.pubkeys.slice(0, 3) as pubkey (pubkey)}
                <Avatar {ndk} {pubkey} class="w-4 h-4 rounded-full border border-background" />
              {/each}
              {#if relayData.pubkeys.length > 3}
                <div class="w-4 h-4 rounded-full border border-background bg-muted flex items-center justify-center text-[8px] font-medium text-muted-foreground">
                  +{relayData.pubkeys.length - 3}
                </div>
              {/if}
            </div>
            <div class="text-xs text-muted-foreground">
              {relayData.count} {relayData.count === 1 ? 'follow' : 'follows'} ({relayData.percentage.toFixed(0)}%)
            </div>
          </div>
        </div>
        {#if isSelected}
          <svg class="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        {/if}
      </button>
    {/each}
  </div>

  <!-- Divider -->
  <div class="border-t border-border my-1"></div>
{/if}
```

**Data Displayed:**
- Relay name and icon
- Avatar stack of up to 3 follows using it
- Count and percentage of follows using it
- "New" badge if not in user's configured relays
- Selection state with checkmark

---

## 7. Relay Feed Management - Adding/Removing Favorites

**File:** `/Users/pablofernandez/tenex/Voces-v53qhx/src/routes/(app)/relay-feeds/+page.svelte` (Lines 56-64)

```typescript
async function toggleFavorite(relayUrl: string) {
  if (!relayFeeds) return;

  if (relayFeeds.isFavorite(relayUrl)) {
    // Remove from 10012 event
    await relayFeeds.removeRelay(relayUrl);
  } else {
    // Add to 10012 event
    await relayFeeds.addRelay(relayUrl);
  }
}
```

**Used in Template:**
```svelte
<button
  onclick={() => toggleFavorite(relayUrl)}
  class="flex-shrink-0 p-2 rounded-lg hover:bg-muted transition-colors {isFavorite ? 'text-primary' : 'text-muted-foreground hover:text-primary'}"
  title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
>
  {#if isFavorite}
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  {:else}
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  {/if}
</button>
```

---

## 8. 10012 Event Structure & Tags

**NDKRelayFeedList Kind 10012 Event Structure:**

```json
{
  "kind": 10012,
  "pubkey": "user-pubkey",
  "created_at": 1699123456,
  "tags": [
    ["relay", "wss://relay.nostr.band"],
    ["relay", "wss://relay.damus.io"],
    ["relay", "wss://nos.lol"],
    ["a", "kind:pubkey:d-identifier"]  // Relay sets
  ],
  "content": "",
  "sig": "signature..."
}
```

**Accessing in Code:**
```typescript
const relayFeedList = ndk.$sessions?.relayFeedList;

// Get all tags
relayFeedList.tags;  // Array of tag pairs

// Iterate through relay tags
for (const tag of relayFeedList.tags) {
  if (tag[0] === 'relay') {
    const relayUrl = tag[1];  // e.g., "wss://relay.damus.io"
  }
  if (tag[0] === 'a') {
    const relaySetNaddr = tag[1];  // e.g., "kind:pubkey:d"
  }
}

// Convenience method (NDKRelayFeedList helper)
relayFeedList.relayUrls;  // Array of just the relay URLs

// Add new relay
relayFeedList.tags.push(['relay', 'wss://new-relay.com']);
await relayFeedList.publish();

// Remove relay
relayFeedList.tags = relayFeedList.tags.filter(
  tag => !(tag[0] === 'relay' && tag[1] === 'wss://remove-me.com')
);
await relayFeedList.publish();
```

---

## 9. Session Access Patterns

**From any component:**

```typescript
import { ndk } from '$lib/ndk.svelte';

// Access user's favorite relays (10012 event)
ndk.$sessions?.relayFeedList?.tags;      // Raw tags
ndk.$sessions?.relayFeedList?.relayUrls; // Just URLs

// Access user's follows (for aggregation)
ndk.$sessions?.follows;  // Set<string> of pubkey strings

// Current logged-in user
ndk.$currentUser?.pubkey;
ndk.$currentUser?.profile?.name;

// Subscribe to kind 10012 from specific authors
ndk.$subscribe<NDKRelayFeedList>(() => ({
  filters: [{ kinds: [10012], authors: ['pubkey1', 'pubkey2'] }],
}));
```

---

## Summary Table: Where Relay Data Lives

| Source | Type | Stored | Accessible | Purpose |
|--------|------|--------|-----------|---------|
| `settings.relays` | Array | localStorage | `settings.relays` | Network connectivity |
| `ndk.$sessions.relayFeedList` | NDKRelayFeedList | Nostr (kind 10012) | `relayFeeds.relays` | User's favorites |
| `ndk.$sessions.follows` | Set<string> | Nostr (kind 3) | `ndk.$sessions.follows` | Follow list |
| `follows' 10012 events` | NDKRelayFeedList[] | Nostr | `subscription.events` | Aggregate relays |
| `relayAuthModal` | Map | sessionStorage | via store | Auth decisions |

