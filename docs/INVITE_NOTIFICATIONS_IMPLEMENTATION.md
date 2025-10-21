# Invite Acceptance Notifications - Implementation Details

## Overview

This document provides detailed technical information about the kind 514 invite acceptance notification implementation.

**Latest Updates (Refactoring)**:
- Eliminated magic numbers with `KIND_INVITE_ACCEPTANCE` constant
- Implemented strategy pattern for notification processing
- Simplified component props with proper type boundaries
- Added custom event dispatching for better error propagation
- Enhanced testability with data-testid attributes

## Architecture

### Constants and Configuration

**File**: `src/lib/constants/nostr.ts`
**Lines**: 1-14

```typescript
export const KIND_TEXT_NOTE = 1;
export const KIND_REPLY = 1111;
export const KIND_REPOST = 6;
export const KIND_GENERIC_REPOST = 16;
export const KIND_REACTION = 7;
export const KIND_ZAP = 9735;
export const KIND_INVITE_ACCEPTANCE = 514;

export const NOTIFICATION_KINDS = [
  KIND_TEXT_NOTE, KIND_REPLY, KIND_REPOST,
  KIND_GENERIC_REPOST, KIND_REACTION, KIND_ZAP,
  KIND_INVITE_ACCEPTANCE
] as const;
```

All Nostr event kinds are now centralized in constants to eliminate magic numbers throughout the codebase.

## Tag Detection Implementation

### Subscription Filter

**File**: `src/lib/utils/useNotifications.svelte.ts`
**Lines**: 287-290

```typescript
const notificationsSubscription = ndk.$subscribe(() => {
  if (!currentUser) return undefined;

  return {
    filters: [
      {
        kinds: NOTIFICATION_KINDS,  // ← Uses constant array
        '#p': [currentUser.pubkey],  // ← RELAY-LEVEL FILTERING
        since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30,
        limit: 500,
      },
    ],
    subId: 'notifications',
  };
});
```

### How It Works

1. **Relay-Level Filtering**: The `'#p': [currentUser.pubkey]` filter is sent to the relay in the subscription request
2. **Current User Context**: `currentUser` is obtained from `ndk.$currentUser`, which represents the logged-in user
3. **Project Owner Context**: When the project owner (pubkey: `09d48a1a5dbe13404a729634f1d6ba722d40513468dd713c8ea38ca9b7b6f2c7`) is logged in, `currentUser.pubkey` equals this pubkey
4. **No Client-Side Filtering**: The relay only returns events that match the filter, so no additional filtering is needed in the client

### Why This Prevents False Positives

- **Relay enforcement**: Relays that support NIP-01 MUST filter by tags when `#<tag>` is present
- **No global 514 events**: We never receive kind 514 events that don't tag us
- **Automatic context**: The filter automatically uses whoever is logged in, including the project owner

## Notification Processing Architecture

### Strategy Pattern Implementation

**File**: `src/lib/utils/useNotifications.svelte.ts`
**Lines**: 108-171

The notification processing uses a strategy pattern to eliminate complex if/else chains and make it easy to add new notification types:

```typescript
// Step 1: Categorize event by type
function categorizeEvent(event: NDKEvent): NotificationCategory {
  const kind = event.kind;

  if (kind === KIND_INVITE_ACCEPTANCE) {
    return 'invite_acceptance';
  }
  // ... other categorizations
}

// Step 2: Process by category using strategy object
const notificationProcessors = {
  invite_acceptance: (events: NDKEvent[]): InviteAcceptanceNotification[] => {
    return events.map((event) => ({
      id: `invite-${event.id}`,
      type: 'invite_acceptance' as const,
      timestamp: event.created_at || 0,
      event,
      inviteeEventId: event.tags.find((t) => t[0] === 'e')?.[1] || '',
      inviteePubkey: event.pubkey,  // ← Primary actor who accepted
    }));
  },
  // ... other processors
};
```

**Benefits**:
- Each notification type has a dedicated processor function
- Easy to add new notification types without modifying existing code
- Clear separation of concerns
- Type-safe with TypeScript discrimination
- Eliminates long if/else or switch statements

