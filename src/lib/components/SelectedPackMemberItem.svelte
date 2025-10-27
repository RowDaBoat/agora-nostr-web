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
</script>

<div class="flex items-center gap-3 p-2 rounded-lg bg-card/50">
  <Avatar {ndk} {pubkey} class="w-8 h-8 flex-shrink-0" />
  <div class="flex-1 min-w-0">
    <div class="text-sm font-medium text-foreground truncate">
      {profile?.displayName || profile?.name || `${pubkey.slice(0, 8)}...`}
    </div>
    <div class="text-xs text-muted-foreground truncate">
      {profile?.nip05 || `${pubkey.slice(0, 16)}...`}
    </div>
  </div>
  <button
    onclick={() => onRemove(pubkey)}
    class="p-1 text-muted-foreground hover:text-red-500 transition-colors"
    aria-label="Remove member"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>
