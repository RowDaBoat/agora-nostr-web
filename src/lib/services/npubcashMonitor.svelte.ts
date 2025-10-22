import { ndk } from '$lib/ndk.svelte';
import { npubCash } from '$lib/stores/npubcash.svelte';
import type { NDKSubscription } from '@nostr-dev-kit/ndk';

const ZAP_KIND = 9735;
const CHECK_INTERVAL = 30000; // Check every 30 seconds

class NpubCashMonitor {
	private zapSubscription: NDKSubscription | null = null;
	private checkInterval: ReturnType<typeof setInterval> | null = null;
	private isProcessing = false;

	/**
	 * Start monitoring for zaps and checking npub.cash balance
	 */
	start() {
		if (!npubCash.enabled) {
			return;
		}

		const currentUser = ndk.$currentUser;

		if (!currentUser) {
			console.warn('[NpubCashMonitor] No active user, cannot start monitoring');
			return;
		}

		console.log('[NpubCashMonitor] Starting zap monitoring for', currentUser.pubkey);

		// Subscribe to zap events for the current user
		this.zapSubscription = ndk.subscribe(
			{
				kinds: [ZAP_KIND],
				'#p': [currentUser.pubkey],
			},
			{ closeOnEose: false }
		);

		// When a zap is received, check for tokens
		this.zapSubscription.on('event', () => {
			console.log('[NpubCashMonitor] Zap received, checking npub.cash balance');
			this.checkAndClaim();
		});

		// Also check periodically
		this.checkInterval = setInterval(() => {
			this.checkAndClaim();
		}, CHECK_INTERVAL);

		// Initial check
		this.checkAndClaim();
	}

	/**
	 * Stop monitoring
	 */
	stop() {
		if (this.zapSubscription) {
			this.zapSubscription.stop();
			this.zapSubscription = null;
		}

		if (this.checkInterval) {
			clearInterval(this.checkInterval);
			this.checkInterval = null;
		}

		console.log('[NpubCashMonitor] Stopped monitoring');
	}

	/**
	 * Check npub.cash balance and claim tokens if available
	 */
	private async checkAndClaim() {
		if (!npubCash.enabled) {
			return;
		}

		if (this.isProcessing) {
			return;
		}

		// Don't claim tokens if there's no wallet to redeem them to
		if (!ndk.$wallet) {
			console.warn('[NpubCashMonitor] No wallet available, skipping token claim');
			return;
		}

		this.isProcessing = true;

		try {
			const token = await npubCash.claimTokens();

			if (token) {
				console.log('[NpubCashMonitor] Token claimed, redeeming to wallet');
				await this.redeemToWallet(token);
			}
		} catch (e) {
			console.error('[NpubCashMonitor] Error checking/claiming tokens:', e);
		} finally {
			this.isProcessing = false;
		}
	}

	/**
	 * Redeem a Cashu token to the user's NIP-60 wallet
	 */
	private async redeemToWallet(token: string) {
		if (!ndk.$wallet) {
			console.warn('[NpubCashMonitor] No wallet available, cannot redeem token');
			return;
		}

		try {
			await ndk.$wallet.receiveToken(token);
			console.log('[NpubCashMonitor] ✓ Token redeemed to wallet');
		} catch (e) {
			console.error('[NpubCashMonitor] Failed to redeem token to wallet:', e);
		}
	}
}

export const npubCashMonitor = new NpubCashMonitor();