### Notification Type Structure

**File**: `src/lib/utils/useNotifications.svelte.ts`
**Lines**: 42-48

```typescript
export type InviteAcceptanceNotification = BaseNotification & {
  type: 'invite_acceptance';
  event: NDKEvent;
  inviteeEventId: string;
  inviteePubkey: string;  // ← Primary actor extracted for easy access
};
```

The processor extracts the invitee's pubkey directly, so components don't need to parse the event structure.

## Component Architecture

### InviteAcceptanceNotification Component

**File**: `src/lib/components/notifications/InviteAcceptanceNotification.svelte`

**Props** (Lines 9-11):
```typescript
interface Props {
  notification: InviteAcceptanceNotification;  // ← Single, typed notification prop
}
```

**Key Features**:
- Accepts fully processed notification object (not raw NDKEvent)
- Uses `notification.inviteePubkey` for all user references
- Uses `notification.timestamp` for time display
- Has `data-testid="invite-acceptance-notification"` for testing
- Defensive display name fallback: shows first 8 chars of pubkey if no profile

**Usage** (in NotificationItem.svelte):
```typescript
{:else if notification.type === 'invite_acceptance'}
  <InviteAcceptanceNotification notification={notification} />
```

### FollowButton Component

**File**: `src/lib/components/FollowButton.svelte`

#### Follow API Integration

**Lines**: 22-72

```typescript
async function handleToggleFollow(event: MouseEvent) {
  if (!ndk.$currentUser || isLoading) return;

  isLoading = true;
  const wasFollowing = isFollowing;

  // Dispatch loading event
  event.currentTarget?.dispatchEvent(
    new CustomEvent('followloading', {
      detail: { pubkey, wasFollowing },
      bubbles: true,
    })
  );

  try {
    const userToToggle = await ndk.fetchUser(pubkey);

    if (isFollowing) {
      await ndk.$currentUser.unfollow(userToToggle);  // ← NDK API
      toast.success($t('profile.unfollowed'));
    } else {
      await ndk.$currentUser.follow(userToToggle);     // ← NDK API
      toast.success($t('profile.followed'));
    }

    // Dispatch success event
    event.currentTarget?.dispatchEvent(
      new CustomEvent('followsuccess', {
        detail: { pubkey, isFollowing: !wasFollowing },
        bubbles: true,
      })
    );
  } catch (error) {
    console.error('Error toggling follow:', error);
    toast.error($t('profile.follow_error'));

    // Dispatch error event
    event.currentTarget?.dispatchEvent(
      new CustomEvent('followerror', {
        detail: { pubkey, error, wasFollowing },
        bubbles: true,
      })
    );
  } finally {
    isLoading = false;
  }
}
```

#### Custom Events

The FollowButton dispatches three custom events for better error propagation and state tracking:

1. **`followloading`**: Dispatched when follow action starts
   - Detail: `{ pubkey: string, wasFollowing: boolean }`

2. **`followsuccess`**: Dispatched when follow action succeeds
   - Detail: `{ pubkey: string, isFollowing: boolean }`

3. **`followerror`**: Dispatched when follow action fails
   - Detail: `{ pubkey: string, error: unknown, wasFollowing: boolean }`

All events bubble, allowing parent components to react to state changes.

### State Management

**File**: `src/lib/components/FollowButton.svelte`
**Lines**: 16-20

```typescript
const follows = $derived(ndk.$sessions?.follows ?? new Set());
const isFollowing = $derived.by(() => follows.has(pubkey));
const isOwnProfile = $derived(ndk.$currentUser?.pubkey === pubkey);

let isLoading = $state(false);
```

- **Reactive State**: Uses Svelte 5's `$derived` and `$state` runes
- **Follows Set**: `ndk.$sessions.follows` is a reactive Set maintained by NDK
- **Automatic Updates**: When `follow()` or `unfollow()` is called, NDK updates this Set
- **UI Updates**: Svelte reactivity automatically re-renders when the Set changes

