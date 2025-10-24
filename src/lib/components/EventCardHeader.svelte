<script lang="ts">
  import type { NDKEvent } from '@nostr-dev-kit/ndk';
  import User from './User.svelte';
  import TimeAgo from './TimeAgo.svelte';
  import EventOptionsMenu from './EventOptionsMenu.svelte';

  interface Props {
    event: NDKEvent;
    avatarClass?: string;
    nameClass?: string;
    variant?: 'compact' | 'full';
  }

  const {
    event,
    avatarClass = 'w-9 h-9 sm:w-12 sm:h-12',
    nameClass = 'text-base font-semibold',
    variant = 'compact'
  }: Props = $props();
</script>

<div class="flex items-center gap-2 sm:gap-3">
  <div class="flex items-center gap-2 flex-1 min-w-0" onclick={(e) => e.stopPropagation()}>
    {#if variant === 'compact'}
      <User
        pubkey={event.pubkey}
        variant="avatar-name-handle"
        avatarSize={avatarClass}
        nameSize={nameClass}
      />
    {:else}
      <User
        pubkey={event.pubkey}
        variant="avatar-name-meta"
        avatarSize={avatarClass}
        nameSize={nameClass}
      />
    {/if}
  </div>

  {#if event.created_at}
    <TimeAgo timestamp={event.created_at} class="text-muted-foreground text-sm flex-shrink-0" />
  {/if}

  <EventOptionsMenu {event} />
</div>
