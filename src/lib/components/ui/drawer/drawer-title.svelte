<script lang="ts">
	import { Drawer } from "vaul-svelte";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: Drawer.TitleProps = $props();
</script>

<Drawer.Title
	bind:ref
	data-slot="drawer-title"
	class={cn("text-foreground font-semibold", className)}
	{...restProps}
/>
