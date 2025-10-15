<script lang="ts">
  import type { NDKEvent } from '@nostr-dev-kit/ndk';
  import { Avatar, EventContent } from '@nostr-dev-kit/svelte';
  import { ndk } from '$lib/ndk.svelte';
  import { navigateToProfile } from '$lib/utils/navigation';
  import TimeAgo from '../TimeAgo.svelte';

  interface Props {
    event: NDKEvent;
  }

  const { event }: Props = $props();

  const profile = ndk.$fetchProfile(() => event.pubkey);
  const displayName = $derived(profile?.name || profile?.displayName || 'Anonymous');

  function handleProfileClick() {
    navigateToProfile(event.pubkey);
  }
</script>

<div class="flex gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border">
  <button type="button" onclick={handleProfileClick} class="flex-shrink-0">
    <Avatar {ndk} pubkey={event.pubkey} class="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity" />
  </button>

  <div class="flex-1 min-w-0">
    <div class="flex items-center gap-2 mb-1">
      <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
      </svg>
      <span class="text-sm text-muted-foreground">
        <button type="button" onclick={handleProfileClick} class="font-semibold hover:underline text-foreground">
          {displayName}
        </button>
        mentioned you
      </span>
      {#if event.created_at}
        <TimeAgo timestamp={event.created_at} class="text-sm text-muted-foreground ml-auto" />
      {/if}
    </div>

    <div class="text-foreground leading-relaxed">
      <EventContent {ndk} content={event.content} emojiTags={event.tags} />
    </div>
  </div>
</div>
