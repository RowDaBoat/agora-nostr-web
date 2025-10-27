<script lang="ts">
  import { ndk } from '$lib/ndk.svelte';
  import Avatar from '$lib/components/ndk/avatar.svelte';
  import type { NDKUserProfile } from '@nostr-dev-kit/ndk';

  interface Props {
    pubkey: string;
    isSelected: boolean;
    onToggle: (pubkey: string) => void;
  }

  let { pubkey, isSelected, onToggle }: Props = $props();

  let profile = $state<NDKUserProfile | null>(null);
  $effect(() => {
    ndk.fetchUser(pubkey).then(u => {
      u?.fetchProfile().then(p => { profile = p; });
    });
  });
</script>

<button
  onclick={() => onToggle(pubkey)}
  class={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
    isSelected
      ? 'bg-primary/20 border border-primary/50'
      : 'bg-card border border-border hover:border-border'
  }`}
>
  <Avatar {ndk} {pubkey} class="w-10 h-10 flex-shrink-0" />
  <div class="flex-1 min-w-0 text-left">
    <div class="font-medium text-foreground truncate">
      {profile?.displayName || profile?.name || `${pubkey.slice(0, 8)}...`}
    </div>
    <div class="text-xs text-muted-foreground truncate">
      {profile?.nip05 || `${pubkey.slice(0, 16)}...`}
    </div>
  </div>
  <div class={`w-5 h-5 rounded border-2 flex items-center justify-center ${
    isSelected
      ? 'bg-primary border-primary'
      : 'border'
  }`}>
    {#if isSelected}
      <svg class="w-3 h-3 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
      </svg>
    {/if}
  </div>
</button>
