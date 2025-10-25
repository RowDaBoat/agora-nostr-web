<script lang="ts">
  import type { NDKArticle, NDKEvent } from '@nostr-dev-kit/ndk';
  import { NDKKind } from '@nostr-dev-kit/ndk';
  import { ndk } from '$lib/ndk.svelte';
  import NoteCard from './NoteCard.svelte';
  import EmptyState from './EmptyState.svelte';

  interface Props {
    article: NDKArticle;
  }

  let { article }: Props = $props();

  const commentsSubscription = ndk.$subscribe(() => ({
    filters: [{
      kinds: [NDKKind.Text, NDKKind.GenericReply],
      '#a': [`${article.kind}:${article.pubkey}:${article.dTag}`]
    }],
    bufferMs: 100,
    subId: 'comments'
  }));

  const comments = $derived.by(() => {
    return [...commentsSubscription.events].sort((a, b) => (a.created_at || 0) - (b.created_at || 0));
  });
</script>

{#if comments.length === 0}
  <EmptyState icon="message" title="No comments yet" description="Be the first to share your thoughts!" size="lg" />
{:else}
  <div>
    {#each comments as comment (comment.id)}
      <NoteCard event={comment} variant="default" />
    {/each}
  </div>
{/if}
