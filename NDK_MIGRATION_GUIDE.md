# NDK Svelte Migration Guide for Voces

This guide explains how to use the new NDK Svelte architecture with builders (headless primitives) and UI components in the Voces application.

## What Changed?

NDK Svelte now uses a **two-layer architecture**:

1. **Builders (Headless Primitives)** - Pure logic and state management
2. **UI Components (Styled Wrappers)** - Pre-styled components using builders

This gives you **maximum flexibility**: use styled components for quick development, or use builders directly for complete control.

## Prerequisites

✅ **Already set up in Voces:**
- `@nostr-dev-kit/svelte` from local path (`../NDK-nhlteu/svelte`)
- `cn()` utility function in `src/lib/utils.ts`
- Svelte 5 with runes enabled
- All necessary dependencies (`clsx`, `tailwind-merge`)

## Migration Strategy

### Phase 1: Keep Old Components Working (Current State)

The old Avatar and Name components still work as before. No breaking changes yet.

**Current usage (still works):**
```svelte
<Avatar {ndk} pubkey={user.pubkey} class="w-10 h-10" />
```

### Phase 2: New Components Available

You can now **also** use the new architecture:

#### Option A: Use New Styled UI Components

```svelte
<script>
  import { Avatar } from '@nostr-dev-kit/svelte';
  import { ndk } from '$lib/ndk.svelte';

  // Fetch user
  let user = $state<NDKUser | undefined>();
  $effect(() => {
    ndk.fetchUser(pubkey).then(u => user = u);
  });
</script>

{#if user}
  <Avatar {user} size={40} class="hover:opacity-80" />
{/if}
```

**Key Changes:**
- ✅ Takes `user: NDKUser` instead of `ndk` + `pubkey`
- ✅ Fully styled with CSS variables
- ✅ Better type safety
- ✅ Automatic profile loading

#### Option B: Use Builders Directly (Full Control)

```svelte
<script>
  import { createAvatar } from '@nostr-dev-kit/svelte';
  import { onDestroy } from 'svelte';

  const avatar = createAvatar({ user, size: 40 });

  onDestroy(() => avatar.cleanup());
</script>

<!-- Completely custom markup -->
<div class="my-custom-avatar">
  {#if avatar.imageUrl}
    <img src={avatar.imageUrl} alt={avatar.altText} />
  {:else}
    <div style="background: {avatar.backgroundGradient}">
      {avatar.initials}
    </div>
  {/if}
</div>
```

**Builder API:**
```typescript
interface AvatarState {
  profile: NDKUserProfile | undefined;
  imageUrl: string | undefined;
  displayName: string;
  altText: string;
  initials: string;
  backgroundGradient: string;
  size: number;
  cleanup: () => void;
}
```

### Phase 3: Recommended Pattern for Voces

For maximum performance and clean code, **fetch the user once and pass it down**:

#### Before (Current Pattern):
```svelte
<!-- User.svelte - fetches user internally -->
<script>
  let user = $state<NDKUser | undefined>();
  $effect(() => {
    ndk.fetchUser(pubkey).then(u => {
      user = u;
      u?.fetchProfile().then(p => { profile = p; });
    });
  });
</script>

<Avatar {ndk} {pubkey} class="w-10 h-10" />
```

#### After (Recommended Pattern):
```svelte
<!-- User.svelte - fetches user once, passes down -->
<script>
  import { Avatar } from '@nostr-dev-kit/svelte';

  let user = $state<NDKUser | undefined>();
  $effect(() => {
    ndk.fetchUser(pubkey).then(u => {
      user = u;
      u?.fetchProfile(); // Triggers automatic profile fetch
    });
  });
</script>

{#if user}
  <Avatar {user} size={40} class="hover:opacity-80" />
{/if}
```

**Benefits:**
- ✅ Single source of truth for user data
- ✅ No duplicate profile fetches
- ✅ Better reactivity (profile updates automatically)
- ✅ Simpler component tree

## Component-by-Component Migration

### Avatar Component

**Old API:**
```svelte
<Avatar {ndk} pubkey={user.pubkey} size={40} class="w-10 h-10" />
```

**New API:**
```svelte
<Avatar {user} size={40} class="w-10 h-10" />
```

