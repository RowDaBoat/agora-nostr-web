<script lang="ts">
  import type { NDKEvent } from '@nostr-dev-kit/ndk';
  import ActorList from './ActorList.svelte';
  import TimeAgo from '../TimeAgo.svelte';

  interface Props {
    zaps: Array<{ event: NDKEvent; amount: number; sender: string }>;
    targetEvent?: NDKEvent;
    timestamp: number;
  }

  const { zaps, targetEvent, timestamp }: Props = $props();

  const actorPubkeys = $derived(zaps.map((z) => z.sender));
  const totalAmount = $derived(zaps.reduce((sum, z) => sum + z.amount, 0));

  // Format amount with commas
  const formattedAmount = $derived(totalAmount.toLocaleString());

  // Get a preview of the original post
  const originalPreview = $derived(
    targetEvent?.content ? targetEvent.content.slice(0, 100) + (targetEvent.content.length > 100 ? '...' : '') : ''
  );
</script>

<div class="flex gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border">
  <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center">
    <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  </div>

  <div class="flex-1 min-w-0">
    <div class="flex items-center gap-2 mb-1 flex-wrap">
      <span class="text-sm text-muted-foreground">
        <ActorList pubkeys={actorPubkeys} maxVisible={2} />
        {zaps.length === 1 ? 'zapped' : 'zapped'}
        <span class="font-semibold text-yellow-600 dark:text-yellow-400 mx-1">
          {formattedAmount} sats
        </span>
        {#if targetEvent}
          to your note
        {:else}
          to you
        {/if}
      </span>
      <TimeAgo {timestamp} class="text-sm text-muted-foreground ml-auto" />
    </div>

    {#if originalPreview}
      <div class="text-sm text-muted-foreground bg-muted/30 rounded p-2 border-l-2 border-yellow-500/50">
        {originalPreview}
      </div>
    {/if}
  </div>
</div>
