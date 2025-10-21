# Invite Acceptance Notifications - Implementation Details

## Overview

This document provides detailed technical information about the kind 514 invite acceptance notification implementation.

## Tag Detection Implementation

### Subscription Filter

**File**: `src/lib/utils/useNotifications.svelte.ts`
**Lines**: 72-86

```typescript
const notificationsSubscription = ndk.$subscribe(() => {
  if (!currentUser) return undefined;

  return {
    filters: [
      {
        kinds: [1, 1111, 6, 16, 7, 9735, 514], // Added 514 for invite acceptance
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

## Follow Button Implementation

### Follow API Integration

**File**: `src/lib/components/FollowButton.svelte`
**Lines**: 22-47

```typescript
async function handleToggleFollow() {
  if (!ndk.$currentUser || isLoading) return;

  isLoading = true;
  const wasFollowing = isFollowing;

  try {
    const userToToggle = await ndk.fetchUser(pubkey);

    if (isFollowing) {
      await ndk.$currentUser.unfollow(userToToggle);  // ← NDK API
      toast.success($t('profile.unfollowed'));
    } else {
      await ndk.$currentUser.follow(userToToggle);     // ← NDK API
      toast.success($t('profile.followed'));
    }
  } catch (error) {
    console.error('Error toggling follow:', error);
    toast.error($t('profile.follow_error'));
  } finally {
    isLoading = false;
  }
}
```

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

## Future Enhancements

Potential improvements:
1. **Grouping**: Multiple invite acceptances could be grouped
2. **Analytics**: Track invite conversion rate
3. **Custom messages**: Inviters could customize welcome message shown
4. **Profile preview**: Show more profile details on hover
5. **Auto-follow option**: Setting to auto-follow all invitees
