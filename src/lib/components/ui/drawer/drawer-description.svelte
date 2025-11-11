<script lang="ts">
	import { Drawer } from "vaul-svelte";
	import { cn } from "$lib/utils.js";

	let {
		
		class: className,
		...restProps
	}: any = $props();
</script>

<Drawer.Description
	
	data-slot="drawer-description"
	class={cn("text-muted-foreground text-sm", className)}
	{...restProps}
/>
