# Relay Selector Component - Complete Analysis Summary

## Quick Reference

### Component Location
`/Users/pablofernandez/tenex/Voces-v53qhx/src/lib/components/RelaySelector.svelte`

### Related Files
1. **Core Files:**
   - `/Users/pablofernandez/tenex/Voces-v53qhx/src/lib/ndk.svelte.ts` - NDK initialization with 10012 support
   - `/Users/pablofernandez/tenex/Voces-v53qhx/src/lib/stores/relayFeeds.svelte.ts` - RelayFeedsStore for managing 10012
   - `/Users/pablofernandez/tenex/Voces-v53qhx/src/lib/stores/settings.svelte.ts` - User relay settings
   - `/Users/pablofernandez/tenex/Voces-v53qhx/src/lib/utils/aggregateFollowsRelays.svelte.ts` - Follows relay aggregation

2. **Page Files:**
   - `/Users/pablofernandez/tenex/Voces-v53qhx/src/routes/(app)/relay-feeds/+page.svelte` - Relay management UI
   - `/Users/pablofernandez/tenex/Voces-v53qhx/src/lib/components/RelayFeedBrowser.svelte` - Browse content from favorites

---

## "Other relays" Section - Detailed Breakdown

### What it Displays
The "Other relays" section (lines 418-450 in RelaySelector.svelte) shows:
- Relays from the user's configured relay list (`settings.relays`)
- Filtered to exclude Agora relays
- Only shows relays that are enabled and readable

### Data Flow
```
settings.relays (localStorage)
  ↓
enabledRelays = settings.relays.filter(r => r.enabled && r.read)
  ↓
otherRelays = enabledRelays.filter(r => !isAgoraRelay(r.url))
  ↓
Display in dropdown
```

### Code Location
**Lines 24-25:**
```typescript
let enabledRelays = $derived(settings.relays.filter(r => r.enabled && r.read));
let otherRelays = $derived(enabledRelays.filter(r => !isAgoraRelay(r.url)));
```

**Lines 418-450:** UI rendering

### Relay Data Structure
Each relay in `otherRelays` is of type:
```typescript
interface Relay {
  url: string;        // "wss://relay.url"
  read: boolean;      // Can receive posts from this relay
  write: boolean;     // Can send posts to this relay
  enabled: boolean;   // Is this relay active
}
```

---

## How 10012 Events (NDKRelayFeedList) Are Used

### Kind 10012 - Relay Feed List
**Purpose:** User's favorite relays for content browsing

**Structure:**
```
Event Kind: 10012
Tags:
  - ["relay", "wss://relay.url"] - Favorite relay
  - ["a", "kind:pubkey:d-id"]      - Relay set reference
```

### Access Pattern #1: Direct from Session
```typescript
ndk.$sessions?.relayFeedList              // NDKRelayFeedList object
ndk.$sessions?.relayFeedList?.tags        // Array of tag pairs
ndk.$sessions?.relayFeedList?.relayUrls   // Array of relay URLs
```

### Access Pattern #2: Via RelayFeedsStore
```typescript
relayFeeds.relays             // Array of favorite relay URLs
relayFeeds.isFavorite(url)    // Check if relay is favorited
relayFeeds.addRelay(url)      // Add to 10012 and publish
relayFeeds.removeRelay(url)   // Remove from 10012 and publish
```

### NDK Session Configuration
**File:** `src/lib/ndk.svelte.ts` (lines 38-48)
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

**What This Means:**
- NDK automatically fetches kind 10012 when user logs in
- Stores it in `ndk.$sessions.relayFeedList`
- Automatically saves changes back to Nostr
- Provides reactive updates via `$derived`

---

## Dropdown Sections in Order

### 1. "Following" Section (Lines 215-232)
- **Shown when:** User has follows AND `shouldShowFollowing` is true
- **Purpose:** Browse all posts from follows
- **Data source:** `ndk.$sessions?.follows` (Set of pubkey strings)

### 2. "Follow Packs" Section (Lines 236-279)
- **Shown when:** User has follow packs (kind 39089)
- **Purpose:** Browse posts from specific curated follows groups
- **Data sources:** 
  - User's created packs (kind 39089)
  - Favorite packs from followPacksStore

### 3. "Favorite Relays" Section (Lines 281-321) ✓ KEY SECTION
- **Shown when:** User has favorited relays (10012 event)
- **Purpose:** Browse content from user's favorite relays
- **Data source:** `relayFeeds.relays` (parsed from kind 10012)
- **User interaction:** Click to filter feed by relay
- **Operations:** Add/remove via relay-feeds page

### 4. "Follows' Relays" Section (Lines 327-382)
- **Shown when:** User has follows AND they have 10012 events
- **Purpose:** Discover relays used by follows
- **Data source:** Aggregated kind 10012 from all follows
- **Displays:** Avatar stack + usage percentage
- **User interaction:** Click to browse that relay

### 5. "Agoras" Section (Lines 384-416)
- **Shown when:** Always (hardcoded list)
- **Purpose:** Special relay group for discussions
- **Data source:** `AGORA_RELAYS` constant

