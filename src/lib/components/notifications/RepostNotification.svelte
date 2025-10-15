<script lang="ts">
  import type { NDKEvent } from '@nostr-dev-kit/ndk';
  import ActorList from './ActorList.svelte';
  import TimeAgo from '../TimeAgo.svelte';

  interface Props {
    reposts: NDKEvent[];
    targetEvent?: NDKEvent;
    timestamp: number;
  }

  const { reposts, targetEvent, timestamp }: Props = $props();

  const actorPubkeys = $derived(reposts.map((r) => r.pubkey));

  // Get a preview of the original post
  const originalPreview = $derived(
    targetEvent?.content ? targetEvent.content.slice(0, 100) + (targetEvent.content.length > 100 ? '...' : '') : ''
  );
</script>

<div class="flex gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border">
  <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center">
    <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  </div>

  <div class="flex-1 min-w-0">
    <div class="flex items-center gap-2 mb-1 flex-wrap">
      <span class="text-sm text-muted-foreground">
        <ActorList pubkeys={actorPubkeys} maxVisible={2} />
        {reposts.length === 1 ? 'reposted' : 'reposted'}
        your note
      </span>
      <TimeAgo {timestamp} class="text-sm text-muted-foreground ml-auto" />
    </div>

    {#if originalPreview}
      <div class="text-sm text-muted-foreground bg-muted/30 rounded p-2 border-l-2 border-green-500/50">
        {originalPreview}
      </div>
    {/if}
  </div>
</div>
