<script lang="ts">
	import type { InviteAcceptanceNotification } from '$lib/utils/useNotifications.svelte';
	import { Avatar } from '@nostr-dev-kit/svelte';
	import { ndk } from '$lib/ndk.svelte';
	import { navigateToProfile } from '$lib/utils/navigation';
	import FollowButton from '../FollowButton.svelte';
	import NotificationBase from './NotificationBase.svelte';

	interface Props {
		notification: InviteAcceptanceNotification;
	}

	const { notification }: Props = $props();

	const profile = ndk.$fetchProfile(() => notification.inviteePubkey);

	const displayName = $derived.by(() => {
		if (profile?.name || profile?.displayName) {
			return profile.name || profile.displayName;
		}
		return notification.inviteePubkey.slice(0, 8) + '...';
	});

	const follows = $derived(ndk.$sessions?.follows ?? new Set());
	const isFollowing = $derived.by(() => follows.has(notification.inviteePubkey));

	function handleProfileClick() {
		navigateToProfile(notification.inviteePubkey);
	}
</script>

<NotificationBase testId="invite-acceptance-notification" timestamp={notification.timestamp}>
	{#snippet avatar()}
		<button type="button" onclick={handleProfileClick} class="flex-shrink-0">
			<Avatar
				{ndk}
				pubkey={notification.inviteePubkey}
				class="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity"
			/>
		</button>
	{/snippet}

	{#snippet icon()}
		<svg
			class="w-4 h-4 text-green-500 flex-shrink-0"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
		accepted your invite 🎉
	{/snippet}

	{#snippet content()}
		{#if profile?.about}
			<p class="text-sm text-muted-foreground mt-1 line-clamp-2 break-words">
				{profile.about}
			</p>
		{/if}

		{#if !isFollowing}
			<div class="mt-2">
				<FollowButton pubkey={notification.inviteePubkey} variant="outline" />
			</div>
		{/if}
	{/snippet}
</NotificationBase>
