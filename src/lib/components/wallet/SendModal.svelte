<script lang="ts">
  import { MediaQuery } from 'svelte/reactivity';
  import { ndk } from '$lib/ndk.svelte';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Drawer from '$lib/components/ui/drawer';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

  const isDesktop = new MediaQuery('(min-width: 768px)');

  let { isOpen = $bindable(false) } = $props();

  let amount = $state(100);
  let recipient = $state('');
  let comment = $state('');
  let isSending = $state(false);
  let success = $state(false);
  let error = $state<string | null>(null);

  async function handleSend() {
    if (amount < 1) {
      error = 'Amount must be at least 1 sat';
      return;
    }

    isSending = true;
    error = null;
    success = false;

    try {
      await ndk.$wallet.pay({
        amount,
        recipient: recipient.trim() || undefined,
        comment: comment.trim() || undefined,
        unit: 'sat',
      });
      success = true;
      setTimeout(() => {
        close();
      }, 2000);
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    } finally {
      isSending = false;
    }
  }

  function close() {
    isOpen = false;
    amount = 100;
    recipient = '';
    comment = '';
    success = false;
    error = null;
  }
</script>

{#if isDesktop.current}
  <Dialog.Root open={isOpen} onOpenChange={(newOpen) => {
      isOpen = newOpen;
      if (!newOpen) close();
    }}>
    <Dialog.Content class="max-w-md">
      <Dialog.Header>
        <Dialog.Title>Send Payment</Dialog.Title>
      </Dialog.Header>

      {#if success}
        <div class="p-4 bg-green-900/20 border border-green-800 rounded-lg text-green-400 text-center">
          ✓ Payment sent successfully!
        </div>
      {/if}

      <div class="space-y-4">
        <div>
          <Label for="amount">Amount (sats)</Label>
          <Input
            id="amount"
            type="number"
            bind:value={amount}
            min="1"
            step="100"
            class="mt-2"
          />
        </div>

        <div>
          <Label for="recipient">Recipient (optional)</Label>
          <Input
            id="recipient"
            type="text"
            bind:value={recipient}
            placeholder="npub... or lightning address"
            class="mt-2"
          />
        </div>

        <div>
          <Label for="comment">Comment (optional)</Label>
          <Input
            id="comment"
            type="text"
            bind:value={comment}
            placeholder="What's this payment for?"
            class="mt-2"
          />
        </div>

        <Button
          onclick={handleSend}
          disabled={isSending || amount < 1 || success}
          class="w-full"
        >
          {isSending ? 'Sending...' : success ? 'Sent!' : `Send ${amount} sats`}
        </Button>

        {#if error}
          <div class="p-3 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        {/if}
      </div>

      <Dialog.Footer>
        <Button variant="ghost" onclick={close} class="w-full">
          Close
        </Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
{:else}
  <Drawer.Root open={isOpen} onOpenChange={(newOpen) => {
      isOpen = newOpen;
      if (!newOpen) close();
    }}>
    <Drawer.Content>
      <Drawer.Header class="text-left">
        <Drawer.Title>Send Payment</Drawer.Title>
      </Drawer.Header>

      <div class="px-4 space-y-4 overflow-y-auto pb-4">
        {#if success}
          <div class="p-4 bg-green-900/20 border border-green-800 rounded-lg text-green-400 text-center">
            ✓ Payment sent successfully!
          </div>
        {/if}

        <div>
          <Label for="amount-mobile">Amount (sats)</Label>
          <Input
            id="amount-mobile"
            type="number"
            bind:value={amount}
            min="1"
            step="100"
            class="mt-2"
          />
        </div>

        <div>
          <Label for="recipient-mobile">Recipient (optional)</Label>
          <Input
            id="recipient-mobile"
            type="text"
            bind:value={recipient}
            placeholder="npub... or lightning address"
            class="mt-2"
          />
        </div>

        <div>
          <Label for="comment-mobile">Comment (optional)</Label>
          <Input
            id="comment-mobile"
            type="text"
            bind:value={comment}
            placeholder="What's this payment for?"
            class="mt-2"
          />
        </div>

        {#if error}
          <div class="p-3 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        {/if}
      </div>

      <Drawer.Footer class="pt-2">
        <Button
          onclick={handleSend}
          disabled={isSending || amount < 1 || success}
          class="w-full"
        >
          {isSending ? 'Sending...' : success ? 'Sent!' : `Send ${amount} sats`}
        </Button>
        <Button variant="outline" onclick={close} class="w-full">
          Close
        </Button>
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Root>
{/if}
