<script lang="ts">
  import type { NDKArticle, NDKEvent } from '@nostr-dev-kit/ndk';
  import { ndk } from '$lib/ndk.svelte';
  import User from '$lib/components/User.svelte';
  import ContentComposer from '$lib/components/ContentComposer.svelte';

  interface Props {
    article: NDKArticle;
    onError: (error: string) => void;
  }

  let { article, onError }: Props = $props();

  let replyContent = $state('');
  let isSubmitting = $state(false);

  const currentUser = ndk.$currentUser;

  async function handleCommentPublish() {
    if (!currentUser || !replyContent.trim()) return;

    isSubmitting = true;
    try {
      const replyEvent = article.reply();
      replyEvent.content = replyContent;
      await replyEvent.publish();

      if (replyEvent.publishStatus === 'error') {
        const error = replyEvent.publishError;
        const relayErrors = error?.relayErrors || {};
        const errorMessages = Object.entries(relayErrors)
          .map(([relay, err]) => `${relay}: ${err}`)
          .join('\n');
        onError(`Failed to publish:\n${errorMessages || 'Unknown error'}`);
        return;
      }

      replyContent = '';
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to publish comment';
      onError(errorMessage);
    } finally {
      isSubmitting = false;
    }
  }
</script>

{#if currentUser}
  <div class="mb-8">
    <div class="flex gap-3">
      <User
        pubkey={currentUser.pubkey}
        variant="avatar"
        avatarSize="w-10 h-10"
      />
      <div class="flex-1 flex flex-col gap-2">
        <div class="p-3 bg-neutral-50 dark:bg-card border border rounded-lg">
          <ContentComposer
            bind:value={replyContent}
            placeholder="Share your thoughts..."
            disabled={isSubmitting}
          />
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            onclick={handleCommentPublish}
            disabled={!replyContent.trim() || isSubmitting}
            class="px-4 py-2 bg-card dark:bg-white text-foreground dark:text-black rounded-full hover:bg-muted dark:hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            {isSubmitting ? 'Posting...' : 'Comment'}
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
