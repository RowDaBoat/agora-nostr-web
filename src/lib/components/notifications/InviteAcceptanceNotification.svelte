<script lang="ts">
  import type { NDKEvent } from '@nostr-dev-kit/ndk';
  import { Avatar } from '@nostr-dev-kit/svelte';
  import { ndk } from '$lib/ndk.svelte';
  import { navigateToProfile } from '$lib/utils/navigation';
  import TimeAgo from '../TimeAgo.svelte';
  import FollowButton from '../FollowButton.svelte';

  interface Props {
    event: NDKEvent;
  }

  const { event }: Props = $props();

  const profile = ndk.$fetchProfile(() => event.pubkey);

  // Fallback display name: use profile name or show short hex if no profile
  const displayName = $derived.by(() => {
    if (profile?.name || profile?.displayName) {
      return profile.name || profile.displayName;
    }
    // Show first 8 characters of pubkey as fallback
    return event.pubkey.slice(0, 8) + '...';
  });

  // Check if we're following this person
  const follows = $derived(ndk.$sessions?.follows ?? new Set());
  const isFollowing = $derived.by(() => follows.has(event.pubkey));

  function handleProfileClick() {
    navigateToProfile(event.pubkey);
  }
</script>

<div class="flex gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border">
  <button type="button" onclick={handleProfileClick} class="flex-shrink-0">
    <Avatar {ndk} pubkey={event.pubkey} class="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity" />
  </button>

  <div class="flex-1 min-w-0">
    <div class="flex items-center gap-2 mb-1 flex-wrap">
      <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span class="text-sm text-muted-foreground">
        <button type="button" onclick={handleProfileClick} class="font-semibold hover:underline text-foreground">
          {displayName}
        </button>
        accepted your invite 🎉
      </span>
      {#if event.created_at}
        <TimeAgo timestamp={event.created_at} class="text-sm text-muted-foreground ml-auto" />
      {/if}
    </div>

    {#if profile?.about}
      <p class="text-sm text-muted-foreground mt-1 line-clamp-2">
        {profile.about}
      </p>
    {/if}

    <!-- Show Follow button if we're not following this person -->
    {#if !isFollowing}
      <div class="mt-2">
        <FollowButton pubkey={event.pubkey} variant="outline" />
      </div>
    {/if}
  </div>
</div>
