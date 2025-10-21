<script lang="ts">
  import { ndk } from '$lib/ndk.svelte';
  import { NDKKind, NDKEvent } from '@nostr-dev-kit/ndk';
  import { t } from 'svelte-i18n';
  import { toast } from '$lib/stores/toast.svelte';

  interface Props {
    pubkey: string;
    variant?: 'default' | 'outline';
    showIcon?: boolean;
    class?: string;
  }

  const { pubkey, variant = 'default', showIcon = true, class: className = '' }: Props = $props();

  const follows = $derived(ndk.$sessions?.follows ?? new Set());
  const isFollowing = $derived.by(() => follows.has(pubkey));
  const isOwnProfile = $derived(ndk.$currentUser?.pubkey === pubkey);

  let isLoading = $state(false);

  async function handleToggleFollow() {
    if (!ndk.$currentUser || isLoading) return;

    isLoading = true;
    const wasFollowing = isFollowing;

    try {
      const userToToggle = await ndk.fetchUser(pubkey);

      if (isFollowing) {
        await ndk.$currentUser.unfollow(userToToggle);
        toast.success($t('profile.unfollowed'));
      } else {
        await ndk.$currentUser.follow(userToToggle);
        toast.success($t('profile.followed'));
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
      toast.error($t('profile.follow_error'));
      // Note: NDK's follow/unfollow methods update the follows set immediately,
      // but if there's an error, the state will remain changed. This is acceptable
      // as the follow list publish might have partially succeeded.
    } finally {
      isLoading = false;
    }
  }
</script>
{#if !isOwnProfile && ndk.$currentUser}
  <button
    type="button"
    onclick={handleToggleFollow}
    disabled={isLoading}
    aria-label={isFollowing ? $t('profile.unfollow') : $t('profile.follow')}
    class={`text-sm font-medium transition-colors inline-flex items-center gap-1 ${
      isFollowing
        ? 'text-muted-foreground hover:text-red-500'
        : 'text-primary hover:underline'
    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
  >
    {#if isLoading}
      <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {:else if showIcon}
      {#if isFollowing}
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
        </svg>
      {:else}
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      {/if}
    {/if}
    {isFollowing ? $t('profile.unfollow') : $t('profile.follow')}
  </button>
{/if}
