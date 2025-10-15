<script lang="ts">
  import type { NDKEvent } from '@nostr-dev-kit/ndk';
  import { ndk } from '$lib/ndk.svelte';
  import ActorList from './ActorList.svelte';
  import TimeAgo from '../TimeAgo.svelte';

  interface Props {
    emoji: string;
    reactors: Array<{ pubkey: string; event: NDKEvent }>;
    targetEvent?: NDKEvent;
    timestamp: number;
  }

  const { emoji, reactors, targetEvent, timestamp }: Props = $props();

  const actorPubkeys = $derived(reactors.map((r) => r.pubkey));

  // Get a preview of the original post
  const originalPreview = $derived(
    targetEvent?.content ? targetEvent.content.slice(0, 100) + (targetEvent.content.length > 100 ? '...' : '') : ''
  );
</script>

<div class="flex gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border">
  <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center text-2xl">
    {emoji}
  </div>

  <div class="flex-1 min-w-0">
    <div class="flex items-center gap-2 mb-1 flex-wrap">
      <svg class="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span class="text-sm text-muted-foreground">
        <ActorList pubkeys={actorPubkeys} maxVisible={2} />
        {reactors.length === 1 ? 'reacted' : 'reacted'}
        <span class="text-lg mx-1">{emoji}</span>
        to your note
      </span>
      <TimeAgo {timestamp} class="text-sm text-muted-foreground ml-auto" />
    </div>

    {#if originalPreview}
      <div class="text-sm text-muted-foreground bg-muted/30 rounded p-2 border-l-2 border-red-500/50">
        {originalPreview}
      </div>
    {/if}
  </div>
</div>
