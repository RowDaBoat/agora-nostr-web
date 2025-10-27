<!--
  @component Avatar - User avatar display with fallback

  This is a wrapper around UserProfile.Avatar for backwards compatibility
-->
<script lang="ts">
  import type { NDKUser } from '@nostr-dev-kit/ndk';
  import type { NDKSvelte } from '@nostr-dev-kit/svelte';
  import { UserProfile } from './user-profile';

  interface Props {
    user?: NDKUser;
    ndk?: NDKSvelte;
    pubkey?: string;
    size?: number;
    class?: string;
    alt?: string;
    fallback?: string;
  }

  let {
    user,
    ndk,
    pubkey,
    size = 48,
    class: className = '',
    alt,
    fallback,
  }: Props = $props();

  // Resolve pubkey from user if provided
  const resolvedPubkey = $derived(pubkey || user?.pubkey);
</script>

{#if ndk && resolvedPubkey}
  <UserProfile.Root {ndk} pubkey={resolvedPubkey}>
    <UserProfile.Avatar {size} class={className} />
  </UserProfile.Root>
{:else if fallback}
  <img
    src={fallback}
    alt={alt || 'Avatar'}
    class="avatar {className}"
    style="width: {size}px; height: {size}px; border-radius: 50%; object-fit: cover;"
  />
{:else}
  <div
    class="avatar avatar-fallback {className}"
    style="width: {size}px; height: {size}px;"
  >
    ?
  </div>
{/if}

<style>
  .avatar-fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
    border-radius: 50%;
  }
</style>
