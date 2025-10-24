<script lang="ts">
	import type { NDKEvent, NDKUserProfile } from '@nostr-dev-kit/ndk';
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

	let profile = $state<NDKUserProfile | null>(null);

	$effect(() => {
		event.author.fetchProfile().then(p => { profile = p; });
	});

	const displayName = $derived(profile?.name || profile?.displayName || 'Anonymous');

	function handleProfileClick() {
		navigateToProfile(event.pubkey);
	}

	const originalPreview = $derived(truncateContent(targetEvent?.content ?? ''));
</script>

<NotificationBase timestamp={event.created_at} preview={originalPreview} previewColor="primary">
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
		<svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
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
		replied to your note
	{/snippet}

	{#snippet content()}
		<div class="text-foreground leading-relaxed mb-2 break-words">
			<EventContent {ndk} content={event.content} emojiTags={event.tags} />
		</div>
	{/snippet}
</NotificationBase>
