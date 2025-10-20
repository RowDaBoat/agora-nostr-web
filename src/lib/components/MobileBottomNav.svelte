<script lang="ts">
  import { page } from '$app/stores';
  import { ndk } from '$lib/ndk.svelte';
  import { loginModal } from '$lib/stores/loginModal.svelte';
  import { settings } from '$lib/stores/settings.svelte';
  import { useRelayInfoCached } from '$lib/utils/relayInfo.svelte';
  import { isAgorasSelection } from '$lib/utils/relayUtils';
  import { messagesStore } from '$lib/stores/messages.svelte';

  const currentUser = ndk.$currentUser;
  const currentPath = $derived($page.url.pathname);

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const selectedRelayInfo = $derived.by(() => {
    if (!settings.selectedRelay || isAgorasSelection(settings.selectedRelay)) return null;
    return useRelayInfoCached(settings.selectedRelay);
  });

  function handleProfileClick() {
    if (currentUser) {
      window.location.href = `/p/${currentUser.npub}`;
    } else {
      loginModal.open('signup');
    }
  }
</script>

<nav class="block lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border z-[1000]">
  <div class="flex justify-around items-center px-2 py-3 safe-bottom">
    <!-- Home / Relay Icon -->
    <a
      href="/"
      class="flex items-center justify-center p-3 rounded-lg transition-colors {isActive('/') ? 'text-primary' : 'text-muted-foreground'}"
      aria-label="Home"
    >
      {#if isAgorasSelection(settings.selectedRelay)}
        <!-- Agora icon shape only -->
        <svg class="w-6 h-6" viewBox="0 0 80 80" fill="currentColor">
          <polygon points="8,10 20,13 60,13 72,10"/>
          <polygon points="21,15 22,16 58,16 59,15"/>
          <g>
            <rect x="21" y="20" width="3" height="45"/>
            <rect x="27" y="20" width="3" height="45"/>
            <polygon points="19,18 19,20 33,20 33,18 27,16 25,16"/>
            <rect x="19" y="65" width="14" height="2"/>
          </g>
          <g>
            <rect x="38.5" y="20" width="3" height="45"/>
            <rect x="44.5" y="20" width="3" height="45"/>
            <polygon points="36.5,18 36.5,20 50.5,20 50.5,18 44.5,16 42.5,16"/>
            <rect x="36.5" y="65" width="14" height="2"/>
          </g>
          <g>
            <rect x="56" y="20" width="3" height="45"/>
            <rect x="62" y="20" width="3" height="45"/>
            <polygon points="54,18 54,20 68,20 68,18 62,16 60,16"/>
            <rect x="54" y="65" width="14" height="2"/>
          </g>
        </svg>
      {:else if settings.selectedRelay && selectedRelayInfo?.info?.icon}
        <!-- Relay icon -->
        <img src={selectedRelayInfo.info.icon} alt="" class="w-6 h-6 rounded" />
      {:else if settings.selectedRelay}
        <!-- Fallback relay icon -->
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      {:else}
        <!-- Following - people icon -->
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      {/if}
    </a>

    <!-- Notifications -->
    <a
      href="/notifications"
      class="flex items-center justify-center p-3 rounded-lg transition-colors {isActive('/notifications') ? 'text-primary' : 'text-muted-foreground'}"
      aria-label="Notifications"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    </a>

    <!-- Messages -->
    <a
      href="/messages"
      class="flex items-center justify-center p-3 rounded-lg transition-colors {isActive('/messages') ? 'text-primary' : 'text-muted-foreground'} relative"
      aria-label="Messages"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      {#if messagesStore.totalUnreadCount > 0}
        <div class="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary flex items-center justify-center">
          <span class="text-[10px] font-bold text-primary-foreground">
            {messagesStore.totalUnreadCount > 9 ? '9+' : messagesStore.totalUnreadCount}
          </span>
        </div>
      {/if}
    </a>

    <!-- Wallet -->
    <a
      href="/wallet"
      class="flex items-center justify-center p-3 rounded-lg transition-colors {isActive('/wallet') ? 'text-primary' : 'text-muted-foreground'}"
      aria-label="Wallet"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
      </svg>
    </a>

    <!-- Profile -->
    <button
      onclick={handleProfileClick}
      class="flex items-center justify-center p-3 rounded-lg transition-colors {currentPath.startsWith('/p/') ? 'text-primary' : 'text-muted-foreground'}"
      aria-label="Profile"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </button>
  </div>
</nav>

<style>
  /* Support for iPhone notch/safe area */
  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
