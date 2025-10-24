<script lang="ts">
  import { ndk } from '$lib/ndk.svelte';
  import { navigateToProfile } from '$lib/utils/navigation';
  import type { NDKUserProfile } from '@nostr-dev-kit/ndk';

  interface Props {
    pubkeys: string[];
    maxVisible?: number;
  }

  const { pubkeys, maxVisible = 2 }: Props = $props();

  let profilesMap = $state<Map<string, NDKUserProfile | null>>(new Map());

  $effect(() => {
    profilesMap.clear();
    const visiblePubkeys = pubkeys.slice(0, maxVisible);
    visiblePubkeys.forEach(pubkey => {
      ndk.fetchUser(pubkey).then(u => {
        u?.fetchProfile().then(p => {
          profilesMap.set(pubkey, p || null);
          profilesMap = new Map(profilesMap);
        });
      });
    });
  });

  const profiles = $derived(
    pubkeys.slice(0, maxVisible).map((pubkey) => ({
      pubkey,
      profile: profilesMap.get(pubkey),
    }))
  );

  const displayNames = $derived(
    profiles.map((p) => p.profile?.name || p.profile?.displayName || 'Anonymous')
  );

  const othersCount = $derived(Math.max(0, pubkeys.length - maxVisible));

  function handleProfileClick(pubkey: string, e: MouseEvent) {
    e.stopPropagation();
    navigateToProfile(pubkey);
  }
</script>

<span class="inline-flex items-center gap-1 flex-wrap">
  {#each profiles as { pubkey }, i}
    <button
      type="button"
      onclick={(e) => handleProfileClick(pubkey, e)}
      class="font-semibold hover:underline text-foreground"
    >
      {displayNames[i]}{#if i < profiles.length - 1 || othersCount > 0},{/if}
    </button>
  {/each}
  {#if othersCount > 0}
    <span class="text-muted-foreground">
      and {othersCount} {othersCount === 1 ? 'other' : 'others'}
    </span>
  {/if}
</span>
