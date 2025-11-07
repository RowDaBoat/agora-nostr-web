<script lang="ts">
  import { ndk } from '$lib/ndk.svelte';
  import { navigateToProfile } from '$lib/utils/navigation';
  import { User } from '$lib/ndk/ui/user';

  interface Props {
    pubkeys: string[];
    maxVisible?: number;
  }

  const { pubkeys, maxVisible = 2 }: Props = $props();

  const visiblePubkeys = $derived(pubkeys.slice(0, maxVisible));
  const othersCount = $derived(Math.max(0, pubkeys.length - maxVisible));

  function handleProfileClick(pubkey: string, e: MouseEvent) {
    e.stopPropagation();
    navigateToProfile(pubkey);
  }
</script>

<span class="inline-flex items-center gap-1 flex-wrap">
  {#each visiblePubkeys as pubkey, i}
    <button
      type="button"
      onclick={(e) => handleProfileClick(pubkey, e)}
      class="font-semibold hover:underline text-foreground"
    >
      <User.Root {ndk} {pubkey}><User.Name /></User.Root>{#if i < visiblePubkeys.length - 1 || othersCount > 0},{/if}
    </button>
  {/each}
  {#if othersCount > 0}
    <span class="text-muted-foreground">
      and {othersCount} {othersCount === 1 ? 'other' : 'others'}
    </span>
  {/if}
</span>
