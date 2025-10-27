# Relay Selector Component Analysis

## Overview
The RelaySelector component displays a dropdown menu that allows users to filter posts by relay. It integrates with NDK session state to access kind 10012 events (NDKRelayFeedList) for favorite relays and aggregates relay information from follows.

---

## Component Files

### 1. **RelaySelector.svelte** 
**Location:** `/Users/pablofernandez/tenex/Voces-v53qhx/src/lib/components/RelaySelector.svelte`

**Key Features:**
- Displays "Other relays" section (line 418-450) - shows relays from `settings.relays` that aren't Agora relays
- Displays "Favorite Relays" section (line 281-321) - populated from `relayFeeds.relays`
- Displays "Follows' Relays" section (line 327-382) - aggregated from follows' relay lists
- Displays "Agoras" section (line 384-416) - special relay group
- "Following" option (line 215-232) - shows all posts from follows

**Data Flow:**
```
RelaySelector.svelte
├── settings.relays (from localStorage)
│   └── Used to populate "Other relays"
├── relayFeeds.relays (from NDK session)
│   └── Used to populate "Favorite Relays" section
├── followsRelayAggregator (from aggregateFollowsRelays.svelte)
│   └── Used to populate "Follows' Relays" section
└── ndk.$currentUser (session state)
    └── Used to show/hide "Following" option
```

---

## NDK Session Integration

### 2. **ndk.svelte.ts**
**Location:** `/Users/pablofernandez/tenex/Voces-v53qhx/src/lib/ndk.svelte.ts`

**Key Configuration (lines 38-48):**
```typescript
session: {
  storage: new LocalStorage(),
  autoSave: true,
  fetches: {
    follows: true,
    mutes: true,
    wallet: true,
    relayList: true,
    eventConstructors: [NDKBlossomList, NDKInterestList, NDKRelayFeedList],
  }
}
```

**What this means:**
- `NDKRelayFeedList` (kind 10012) is automatically fetched and parsed when session initializes
- Available at: `ndk.$sessions.relayFeedList` or via `relayFeeds` store
- The session automatically saves changes back to Nostr

---

## How 10012 Events (NDKRelayFeedList) are Used

### 3. **relayFeeds.svelte.ts**
**Location:** `/Users/pablofernandez/tenex/Voces-v53qhx/src/lib/stores/relayFeeds.svelte.ts`

**RelayFeedsStore Class:**

**Accessing the list (lines 7-12):**
```typescript
get list(): NDKRelayFeedList | null {
  const session = this.ndk.$sessions;
  if (!session) return null;
  return session.relayFeedList || null;  // Kind 10012 event
}
```

**Getting relay URLs (lines 14-26):**
```typescript
get relays(): string[] {
  if (!this.list) return [];
  const relays: string[] = [];
  
  for (const tag of this.list.tags) {
    if (tag[0] === 'relay' && tag[1]) {
      relays.push(tag[1]);
    }
  }
  return relays;
}
```

**10012 Event Structure:**
- `tags` array contains relay entries
- Each relay is a tag: `['relay', 'wss://relay.url']`
- Relay Sets are also supported: `['a', 'kind:pubkey:d-identifier']`

**Key Operations:**
1. **Add Relay** (lines 46-63):
   - Creates new NDKRelayFeedList if doesn't exist
   - Pushes new relay tag
   - Calls `list.publish()` to save to Nostr
   
2. **Remove Relay** (lines 65-75):
   - Filters out matching relay tag
   - Calls `list.publish()` to update Nostr

3. **Check if Favorite** (lines 42-44):
   - Simple check: `this.relays.includes(relayUrl)`

---

## Follows' Relay Aggregation

### 4. **aggregateFollowsRelays.svelte.ts**
**Location:** `/Users/pablofernandez/tenex/Voces-v53qhx/src/lib/utils/aggregateFollowsRelays.svelte.ts`

**How it Works (lines 16-92):**

1. **Gets follows from session:**
   ```typescript
   const follows = $derived(ndk.$sessions?.follows || new Set<string>());
   ```

2. **Creates subscription to fetch all 10012 events from follows:**
   ```typescript
   const subscription = ndk.$subscribe<NDKRelayFeedList>(() => {
     return {
       filters: [{ kinds: [10012], authors: followsArray }],
       subId: "follows-relay-lists",
       wrap: true,
     };
   });
   ```

3. **Aggregates relay data:**
   - Counts how many follows use each relay
   - Tracks which pubkeys use which relay
   - Calculates percentage (count / totalFollows * 100)
   - Sorts by usage count

4. **Returns Interface:**
   ```typescript
   {
     get relays()                           // All relays sorted by count
     get totalFollows()                     // Total follows count
     get eventsCount()                      // Count of 10012 events received
     getTopRelays(n: number)               // Get top N relays
     getRelaysByThreshold(minPercentage)   // Get relays above % threshold
   }
   ```