**Migration Steps:**
1. Ensure you have an `NDKUser` object (not just pubkey string)
2. Remove `ndk` prop
3. Pass `user` instead of `pubkey`
4. Size is now a number (pixels) instead of Tailwind classes

### Name Component

**Old API:**
```svelte
<Name {ndk} pubkey={user.pubkey} field="displayName" class="font-bold" />
```

**New API:**
```svelte
<Name {user} field="displayName" class="font-bold" />
```

**Additional Features:**
- New `as` prop to control HTML element: `<Name {user} as="h1" />`
- Better fallback handling
- Automatic updates when profile changes

## Using Registry Components (shadcn-svelte Style)

You can also install individual components from the NDK registry:

```bash
# Install a component
npx shadcn-svelte add https://ndk.fyi/r/note-card.json
npx shadcn-svelte add https://ndk.fyi/r/zap-button.json
npx shadcn-svelte add https://ndk.fyi/r/reactions.json
```

This copies the component source into your project, giving you **full control** to customize.

## Theming

All new components support CSS variable theming:

```css
/* In your app.css or component */
:root {
  /* Colors */
  --ndk-accent: hsl(262.1 83.3% 57.8%);
  --ndk-foreground: hsl(0 0% 3.9%);
  --ndk-muted-foreground: hsl(0 0% 45.1%);

  /* Backgrounds */
  --ndk-bg-primary: hsl(0 0% 100%);
  --ndk-bg-secondary: hsl(0 0% 96.1%);

  /* Borders */
  --ndk-border: hsl(0 0% 89.8%);

  /* Radius */
  --ndk-radius-sm: 0.375rem;
  --ndk-radius-md: 0.5rem;
  --ndk-radius-lg: 0.75rem;
  --ndk-radius-full: 9999px;

  /* Spacing */
  --ndk-spacing-1: 0.25rem;
  --ndk-spacing-2: 0.5rem;
  --ndk-spacing-3: 0.75rem;
  --ndk-spacing-4: 1rem;

  /* Special colors */
  --ndk-react-color: hsl(0 84.2% 60.2%);
  --ndk-zap-color: hsl(38 92% 50%);

  /* Avatar */
  --ndk-avatar-radius: 50%; /* or 0.5rem for rounded squares */
  --ndk-avatar-text: white;
}

/* Dark mode */
:root.dark {
  --ndk-bg-primary: hsl(0 0% 9%);
  --ndk-bg-secondary: hsl(0 0% 15%);
  --ndk-foreground: hsl(0 0% 95%);
  --ndk-border: hsl(0 0% 20%);
}
```

## Performance Tips

### 1. Fetch Users Once
```svelte
<!-- ❌ Bad: Fetches user multiple times -->
<Avatar {ndk} {pubkey} />
<Name {ndk} {pubkey} />

<!-- ✅ Good: Fetch once, use everywhere -->
<script>
  let user = $state<NDKUser>();
  $effect(() => {
    ndk.fetchUser(pubkey).then(u => user = u);
  });
</script>

{#if user}
  <Avatar {user} />
  <Name {user} />
{/if}
```

### 2. Use Builders for Custom Logic
```svelte
<script>
  // Custom component with full control
  const avatar = createAvatar({ user });
  const name = createName({ user, field: 'both' });

  // Access reactive state
  $effect(() => {
    console.log('Name updated:', name.displayText);
  });
</script>
```

### 3. Cleanup on Destroy
```svelte
<script>
  import { onDestroy } from 'svelte';

  const avatar = createAvatar({ user });

  onDestroy(() => {
    avatar.cleanup(); // Important for subscriptions
  });
</script>
```

## Example: Migrating User.svelte

Here's how to update the existing `User.svelte` component:

### Before:
```svelte
<script lang="ts">
  import { Avatar } from '@nostr-dev-kit/svelte';
  import { ndk } from '$lib/ndk.svelte';

  let user = $state<NDKUser | undefined>();
  let profile = $state<NDKUserProfile | null>(null);

  $effect(() => {
    ndk.fetchUser(pubkey).then(u => {
      user = u;
      u?.fetchProfile().then(p => { profile = p; });
    });
  });

  const displayName = $derived(
    profile?.displayName || profile?.name || `${pubkey?.slice(0, 8)}...`
  );
</script>

<Avatar {ndk} {pubkey} class="{avatarSize}" />
<p>{displayName}</p>
```

