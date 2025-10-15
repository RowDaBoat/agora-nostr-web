<script lang="ts">
  import type { NotificationGroup } from '$lib/utils/useNotifications.svelte';
  import type { NDKEvent } from '@nostr-dev-kit/ndk';
  import ReplyNotification from './ReplyNotification.svelte';
  import MentionNotification from './MentionNotification.svelte';
  import QuoteNotification from './QuoteNotification.svelte';
  import ReactionNotification from './ReactionNotification.svelte';
  import RepostNotification from './RepostNotification.svelte';
  import ZapNotification from './ZapNotification.svelte';

  interface Props {
    notification: NotificationGroup;
    targetEventsCache: Map<string, NDKEvent>;
  }

  const { notification, targetEventsCache }: Props = $props();

  // Get target event from cache
  const targetEvent = $derived.by(() => {
    if (notification.type === 'reply') {
      return targetEventsCache.get(notification.replyToEventId);
    } else if (notification.type === 'quote') {
      return targetEventsCache.get(notification.quotedEventId);
    } else if (notification.type === 'reaction' || notification.type === 'repost' || notification.type === 'zap') {
      return targetEventsCache.get(notification.targetEventId);
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
{/if}
