<script lang="ts">
	import TimeAgo from '../TimeAgo.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		avatar: Snippet;
		icon?: Snippet;
		message: Snippet;
		timestamp?: number;
		content?: Snippet;
		preview?: string;
		previewColor?: string;
		testId?: string;
	}

	const { avatar, icon, message, timestamp, content, preview, previewColor, testId }: Props =
		$props();
</script>

<div
	data-testid={testId}
	class="flex gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border"
>
	<div class="flex-shrink-0">
		{@render avatar()}
	</div>

	<div class="flex-1 min-w-0">
		<div class="flex items-center gap-2 mb-1 flex-wrap">
			{#if icon}
				{@render icon()}
			{/if}
			<span class="text-sm text-muted-foreground">
				{@render message()}
			</span>
			{#if timestamp}
				<TimeAgo {timestamp} class="text-sm text-muted-foreground ml-auto" />
			{/if}
		</div>

		{#if content}
			{@render content()}
		{/if}

		{#if preview}
			<div
				class="text-sm text-muted-foreground bg-muted/30 rounded p-2 border-l-2 border-{previewColor}/50 break-words"
			>
				{preview}
			</div>
		{/if}
	</div>
</div>
