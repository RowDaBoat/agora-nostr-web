<script lang="ts">
  import type { NDKEvent } from '@nostr-dev-kit/ndk';
  import { ndk } from '$lib/ndk.svelte';
  import { EventContent } from '@nostr-dev-kit/svelte';
  import ReplyIndicator from './ReplyIndicator.svelte';
  import User from './User.svelte';
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
    <div class="flex items-center gap-2 flex-1 min-w-0" onclick={(e) => e.stopPropagation()}>
      {#if variant === 'default' || variant === 'thread-reply'}
        <User
          pubkey={event.pubkey}
          variant="avatar"
          avatarSize={avatarSize}
        />
        <div class="flex items-center gap-2 min-w-0 flex-1">
          <div class="flex items-center gap-2 min-w-0 flex-shrink">
            <span class={`${nameSize} text-foreground truncate min-w-0`}>
              {profile?.displayName || profile?.name || `${event.pubkey.slice(0, 8)}...`}
            </span>
            <span class="text-muted-foreground text-sm truncate min-w-0">
              @{profile?.name || event.pubkey.slice(0, 8)}
            </span>
          </div>
          <span class="text-muted-foreground text-sm flex-shrink-0">·</span>
          {#if event.created_at}
            <TimeAgo timestamp={event.created_at} class="text-muted-foreground text-sm flex-shrink-0" />
          {/if}
        </div>
      {:else}
        <User
          pubkey={event.pubkey}
          variant="avatar-name-meta"
          avatarSize={avatarSize}
          nameSize={nameSize}
        >
          {#snippet meta()}
            {#if event.created_at}
              <div class="flex items-center gap-2">
                <span class="text-muted-foreground text-sm">·</span>
                <TimeAgo timestamp={event.created_at} class="text-muted-foreground text-sm" />
              </div>
            {/if}
          {/snippet}
        </User>
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

  {event.relay?.url ?? "no relay"}
  {event.onRelays?.map(r => r.url).join(', ') ?? "no onRelays"}

  <!-- Actions -->
  {#if showActions}
    <EventActions {event} variant={variant} />
  {/if}
</article>
