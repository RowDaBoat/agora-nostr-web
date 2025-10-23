<script lang="ts">
  import type { NDKArticle } from '@nostr-dev-kit/ndk';
  import CommentForm from './CommentForm.svelte';
  import CommentList from './CommentList.svelte';

  interface Props {
    article: NDKArticle;
    onError: (error: string) => void;
  }

  let { article, onError }: Props = $props();
</script>

<div class="border-t border pt-12">
  <div class="mb-8">
    <h2 class="text-2xl sm:text-3xl font-bold text-foreground font-serif mb-2">
      Discussion
    </h2>
  </div>

  <CommentForm {article} {onError} />

  <CommentList {article} />
</div>
