<script lang="ts">
  import type { NDKEvent } from '@nostr-dev-kit/ndk';
  import { ndk } from '$lib/ndk.svelte';
  import { EventContent } from '@nostr-dev-kit/svelte';
  import ReplyIndicator from './ReplyIndicator.svelte';
  import EventCardHeader from './EventCardHeader.svelte';
  import EventActions from './EventActions.svelte';

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

  const headerVariant = $derived(variant === 'thread-main' ? 'full' : 'compact');
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
  <div class="{variant === 'thread-main' ? 'mb-2' : 'mb-1.5'}">
    <EventCardHeader
      {event}
      avatarClass={avatarSize}
      nameClass={nameSize}
      variant={headerVariant}
    />
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
