<script lang="ts">
  import type { NDKEvent } from '@nostr-dev-kit/ndk';
  import { Avatar, EventContent } from '@nostr-dev-kit/svelte';
  import { ndk } from '$lib/ndk.svelte';
  import { navigateToProfile } from '$lib/utils/navigation';
  import TimeAgo from '../TimeAgo.svelte';

  interface Props {
    event: NDKEvent;
    targetEvent?: NDKEvent;
  }

  const { event, targetEvent }: Props = $props();

  const profile = ndk.$fetchProfile(() => event.pubkey);
  const displayName = $derived(profile?.name || profile?.displayName || 'Anonymous');

  function handleProfileClick() {
    navigateToProfile(event.pubkey);
  }

  // Get a preview of the original post
  const originalPreview = $derived(
    targetEvent?.content ? targetEvent.content.slice(0, 100) + (targetEvent.content.length > 100 ? '...' : '') : ''
  );
</script>

<div class="flex gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border">
  <button type="button" onclick={handleProfileClick} class="flex-shrink-0">
    <Avatar {ndk} pubkey={event.pubkey} class="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity" />
  </button>

  <div class="flex-1 min-w-0">
    <div class="flex items-center gap-2 mb-1">
      <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
      </svg>
      <span class="text-sm text-muted-foreground">
        <button type="button" onclick={handleProfileClick} class="font-semibold hover:underline text-foreground">
          {displayName}
        </button>
        replied to your note
      </span>
      {#if event.created_at}
        <TimeAgo timestamp={event.created_at} class="text-sm text-muted-foreground ml-auto" />
      {/if}
    </div>

    <div class="text-foreground leading-relaxed mb-2">
      <EventContent {ndk} content={event.content} emojiTags={event.tags} />
    </div>

    {#if originalPreview}
      <div class="text-sm text-muted-foreground bg-muted/30 rounded p-2 border-l-2 border-primary/50">
        {originalPreview}
      </div>
    {/if}
  </div>
</div>
