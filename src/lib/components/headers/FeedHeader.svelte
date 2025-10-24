<script lang="ts">
  import type { Snippet } from 'svelte';
  import RelaySelector from '$lib/components/RelaySelector.svelte';
  import MediaTypeFilters from '$lib/components/MediaTypeFilters.svelte';
  import { ndk, hashtagInterests } from '$lib/ndk.svelte';
  import { hashtagFilter } from '$lib/stores/hashtagFilter.svelte';
  import { createNotificationsManager } from '$lib/utils/useNotifications.svelte';
  import { formatBalance } from '$lib/utils/formatBalance';

  interface HeaderTitle {
    type: 'logo' | 'text';
    text?: string;
  }

  interface Props {
    headerTitle: HeaderTitle | null;
    selectedFilter: 'conversations' | 'images' | 'videos' | 'articles';
    onFilterChange: (filter: 'conversations' | 'images' | 'videos' | 'articles') => void;
  }

  let { headerTitle, selectedFilter, onFilterChange }: Props = $props();

  const isVideoMode = $derived(selectedFilter === 'videos');

  const wallet = ndk.$wallet;
  const notificationsManager = createNotificationsManager(ndk);

  let headerElement = $state<HTMLDivElement | null>(null);

  $effect(() => {
    if (!headerElement) return;

    const updateHeaderHeight = () => {
      const height = isVideoMode ? 0 : headerElement.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${height}px`);
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  });
</script>

<div bind:this={headerElement} class="sticky top-0 z-10 bg-background/90 backdrop-blur-xl border-b border-border {isVideoMode ? 'hidden' : ''}">
  <div class="py-2 pl-2 sm:p-4 w-full">
    <div class="flex items-center gap-2 min-w-0">
      <!-- Relay/Following selector icon (always visible) -->
      <div class="flex-shrink-0 relative z-20">
        <RelaySelector iconOnly={true} />
      </div>

      <!-- Hashtags scroll container OR Title -->
      <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1 min-w-0 max-w-full">
      {#if hashtagInterests.interests.length > 0}
        {#each hashtagInterests.interests as hashtag}
          <button
            onclick={() => hashtagFilter.toggleHashtag(hashtag)}
            class="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all {
              hashtagFilter.isSelected(hashtag)
                ? 'bg-primary text-foreground border-2 border-primary-400'
                : 'bg-muted text-muted-foreground border-2 border-border hover:border'
            }"
          >
            <span class="text-xs">#</span>
            <span>{hashtag}</span>
          </button>
        {/each}
        {#if hashtagFilter.hasFilters}
          <button
            onclick={() => hashtagFilter.clearAll()}
            class="flex-shrink-0 inline-flex items-center gap-1 px-2 py-1.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
            title="Clear all filters"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        {/if}
      {:else if headerTitle}
        <h1 class="text-xl font-bold text-foreground">{headerTitle.text}</h1>
      {/if}
      </div>

      <!-- Mobile-only: Wallet and Notifications -->
      <div class="lg:hidden flex items-center gap-2 flex-shrink-0">
        <!-- Notifications -->
        <a
          href="/notifications"
          class="relative flex items-center justify-center p-2 rounded-lg hover:bg-muted transition-colors text-foreground"
          aria-label="Notifications"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {#if notificationsManager.counts.all > 0}
            <div class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary flex items-center justify-center">
              <span class="text-[10px] font-bold text-primary-foreground">
                {notificationsManager.counts.all > 9 ? '9+' : notificationsManager.counts.all}
              </span>
            </div>
          {/if}
        </a>

        <!-- Wallet -->
        <a
          href="/wallet"
          class="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-muted transition-colors text-foreground"
          aria-label="Wallet"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
          </svg>
          <span class="text-xs font-medium">{formatBalance(wallet.balance)}</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Media Type Filters -->
  <MediaTypeFilters {selectedFilter} onFilterChange={onFilterChange} />
</div>
