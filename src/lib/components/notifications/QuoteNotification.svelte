<script lang="ts">
	import type { NDKEvent } from '@nostr-dev-kit/ndk';
	import { Avatar, EventContent } from '@nostr-dev-kit/svelte';
	import { ndk } from '$lib/ndk.svelte';
	import { navigateToProfile } from '$lib/utils/navigation';
	import { truncateContent } from '$lib/utils/contentPreview';
	import NotificationBase from './NotificationBase.svelte';

	interface Props {
		event: NDKEvent;
		targetEvent?: NDKEvent;
	}

	const { event, targetEvent }: Props = $props();

	const profile = ndk.$fetchProfile(() => event.pubkey);
	const displayName = $derived(profile?.name || profile?.displayName || 'Anonymous');

	function handleProfileClick() {
		navigateToProfile(event.pubkey);
	}

	const originalPreview = $derived(truncateContent(targetEvent?.content ?? ''));
</script>

<NotificationBase timestamp={event.created_at} preview={originalPreview} previewColor="purple-500">
	{#snippet avatar()}
		<button type="button" onclick={handleProfileClick} class="flex-shrink-0">
			<Avatar
				{ndk}
				pubkey={event.pubkey}
				class="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity"
			/>
		</button>
	{/snippet}

	{#snippet icon()}
		<svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
			/>
		</svg>
	{/snippet}

	{#snippet message()}
		<button
			type="button"
			onclick={handleProfileClick}
			class="font-semibold hover:underline text-foreground"
		>
			{displayName}
		</button>
		quoted your note
	{/snippet}

	{#snippet content()}
		<div class="text-foreground leading-relaxed mb-2 break-words">
			<EventContent {ndk} content={event.content} emojiTags={event.tags} />
		</div>
	{/snippet}
</NotificationBase>