### 6. "Other relays" Section (Lines 418-450) ✓ KEY SECTION
- **Shown when:** User has non-Agora relays configured
- **Purpose:** Browse from user's configured relays
- **Data source:** `settings.relays` (from localStorage)
- **Filtered:** Only enabled + readable relays, excluding Agoras

---

## Two Separate Relay Systems

### System 1: Network Configuration (settings.relays)
**Storage:** localStorage  
**Purpose:** Which relays to connect to for publishing/reading  
**Structure:** Array of Relay objects with read/write permissions  
**Synced:** Client-only, no Nostr event  
**Accessed:** `settings.relays`, appears in "Other relays" section  

```typescript
// In settings
{
  url: "wss://relay.damus.io",
  read: true,
  write: true,
  enabled: true
}
```

### System 2: Content Browsing (relayFeedList - kind 10012)
**Storage:** Nostr event (kind 10012)  
**Purpose:** User's favorite relays for curated content  
**Structure:** NDKRelayFeedList with tags like ["relay", "url"]  
**Synced:** Across all devices via Nostr  
**Accessed:** `ndk.$sessions?.relayFeedList`, `relayFeeds.relays`, appears in "Favorite Relays" section  

```typescript
// In 10012 event
{
  kind: 10012,
  tags: [
    ["relay", "wss://relay.damus.io"],
    ["relay", "wss://nos.lol"]
  ]
}
```

---

## How Follows' Relays Are Aggregated

### Step 1: Get Follows
```typescript
const follows = ndk.$sessions?.follows;  // Set<string> of pubkeys
```

### Step 2: Subscribe to Their 10012 Events
```typescript
const subscription = ndk.$subscribe<NDKRelayFeedList>(() => ({
  filters: [{ kinds: [10012], authors: followsArray }],
  subId: "follows-relay-lists",
  wrap: true,
}));
```

### Step 3: Aggregate the Data
For each 10012 event received:
- Extract relay URLs from tags
- Count how many follows use each relay
- Track which pubkeys use which relay
- Calculate percentage (count / totalFollows * 100)
- Sort by usage count

### Step 4: Return Aggregated Data
```typescript
interface RelayWithCount {
  url: string;              // "wss://relay.url"
  count: number;            // 45 (follows using this)
  percentage: number;       // 35.9 (percentage of total follows)
  pubkeys: string[];        // ["pubkey1", "pubkey2", ...]
}
```

### Step 5: Display in "Follows' Relays" Section
- Shows relay name, icon, description
- Avatar stack of up to 3 pubkeys using it (+ badge for more)
- "Used by X follows (Y%)" text
- Star icon if already favorited
- Click to add to favorites or switch filter

---

## NDK Session Object Reference

### Available Session Properties
```typescript
ndk.$sessions?.relayFeedList      // NDKRelayFeedList | undefined
ndk.$sessions?.relayList          // Kind 10002 event
ndk.$sessions?.follows            // Set<string> of follow pubkeys
ndk.$sessions?.followList         // Kind 3 event object
ndk.$sessions?.mutesSet           // Set of muted pubkeys
ndk.$sessions?.blockSet           // Set of blocked pubkeys
ndk.$sessions?.wallet             // Kind 9734/37375 wallet info
```

### How to Subscribe to Kind 10012
```typescript
// From any component
const subscription = ndk.$subscribe<NDKRelayFeedList>(() => ({
  filters: [{ kinds: [10012], authors: [specificPubkey] }],
}));

// Access events
subscription.events;  // Array of NDKRelayFeedList objects
```

---

## Key Implementation Files

### 1. RelayFeedsStore (relayFeeds.svelte.ts)
- Wraps `ndk.$sessions.relayFeedList`
- Provides `relays`, `relaySets` getters
- Provides `addRelay()`, `removeRelay()` async methods
- Handles publishing 10012 events to Nostr
- Updates session cache after publishing

### 2. Follows Relay Aggregator (aggregateFollowsRelays.svelte.ts)
- Subscribes to kind 10012 from all follows
- Processes events into RelayWithCount objects
- Provides `getTopRelays(n)` and `getRelaysByThreshold(percent)` methods
- Returns real-time aggregated data

### 3. RelaySelector Component (RelaySelector.svelte)
- Imports both relayFeeds and followsRelayAggregator
- Renders 6 different sections based on available data
- Allows filtering/switching between relay views
- Shows selected relay at top of button

### 4. NDK Initialization (ndk.svelte.ts)
- Configures session fetches to include kind 10012
- Adds NDKRelayFeedList to eventConstructors
- Automatically loads and parses 10012 on login

---

## Summary

The RelaySelector component integrates multiple data sources:

1. **User's configured relays** → "Other relays" section (localStorage)
2. **User's favorite relays** → "Favorite Relays" section (kind 10012 from NDK session)
3. **Follows' favorite relays** → "Follows' Relays" section (aggregated kind 10012 from all follows)
4. **Hardcoded special relays** → "Agoras" section
5. **User's follows** → "Following" option (kind 3 from NDK session)
6. **User's follow packs** → "Follow Packs" section (kind 39089 events)

Kind 10012 (NDKRelayFeedList) is central to the "Favorite Relays" and "Follows' Relays" functionality, enabling users to curate their content experience across all their devices while discovering which relays their follows prefer.
