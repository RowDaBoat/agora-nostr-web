<script lang="ts">
  import { ndk } from '$lib/ndk.svelte';
  import { portal } from '$lib/utils/portal.svelte';
  import { nip19 } from 'nostr-tools';
  import MentionPickerItem from './MentionPickerItem.svelte';

  interface Props {
    position: { top: number; left: number };
    searchQuery: string;
    onSelect: (nprofile: string) => void;
    onClose: () => void;
  }

  let { position, searchQuery, onSelect, onClose }: Props = $props();

  let selectedIndex = $state(0);

  // Fetch current user's follows
  const contactListSubscription = ndk.$subscribe(
    () => ndk.$currentUser?.pubkey ? ({
      filters: [{ kinds: [3], authors: [ndk.$currentUser.pubkey], limit: 1 }],
      bufferMs: 100,
    }) : undefined
  );

  const userFollows = $derived.by(() => {
    const contactList = contactListSubscription.events[0];
    if (!contactList) return new Set<string>();
    return new Set(contactList.tags.filter(tag => tag[0] === 'p').map(tag => tag[1]));
  });

  let cachedFilteredProfiles = $state<Map<string, { name?: string; displayName?: string; nip05?: string }>>(new Map());

  const filteredFollows = $derived.by(() => {
    if (!searchQuery) return Array.from(userFollows).slice(0, 10);

    const filtered = Array.from(cachedFilteredProfiles.entries())
      .filter(([pubkey]) => userFollows.has(pubkey))
      .map(([pubkey]) => pubkey);

    return filtered.slice(0, 10);
  });

  // Update cached profiles when search query changes
  $effect(() => {
    if (!searchQuery.trim() || !ndk.cacheAdapter?.getProfiles) {
      cachedFilteredProfiles = new Map();
      return;
    }

    const search = searchQuery.toLowerCase();

    ndk.cacheAdapter.getProfiles({
      fields: ['name', 'displayName', 'nip05'],
      contains: search
    }).then((profiles) => {
      cachedFilteredProfiles = profiles ?? new Map();
    }).catch(err => {
      console.error('Failed to search profiles:', err);
      cachedFilteredProfiles = new Map();
    });
  });

  // Reset selected index when filtered list changes
  $effect(() => {
    if (selectedIndex >= filteredFollows.length) {
      selectedIndex = Math.max(0, filteredFollows.length - 1);
    }
  });

  function handleSelect(pubkey: string) {
    // Get relays for this user
    const user = ndk.getUser({ pubkey });
    const relays = Array.from(user.relayUrls || []);

    // Create nprofile with relays
    const nprofile = nip19.nprofileEncode({
      pubkey,
      relays: relays.slice(0, 3) // Include up to 3 relays
    });

    onSelect(`nostr:${nprofile}`);
  }

  function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        selectedIndex = (selectedIndex + 1) % filteredFollows.length;
        break;
      case 'ArrowUp':
        event.preventDefault();
        selectedIndex = selectedIndex === 0 ? filteredFollows.length - 1 : selectedIndex - 1;
        break;
      case 'Enter':
        event.preventDefault();
        if (filteredFollows.length > 0) {
          handleSelect(filteredFollows[selectedIndex]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        onClose();
        break;
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if filteredFollows.length > 0}
  <div
    use:portal
    style="position: fixed; top: {position.top}px; left: {position.left}px; max-width: 320px;"
    class="bg-card border border-border rounded-lg shadow-xl z-[1003] overflow-hidden"
  >
    <div class="max-h-[300px] overflow-y-auto">
      {#each filteredFollows as pubkey, index (pubkey)}
        <MentionPickerItem
          {pubkey}
          isSelected={index === selectedIndex}
          onSelect={handleSelect}
          onMouseEnter={() => selectedIndex = index}
        />
      {/each}
    </div>
  </div>
{/if}
