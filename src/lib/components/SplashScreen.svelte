<script lang="ts">
	import { fade } from 'svelte/transition';

	let { visible = true }: { visible: boolean } = $props();
</script>

{#if visible}
	<div class="splash-screen" transition:fade={{ duration: 300 }}>
		<div class="splash-content">
			<div class="logo">
				<img src="/logo.svg" alt="Agora" />
			</div>
		</div>
	</div>
{/if}

<style>
	.splash-screen {
		position: fixed;
		inset: 0;
		background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}

	.splash-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	.logo {
		width: 280px;
		height: auto;
		animation: pulse 2s ease-in-out infinite;
	}

	.logo img {
		width: 100%;
		height: auto;
		display: block;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.8;
			transform: scale(1.05);
		}
	}
</style>