### After (Option 1: Using New UI Components):
```svelte
<script lang="ts">
  import { Avatar, Name } from '@nostr-dev-kit/svelte';
  import { ndk } from '$lib/ndk.svelte';

  let user = $state<NDKUser | undefined>();

  $effect(() => {
    ndk.fetchUser(pubkey).then(u => {
      user = u;
      u?.fetchProfile(); // Triggers auto-fetch, updates reactively
    });
  });
</script>

{#if user}
  <Avatar {user} size={40} class={avatarSize} />
  <Name {user} field="displayName" />
{/if}
```

### After (Option 2: Using Builders for Full Control):
```svelte
<script lang="ts">
  import { createAvatar, createName } from '@nostr-dev-kit/svelte';
  import { onDestroy } from 'svelte';
  import { ndk } from '$lib/ndk.svelte';

  let user = $state<NDKUser | undefined>();

  $effect(() => {
    ndk.fetchUser(pubkey).then(u => user = u);
  });

  // Create builders (only when user is available)
  const avatar = $derived(user && createAvatar({ user, size: 40 }));
  const name = $derived(user && createName({ user }));

  onDestroy(() => {
    avatar?.cleanup();
    name?.cleanup();
  });
</script>

{#if avatar && name}
  <!-- Custom markup with full control -->
  <div class="custom-user-card">
    {#if avatar.imageUrl}
      <img src={avatar.imageUrl} alt={avatar.altText} class={avatarSize} />
    {:else}
      <div class="avatar-fallback" style="background: {avatar.backgroundGradient}">
        {avatar.initials}
      </div>
    {/if}

    <div class="user-info">
      <h3>{name.displayText}</h3>
      {#if name.name}
        <span class="handle">@{name.name}</span>
      {/if}
    </div>
  </div>
{/if}
```

## Available Components

### Currently Migrated:
- ✅ `Avatar` - User avatar with fallback
- ✅ `Name` - User name display
- ✅ `NoteCard` - Complete note display with reactions, replies, zaps

### Coming Soon:
- 🚧 `UserCard` - Profile card with follow button
- 🚧 `ZapButton` - Lightning zap button (may be redundant with NoteCard)
- 🚧 `EventContent` - Rich content renderer
- 🚧 `RelayCard` - Relay display

## Builder API Reference

### `createAvatar(options)`
```typescript
createAvatar({
  user: NDKUser,
  size?: number = 40
}): AvatarState

// Returns:
{
  profile: NDKUserProfile | undefined,
  imageUrl: string | undefined,
  displayName: string,
  altText: string,
  initials: string,
  backgroundGradient: string, // Deterministic gradient
  size: number,
  cleanup: () => void
}
```

### `createName(options)`
```typescript
createName({
  user: NDKUser,
  field?: 'name' | 'displayName' | 'both' = 'displayName'
}): NameState

// Returns:
{
  profile: NDKUserProfile | undefined,
  displayText: string, // Formatted based on field
  displayName: string | undefined,
  name: string | undefined,
  truncatedPubkey: string,
  cleanup: () => void
}
```

### `createNoteCard(options)`
```typescript
createNoteCard({
  ndk: NDKSvelte,
  event: NDKEvent,
  eager?: boolean = false,
  defaultReactionEmoji?: string = '+'
}): NoteCardState

// Returns:
{
  author: { displayName, picture, nip05, ... },
  reactions: ReactionsState,
  replies: RepliesState,
  zaps: ZapsState,
  hashtags: string[],
  isReply: boolean,
  react: (emoji) => void | action,
  reply: action,
  zap: action,
  cleanup: () => void
}
```

## Questions?

- See the NDK Svelte README at `../NDK-nhlteu/svelte/README.md`
- Check registry README at `../NDK-nhlteu/svelte/registry/README.md`
- Browse components at `../NDK-nhlteu/svelte/src/lib/ui/`
- Browse builders at `../NDK-nhlteu/svelte/src/lib/builders/`

## Next Steps

1. **Try the new components** in a new feature or page
2. **Gradually migrate** existing components as you touch them
3. **Customize styling** using CSS variables
4. **Share feedback** on what works and what doesn't

The old API will continue to work, so there's **no rush to migrate**. Take your time and migrate incrementally!