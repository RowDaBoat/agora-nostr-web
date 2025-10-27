<script lang="ts">
  import { ndk } from '$lib/ndk.svelte';
  import { createNotificationsManager2, type NotificationFilter } from '$lib/utils/useNotifications2.svelte';
  import NotificationItem2 from '$lib/components/notifications/NotificationItem2.svelte';

  const notificationsManager = createNotificationsManager2(ndk);

  const filters: Array<{ value: NotificationFilter; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'reply', label: 'Replies' },
    { value: 'mention', label: 'Mentions' },
    { value: 'reaction', label: 'Reactions' },
    { value: 'repost', label: 'Reposts' },
    { value: 'zap', label: 'Zaps' },
  ];

  function handleFilterChange(filter: NotificationFilter) {
    notificationsManager.setFilter(filter);
  }
</script>

<div class="w-full">
  <div class="sticky top-0 z-10 bg-background/90 backdrop-blur-xl border-b border-border">
    <div class="px-4 py-4">
      <div class="flex items-center justify-between mb-3">
        <h1 class="text-xl font-bold text-foreground">
          Notifications v2
          <span class="text-sm font-normal text-muted-foreground ml-2">($metaSubscribe)</span>
        </h1>
        {#if !notificationsManager.eosed}
          <div class="flex items-center gap-2 text-xs text-muted-foreground">
            <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Loading...</span>
          </div>
        {/if}
      </div>

      <!-- Filter tabs -->
      <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {#each filters as filter}
          {@const count = notificationsManager.counts[filter.value]}
          <button
            type="button"
            onclick={() => handleFilterChange(filter.value)}
            class="px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors {notificationsManager.filter === filter.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'}"
          >
            {filter.label}
            {#if count > 0}
              <span class="ml-1 opacity-70">({count})</span>
            {/if}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <div class="min-h-screen">
    {#if notificationsManager.notifications.length === 0}
      <div class="p-8 text-center text-muted-foreground">
        <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <p class="text-lg font-medium mb-1">No notifications yet</p>
        <p class="text-sm">When people interact with your posts, you'll see it here</p>
      </div>
    {:else}
      <div class="space-y-0">
        {#each notificationsManager.notifications as notification (notification.id)}
          <NotificationItem2 {notification} />
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
