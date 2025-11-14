<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { ndk, relayFeeds } from '$lib/ndk.svelte';
  import { headerStore } from '$lib/stores/header.svelte';
  import RelayCard from '$lib/components/RelayCard.svelte';
  import { createFollowsRelayAggregator } from '$lib/utils/aggregateFollowsRelays.svelte';
    import { NDKRelayFeedList } from '@nostr-dev-kit/ndk';

  const favoriteRelays = ndk.$sessionEvent(NDKRelayFeedList);

  // Create follows relay aggregator
  const followsRelayAggregator = createFollowsRelayAggregator(ndk);
  const followsRelays = $derived(followsRelayAggregator.getTopRelays(20));

  async function toggleFavorite(relayUrl: string) {
    if (!relayFeeds) return;

    if (relayFeeds.isFavorite(relayUrl)) {
      await relayFeeds.removeRelay(relayUrl);
    } else {
      await relayFeeds.addRelay(relayUrl);
    }
  }

  function navigateToRelayFeed(relayUrl: string) {
    goto(`/?relay=${encodeURIComponent(relayUrl)}`);
  }

  onMount(() => {
    headerStore.headerConfig = {
      title: 'Relay Feeds',
      subtitle: 'Manage your favorite relays for curated content browsing',
      backNav: {
        href: '/'
      }
    };

    return () => {
      headerStore.headerConfig = null;
    };
  });
</script>

<div class="p-4 space-y-6">
  <!-- Empty state -->
  {#if !ndk.$currentUser}
    <div class="text-center py-12">
      <svg class="w-16 h-16 mx-auto mb-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <h3 class="text-lg font-semibold text-foreground mb-2">Login Required</h3>
      <p class="text-muted-foreground">
        Please login to manage your favorite relay feeds
      </p>
    </div>
  {:else}
    <!-- Favorite Relays Section (only show if user has favorites) -->
    {#if favoriteRelays?.relayUrls && favoriteRelays.relayUrls.length > 0}
      <div class="space-y-3">
        <h2 class="text-lg font-semibold text-foreground flex items-center gap-2">
          <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          Your Favorite Relays
          <span class="text-sm text-muted-foreground font-normal">({favoriteRelays?.relayUrls.length ?? 0})</span>
        </h2>

        <div class="grid gap-3">
          {#each favoriteRelays?.relayUrls ?? [] as relayUrl (relayUrl)}
            <RelayCard
              {relayUrl}
              isFavorite={true}
              showFavoriteIcon={true}
              onclick={() => navigateToRelayFeed(relayUrl)}
              onFavoriteClick={() => toggleFavorite(relayUrl)}
            />
          {/each}
        </div>
      </div>
    {/if}

    <!-- Follows' Relays Section -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold text-foreground flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Follows' Relays
          </h2>
          <p class="text-sm text-muted-foreground mt-1">
            Popular relays used by {followsRelayAggregator.eventsCount}/{followsRelayAggregator.totalFollows} of your follows
          </p>
        </div>
      </div>

      <div class="grid gap-3">
        {#each followsRelays as relayData (relayData.url)}
          {@const isFavorite = relayFeeds?.isFavorite(relayData.url) || false}
          <RelayCard
            relayUrl={relayData.url}
            pubkeys={relayData.pubkeys}
            {isFavorite}
            showFavoriteIcon={true}
            onclick={() => navigateToRelayFeed(relayData.url)}
            onFavoriteClick={() => toggleFavorite(relayData.url)}
          />
        {/each}
      </div>
    </div>
  {/if}
</div>
