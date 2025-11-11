<script lang="ts">
  import { ndk } from '$lib/ndk.svelte';
  import { goto } from '$app/navigation';
  import { User } from '$lib/ndk/ui/user';
  import { getPackUrl } from '$lib/utils/packUrl';
  import { getProfileUrl } from '$lib/utils/navigation';
  import type { NDKFollowPack } from '@nostr-dev-kit/ndk';

  interface Props {
    pack: NDKFollowPack;
    variant?: 'default' | 'compact';
  }

  const { pack, variant = 'default' }: Props = $props();

  const packUrl = $derived(getPackUrl(pack));
  const packTitle = $derived(pack.tagValue('title') || 'Untitled Pack');
  const packDescription = $derived(pack.tagValue('description'));
  const packImage = $derived(pack.tagValue('image'));
  const packPubkeys = $derived(pack.tags.filter(t => t[0] === 'p').map(t => t[1]));

  function handlePackClick() {
    goto(packUrl);
  }

</script>

<div
  role="button"
  tabindex="0"
  onclick={handlePackClick}
  onkeydown={(e) => e.key === 'Enter' && handlePackClick()}
  class="block bg-card border border-border rounded-xl overflow-hidden hover:border-border transition-colors group cursor-pointer"
>
  {#if packImage}
    <div class="h-32 w-full">
      <img
        src={packImage}
        alt={packTitle}
        class="w-full h-full object-cover"
      />
    </div>
  {/if}

  <div class="p-5">
    <div class="mb-4">
      <h3 class="font-semibold text-foreground group-hover:text-primary transition-colors">
        {packTitle}
      </h3>
      <p class="text-sm text-muted-foreground mt-1">
        {packPubkeys.length} members
      </p>
    </div>

    {#if packDescription}
      <p class="text-sm text-muted-foreground mb-4 line-clamp-2">
        {packDescription}
      </p>
    {/if}

    <div class="flex -space-x-2">
      {#each packPubkeys.slice(0, 4) as pubkey, index (pubkey)}
        <button
          type="button"
          onclick={(e) => { e.stopPropagation(); goto(getProfileUrl(pubkey)); }}
          class="relative cursor-pointer"
          style="z-index: {4 - index}"
        >
          <User.Root {ndk} {pubkey}>
            <User.Avatar class="w-8 h-8 rounded-full ring-2 ring-neutral-900 hover:opacity-80 transition-opacity" />
          </User.Root>
        </button>
      {/each}
      {#if packPubkeys.length > 4}
        <div class="w-8 h-8 rounded-full bg-muted ring-2 ring-neutral-900 flex items-center justify-center">
          <span class="text-xs text-muted-foreground">
            +{packPubkeys.length - 4}
          </span>
        </div>
      {/if}
    </div>
  </div>
</div>
