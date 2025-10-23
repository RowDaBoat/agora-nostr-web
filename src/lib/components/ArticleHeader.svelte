<script lang="ts">
  import type { NDKArticle } from '@nostr-dev-kit/ndk';
  import { ndk } from '$lib/ndk.svelte';
  import User from './User.svelte';

  interface Props {
    article: NDKArticle;
  }

  let { article }: Props = $props();

  const authorProfile = ndk.$fetchProfile(() => article.pubkey);
  const currentUser = ndk.$currentUser;
  const title = $derived(article.title || 'Untitled');
  const summary = $derived(article.summary);
  const publishedAt = $derived(article.published_at);

  const wordsPerMinute = 200;
  const readingTime = $derived.by(() => {
    const words = article.content?.split(/\s+/).length || 0;
    return Math.ceil(words / wordsPerMinute);
  });

  const firstParagraph = $derived.by(() => {
    if (!article.content) return '';
    const paragraphs = article.content.trim().split(/\n\n+/);
    return paragraphs[0]?.trim() || '';
  });

  const shouldShowSummary = $derived.by(() => {
    if (!summary) return false;
    const normalizedSummary = summary.trim().toLowerCase();
    const normalizedFirstParagraph = firstParagraph.toLowerCase();
    return normalizedSummary !== normalizedFirstParagraph;
  });
</script>

<div class="mb-12">
  <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight font-serif">
    {title}
  </h1>

  {#if shouldShowSummary}
    <p class="text-xl sm:text-2xl text-muted-foreground mb-8 leading-relaxed font-light">
      {summary}
    </p>
  {/if}

  <div class="mb-8">
    <User
      pubkey={article.pubkey}
      variant="avatar-name-bio"
      avatarSize="w-12 h-12 sm:w-14 sm:h-14"
      nameSize="text-lg font-semibold"
      bioSize="text-sm text-muted-foreground line-clamp-1 max-w-md"
    />
  </div>

  <div class="flex items-center gap-2 text-sm text-muted-foreground">
    {#if publishedAt}
      <time datetime={new Date(publishedAt * 1000).toISOString()}>
        {new Date(publishedAt * 1000).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </time>
      <span>·</span>
    {/if}
    <span>{readingTime} min read</span>
  </div>

  <div class="mt-8 border-t border"></div>
</div>
