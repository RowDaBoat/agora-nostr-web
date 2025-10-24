<script lang="ts">
  import type { NDKUser } from '@nostr-dev-kit/ndk';
  import User from './User.svelte';

  interface Props {
    user: NDKUser;
    onClick: (user: NDKUser) => void;
    showArrow?: boolean;
    size?: 'sm' | 'md' | 'lg';
    class?: string;
  }

  let { user, onClick, showArrow = false, size = 'md', class: className = '' }: Props = $props();

  const avatarSizeClass = $derived(
    size === 'sm' ? 'w-8 h-8' :
    size === 'md' ? 'w-10 h-10' :
    'w-12 h-12'
  );
  const nameSizeClass = $derived(
    size === 'sm' ? 'text-sm font-semibold' :
    size === 'md' ? 'text-base font-semibold' :
    'text-base font-semibold'
  );
  const handleSizeClass = $derived(
    size === 'sm' ? 'text-xs text-muted-foreground' :
    'text-sm text-muted-foreground'
  );

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    onClick(user);
  }
</script>

<div class={`w-full flex items-center gap-3 px-4 py-4 hover:bg-muted transition-colors ${className}`}>
  <User
    pubkey={user.pubkey}
    variant="avatar-name-handle"
    avatarSize={avatarSizeClass}
    nameSize={nameSizeClass}
    handleSize={handleSizeClass}
    showHoverCard={false}
    onclick={handleClick}
    class="flex-1"
  />

  {#if showArrow}
    <svg class="w-5 h-5 text-muted-foreground flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  {/if}
</div>
