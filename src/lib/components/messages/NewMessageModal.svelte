<script lang="ts">
  import { goto } from '$app/navigation';
  import { ndk } from '$lib/ndk.svelte';
  import type { NDKUser } from '@nostr-dev-kit/ndk';
  import { MediaQuery } from 'svelte/reactivity';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Drawer from '$lib/components/ui/drawer';
  import UserSelectableItem from '$lib/components/UserSelectableItem.svelte';

  interface Props {
    isOpen: boolean;
    onClose: () => void;
  }

  const { isOpen, onClose }: Props = $props();
  const isDesktop = new MediaQuery('(min-width: 768px)');

  let searchQuery = $state('');
  let searching = $state(false);
  let searchResults = $state<NDKUser[]>([]);
  let selectedUser = $state<NDKUser | null>(null);

  async function handleSearch() {
    if (!searchQuery.trim()) {
      searchResults = [];
      return;
    }

    searching = true;

    try {
      // Try to parse as npub/nprofile first
      if (searchQuery.startsWith('npub') || searchQuery.startsWith('nprofile')) {
        try {
          const user = await ndk.fetchUser(searchQuery.trim());
          if (user) {
            searchResults = [user];
          } else {
            searchResults = [];
          }
        } catch (error) {
          console.error('Invalid npub:', error);
          searchResults = [];
        }
      }
      // Search by name using NDK's fetchUser
      else {
        try {
          const user = await ndk.fetchUser(searchQuery.trim());
          if (user) {
            searchResults = [user];
          } else {
            searchResults = [];
          }
        } catch (error) {
          console.error('Search error:', error);
          searchResults = [];
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      searchResults = [];
    } finally {
      searching = false;
    }
  }

  function handleUserSelect(user: NDKUser) {
    selectedUser = user;
    goto(`/messages/${user.npub}`);
    onClose();
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !searching) {
      handleSearch();
    }
  }

  // Auto-search as user types (debounced)
  let searchTimeout: ReturnType<typeof setTimeout> | null = null;
  $effect(() => {
    if (searchQuery.trim()) {
      if (searchTimeout) clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        handleSearch();
      }, 500);
    } else {
      searchResults = [];
    }

    return () => {
      if (searchTimeout) clearTimeout(searchTimeout);
    };
  });

  // Focus search input when modal opens
  let searchInput: HTMLInputElement | null = $state(null);
  $effect(() => {
    if (isOpen && searchInput) {
      setTimeout(() => searchInput?.focus(), 100);
    }
  });
</script>

{#if isDesktop.current}
  <Dialog.Root open={isOpen} onOpenChange={(newOpen) => { if (!newOpen) onClose(); }}>
    <Dialog.Content class="max-w-md" onkeydown={handleKeyDown}>
      <Dialog.Header>
        <Dialog.Title>New Message</Dialog.Title>
      </Dialog.Header>

      <!-- Search -->
      <div class="mb-4">
        <div class="relative">
          <input
            bind:this={searchInput}
            bind:value={searchQuery}
            type="text"
            placeholder="Search by name or paste npub..."
            class="w-full px-4 py-3 pl-12 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <svg
            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Results -->
      <div class="max-h-96 overflow-y-auto">
        {#if searching}
          <div class="flex items-center justify-center py-12">
            <svg class="w-8 h-8 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        {:else if searchQuery.trim() && searchResults.length === 0}
          <div class="flex flex-col items-center justify-center py-12 px-6 text-center">
            <svg class="w-16 h-16 text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p class="text-muted-foreground">No users found</p>
            <p class="text-sm text-muted-foreground/60 mt-1">Try a different search term</p>
          </div>
        {:else if searchResults.length > 0}
          <div class="divide-y divide-border">
            {#each searchResults as user (user.pubkey)}
              <UserSelectableItem
                {user}
                onClick={handleUserSelect}
                showArrow={true}
                size="lg"
              />
            {/each}
          </div>
        {:else}
          <div class="flex flex-col items-center justify-center py-12 px-6 text-center">
            <svg class="w-16 h-16 text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p class="text-muted-foreground">Search for someone to message</p>
            <p class="text-sm text-muted-foreground/60 mt-1">Enter a name or paste an npub</p>
          </div>
        {/if}
      </div>
    </Dialog.Content>
  </Dialog.Root>
{:else}
  <Drawer.Root open={isOpen} onOpenChange={(newOpen) => { if (!newOpen) onClose(); }}>
    <Drawer.Content onkeydown={handleKeyDown}>
      <Drawer.Header class="text-left">
        <Drawer.Title>New Message</Drawer.Title>
      </Drawer.Header>

      <!-- Search -->
      <div class="px-4 mb-4">
        <div class="relative">
          <input
            bind:this={searchInput}
            bind:value={searchQuery}
            type="text"
            placeholder="Search by name or paste npub..."
            class="w-full px-4 py-3 pl-12 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <svg
            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Results -->
      <div class="overflow-y-auto pb-4">
        {#if searching}
          <div class="flex items-center justify-center py-12">
            <svg class="w-8 h-8 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        {:else if searchQuery.trim() && searchResults.length === 0}
          <div class="flex flex-col items-center justify-center py-12 px-6 text-center">
            <svg class="w-16 h-16 text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p class="text-muted-foreground">No users found</p>
            <p class="text-sm text-muted-foreground/60 mt-1">Try a different search term</p>
          </div>
        {:else if searchResults.length > 0}
          <div class="divide-y divide-border">
            {#each searchResults as user (user.pubkey)}
              <UserSelectableItem
                {user}
                onClick={handleUserSelect}
                showArrow={true}
                size="lg"
              />
            {/each}
          </div>
        {:else}
          <div class="flex flex-col items-center justify-center py-12 px-6 text-center">
            <svg class="w-16 h-16 text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p class="text-muted-foreground">Search for someone to message</p>
            <p class="text-sm text-muted-foreground/60 mt-1">Enter a name or paste an npub</p>
          </div>
        {/if}
      </div>
    </Drawer.Content>
  </Drawer.Root>
{/if}
