<script lang="ts">
	import type { NDKEvent, NDKUserProfile } from '@nostr-dev-kit/ndk';
	import { Avatar, EventContent } from '@nostr-dev-kit/svelte';
	import { ndk } from '$lib/ndk.svelte';
	import { navigateToProfile } from '$lib/utils/navigation';
	import NotificationBase from './NotificationBase.svelte';

	interface Props {
		event: NDKEvent;
	}

	const { event }: Props = $props();

	let profile = $state<NDKUserProfile | null>(null);

	$effect(() => {
		event.author.fetchProfile().then(p => { profile = p; });
	});

	const displayName = $derived(profile?.name || profile?.displayName || 'Anonymous');

	function handleProfileClick() {
		navigateToProfile(event.pubkey);
	}
</script>

<NotificationBase timestamp={event.created_at}>
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
		<svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
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
		mentioned you
	{/snippet}

	{#snippet content()}
		<div class="text-foreground leading-relaxed break-words">
			<EventContent {ndk} content={event.content} emojiTags={event.tags} />
		</div>
	{/snippet}
</NotificationBase>
