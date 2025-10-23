<script lang="ts">
  import type { NDKEvent } from '@nostr-dev-kit/ndk';
  import { toast } from '$lib/stores/toast.svelte';
  import { MediaQuery } from 'svelte/reactivity';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Drawer from '$lib/components/ui/drawer';
  import { Button } from '$lib/components/ui/button';
  import RelayBadge from './RelayBadge.svelte';

  interface Props {
    event: NDKEvent;
  }

  let { event }: Props = $props();

  const isDesktop = new MediaQuery('(min-width: 768px)');

  let showOptionsMenu = $state(false);
  let showRawEventModal = $state(false);

  async function copyToClipboard(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${label}`);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error(`Failed to copy ${label}`);
    }
    showOptionsMenu = false;
  }

  function copyAuthorNprofile() {
    const nprofile = event.author.nprofile;
    copyToClipboard(nprofile, 'author nprofile');
  }

  function copyEventId() {
    const nevent = event.encode();
    copyToClipboard(nevent, 'event ID');
  }

  function copyRawEvent() {
    const raw = event.inspect;
    copyToClipboard(raw, 'raw event');
  }

  function viewRawEvent() {
    showOptionsMenu = false;
    showRawEventModal = true;
  }

  $effect(() => {
    if (!showOptionsMenu) return;

    const handleClickOutside = () => {
      showOptionsMenu = false;
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });
</script>

<div class="relative flex-shrink-0">
  <button
    onclick={(e) => { e.stopPropagation(); showOptionsMenu = !showOptionsMenu; }}
    class="p-1 hover:bg-muted rounded-full transition-colors"
    type="button"
    aria-label="More options"
  >
    <svg class="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
  </button>

  {#if showOptionsMenu}
    <div
      class="absolute right-0 mt-1 w-72 bg-popover border border-border rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto"
      onclick={(e) => e.stopPropagation()}
    >
      <button
        onclick={copyAuthorNprofile}
        class="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors first:rounded-t-lg"
        type="button"
      >
        Copy author (nprofile)
      </button>
      <button
        onclick={copyEventId}
        class="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors"
        type="button"
      >
        Copy ID (nevent)
      </button>
      <button
        onclick={copyRawEvent}
        class="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors"
        type="button"
      >
        Copy raw event
      </button>
      <button
        onclick={viewRawEvent}
        class="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors"
        type="button"
      >
        View raw event
      </button>

      {#if event.onRelays && event.onRelays.size > 0}
        <div class="border-t border-border mt-1 pt-1">
          <div class="px-4 py-2 text-xs text-muted-foreground font-medium">
            Seen on {event.onRelays.size} relay{event.onRelays.size === 1 ? '' : 's'}
          </div>
          <div class="px-2 pb-2 space-y-1">
            {#each Array.from(event.onRelays) as relay (relay.url)}
              <RelayBadge {relay} variant="compact" />
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>

<!-- Raw Event Modal -->
{#if isDesktop.current}
  <Dialog.Root bind:open={showRawEventModal}>
    <Dialog.Content class="max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
      <Dialog.Header>
        <Dialog.Title>Raw Event</Dialog.Title>
        <Dialog.Description>
          JSON representation of this Nostr event
        </Dialog.Description>
      </Dialog.Header>

      <div class="flex-1 overflow-auto bg-muted/50 rounded-lg p-4 font-mono text-sm">
        <pre class="whitespace-pre-wrap break-words">{event.inspect}</pre>
      </div>

      <Dialog.Footer class="flex justify-end gap-2">
        <Button
          variant="outline"
          onclick={() => copyToClipboard(event.inspect, 'raw event')}
        >
          Copy to Clipboard
        </Button>
        <Button onclick={() => showRawEventModal = false}>
          Close
        </Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
{:else}
  <Drawer.Root bind:open={showRawEventModal}>
    <Drawer.Content>
      <Drawer.Header class="text-left">
        <Drawer.Title>Raw Event</Drawer.Title>
        <Drawer.Description>
          JSON representation of this Nostr event
        </Drawer.Description>
      </Drawer.Header>

      <div class="px-4 flex-1 overflow-auto bg-muted/50 rounded-lg p-4 font-mono text-sm">
        <pre class="whitespace-pre-wrap break-words">{event.inspect}</pre>
      </div>

      <Drawer.Footer class="pt-2">
        <Button
          variant="outline"
          onclick={() => copyToClipboard(event.inspect, 'raw event')}
        >
          Copy to Clipboard
        </Button>
        <Button onclick={() => showRawEventModal = false}>
          Close
        </Button>
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Root>
{/if}