### Loading State

**File**: `src/lib/components/FollowButton.svelte`
**Lines**: 61-65

```svelte
{#if isLoading}
  <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
{:else if showIcon}
```

- Shows animated spinner during async operation
- Prevents visual flash by checking `isLoading` first

### Accessibility Implementation

**File**: `src/lib/components/FollowButton.svelte`
**Lines**: 50-59

```svelte
<button
  type="button"
  onclick={handleToggleFollow}
  disabled={isLoading}
  aria-label={isFollowing ? $t('profile.unfollow') : $t('profile.follow')}
  class={`... ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ...`}
>
```

- **aria-label**: Uses i18n key `profile.follow` or `profile.unfollow`
- **disabled**: Button is disabled during loading to prevent double-clicks
- **type="button"**: Explicit button type
- **Keyboard accessible**: Native button element

### i18n Keys Used

**File**: `src/i18n/locales/en.json`
**Lines**: 246-250

```json
{
  "profile": {
    "follow": "Follow",
    "unfollow": "Unfollow",
    "followed": "Now following",
    "unfollowed": "Unfollowed",
    "follow_error": "Failed to update follow status"
  }
}
```

## Notification Component

### InviteAcceptanceNotification Component

**File**: `src/lib/components/notifications/InviteAcceptanceNotification.svelte`

#### Profile Fallback Logic

**Lines**: 17-24

```typescript
const displayName = $derived.by(() => {
  if (profile?.name || profile?.displayName) {
    return profile.name || profile.displayName;
  }
  // Show first 8 characters of pubkey as fallback
  return event.pubkey.slice(0, 8) + '...';
});
```

- Tries profile name first
- Falls back to display name
- If neither exists, shows first 8 chars of hex pubkey

#### Follow Button Visibility

**Lines**: 55-59

```svelte
{#if !isFollowing}
  <div class="mt-2">
    <FollowButton pubkey={event.pubkey} variant="outline" />
  </div>
{/if}
```

- Only renders when NOT following
- Uses reactive `isFollowing` from `ndk.$sessions.follows` Set
- Automatically hides when user clicks Follow and it succeeds

## Processing Logic

### Kind 514 Event Processing

**File**: `src/lib/utils/useNotifications.svelte.ts`
**Lines**: 317-329

```typescript
// Process invite acceptances (kind 514)
inviteAcceptances.forEach((event) => {
  // The 514 event is published by the invitee, tagging the inviter (us) with 'p' tag
  // and the invite event with 'e' tag
  const inviteEventId = event.tags.find((t) => t[0] === 'e')?.[1] || '';
  groups.push({
    id: `invite-${event.id}`,
    type: 'invite_acceptance',
    timestamp: event.created_at || 0,
    event,
    inviteeEventId: inviteEventId,
  });
});
```

### Filter Logic

**File**: `src/lib/utils/useNotifications.svelte.ts`
**Lines**: 351-357

```typescript
const filteredNotifications = $derived.by(() => {
  if (currentFilter === 'all') return notificationGroups;
  if (currentFilter === 'invite') {
    return notificationGroups.filter((group) => group.type === 'invite_acceptance');
  }
  return notificationGroups.filter((group) => group.type === currentFilter);
});
```

- Maps `'invite'` filter to `'invite_acceptance'` type
- Maintains consistency with other notification types

### Counts Aggregation

**File**: `src/lib/utils/useNotifications.svelte.ts`
**Lines**: 360-381

```typescript
const counts = $derived.by(() => {
  const result = {
    all: notificationGroups.length,
    reply: 0,
    mention: 0,
    quote: 0,
    reaction: 0,
    repost: 0,
    zap: 0,
    invite: 0,
  };

  notificationGroups.forEach((group) => {
    if (group.type === 'invite_acceptance') {
      result.invite++;
    } else {
      result[group.type]++;
    }
  });

  return result;
});
```

- Special case for `invite_acceptance` → `invite` count mapping
- All other types use direct property access

## Performance Characteristics

### Subscription Efficiency

