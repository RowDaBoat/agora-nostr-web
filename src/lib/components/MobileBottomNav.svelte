<script lang="ts">
  import { page } from '$app/stores';
  import { ndk } from '$lib/ndk.svelte';
  import { Avatar } from '@nostr-dev-kit/svelte';
  import { loginModal } from '$lib/stores/loginModal.svelte';
  import { settings } from '$lib/stores/settings.svelte';
  import { useRelayInfoCached } from '$lib/utils/relayInfo.svelte';
  import { messagesStore } from '$lib/stores/messages.svelte';
  import { goto } from '$app/navigation';
  import { t } from 'svelte-i18n';
  import type { NDKUserProfile } from '@nostr-dev-kit/ndk';

  const currentPath = $derived($page.url.pathname);

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const selectedRelayInfo = $derived.by(() => {
    if (!settings.selectedRelay) return null;
    return useRelayInfoCached(settings.selectedRelay);
  });

  let showDropdown = $state(false);
  let dropdownRef: HTMLDivElement | undefined = $state();
  let buttonRef: HTMLButtonElement | undefined = $state();

  let profile = $state<NDKUserProfile | null>(null);

  $effect(() => {
    const pubkey = ndk.$currentUser?.pubkey;
    if (!pubkey) {
      profile = null;
      return;
    }
    ndk.fetchUser(pubkey).then(u => {
      u?.fetchProfile().then(p => { profile = p; });
    });
  });

  const displayName = $derived(profile?.displayName || profile?.name || 'Anonymous');
  const npub = $derived(ndk.$currentUser?.npub);

  function handleProfileClick() {
    if (ndk.$currentUser) {
      showDropdown = !showDropdown;
    } else {
      loginModal.open('signup');
    }
  }

  function closeDropdown() {
    showDropdown = false;
  }

  function handleLogout() {
    ndk.$sessions.logout();
    closeDropdown();
  }

  function navigateToProfile() {
    if (npub) {
      goto(`/p/${npub}`);
      closeDropdown();
    }
  }

  function navigateToSettings() {
    goto('/settings');
    closeDropdown();
  }

  function toggleTheme() {
    const currentTheme = settings.theme;
    if (currentTheme === 'light') {
      settings.setTheme('dark');
    } else if (currentTheme === 'dark') {
      settings.setTheme('system');
    } else {
      settings.setTheme('light');
    }
  }

  $effect(() => {
    if (!showDropdown) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef && !dropdownRef.contains(event.target as Node) &&
          buttonRef && !buttonRef.contains(event.target as Node)) {
        showDropdown = false;
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });
</script>

<nav class="block lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border z-[1000]">
  <div class="flex justify-around items-center px-2 py-3 safe-bottom">
    <!-- Home / Relay Icon -->
    <a
      href="/"
      class="flex items-center justify-center p-3 rounded-lg transition-colors {isActive('/') ? 'text-primary' : 'text-muted-foreground'}"
      aria-label="Home"
    >
      {#if settings.selectedRelay && selectedRelayInfo?.info?.icon}
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

    <!-- Profile / User Menu -->
    <button
      bind:this={buttonRef}
      onclick={handleProfileClick}
      class="flex items-center justify-center p-2 rounded-lg transition-colors"
      aria-label="Profile"
    >
      {#if ndk.$currentUser}
        <Avatar {ndk} pubkey={ndk.$currentUser.pubkey} class="w-8 h-8 rounded-full" />
      {:else}
        <svg class="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      {/if}
    </button>
  </div>
</nav>

<!-- Dropdown Menu (Same as Desktop UserMenu) -->
{#if showDropdown && buttonRef && ndk.$currentUser}
  {#key showDropdown}
    <svelte:element this={'div'} style="display: contents">
      <div
        bind:this={dropdownRef}
        class="w-56 bg-popover border border-border rounded-lg shadow-xl overflow-hidden"
        style="position: fixed; bottom: {window.innerHeight - buttonRef.getBoundingClientRect().top + 8}px; left: {buttonRef.getBoundingClientRect().left - 224 + buttonRef.getBoundingClientRect().width}px; z-index: 9999;"
      >
        <!-- Profile Link -->
        <button
          onclick={navigateToProfile}
          class="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
        >
          <Avatar {ndk} pubkey={ndk.$currentUser.pubkey} class="w-12 h-12" />
          <div class="flex-1 min-w-0">
            <p class="font-medium text-sm truncate text-popover-foreground">
              {displayName}
            </p>
            <p class="text-xs text-muted-foreground">{$t('profile.editProfile')}</p>
          </div>
        </button>

        <div class="h-px bg-border"></div>

        <!-- Theme Toggle -->
        <button
          onclick={toggleTheme}
          class="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left text-popover-foreground"
        >
          {#if settings.theme === 'light'}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>{$t('settings.sections.appearance.themes.light')}</span>
          {:else if settings.theme === 'dark'}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <span>{$t('settings.sections.appearance.themes.dark')}</span>
          {:else}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{$t('settings.sections.appearance.themes.system')}</span>
          {/if}
        </button>

        <!-- Settings Link -->
        <button
          onclick={navigateToSettings}
          class="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left text-popover-foreground"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{$t('navigation.settings')}</span>
        </button>

        <div class="h-px bg-border"></div>

        <!-- Logout Button -->
        <button
          onclick={handleLogout}
          class="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left text-destructive hover:text-destructive/90"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>{$t('navigation.logout')}</span>
        </button>
      </div>
    </svelte:element>
  {/key}
{/if}

<style>
  /* Support for iPhone notch/safe area */
  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
