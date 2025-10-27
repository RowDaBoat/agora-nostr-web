<script lang="ts">
  import { goto } from '$app/navigation';
  import { settings } from '$lib/stores/settings.svelte';
  import { useRelayInfoCached } from '$lib/utils/relayInfo.svelte';
  import { clickOutside } from '$lib/utils/clickOutside';
  import { isAgoraRelay, AGORA_RELAYS } from '$lib/utils/relayUtils';
  import { portal } from '$lib/utils/portal.svelte';
  import { ndk, relayFeeds } from '$lib/ndk.svelte';
  import { followPacksStore } from '$lib/stores/followPacks.svelte';
  import type { NDKEvent } from '@nostr-dev-kit/ndk';
  import RelayIcon from './RelayIcon.svelte';

  interface Props {
    active?: boolean;
    collapsed?: boolean;
    iconOnly?: boolean;
  }

  const { active = false, collapsed = false, iconOnly = false }: Props = $props();

  let isOpen = $state(false);
  let buttonElement: HTMLElement | null = $state(null);
  let dropdownPosition = $state({ top: 0, left: 0, width: 0 });

  // Get relays from NDK session's relay list (kind 10002)
  const sessionRelays = $derived.by(() => {
    const relayList = ndk.$sessions?.relayList;
    if (!relayList) return [];

    return Array.from(relayList.keys());
  });

  // Filter out agoras and favorite relays
  const otherRelays = $derived.by(() => {
    return sessionRelays.filter(url =>
      !isAgoraRelay(url) && !relayFeeds.isFavorite(url)
    );
  });

  // Get follows and check if user has any
  const follows = $derived(ndk.$sessions?.follows || []);
  const hasFollows = $derived(follows.size > 0);
  const shouldShowFollowing = $derived(!!ndk.$currentUser && hasFollows);

  // Fetch favorite follow pack events
  let favoritePackEvents = $state<NDKEvent[]>([]);
  let userCreatedPackEvents = $state<NDKEvent[]>([]);

  $effect(() => {
    const favoriteIds = followPacksStore.favoritePacks;
    if (favoriteIds.length === 0) {
      favoritePackEvents = [];
      return;
    }

    // Fetch all favorite pack events
    Promise.all(
      favoriteIds.map(packId => ndk.fetchEvent(packId))
    ).then(events => {
      favoritePackEvents = events.filter((e): e is NDKEvent => e !== null);
    }).catch(err => {
      console.error('Failed to fetch favorite packs:', err);
      favoritePackEvents = [];
    });
  });

  // Fetch user's own created follow packs
  $effect(() => {
    if (!ndk.$currentUser) {
      userCreatedPackEvents = [];
      return;
    }

    ndk.fetchEvents({
      kinds: [39089], // NDKKind.FollowPack
      authors: [ndk.$currentUser.pubkey]
    }).then(events => {
      userCreatedPackEvents = Array.from(events);
    }).catch(err => {
      console.error('Failed to fetch user packs:', err);
      userCreatedPackEvents = [];
    });
  });

  // Combine and deduplicate all packs (favorites + user created)
  const allPacks = $derived.by(() => {
    const packMap = new Map<string, NDKEvent>();

    // Add user created packs first
    for (const pack of userCreatedPackEvents) {
      packMap.set(pack.id, pack);
    }

    // Add favorite packs (will override if same ID)
    for (const pack of favoritePackEvents) {
      packMap.set(pack.id, pack);
    }

    return Array.from(packMap.values());
  });

  const selectedRelayInfo = $derived.by(() => {
    if (!settings.selectedRelay) return null;
    if (isFollowPackSelection(settings.selectedRelay)) return null;
    return useRelayInfoCached(settings.selectedRelay);
  });

  // Helper to check if selection is a follow pack
  function isFollowPackSelection(value: string | null): boolean {
    return value?.startsWith('followpack:') ?? false;
  }

  // Get selected follow pack event
  const selectedFollowPack = $derived.by(() => {
    if (!settings.selectedRelay || !isFollowPackSelection(settings.selectedRelay)) return null;
    const packId = settings.selectedRelay.replace('followpack:', '');
    return allPacks.find(e => e.id === packId || e.encode() === packId);
  });

  const displayName = $derived.by(() => {
    if (isFollowPackSelection(settings.selectedRelay) && selectedFollowPack) {
      return selectedFollowPack.tagValue('title') || 'Untitled Pack';
    }
    if (settings.selectedRelay && selectedRelayInfo?.info?.name) {
      return selectedRelayInfo.info.name;
    }
    if (settings.selectedRelay) {
      return settings.selectedRelay.replace('wss://', '').replace('ws://', '');
    }
    return 'Following';
  });

  function handleClick() {
    if (active || iconOnly) {
      // On home page or icon-only mode: toggle dropdown
      if (!isOpen && buttonElement && !iconOnly) {
        const rect = buttonElement.getBoundingClientRect();
        dropdownPosition = {
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width
        };
      }
      isOpen = !isOpen;
    } else {
      // Not on home page: navigate to home
      goto('/');
    }
  }

  function selectRelay(url: string) {
    settings.setSelectedRelay(url);
    isOpen = false;
  }

  function selectFollowing() {
    settings.setSelectedRelay(null);
    isOpen = false;
  }

  function selectFollowPack(packId: string) {
    settings.setSelectedRelay(`followpack:${packId}`);
    isOpen = false;
  }

  function handleClickOutside() {
    isOpen = false;
  }