- **Single subscription**: Kind 514 added to existing notification subscription
- **No duplicate subscriptions**: `subId: 'notifications'` ensures uniqueness
- **Relay-level filtering**: No client-side filtering overhead
- **Limited data**: `limit: 500` and `since: 30 days` prevent excessive data

### Reactive Updates

- **Minimal re-renders**: Svelte 5 runes optimize reactivity
- **Derived state**: `$derived` only recomputes when dependencies change
- **Set operations**: `follows.has(pubkey)` is O(1)

## Type Safety

### TypeScript Types

**File**: `src/lib/utils/useNotifications.svelte.ts`
**Lines**: 48-63

```typescript
export type InviteAcceptanceNotification = BaseNotification & {
  type: 'invite_acceptance';
  event: NDKEvent;
  inviteeEventId: string;
};

export type NotificationGroup =
  | ReplyNotification
  | MentionNotification
  | QuoteNotification
  | ReactionNotification
  | RepostNotification
  | ZapNotification
  | InviteAcceptanceNotification;

export type NotificationFilter = 'all' | 'reply' | 'mention' | 'quote' | 'reaction' | 'repost' | 'zap' | 'invite';
```

- Discriminated union ensures type safety
- `inviteeEventId` stores reference to original invite event

## Integration Points

### NotificationItem Integration

**File**: `src/lib/components/notifications/NotificationItem.svelte`
**Lines**: 49-50

```svelte
{:else if notification.type === 'invite_acceptance'}
  <InviteAcceptanceNotification event={notification.event} />
```

### Notifications Page Integration

**File**: `src/routes/(app)/notifications/+page.svelte`
**Lines**: 16

```svelte
{ value: 'invite', label: 'Invites' },
```

## Error Handling

### Follow Button Errors

- **Network failures**: Caught and displayed via toast
- **State consistency**: NDK manages follow list updates
- **User feedback**: Clear success/error messages
- **No state corruption**: Error doesn't break UI

### Missing Data

- **No profile**: Shows pubkey fallback
- **No avatar**: Avatar component provides default
- **No bio**: Bio section hidden (conditional rendering)
- **No timestamp**: Uses 0 as fallback (shows as "just now")

## Security Considerations

### Tag Validation

- **Relay enforcement**: Relays validate `#p` tags
- **No injection**: Pubkeys are validated by NDK
- **No XSS**: User-generated content escaped by Svelte

### Authentication

- **Login required**: `ndk.$currentUser` must exist
- **Authorization**: Users can only follow/unfollow as themselves
- **No impersonation**: Current user context is session-based

## Testability

### Data Test IDs

Both components include `data-testid` attributes for reliable E2E testing:

**InviteAcceptanceNotification** (Line 35):
```svelte
<div data-testid="invite-acceptance-notification" ...>
```

**FollowButton** (Line 76):
```svelte
<button data-testid="follow-button" ...>
```

### Testing Strategy

**File**: `tests/invite-acceptance-notifications.spec.ts`

Tests use data-testid selectors instead of fragile CSS selectors:

```typescript
// Find notification component
const inviteNotifications = page.getByTestId('invite-acceptance-notification');

// Find Follow button
const followButtons = page.getByTestId('follow-button');
```

**Benefits**:
- Resistant to styling changes
- Clear test intent
- Better test isolation
- Easier debugging

### Custom Event Testing

Tests can listen for custom events dispatched by FollowButton:

```typescript
const loadingEventPromise = page.evaluate(() => {
  return new Promise((resolve) => {
    document.addEventListener('followloading', (e) => resolve(e), { once: true });
  });
});

await button.click();
```

This enables testing of:
- Loading state transitions
- Success/error handling
- State propagation to parent components

## Future Enhancements

Potential improvements:
1. **Grouping**: Multiple invite acceptances could be grouped
2. **Analytics**: Track invite conversion rate
3. **Custom messages**: Inviters could customize welcome message shown
4. **Profile preview**: Show more profile details on hover
5. **Auto-follow option**: Setting to auto-follow all invitees
