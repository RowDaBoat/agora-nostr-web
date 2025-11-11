<script lang="ts">
	import { ndk } from '$lib/ndk.svelte';
	import FollowButton from '$lib/ndk/components/follow-button/follow-button.svelte';
    import { UserProfile } from '$lib/ndk/components/user-profile';
	import { User } from "$lib/ndk/ui/user";
	import { formatTimeAgo } from '$lib/utils/formatTime';

	interface Props {
		memberPubkey: string;
		inviterPubkey: string | null;
		joinedAt: number;
	}

	let { memberPubkey, inviterPubkey, joinedAt }: Props = $props();

	const user = ndk.getUser({pubkey: memberPubkey})
</script>

<a href={`/p/${user.npub}`} class="flex flex-row items-start justify-between gap-3">
	<div class="flex-1 flex-none">
	<UserProfile
		size="sm"
		{ndk}
		pubkey={memberPubkey}
	>
		{#snippet byline()}
			{#if inviterPubkey}
				<span class="text-xs text-muted-foreground">
					Invited by
					<User.Root {ndk} pubkey={inviterPubkey}>
						<User.Name />
					</User.Root>
				</span>
			{/if}
		{/snippet}
	</UserProfile>
	</div>

	<FollowButton {ndk} target={memberPubkey} variant="ghost" />
</a>