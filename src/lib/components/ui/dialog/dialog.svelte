<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";

	const props = $props<DialogPrimitive.RootProps>();
	const open = $bindable(props.open ?? false);
	const { onOpenChange, ...restProps } = props;
</script>

<DialogPrimitive.Root bind:open {onOpenChange} {...restProps} />
