<script lang="ts">
  import { MediaQuery } from 'svelte/reactivity';
  import { ndk } from '$lib/ndk.svelte';
  import type { NDKCashuDeposit } from '@nostr-dev-kit/wallet';
  import QRCode from './QRCode.svelte';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Drawer from '$lib/components/ui/drawer';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

  const isDesktop = new MediaQuery('(min-width: 768px)');

  let { isOpen = $bindable(false) } = $props();

  let amount = $state(1000);
  let invoice = $state<string | null>(null);
  let deposit = $state<NDKCashuDeposit | undefined>();
  let isLoading = $state(false);
  let error = $state<string | null>(null);

  async function handleDeposit() {
    isLoading = true;
    error = null;

    try {
      deposit = ndk.$wallet.deposit(amount);

      if (!deposit) {
        throw new Error('Failed to create deposit - no Cashu wallet available');
      }

      deposit.on('success', () => {
        invoice = null;
        deposit = undefined;
        close();
      });

      deposit.on('error', (err) => {
        error = typeof err === 'string' ? err : err?.message || 'Deposit failed';
        isLoading = false;
      });

      const invoiceStr = await deposit.start();
      invoice = invoiceStr;
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    } finally {
      isLoading = false;
    }
  }

  function close() {
    isOpen = false;
    invoice = null;
    deposit = undefined;
    error = null;
    amount = 1000;
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }
</script>

{#if isDesktop.current}
  <Dialog.Root open={isOpen} onOpenChange={(newOpen) => {
      isOpen = newOpen;
      if (!newOpen) close();
    }}>
    <Dialog.Content class="max-w-md">
      {#if !invoice}
        <Dialog.Header>
          <Dialog.Title>Deposit Funds</Dialog.Title>
        </Dialog.Header>

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

          <Button
            onclick={handleDeposit}
            disabled={isLoading || amount < 1}
            class="w-full"
          >
            {isLoading ? 'Creating Invoice...' : 'Create Invoice'}
          </Button>
        </div>
      {:else}
        <Dialog.Header>
          <Dialog.Title>Pay Invoice</Dialog.Title>
        </Dialog.Header>

        <div class="space-y-4">
          {#if invoice}
            <div class="flex justify-center">
              <QRCode value={invoice} size={256} />
            </div>
          {/if}

          <div class="bg-card border border-border rounded-lg p-3 break-all text-sm text-muted-foreground">
            {invoice}
          </div>

          <Button
            onclick={() => copyToClipboard(invoice || '')}
            variant="outline"
            class="w-full"
          >
            Copy Invoice
          </Button>

          <p class="text-center text-muted-foreground text-sm">Waiting for payment...</p>
        </div>
      {/if}

      {#if error}
        <div class="mt-4 p-3 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      {/if}

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
      {#if !invoice}
        <Drawer.Header class="text-left">
          <Drawer.Title>Deposit Funds</Drawer.Title>
        </Drawer.Header>

        <div class="px-4 space-y-4">
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

          <Button
            onclick={handleDeposit}
            disabled={isLoading || amount < 1}
            class="w-full"
          >
            {isLoading ? 'Creating Invoice...' : 'Create Invoice'}
          </Button>
        </div>
      {:else}
        <Drawer.Header class="text-left">
          <Drawer.Title>Pay Invoice</Drawer.Title>
        </Drawer.Header>

        <div class="px-4 space-y-4">
          {#if invoice}
            <div class="flex justify-center">
              <QRCode value={invoice} size={256} />
            </div>
          {/if}

          <div class="bg-card border border-border rounded-lg p-3 break-all text-sm text-muted-foreground">
            {invoice}
          </div>

          <Button
            onclick={() => copyToClipboard(invoice || '')}
            variant="outline"
            class="w-full"
          >
            Copy Invoice
          </Button>

          <p class="text-center text-muted-foreground text-sm">Waiting for payment...</p>
        </div>
      {/if}

      {#if error}
        <div class="px-4 mt-4 mb-4">
          <div class="p-3 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        </div>
      {/if}

      <Drawer.Footer class="pt-2">
        <Button variant="ghost" onclick={close} class="w-full">
          Close
        </Button>
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Root>
{/if}