**RelayWithCount Data Structure:**
```typescript
interface RelayWithCount {
  url: string;
  count: number;              // Number of follows using this relay
  percentage: number;         // (count / totalFollows) * 100
  pubkeys: string[];         // List of pubkeys using this relay
}
```

---

## Data Access Patterns

### From RelaySelector Component:

**1. User's Favorite Relays (10012 event):**
```typescript
const favoriteRelays = $derived(relayFeeds?.relays || []);  // Line 282

// In template:
{#each relayFeeds.relays as relayUrl}
  <!-- Render favorite relay button -->
{/each}
```

**2. Other User Relays (from settings):**
```typescript
let otherRelays = $derived(enabledRelays.filter(r => !isAgoraRelay(r.url)));  // Line 25

// In template:
{#each otherRelays as relay}
  <!-- Render in "Other relays" section -->
{/each}
```

**3. Follows' Relays (aggregated from 10012 events):**
```typescript
const followsRelayAggregator = createFollowsRelayAggregator(ndk);  // Line 35

// In template:
{#each followsRelayAggregator.getTopRelays(10) as relayData}
  <!-- Shows avatar of follows + percentage -->
{/each}
```

---

## Settings Integration

### 5. **settings.svelte.ts**
**Location:** `/Users/pablofernandez/tenex/Voces-v53qhx/src/lib/stores/settings.svelte.ts`

**Relay Configuration:**
```typescript
interface Relay {
  url: string;
  read: boolean;
  write: boolean;
  enabled: boolean;
}
```

**Stored in localStorage:**
```typescript
localStorage.setItem('voces-settings', JSON.stringify(settings));
```

**Separate from 10012:**
- Settings store holds user's configured relays (read/write permissions)
- RelayFeedList (10012) holds user's favorite relays for content browsing
- These are two different systems!

---

## Relay-Feeds Management Page

### 6. **+page.svelte** 
**Location:** `/Users/pablofernandez/tenex/Voces-v53qhx/src/routes/(app)/relay-feeds/+page.svelte`

**Three Sections:**

1. **Your Favorite Relays** (lines 128-180):
   - Displays `relayFeeds.relays`
   - Toggle to add/remove from 10012 event
   - Calls `relayFeeds.addRelay()` / `relayFeeds.removeRelay()`

2. **Follows' Relays** (lines 184-271):
   - Displays aggregated relays from follows' 10012 events
   - Shows avatar stack of users
   - Shows percentage of follows using relay
   - Button to add to favorites

3. **Available Relays** (lines 274-334):
   - Built from: `settings.relays + AGORA_RELAYS + ndk.$sessions?.relayList`
   - Searchable
   - Shows only relays not already favorited

---

## Key Insights

### 1. Two Separate Relay Systems:

| Aspect | settings.relays | relayFeedList (10012) |
|--------|-----------------|----------------------|
| Storage | localStorage | Nostr (published event) |
| Purpose | Network connectivity | Content browsing |
| Permissions | read/write flags | Just URLs |
| Synced | Client-only | Across all devices |
| Accessed via | `settings.relays` | `ndk.$sessions.relayFeedList` |

### 2. NDK Session Access:

```typescript
// Direct access from any component:
ndk.$sessions?.relayFeedList                    // NDKRelayFeedList object
ndk.$sessions?.relayFeedList?.tags             // Array of tag pairs
ndk.$sessions?.follows                         // Set of follow pubkeys
ndk.$currentUser                               // Current user pubkey
```

### 3. The Dropdown Sections in Order:

1. "Following" - Uses all posts from follows
2. "Follow Packs" - Kind 39089 events (user created or favorited)
3. "Favorite Relays" ✓ Kind 10012 from session
4. "Follows' Relays" ✓ Aggregated kind 10012 from follows
5. "Agoras" - Special hardcoded relay group
6. "Other relays" - From settings.relays, excluding Agoras

---

## Event Flow: Adding a Relay to Favorites

1. User clicks star icon on a relay in "Available Relays"
2. `toggleFavorite(relayUrl)` called
3. Calls `relayFeeds.addRelay(relayUrl)`
4. Creates or updates NDKRelayFeedList (kind 10012)
5. Adds `['relay', relayUrl]` tag
6. Calls `list.publish()` - sends event to relays
7. Session updates: `session.relayFeedList = list`
8. `$derived(relayFeeds.relays)` updates in all components
9. "Favorite Relays" section shows the new relay

---

## File Dependencies

```
RelaySelector.svelte
├── ndk.svelte.ts (imports ndk, relayFeeds)
│   ├── relayFeeds.svelte.ts (RelayFeedsStore)
│   │   └── NDKRelayFeedList (from @nostr-dev-kit/ndk)
│   └── session with fetches.eventConstructors
├── settings.svelte.ts (localStorage relays)
├── aggregateFollowsRelays.svelte.ts
│   └── ndk.$sessions?.follows + subscription to kind 10012
└── relayInfo.svelte.ts (caches relay metadata)
```

