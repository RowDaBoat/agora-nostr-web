<script lang="ts">
	import User from './User.svelte';
	import TimeAgo from './TimeAgo.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		pubkey: string;
		timestamp?: number;
		avatarClass?: string;
		icon?: Snippet;
		message?: Snippet;
	}

	const {
		pubkey,
		timestamp,
		avatarClass = 'w-10 h-10',
		icon,
		message
	}: Props = $props();
</script>

<User
	{pubkey}
	variant="avatar-name-meta"
	avatarSize={avatarClass}
	nameSize="text-base font-semibold"
>
	{#snippet meta()}
		<div class="flex items-center gap-2">
			{#if icon}
				{@render icon()}
			{/if}
			{#if message}
				{@render message()}
			{/if}
			{#if timestamp}
				<TimeAgo {timestamp} class="text-sm text-muted-foreground ml-auto" />
			{/if}
		</div>
	{/snippet}
</User>
