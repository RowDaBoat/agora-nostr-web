import { settings } from '$lib/stores/settings.svelte';

interface Relay {
	url: string;
	enabled: boolean;
	write: boolean;
	read: boolean;
}

interface RelaySelection {
	selectedRelayUrls: string[];
	allRelays: Relay[];
}

export function useModalRelaySelection(isOpen: () => boolean): RelaySelection {
	const state = $state({
		selectedRelayUrls: [] as string[]
	});

	const allRelays = $derived(settings.relays.filter((r: Relay) => r.enabled));

	$effect(() => {
		if (isOpen()) {
			if (settings.selectedRelay) {
				state.selectedRelayUrls = [settings.selectedRelay];
			} else if (state.selectedRelayUrls.length === 0) {
				state.selectedRelayUrls = allRelays.filter((r: Relay) => r.write).map((r: Relay) => r.url);
			}
		}
	});

	return {
		get selectedRelayUrls() {
			return state.selectedRelayUrls;
		},
		set selectedRelayUrls(value: string[]) {
			state.selectedRelayUrls = value;
		},
		get allRelays() {
			return allRelays;
		}
	};
}
