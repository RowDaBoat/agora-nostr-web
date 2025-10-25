<script lang="ts">
  import type { NDKEvent } from '@nostr-dev-kit/ndk';
  import HighlightCard from './HighlightCard.svelte';
  import EmptyState from './EmptyState.svelte';

  interface Props {
    highlights: NDKEvent[];
    emptyMessage?: string;
  }

  const { highlights, emptyMessage = 'No highlights yet' }: Props = $props();
</script>

{#if highlights.length === 0}
  <EmptyState icon="highlight" title={emptyMessage} />
{:else}
  <div class="divide-y divide-neutral-800/50">
    {#each highlights as highlight (highlight.id)}
      <HighlightCard event={highlight} />
    {/each}
  </div>
{/if}
