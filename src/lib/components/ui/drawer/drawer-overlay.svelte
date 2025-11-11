<script lang="ts">
	import { Drawer } from "vaul-svelte";
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		...restProps
	}: any = $props();
</script>

<Drawer.Overlay
	data-slot="drawer-overlay"
	class={cn(
		"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[1001] bg-black/50",
		className
	)}
	{...restProps}
/>
