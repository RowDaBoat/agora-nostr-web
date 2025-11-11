<script lang="ts">
	import { Drawer } from "vaul-svelte";

	let {  ...restProps }: any = $props();
</script>

<Drawer.Close data-slot="drawer-close" {...restProps} />
