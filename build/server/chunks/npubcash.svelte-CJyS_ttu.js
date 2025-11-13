import 'clsx';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { s as settings, n as ndk } from './ndk.svelte-BfhDBrJw.js';

const NIP98_KIND = 27235;
const NPUB_CASH_DOMAIN = "npub.cash";
const NPUB_CASH_BASE_URL = `https://${NPUB_CASH_DOMAIN}`;
class NpubCashStore {
  enabled = false;
  loading = false;
  lastCheck = null;
  constructor() {
    this.enabled = settings.wallet.npubCashEnabled;
  }
  /**
   * Get the npub.cash Lightning address for the current user
   */
  getLightningAddress() {
    if (!ndk.$currentUser) {
      return "";
    }
    return `${ndk.$currentUser.npub}@${NPUB_CASH_DOMAIN}`;
  }
  /**
   * Generate NIP-98 authentication event for HTTP requests
   */
  async generateNip98Event(url, method) {
    const event = new NDKEvent(ndk);
    event.kind = NIP98_KIND;
    event.tags = [["u", url], ["method", method]];
    await event.sign();
    const eventString = JSON.stringify(event.rawEvent());
    return btoa(eventString);
  }
  /**
   * Get account info from npub.cash
   */
  async getInfo() {
    const url = `${NPUB_CASH_BASE_URL}/api/v1/info`;
    const authHeader = await this.generateNip98Event(url, "GET");
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Nostr ${authHeader}` }
    });
    const info = await response.json();
    return info;
  }
  /**
   * Check balance on npub.cash
   */
  async getBalance() {
    if (!this.enabled) {
      return 0;
    }
    const url = `${NPUB_CASH_BASE_URL}/api/v1/balance`;
    try {
      const authHeader = await this.generateNip98Event(url, "GET");
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Nostr ${authHeader}` }
      });
      const balance = await response.json();
      if (balance.error) {
        console.error("npub.cash balance error:", balance.error);
        return 0;
      }
      return balance.data;
    } catch (e) {
      console.error("Failed to get npub.cash balance:", e);
      return 0;
    }
  }
  /**
   * Claim ecash token from npub.cash
   */
  async getClaim() {
    const url = `${NPUB_CASH_BASE_URL}/api/v1/claim`;
    try {
      const authHeader = await this.generateNip98Event(url, "GET");
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Nostr ${authHeader}` }
      });
      const claim = await response.json();
      if (claim.error) {
        console.error("npub.cash claim error:", claim.error);
        return "";
      }
      return claim.data.token;
    } catch (e) {
      console.error("Failed to claim from npub.cash:", e);
      return "";
    }
  }
  /**
   * Check balance and claim any available tokens
   */
  async claimTokens() {
    if (!this.enabled) {
      return null;
    }
    try {
      const balance = await this.getBalance();
      console.log("npub.cash balance:", balance, "sats");
      if (balance > 0) {
        const token = await this.getClaim();
        if (token) {
          console.log("Claimed token from npub.cash");
          this.lastCheck = Date.now();
          return token;
        }
      }
      this.lastCheck = Date.now();
      return null;
    } catch (e) {
      console.error("Failed to claim tokens:", e);
      return null;
    }
  }
  /**
   * Enable npub.cash integration
   */
  setEnabled(enabled) {
    this.enabled = enabled;
    settings.wallet.npubCashEnabled = enabled;
    settings.save();
  }
}
const npubCash = new NpubCashStore();

export { npubCash as n };
//# sourceMappingURL=npubcash.svelte-CJyS_ttu.js.map
