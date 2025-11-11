<script lang="ts">
	import { Drawer } from "vaul-svelte";
	import { cn } from "$lib/utils.js";

	let {
		
		class: className,
		...restProps
	}: any = $props();
</script>

<Drawer.Title
	
	data-slot="drawer-title"
	class={cn("text-foreground font-semibold", className)}
	{...restProps}
/>