</script>

<div class="relative">
  <!-- Navigation Button -->
  <button
    bind:this={buttonElement}
    onclick={handleClick}
    class="{iconOnly
      ? 'flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted/50 transition-colors'
      : collapsed
        ? 'flex items-center justify-center p-3 rounded-lg transition-colors w-full ' + (active ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-muted/50')
        : 'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full ' + (active ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-muted/50')
    }"
    aria-label={settings.selectedRelay ? 'Change filter' : 'Change following filter'}
    title={collapsed ? displayName : undefined}
  >
    <!-- Icon - changes based on selection -->
    {#if isFollowPackSelection(settings.selectedRelay)}
      <!-- Follow Pack icon -->
      {#if selectedFollowPack?.tagValue('image')}
        <img src={selectedFollowPack.tagValue('image')} alt="" class="{iconOnly ? 'w-5 h-5' : 'w-6 h-6'} rounded flex-shrink-0" />
      {:else}
        <div class="{iconOnly ? 'w-5 h-5' : 'w-6 h-6'} rounded bg-primary flex items-center justify-center flex-shrink-0">
          <svg class="{iconOnly ? 'w-3 h-3' : 'w-4 h-4'} text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
      {/if}
    {:else if settings.selectedRelay}
      <RelayIcon relayUrl={settings.selectedRelay} size={iconOnly ? 'md' : 'lg'} />
    {:else}
      <!-- Users icon for "Following" -->
      <svg class="{iconOnly ? 'w-5 h-5 text-muted-foreground' : 'w-6 h-6'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    {/if}

    {#if !collapsed && !iconOnly}
      <span class="font-medium flex-1 text-left whitespace-nowrap overflow-hidden text-ellipsis">{displayName}</span>

      <!-- Chevron -->
      <svg
        class="w-4 h-4 transition-transform {isOpen ? 'rotate-180' : ''}"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    {/if}
  </button>

  {#snippet dropdownContent()}
      <!-- Currently viewing relay (if not already in the list) -->
      {#if settings.selectedRelay && !isFollowPackSelection(settings.selectedRelay) && !relayFeeds?.isFavorite(settings.selectedRelay) && !isAgoraRelay(settings.selectedRelay)}
        {@const relayInfo = useRelayInfoCached(settings.selectedRelay)}
        <div class="px-2 py-1">
          <button
            onclick={() => {
              isOpen = false;
              goto(`/?relay=${encodeURIComponent(settings.selectedRelay!)}`);
            }}
            class="w-full px-3 py-2.5 rounded-lg bg-muted/50 transition-colors text-left flex items-center gap-3"
          >
            <RelayIcon relayUrl={settings.selectedRelay} size="md" />
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-foreground truncate">
                {relayInfo.info?.name || settings.selectedRelay.replace('wss://', '').replace('ws://', '')}
              </div>
              {#if relayInfo.info?.description}
                <div class="text-xs text-muted-foreground truncate">
                  {relayInfo.info.description}
                </div>
              {/if}
            </div>
            <svg class="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
        <div class="border-t border-border my-1"></div>
      {/if}

      <!-- Following option (only show if user has follows) -->
      {#if shouldShowFollowing}
        <button
          onclick={selectFollowing}
          class="w-full px-4 py-3 hover:bg-muted transition-colors text-left flex items-center gap-3 {!settings.selectedRelay ? 'bg-muted/50' : ''}"
        >
          <svg class="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <div class="flex-1">
            <div class="font-medium text-foreground">Following</div>
            <div class="text-xs text-muted-foreground">All posts from people you follow</div>
          </div>
          {#if !settings.selectedRelay}
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          {/if}
        </button>
      {/if}

      <!-- Follow Packs -->
      {#if allPacks.length > 0}
        {#if shouldShowFollowing}
          <!-- Divider -->
          <div class="border-t border-border my-1"></div>
        {/if}

        <div class="px-2 py-1">
          <div class="text-xs text-muted-foreground px-2 py-1 font-medium">Follow Packs</div>
          {#each allPacks as pack (pack.id)}
            {@const packTitle = pack.tagValue('title') || 'Untitled Pack'}
            {@const packImage = pack.tagValue('image')}
            {@const packDescription = pack.tagValue('description')}
            {@const memberCount = pack.tags.filter(t => t[0] === 'p').length}
            {@const isSelected = isFollowPackSelection(settings.selectedRelay) && selectedFollowPack?.id === pack.id}
            <button
              onclick={() => selectFollowPack(pack.id)}
              class="w-full px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left flex items-center gap-3 {isSelected ? 'bg-muted/50' : ''}"
            >
              {#if packImage}
                <img src={packImage} alt="" class="w-5 h-5 rounded flex-shrink-0" />
              {:else}
                <div class="w-5 h-5 rounded bg-muted flex items-center justify-center flex-shrink-0">
                  <svg class="w-3 h-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              {/if}
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-foreground truncate">
                  {packTitle}
                </div>
                <div class="text-xs text-muted-foreground truncate">
                  {packDescription || `${memberCount} members`}
                </div>
              </div>
              {#if isSelected}
                <svg class="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              {/if}
            </button>
          {/each}
        </div>
      {/if}

      <!-- Favorite Relays (kind 10012) -->
      {#if relayFeeds && relayFeeds.relays.length > 0}
        <div class="border-t border-border my-1"></div>
        <div class="px-2 py-1">
          <div class="text-xs text-muted-foreground px-2 py-1 font-medium flex items-center justify-between">
            <span>Favorite Relays</span>
            <svg class="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          {#each relayFeeds.relays as relayUrl (relayUrl)}
            {@const relayInfo = useRelayInfoCached(relayUrl)}
            <button
              onclick={() => {
                isOpen = false;
                goto(`/?relay=${encodeURIComponent(relayUrl)}`);
              }}
              class="w-full px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left flex items-center gap-3"
            >
              <RelayIcon {relayUrl} size="md" />
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1.5">
                  <div class="text-sm font-medium text-foreground truncate">
                    {relayInfo.info?.name || relayUrl.replace('wss://', '').replace('ws://', '')}
                  </div>
                  <svg class="w-3.5 h-3.5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                {#if relayInfo.info?.description}
                  <div class="text-xs text-muted-foreground truncate">
                    {relayInfo.info.description}
                  </div>
                {/if}
              </div>
            </button>
          {/each}
        </div>
      {/if}

      <!-- Divider -->
      <div class="border-t border-border my-1"></div>

      <!-- Agoras section -->
      <div class="px-2 py-1">
        <div class="text-xs text-muted-foreground px-2 py-1 font-medium">Agoras</div>
        {#each AGORA_RELAYS as relayUrl (relayUrl)}
          {@const relayInfo = useRelayInfoCached(relayUrl)}
          <button
            onclick={() => selectRelay(relayUrl)}
            class="w-full px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left flex items-center gap-3 {settings.selectedRelay === relayUrl ? 'bg-muted/50' : ''}"
          >
            <RelayIcon {relayUrl} size="md" />
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-1.5">
                <div class="text-sm font-medium text-foreground truncate">
                  {relayInfo.info?.name || relayUrl.replace('wss://', '').replace('ws://', '')}
                </div>
                <span class="flex-shrink-0 px-1.5 py-0.5 text-[10px] font-semibold bg-primary/20 text-primary rounded uppercase tracking-wide">
                  Agora
                </span>
              </div>
              {#if relayInfo.info?.description}
                <div class="text-xs text-muted-foreground truncate">
                  {relayInfo.info.description}
                </div>
              {/if}
            </div>
            {#if settings.selectedRelay === relayUrl}
              <svg class="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            {/if}
          </button>
        {/each}
      </div>

      <!-- Other relays section (from kind 10002) -->
      {#if otherRelays.length > 0}
        <div class="border-t border-border my-1"></div>
        <div class="px-2 py-1">
          <div class="text-xs text-muted-foreground px-2 py-1 font-medium">Other relays</div>
          {#each otherRelays as relayUrl (relayUrl)}
            {@const relayInfo = useRelayInfoCached(relayUrl)}
            <button
              onclick={() => selectRelay(relayUrl)}
              class="w-full px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left flex items-center gap-3 {settings.selectedRelay === relayUrl ? 'bg-muted/50' : ''}"
            >
              <RelayIcon {relayUrl} size="md" />
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1.5">
                  <div class="text-sm font-medium text-foreground truncate">
                    {relayInfo.info?.name || relayUrl.replace('wss://', '').replace('ws://', '')}
                  </div>
                </div>
                {#if relayInfo.info?.description}
                  <div class="text-xs text-muted-foreground truncate">
                    {relayInfo.info.description}
                  </div>
                {/if}
              </div>
              {#if settings.selectedRelay === relayUrl}
                <svg class="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              {/if}
            </button>
          {/each}
        </div>
      {/if}

      <!-- Manage relays link -->
      <div class="border-t border-border mt-1">
        <a
          href="/relay-feeds"
          class="block w-full px-4 py-2.5 text-sm text-center text-primary hover:bg-muted transition-colors"
          onclick={() => isOpen = false}
        >
          Browse Interesting Relays
        </a>
      </div>
  {/snippet}

  <!-- Dropdown Menu -->
  {#if isOpen && (active || iconOnly)}
    {#if iconOnly}
      <div
        use:clickOutside={handleClickOutside}
        class="absolute left-0 mt-1 w-64 bg-popover border border-border rounded-lg shadow-xl z-50 overflow-hidden"
      >
        {@render dropdownContent()}
      </div>
    {:else}
      <div
        use:portal
        use:clickOutside={handleClickOutside}
        style="position: fixed; top: {dropdownPosition.top}px; left: {dropdownPosition.left}px; min-width: {dropdownPosition.width}px;"
        class="w-80 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden"
      >
        {@render dropdownContent()}
      </div>
    {/if}
  {/if}
</div>
