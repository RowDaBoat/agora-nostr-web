<script lang="ts">
	import type { NDKEvent } from '@nostr-dev-kit/ndk';
	import { truncateContent } from '$lib/utils/contentPreview';
	import ActorList from './ActorList.svelte';
	import NotificationBase from './NotificationBase.svelte';

	interface Props {
		zaps: Array<{ event: NDKEvent; amount: number; sender: string }>;
		targetEvent?: NDKEvent;
		timestamp: number;
	}

	const { zaps, targetEvent, timestamp }: Props = $props();

	const actorPubkeys = $derived(zaps.map((z) => z.sender));
	const totalAmount = $derived(zaps.reduce((sum, z) => sum + z.amount, 0));
	const formattedAmount = $derived(totalAmount.toLocaleString());
	const originalPreview = $derived(truncateContent(targetEvent?.content ?? ''));
</script>

<NotificationBase {timestamp} preview={originalPreview} previewColor="yellow-500">
	{#snippet avatar()}
		<div class="flex-shrink-0 w-10 h-10 flex items-center justify-center">
			<svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
				<path d="M13 10V3L4 14h7v7l9-11h-7z" />
			</svg>
		</div>
	{/snippet}

	{#snippet message()}
		<ActorList pubkeys={actorPubkeys} maxVisible={2} />
		{zaps.length === 1 ? 'zapped' : 'zapped'}
		<span class="font-semibold text-yellow-600 dark:text-yellow-400 mx-1">
			{formattedAmount} sats
		</span>
		{#if targetEvent}
			to your note
		{:else}
			to you
		{/if}
	{/snippet}
</NotificationBase>
