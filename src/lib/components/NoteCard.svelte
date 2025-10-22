<script lang="ts">
  import type { NDKEvent } from '@nostr-dev-kit/ndk';
  import { ndk } from '$lib/ndk.svelte';
  import { Avatar, EventContent } from '@nostr-dev-kit/svelte';
  import ReplyIndicator from './ReplyIndicator.svelte';
  import UserHoverCard from './UserHoverCard.svelte';
  import TimeAgo from './TimeAgo.svelte';
  import EventActions from './EventActions.svelte';
  import EventOptionsMenu from './EventOptionsMenu.svelte';

  interface Props {
    event: NDKEvent;
    showActions?: boolean;
    variant?: 'default' | 'thread-parent' | 'thread-main' | 'thread-reply';
    showThreadLine?: boolean;
    onNavigate?: () => void;
  }

  const {
    event,
    showActions = true,
    variant = 'default',
    showThreadLine = false,
    onNavigate
  }: Props = $props();

  const profile = ndk.$fetchProfile(() => event.pubkey);
  const npub = $derived(event.author.npub);

  let showUserHoverCard = $state(false);
  let hoverCardPosition = $state({ x: 0, y: 0 });
  let hoverTimer: ReturnType<typeof setTimeout> | null = null;
  let avatarElement = $state<HTMLButtonElement | null>(null);

  function navigateToProfile() {
    window.location.href = `/p/${npub}`;
  }

  function navigateToEvent() {
    if (onNavigate) {
      onNavigate();
      return;
    }
    // Encode the event as a nevent
    const neventId = event.encode();
    window.location.href = `/e/${neventId}`;
  }

  const avatarSize = $derived(
    variant === 'thread-main' ? 'w-14 h-14' :
    variant === 'thread-reply' ? 'w-10 h-10' :
    'w-9 h-9 sm:w-12 sm:h-12'
  );

  const textSize = $derived(
    variant === 'thread-main' ? 'text-lg leading-relaxed' : 'text-base'
  );

  const nameSize = $derived(
    variant === 'thread-main' ? 'text-lg font-bold' : 'text-base font-semibold'
  );

  const bgClass = $derived(
    variant === 'thread-main' ? 'bg-card/50' :
    variant === 'default' ? 'hover:bg-card/30' :
    'hover:bg-card/30'
  );

  const clickable = $derived(variant === 'default' || (onNavigate !== undefined));

  function handleAvatarMouseEnter(e: MouseEvent) {
    if (hoverTimer) clearTimeout(hoverTimer);

    hoverTimer = setTimeout(() => {
      if (avatarElement) {
        const rect = avatarElement.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const cardWidth = 320; // w-80 = 320px
        const spacing = 16;

        // Calculate horizontal position
        let x = rect.right + spacing;

        // If card would overflow right edge, position to the left
        if (x + cardWidth > viewportWidth - spacing) {
          x = rect.left - cardWidth - spacing;
        }

        // Vertical position - align with top of avatar
        const y = rect.top;

        hoverCardPosition = { x, y };
        showUserHoverCard = true;
      }
    }, 500);
  }

  function handleAvatarMouseLeave(e: MouseEvent) {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }

    // Don't hide if moving to the hover card
    hoverTimer = setTimeout(() => {
      showUserHoverCard = false;
    }, 100);
  }

  function handleHoverCardMouseEnter() {
    // Cancel the hide timer when entering the card
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
  }

  function handleHoverCardMouseLeave() {
    showUserHoverCard = false;
  }
</script>

<article
  class="p-3 sm:p-4 flex flex-col max-sm:max-w-screen {bgClass} transition-colors {clickable ? 'cursor-pointer' : ''} border-b border-border relative min-w-0"
  onclick={clickable ? navigateToEvent : undefined}
  role={clickable ? 'button' : undefined}
  tabindex={clickable ? 0 : undefined}
>
  {#if showThreadLine}
    <div class="absolute left-[29px] -top-px h-[73px] w-0.5 bg-muted"></div>
    <div class="absolute left-[29px] top-[73px] bottom-0 w-0.5 bg-muted"></div>
  {/if}

  <!-- Header Row: Avatar + Name/Handle/Time -->
  <div class="flex items-center gap-2 sm:gap-3 {variant === 'thread-main' ? 'mb-2' : 'mb-1.5'}">
    <button
      bind:this={avatarElement}
      type="button"
      onclick={(e) => { e.stopPropagation(); navigateToProfile(); }}
      onmouseenter={handleAvatarMouseEnter}
      onmouseleave={handleAvatarMouseLeave}
      class="flex-shrink-0"
    >
      <Avatar {ndk} pubkey={event.pubkey} class={`${avatarSize} cursor-pointer hover:opacity-80 transition-opacity`} />
    </button>

    <div class="flex items-center gap-2 flex-1 min-w-0">
      <div class="flex items-center gap-2 min-w-0 flex-shrink">
        <span class={`${nameSize} text-foreground truncate min-w-0`}>
          {profile?.displayName || profile?.name || `${event.pubkey.slice(0, 8)}...`}
        </span>
        {#if variant === 'default' || variant === 'thread-reply'}
          <span class="text-muted-foreground text-sm truncate min-w-0">
            @{profile?.name || event.pubkey.slice(0, 8)}
          </span>
        {/if}
      </div>
      <span class="text-muted-foreground text-sm flex-shrink-0">·</span>
      {#if event.created_at}
        <TimeAgo timestamp={event.created_at} class="text-muted-foreground text-sm flex-shrink-0" />
      {/if}
    </div>

    <EventOptionsMenu {event} />
  </div>

  <!-- Reply indicator -->
  {#if variant === 'default'}
    <ReplyIndicator {event} />
  {/if}

  <!-- Content -->
  <div class="text-foreground whitespace-pre-wrap break-words {textSize} mb-2 overflow-hidden">
    <EventContent {ndk} event={event} />
  </div>

  <!-- Actions -->
  {#if showActions}
    <EventActions {event} variant={variant} />
  {/if}
</article>

<!-- User Hover Card -->
<div
  onmouseenter={handleHoverCardMouseEnter}
  onmouseleave={handleHoverCardMouseLeave}
>
  <UserHoverCard
    pubkey={event.pubkey}
    isVisible={showUserHoverCard}
    position={hoverCardPosition}
  />
</div>
