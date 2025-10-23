<script lang="ts">
	import type { NDKEvent } from '@nostr-dev-kit/ndk';
	import { truncateContent } from '$lib/utils/contentPreview';
	import ActorList from './ActorList.svelte';
	import NotificationBase from './NotificationBase.svelte';

	interface Props {
		reposts: NDKEvent[];
		targetEvent?: NDKEvent;
		timestamp: number;
	}

	const { reposts, targetEvent, timestamp }: Props = $props();

	const actorPubkeys = $derived(reposts.map((r) => r.pubkey));
	const originalPreview = $derived(truncateContent(targetEvent?.content ?? ''));
</script>

<NotificationBase {timestamp} preview={originalPreview} previewColor="green-500">
	{#snippet avatar()}
		<div class="flex-shrink-0 w-10 h-10 flex items-center justify-center">
			<svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
				/>
			</svg>
		</div>
	{/snippet}

	{#snippet message()}
		<ActorList pubkeys={actorPubkeys} maxVisible={2} />
		{reposts.length === 1 ? 'reposted' : 'reposted'}
		your note
	{/snippet}
</NotificationBase>
