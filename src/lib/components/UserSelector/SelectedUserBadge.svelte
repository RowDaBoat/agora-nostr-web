<script lang="ts">
  import { ndk } from '$lib/ndk.svelte';
  import Avatar from '$lib/components/ndk/avatar.svelte';
  import type { NDKUserProfile } from '@nostr-dev-kit/ndk';

  interface Props {
    pubkey: string;
    onRemove: (pubkey: string) => void;
  }

  let { pubkey, onRemove }: Props = $props();

  let profile = $state<NDKUserProfile | null>(null);
  $effect(() => {
    ndk.fetchUser(pubkey).then(u => {
      u?.fetchProfile().then(p => { profile = p; });
    });
  });

  const displayName = $derived(profile?.displayName || profile?.name || `${pubkey.slice(0, 8)}...`);
</script>

<button
  type="button"
  onclick={() => onRemove(pubkey)}
  class="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 hover:bg-primary/30 text-foreground rounded-full text-xs transition-colors"
>
  <Avatar {ndk} {pubkey} size={14} class="flex-shrink-0" />
  <span class="max-w-[100px] truncate">
    {displayName}
  </span>
  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>
