<script lang="ts">
  import type { NotificationGroup } from '$lib/utils/useNotifications.svelte';
  import type { NDKEvent } from '@nostr-dev-kit/ndk';
  import ReplyNotification from './ReplyNotification.svelte';
  import MentionNotification from './MentionNotification.svelte';
  import QuoteNotification from './QuoteNotification.svelte';
  import ReactionNotification from './ReactionNotification.svelte';
  import RepostNotification from './RepostNotification.svelte';
  import ZapNotification from './ZapNotification.svelte';
  import InviteAcceptanceNotification from './InviteAcceptanceNotification.svelte';
  import { onMount, onDestroy } from 'svelte';

  interface Props {
    notification: NotificationGroup;
    targetEventsCache: Map<string, NDKEvent>;
  }

  const { notification, targetEventsCache }: Props = $props();

  console.log('[NotificationItem] Rendering notification:', notification.type, notification.id);

  onMount(() => {
    console.log('[NotificationItem] Mounted:', notification.type, notification.id);
  });

  onDestroy(() => {
    console.log('[NotificationItem] Destroyed:', notification.type, notification.id);
  });

  // Get target event from cache
  const targetEvent = $derived.by(() => {
    console.log('[NotificationItem] Computing targetEvent for:', notification.type, notification.id);
    if (notification.type === 'reply') {
      const event = targetEventsCache.get(notification.replyToEventId);
      console.log('[NotificationItem] Reply target event:', event ? 'found' : 'not found');
      return event;
    } else if (notification.type === 'quote') {
      const event = targetEventsCache.get(notification.quotedEventId);
      console.log('[NotificationItem] Quote target event:', event ? 'found' : 'not found');
      return event;
    } else if (notification.type === 'reaction' || notification.type === 'repost' || notification.type === 'zap') {
      const event = targetEventsCache.get(notification.targetEventId);
      console.log('[NotificationItem]', notification.type, 'target event:', event ? 'found' : 'not found');
      return event;
    }
    return undefined;
  });
</script>

{#if notification.type === 'reply'}
  <ReplyNotification event={notification.event} {targetEvent} />
{:else if notification.type === 'mention'}
  <MentionNotification event={notification.event} />
{:else if notification.type === 'quote'}
  <QuoteNotification event={notification.event} {targetEvent} />
{:else if notification.type === 'reaction'}
  <ReactionNotification
    emoji={notification.emoji}
    reactors={notification.reactors}
    {targetEvent}
    timestamp={notification.timestamp}
  />
{:else if notification.type === 'repost'}
  <RepostNotification reposts={notification.reposts} {targetEvent} timestamp={notification.timestamp} />
{:else if notification.type === 'zap'}
  <ZapNotification zaps={notification.zaps} {targetEvent} timestamp={notification.timestamp} />
{:else if notification.type === 'invite_acceptance'}
  <InviteAcceptanceNotification notification={notification} />
{/if}
