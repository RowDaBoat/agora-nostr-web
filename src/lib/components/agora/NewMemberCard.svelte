<script lang="ts">
	import { ndk } from '$lib/ndk.svelte';
	import User from '../User.svelte';
	import FollowButton from '../FollowButton.svelte';
	import { formatTimeAgo } from '$lib/utils/formatTime';

	interface Props {
		memberPubkey: string;
		inviterPubkey: string | null;
		joinedAt: number;
	}

	let { memberPubkey, inviterPubkey, joinedAt }: Props = $props();

	const inviterProfile = $derived(inviterPubkey ? ndk.$fetchProfile(() => inviterPubkey) : null);
</script>

<div class="p-3 rounded-lg hover:bg-muted/50 transition-colors">
	<User
		pubkey={memberPubkey}
		variant="avatar-name-handle"
		avatarSize="w-12 h-12"
		nameSize="text-base font-semibold"
		handleSize="text-sm text-muted-foreground"
	/>

	<div class="ml-[60px]">
		<div class="flex items-center flex-wrap gap-x-2 gap-y-1 mt-2 text-xs text-muted-foreground">
			<span>Joined {formatTimeAgo(joinedAt)}</span>
			{#if inviterPubkey && inviterProfile && inviterProfile.ready}
				<span>•</span>
				<span>
					Invited by
					<a href="/p/{ndk.getUser({ pubkey: inviterPubkey }).npub}" class="text-primary hover:underline">
						{inviterProfile.displayName || inviterProfile.name || 'someone'}
					</a>
				</span>
			{/if}
		</div>

		<div class="mt-2">
			<FollowButton pubkey={memberPubkey} />
		</div>
	</div>
</div>