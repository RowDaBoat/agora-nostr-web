<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import type { Snippet } from 'svelte';

	let {
		open = $bindable(false),
		onOpenChange,
		breakpoint = '(min-width: 768px)',
		children
	}: {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		breakpoint?: string;
		children: Snippet<[{ isDesktop: boolean }]>;
	} = $props();

	const isDesktop = new MediaQuery(breakpoint);
</script>

{#if isDesktop.current}
	<Dialog.Root bind:open {onOpenChange}>
		{@render children({ isDesktop: true })}
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open {onOpenChange}>
		{@render children({ isDesktop: false })}
	</Drawer.Root>
{/if}
