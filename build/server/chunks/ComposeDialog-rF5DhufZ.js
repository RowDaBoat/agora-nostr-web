import { s as stringify, a as attr_class, c as clsx, f as bind_props, b as attr, e as ensure_array_like, d as attr_style } from './index2-DpBdzO5t.js';
import { n as ndk, s as settings } from './ndk.svelte-BfhDBrJw.js';
import { NDKBlossomList, wrapEvent, NDKKind, zapInvoiceFromEvent, NDKEvent, NDKZapper, NDKRelaySet } from '@nostr-dev-kit/ndk';
import 'clsx';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import { t as toast } from './toast.svelte-BEvONWAz.js';
import { u as useRelayInfoCached } from './relayInfo.svelte-CrGOXzx2.js';
import { R as Root, D as Dialog_content, a as Dialog_title } from './index3-DOo-Ka_h.js';
import { B as Button } from './button-DBIbgud-.js';
import { D as DEFAULT_RETRY_OPTIONS, a as DebugLogger, C as CustomLogger, N as NDKBlossomError, u as uploadFile, b as NDKBlossomUploadError, f as fixUrl, c as fetchWithRetry, d as NDKBlossomNotFoundError, g as getBlobUrlByHash, e as NDKBlossomAuthError, h as checkBlobExists, i as NDKBlossomOptimizationError } from './url-healing-Vba5GwtC.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { c as cn$1, U as User } from './index4-D71bD0RT.js';
import { I as Icon, R as RelayPublishDropdownContent } from './RelayPublishDropdownContent-CzmVdnh5.js';
import { E as EventCard } from './index5-D9xIoHLj.js';
import { c as cn } from './utils2-B05Dmz_H.js';
import './button2-JT-_T3Ay.js';
import { r as resolveNDK } from './index.svelte-EYlAHNHC.js';
import { W as getContext } from './context-D7LG2f18.js';
import { T } from './index-BCLI0M1W.js';
import { g as goto } from './client-C1nnVzci.js';
import { a9 as SvelteMap } from './scroll-lock-YhRhLzPR.js';

function createReplyAction(config, ndk2) {
  const resolvedNDK = resolveNDK(ndk2);
  const stats = /* @__PURE__ */ (() => {
    return { count: 0, hasReplied: false, pubkeys: [] };
  })();
  async function reply(content) {
    const { event } = config();
    if (!event?.id) {
      throw new Error("No event to reply to");
    }
    if (!resolvedNDK.$currentPubkey) {
      throw new Error("User must be logged in to reply");
    }
    const replyEvent = event.reply();
    replyEvent.content = content;
    await replyEvent.publish();
    return replyEvent;
  }
  return {
    get count() {
      return stats.count;
    },
    get hasReplied() {
      return stats.hasReplied;
    },
    get pubkeys() {
      return stats.pubkeys;
    },
    reply
  };
}
function Reply($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { size = 20, class: className = "" } = $$props;
    $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"${attr("width", size)}${attr("height", size)} fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${attr_class(clsx(cn$1("", className)))}><path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg>`);
  });
}
function createReactionAction(config, ndk2) {
  const resolvedNDK = resolveNDK(ndk2);
  const pendingReactions = new SvelteMap();
  const all = (() => {
    const reactions = [];
    const byEmoji = new SvelteMap();
    for (const reaction of reactions) {
      const emoji = reaction.content;
      const data = byEmoji.get(emoji) || { count: 0, hasReacted: false, pubkeys: [] };
      data.count++;
      const emojiTag = reaction.tags.find((t) => t[0] === "emoji");
      if (emojiTag && emojiTag[1] && emojiTag[2]) {
        data.shortcode = emojiTag[1];
        data.url = emojiTag[2];
      }
      if (!data.pubkeys.includes(reaction.pubkey)) {
        data.pubkeys.push(reaction.pubkey);
      }
      if (reaction.pubkey === resolvedNDK.$currentPubkey) {
        data.hasReacted = true;
        data.userReaction = reaction;
      }
      byEmoji.set(emoji, data);
    }
    for (const [emoji, { event: pendingEvent }] of pendingReactions.entries()) {
      const data = byEmoji.get(emoji) || { count: 0, hasReacted: false, pubkeys: [] };
      const emojiTag = pendingEvent.tags.find((t) => t[0] === "emoji");
      if (emojiTag && emojiTag[1] && emojiTag[2]) {
        data.shortcode = emojiTag[1];
        data.url = emojiTag[2];
      }
      if (!data.hasReacted) {
        data.count++;
        data.hasReacted = true;
        if (!data.pubkeys.includes(resolvedNDK.$currentPubkey)) {
          data.pubkeys.push(resolvedNDK.$currentPubkey);
        }
        data.userReaction = pendingEvent;
      }
      byEmoji.set(emoji, data);
    }
    return Array.from(byEmoji.entries()).map(([emoji, data]) => ({ emoji, ...data })).sort((a, b) => b.count - a.count);
  })();
  async function react(emojiOrData) {
    const { event, delayed } = config();
    if (!event?.id) {
      throw new Error("No event to react to");
    }
    if (!resolvedNDK.$currentPubkey) {
      throw new Error("User must be logged in to react");
    }
    const emoji = typeof emojiOrData === "string" ? emojiOrData : emojiOrData.emoji;
    const pending = pendingReactions.get(emoji);
    if (pending) {
      clearTimeout(pending.timer);
      pendingReactions.delete(emoji);
      return;
    }
    const existingReaction = all.find((r) => r.emoji === emoji);
    if (existingReaction?.hasReacted && existingReaction.userReaction) {
      await existingReaction.userReaction.delete();
      return;
    }
    const reactionEvent = await event.react(emoji, false);
    if (typeof emojiOrData !== "string" && emojiOrData.shortcode && emojiOrData.url) {
      reactionEvent.tags.push(["emoji", emojiOrData.shortcode, emojiOrData.url]);
    }
    if (delayed && delayed > 0) {
      const timer = setTimeout(
        async () => {
          await reactionEvent.publish();
          pendingReactions.delete(emoji);
        },
        delayed * 1e3
      );
      pendingReactions.set(emoji, { timer, event: reactionEvent });
    } else {
      await reactionEvent.publish();
    }
  }
  function get(emoji) {
    return all.find((r) => r.emoji === emoji);
  }
  const totalCount = all.reduce((sum, r) => sum + r.count, 0);
  return {
    get all() {
      return all;
    },
    get totalCount() {
      return totalCount;
    },
    get,
    react
  };
}
function createRepostAction(config, ndk2) {
  const resolvedNDK = resolveNDK(ndk2);
  const stats = /* @__PURE__ */ (() => {
    return { count: 0, hasReposted: false, pubkeys: [] };
  })();
  async function repost() {
    const { event } = config();
    if (!event?.id) {
      throw new Error("No event to repost");
    }
    if (!resolvedNDK.$currentPubkey) {
      throw new Error("User must be logged in to repost");
    }
    const repostEvent = await event.repost(true);
    return repostEvent;
  }
  async function quote(content) {
    const { event } = config();
    if (!event?.id) {
      throw new Error("No event to quote");
    }
    if (!resolvedNDK.$currentPubkey) {
      throw new Error("User must be logged in to quote");
    }
    const quoteEvent = new NDKEvent(ndk2, { kind: NDKKind.Text, content });
    quoteEvent.tag(event, void 0, false, "q");
    await quoteEvent.publish();
    return quoteEvent;
  }
  return {
    get count() {
      return stats.count;
    },
    get hasReposted() {
      return stats.hasReposted;
    },
    get pubkeys() {
      return stats.pubkeys;
    },
    repost,
    quote
  };
}
function Repost($$renderer, $$props) {
  let { class: className = "", size = 18 } = $$props;
  $$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"${attr("width", size)}${attr("height", size)} fill="none"${attr_class(clsx(className))} aria-hidden="true"><path d="M16.3884 3L17.3913 3.97574C17.8393 4.41165 18.0633 4.62961 17.9844 4.81481C17.9056 5 17.5888 5 16.9552 5H9.19422C5.22096 5 2 8.13401 2 12C2 13.4872 2.47668 14.8662 3.2895 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.61156 21L6.60875 20.0243C6.16074 19.5883 5.93673 19.3704 6.01557 19.1852C6.09441 19 6.4112 19 7.04478 19H14.8058C18.779 19 22 15.866 22 12C22 10.5128 21.5233 9.13383 20.7105 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
}
function createZapAction(config, ndk2) {
  const resolvedNDK = ndk2 || getContext("ndk");
  let optimisticZapAmount = 0;
  let optimisticUserZapped = false;
  const stats = /* @__PURE__ */ (() => {
    return {
      count: optimisticUserZapped ? 1 : 0,
      totalAmount: optimisticZapAmount,
      hasZapped: optimisticUserZapped
    };
  })();
  async function zap(amount, comment) {
    const { target } = config();
    if (!target) {
      throw new Error("No target to zap");
    }
    if (!resolvedNDK.$currentPubkey) {
      throw new Error("User must be logged in to zap");
    }
    optimisticZapAmount = amount;
    optimisticUserZapped = true;
    try {
      const zapper = new NDKZapper(target, amount * 1e3, "msat", { comment });
      await zapper.zap();
      setTimeout(
        () => {
          optimisticZapAmount = 0;
          optimisticUserZapped = false;
        },
        3e3
      );
    } catch (error) {
      optimisticZapAmount = 0;
      optimisticUserZapped = false;
      throw error;
    }
  }
  const events = [];
  return {
    get count() {
      return stats.count;
    },
    get totalAmount() {
      return stats.totalAmount;
    },
    get hasZapped() {
      return stats.hasZapped;
    },
    get events() {
      return events;
    },
    zap
  };
}
function Zap($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { size = 18, filled = false, class: className = "" } = $$props;
    $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"${attr("width", size)}${attr("height", size)}${attr("fill", filled ? "currentColor" : "none")} stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"${attr_class(clsx(cn$1("", className)))}><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"></path></svg>`);
  });
}
class DefaultSHA256Calculator {
  /**
   * Calculate SHA256 hash of a file
   *
   * @param file File to hash
   * @returns Hash as hex string
   */
  async calculateSha256(file) {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
}
let _defaultSHA256Calculator;
function getDefaultSHA256Calculator() {
  if (!_defaultSHA256Calculator) {
    _defaultSHA256Calculator = new DefaultSHA256Calculator();
  }
  return _defaultSHA256Calculator;
}
const defaultSHA256Calculator = {
  calculateSha256: async (file) => {
    return getDefaultSHA256Calculator().calculateSha256(file);
  }
};
class NDKBlossom {
  /**
   * Constructor for NDKBlossom
   * @param ndk NDK instance
   * @param signer Optional signer to use for authentication (falls back to ndk.signer)
   */
  constructor(ndk2, signer) {
    this.serverConfigs = /* @__PURE__ */ new Map();
    this.debugMode = false;
    this.ndk = ndk2;
    this.signer = signer;
    this.retryOptions = DEFAULT_RETRY_OPTIONS;
    this.logger = new DebugLogger();
    this.sha256Calculator = defaultSHA256Calculator;
  }
  /**
   * Enable or disable debug mode
   */
  set debug(value) {
    this.debugMode = value;
  }
  /**
   * Get debug mode status
   */
  get debug() {
    return this.debugMode;
  }
  /**
   * Set custom logger
   */
  set loggerFunction(logFn) {
    this.logger = new CustomLogger(logFn);
  }
  /**
   * Set a custom SHA256 calculator implementation
   * @param calculator Custom SHA256 calculator
   */
  setSHA256Calculator(calculator) {
    this.sha256Calculator = calculator;
  }
  /**
   * Get the current SHA256 calculator implementation
   * @returns Current SHA256 calculator
   */
  getSHA256Calculator() {
    return this.sha256Calculator;
  }
  set serverList(serverList) {
    this._serverList = serverList;
  }
  async getServerList(user) {
    if (this._serverList) {
      this.logger.debug(`Using cached server list with ${this._serverList.servers.length} servers`);
      return this._serverList;
    }
    user ?? (user = this.ndk.activeUser);
    if (!user) {
      this.logger.error("No user available to fetch server list");
      throw new NDKBlossomError("No user available to fetch server list", "NO_SIGNER");
    }
    this.logger.debug(`Fetching server list for user ${user.pubkey}`);
    const filter = { kinds: NDKBlossomList.kinds, authors: [user.pubkey] };
    const event = await this.ndk.fetchEvent(filter);
    if (!event) {
      this.logger.warn(`No blossom server list event found for user ${user.pubkey}`);
      return void 0;
    }
    this._serverList = wrapEvent(event);
    this.logger.debug(`Found server list with ${this._serverList.servers.length} servers: ${this._serverList.servers.join(", ")}`);
    return this._serverList;
  }
  /**
   * Uploads a file to a Blossom server
   * @param file The file to upload
   * @param options Upload options
   * @returns Image metadata
   */
  async upload(file, options = {}) {
    try {
      if (this.onUploadProgress) {
        options.onProgress = (progress) => {
          if (this.onUploadProgress) {
            return this.onUploadProgress(progress, file, "unknown");
          }
          return "continue";
        };
      }
      if (!options.sha256Calculator) {
        options.sha256Calculator = this.getSHA256Calculator();
      }
      if (!options.signer) {
        options.signer = this.signer;
      }
      const result = await uploadFile(this, file, options);
      return result;
    } catch (error) {
      if (this.onUploadFailed && error instanceof Error) {
        this.onUploadFailed(error.message, error instanceof NDKBlossomUploadError ? error.serverUrl : void 0, file);
      }
      throw error;
    }
  }
  /**
   * Fixes a Blossom URL by finding an alternative server with the same blob
   * @param user The user whose servers to check
   * @param url The URL to fix
   * @returns A fixed URL pointing to a valid Blossom server
   */
  async fixUrl(user, url) {
    return fixUrl(this.ndk, user, url);
  }
  /**
   * Gets a blob from a URL
   * @param url The URL of the blob
   * @returns The blob response
   */
  async getBlob(url) {
    try {
      return await fetchWithRetry(url, {}, this.retryOptions);
    } catch (error) {
      throw new NDKBlossomNotFoundError(`Failed to fetch blob: ${error.message}`, "BLOB_NOT_FOUND", url, error);
    }
  }
  /**
   * Gets a blob by its hash from one of the user's servers
   * @param user The user whose servers to check
   * @param hash The hash of the blob
   * @returns The blob response
   */
  async getBlobByHash(user, hash) {
    const url = await getBlobUrlByHash(this.ndk, user, hash);
    return this.getBlob(url);
  }
  /**
   * Lists blobs for a user
   * @param user The user whose blobs to list
   * @returns Array of blob descriptors
   */
  async listBlobs(user) {
    const serverList = await this.getServerList();
    let serverUrls = [];
    if (serverList)
      serverUrls = serverList.servers;
    if (serverUrls.length === 0) {
      this.logger.error(`No servers found for user ${user.pubkey}`);
      return [];
    }
    const blobMap = /* @__PURE__ */ new Map();
    for (const serverUrl of serverUrls) {
      try {
        const baseUrl = serverUrl.endsWith("/") ? serverUrl.slice(0, -1) : serverUrl;
        const url = `${baseUrl}/list/${user.pubkey}`;
        const response = await fetchWithRetry(url, {}, this.retryOptions);
        if (!response.ok) {
          continue;
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          for (const blob of data) {
            const imeta = {
              url: blob.url,
              size: blob.size?.toString(),
              m: blob.mime_type,
              x: blob.sha256,
              dim: blob.width && blob.height ? `${blob.width}x${blob.height}` : void 0,
              blurhash: blob.blurhash,
              alt: blob.alt
            };
            if (blob.sha256) {
              blobMap.set(blob.sha256, imeta);
            }
          }
        }
      } catch (error) {
        this.logger.error(`Error listing blobs on server ${serverUrl}:`, error);
      }
    }
    return Array.from(blobMap.values());
  }
  /**
   * Deletes a blob
   * @param hash The hash of the blob to delete
   * @returns True if successful
   */
  async deleteBlob(hash) {
    const signer = this.signer ?? this.ndk.signer;
    if (!signer) {
      throw new NDKBlossomAuthError("No signer available to delete blob", "NO_SIGNER");
    }
    const pubkey = (await signer.user()).pubkey;
    const filter = { kinds: [NDKKind.BlossomList], authors: [pubkey] };
    const event = await this.ndk.fetchEvent(filter);
    let serverUrls = [];
    if (event) {
      serverUrls = event.tags.filter((tag) => tag[0] === "server" && tag[1]).map((tag) => tag[1]);
    }
    if (serverUrls.length === 0) {
      this.logger.error(`No servers found for user ${pubkey}`);
      return false;
    }
    let success = false;
    for (const serverUrl of serverUrls) {
      try {
        const baseUrl = serverUrl.endsWith("/") ? serverUrl.slice(0, -1) : serverUrl;
        const url = `${baseUrl}/${hash}`;
        const options = await createAuthenticatedFetchOptions(this.ndk, "delete", {
          sha256: hash,
          content: `Delete blob ${hash}`,
          signer,
          fetchOptions: {
            method: "DELETE"
          }
        });
        const response = await fetchWithRetry(url, options, this.retryOptions);
        if (response.ok) {
          success = true;
        }
      } catch (error) {
        this.logger.error(`Error deleting blob on server ${serverUrl}:`, error);
      }
    }
    return success;
  }
  /**
   * Checks if a server has a blob
   * @param serverUrl The URL of the server
   * @param hash The hash of the blob
   * @returns True if the server has the blob
   */
  async checkServerForBlob(serverUrl, hash) {
    return checkBlobExists(serverUrl, hash);
  }
  /**
   * Sets retry options for network operations
   * @param options Retry options
   */
  setRetryOptions(options) {
    this.retryOptions = {
      ...this.retryOptions,
      ...options
    };
  }
  /**
   * Sets server-specific configuration
   * @param serverUrl The URL of the server
   * @param config Server configuration
   */
  setServerConfig(serverUrl, config) {
    this.serverConfigs.set(serverUrl, config);
  }
  /**
   * Gets an optimized version of a blob
   * @param url The URL of the blob
   * @param options Optimization options
   * @returns The optimized blob response
   */
  async getOptimizedBlob(url, options = {}) {
    try {
      const urlObj = new URL(url);
      const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
      const hash = urlObj.pathname.split("/").pop();
      if (!hash) {
        throw new NDKBlossomOptimizationError("Invalid URL, no hash found", "BLOB_NOT_FOUND", url);
      }
      let mediaUrl = `${baseUrl}/media/${hash}`;
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(options)) {
        if (value !== void 0) {
          params.append(key, value.toString());
        }
      }
      if (params.toString()) {
        mediaUrl += `?${params.toString()}`;
      }
      const response = await fetchWithRetry(mediaUrl, {}, this.retryOptions);
      if (!response.ok) {
        throw new NDKBlossomOptimizationError(`Failed to get optimized blob: ${response.status} ${response.statusText}`, "SERVER_REJECTED", url);
      }
      return response;
    } catch (error) {
      if (error instanceof NDKBlossomOptimizationError) {
        throw error;
      }
      throw new NDKBlossomOptimizationError(`Failed to get optimized blob: ${error.message}`, "SERVER_UNSUPPORTED", url, error);
    }
  }
  /**
   * Gets an optimized URL for a blob
   * @param url The URL of the blob
   * @param options Optimization options
   * @returns The optimized URL
   */
  async getOptimizedUrl(url, options = {}) {
    const urlObj = new URL(url);
    const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
    const hash = urlObj.pathname.split("/").pop();
    if (!hash) {
      throw new NDKBlossomOptimizationError("Invalid URL, no hash found", "BLOB_NOT_FOUND", url);
    }
    let mediaUrl = `${baseUrl}/media/${hash}`;
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(options)) {
      if (value !== void 0) {
        params.append(key, value.toString());
      }
    }
    if (params.toString()) {
      mediaUrl += `?${params.toString()}`;
    }
    return mediaUrl;
  }
  /**
   * Generates a srcset for responsive images
   * @param url The base URL of the image
   * @param sizes Array of size configurations
   * @returns A srcset string
   */
  generateSrcset(url, sizes) {
    const srcset = [];
    const urlObj = new URL(url);
    const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
    const hash = urlObj.pathname.split("/").pop();
    if (!hash) {
      return "";
    }
    for (const size of sizes) {
      const params = new URLSearchParams();
      params.append("width", size.width.toString());
      if (size.format) {
        params.append("format", size.format);
      }
      const mediaUrl = `${baseUrl}/media/${hash}?${params.toString()}`;
      srcset.push(`${mediaUrl} ${size.width}w`);
    }
    return srcset.join(", ");
  }
}
async function createAuthenticatedFetchOptions(ndk2, action, options = {}) {
  const { createAuthenticatedFetchOptions: authFn } = await import('./url-healing-Vba5GwtC.js').then((n) => n.j);
  return authFn(ndk2, action, options);
}
function SelectedUserBadge($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { pubkey } = $$props;
    const displayName = `${pubkey.slice(0, 8)}...`;
    $$renderer2.push(`<button type="button" class="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 hover:bg-primary/30 text-foreground rounded-full text-xs transition-colors"><!---->`);
    User.Root($$renderer2, {
      ndk,
      pubkey,
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->`);
        User.Avatar($$renderer3, { class: "w-3.5 h-3.5 flex-shrink-0" });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> <span class="max-w-[100px] truncate">${escape_html(displayName)}</span> <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
  });
}
function UserListItem($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { pubkey, isSelected, showCheckbox } = $$props;
    const displayName = `${pubkey.slice(0, 8)}...`;
    $$renderer2.push(`<button type="button"${attr_class(`w-full flex items-center gap-2 p-2 rounded-md transition-colors ${isSelected ? "bg-primary/20" : "hover:bg-muted"}`)}><!---->`);
    User.Root($$renderer2, {
      ndk,
      pubkey,
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->`);
        User.Avatar($$renderer3, { class: "flex-shrink-0" });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> <div class="flex-1 min-w-0 text-left"><div class="text-sm font-medium text-foreground truncate">${escape_html(displayName)}</div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (showCheckbox) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${isSelected ? "bg-primary border-primary" : "border-border"}`)}>`);
      if (isSelected) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<svg class="w-3 h-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></button>`);
  });
}
function UserSelectorDropdown($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      searchQuery = void 0,
      isIdentifierInput,
      selectedPubkeys,
      filteredFollows,
      multiple,
      onSearchQueryChange,
      onAddByIdentifier,
      onRemoveUser,
      onToggleUser
    } = $$props;
    $$renderer2.push(`<div class="flex flex-col max-h-[400px]"><div class="p-3 border-b border-border"><h3 class="font-semibold text-sm mb-2">Tag people</h3> <div class="relative"><svg class="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> <input type="text"${attr("value", searchQuery)} placeholder="Search or paste npub/identifier..." class="w-full pl-8 pr-16 py-2 bg-muted border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"/> `);
    if (isIdentifierInput) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button type="button" class="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded text-xs font-medium transition-colors">Add</button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (!searchQuery) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-xs text-muted-foreground mt-1.5">Search follows or paste npub/hex/NIP-05</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (selectedPubkeys.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="px-3 py-2 border-b border-border bg-muted/30"><div class="text-xs font-medium text-muted-foreground mb-2">Selected (${escape_html(selectedPubkeys.length)})</div> <div class="flex flex-wrap gap-1.5"><!--[-->`);
      const each_array = ensure_array_like(selectedPubkeys);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let pubkey = each_array[$$index];
        SelectedUserBadge($$renderer2, { pubkey });
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="overflow-y-auto flex-1">`);
    if (filteredFollows.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-8 px-3 text-muted-foreground text-sm">${escape_html(searchQuery ? "No matches found" : "You don't follow anyone yet")}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="p-2 space-y-1"><!--[-->`);
      const each_array_1 = ensure_array_like(filteredFollows);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let pubkey = each_array_1[$$index_1];
        UserListItem($$renderer2, {
          pubkey,
          isSelected: selectedPubkeys.includes(pubkey),
          showCheckbox: multiple
        });
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, { searchQuery });
  });
}
function UserSelector($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      selectedPubkeys = [],
      onSelect,
      multiple = true,
      buttonClass = "",
      buttonLabel,
      disabled = false,
      iconOnly = true,
      open = false
    } = $$props;
    let searchQuery = "";
    let buttonElement = null;
    let dropdownPosition = { top: 0, left: 0 };
    const contactListSubscription = ndk.$subscribe(() => ndk.$currentUser?.pubkey ? {
      filters: [{ kinds: [3], authors: [ndk.$currentUser.pubkey], limit: 1 }],
      bufferMs: 100
    } : void 0);
    const userFollows = (() => {
      const contactList = contactListSubscription.events[0];
      if (!contactList) return /* @__PURE__ */ new Set();
      return new Set(contactList.tags.filter((tag) => tag[0] === "p").map((tag) => tag[1]));
    })();
    let cachedFilteredProfiles = /* @__PURE__ */ new Map();
    const filteredFollows = (() => {
      if (!searchQuery) return Array.from(userFollows).slice(0, 50);
      const filtered = Array.from(cachedFilteredProfiles.entries()).filter(([pubkey]) => userFollows.has(pubkey)).map(([pubkey]) => pubkey);
      return filtered.slice(0, 50);
    })();
    function handleClick() {
      if (!open && buttonElement) {
        const rect = buttonElement.getBoundingClientRect();
        dropdownPosition = {
          top: rect.bottom + 4,
          left: rect.left,
          width: Math.max(rect.width, 380)
        };
      }
      open = !open;
    }
    const isModalMode = buttonClass.includes("hidden");
    function toggleUser(pubkey) {
      if (multiple) {
        if (selectedPubkeys.includes(pubkey)) {
          selectedPubkeys = selectedPubkeys.filter((p) => p !== pubkey);
        } else {
          selectedPubkeys = [...selectedPubkeys, pubkey];
        }
      } else {
        selectedPubkeys = [pubkey];
        open = false;
      }
      onSelect?.(selectedPubkeys);
    }
    function removeUser(pubkey) {
      selectedPubkeys = selectedPubkeys.filter((p) => p !== pubkey);
      onSelect?.(selectedPubkeys);
    }
    async function addByIdentifier() {
      if (!searchQuery.trim()) return;
      try {
        const input = searchQuery.trim();
        const user = await ndk.fetchUser(input);
        if (user?.pubkey) {
          if (multiple) {
            if (!selectedPubkeys.includes(user.pubkey)) {
              selectedPubkeys = [...selectedPubkeys, user.pubkey];
              onSelect?.(selectedPubkeys);
              toast.success("User added");
            }
          } else {
            selectedPubkeys = [user.pubkey];
            onSelect?.(selectedPubkeys);
            open = false;
          }
          searchQuery = "";
        } else {
          toast.error("User not found");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        toast.error("Failed to fetch user");
      }
    }
    const isIdentifierInput = (() => {
      const query = searchQuery.trim();
      return query.length > 0 && (query.startsWith("npub1") || query.startsWith("nprofile1") || query.includes("@") || query.length === 64 && /^[0-9a-f]+$/i.test(query));
    })();
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="relative">`);
      Button($$renderer3, {
        type: "button",
        variant: "ghost",
        size: iconOnly ? "icon" : "default",
        class: `${stringify(iconOnly ? "h-8 w-8" : "w-full justify-start")} ${stringify(buttonClass)}`,
        disabled,
        onclick: handleClick,
        title: buttonLabel || "Tag people",
        get ref() {
          return buttonElement;
        },
        set ref($$value) {
          buttonElement = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          if (!iconOnly && buttonLabel) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> <span>${escape_html(buttonLabel)}</span> `);
            if (selectedPubkeys.length > 0) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<span class="ml-auto text-xs bg-primary/20 text-primary rounded-full px-2 py-0.5">${escape_html(selectedPubkeys.length)}</span>`);
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]-->`);
          } else {
            $$renderer4.push("<!--[!-->");
            $$renderer4.push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>`);
            if (selectedPubkeys.length > 0) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<span class="absolute -top-1 -right-1 text-[10px] bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">${escape_html(selectedPubkeys.length)}</span>`);
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]-->`);
          }
          $$renderer4.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      if (open) {
        $$renderer3.push("<!--[-->");
        if (isModalMode) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div role="presentation" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"><div role="dialog" tabindex="-1" style="width: 380px;" class="bg-card border border-border rounded-lg shadow-xl overflow-hidden">`);
          UserSelectorDropdown($$renderer3, {
            isIdentifierInput,
            selectedPubkeys,
            filteredFollows,
            multiple,
            onSearchQueryChange: (value) => searchQuery = value,
            onAddByIdentifier: addByIdentifier,
            onRemoveUser: removeUser,
            onToggleUser: toggleUser,
            get searchQuery() {
              return searchQuery;
            },
            set searchQuery($$value) {
              searchQuery = $$value;
              $$settled = false;
            }
          });
          $$renderer3.push(`<!----></div></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<div${attr_style(`position: fixed; top: ${stringify(dropdownPosition.top)}px; left: ${stringify(dropdownPosition.left)}px; width: 380px;`)} class="bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden">`);
          UserSelectorDropdown($$renderer3, {
            isIdentifierInput,
            selectedPubkeys,
            filteredFollows,
            multiple,
            onSearchQueryChange: (value) => searchQuery = value,
            onAddByIdentifier: addByIdentifier,
            onRemoveUser: removeUser,
            onToggleUser: toggleUser,
            get searchQuery() {
              return searchQuery;
            },
            set searchQuery($$value) {
              searchQuery = $$value;
              $$settled = false;
            }
          });
          $$renderer3.push(`<!----></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { selectedPubkeys, open });
  });
}
function MentionPickerItem($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { pubkey, isSelected } = $$props;
    $$renderer2.push(`<button type="button"${attr_class(`w-full flex items-center gap-2 p-2 transition-colors ${isSelected ? "bg-primary/20" : "hover:bg-muted"}`)}><!---->`);
    User.Root($$renderer2, {
      ndk,
      pubkey,
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->`);
        User.Avatar($$renderer3, { class: "flex-shrink-0" });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> <div class="flex-1 min-w-0 text-left"><div class="text-sm font-medium text-foreground truncate">${escape_html("Anonymous")}</div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></button>`);
  });
}
function MentionPicker($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { position, searchQuery } = $$props;
    let selectedIndex = 0;
    const contactListSubscription = ndk.$subscribe(() => ndk.$currentUser?.pubkey ? {
      filters: [{ kinds: [3], authors: [ndk.$currentUser.pubkey], limit: 1 }],
      bufferMs: 100
    } : void 0);
    const userFollows = (() => {
      const contactList = contactListSubscription.events[0];
      if (!contactList) return /* @__PURE__ */ new Set();
      return new Set(contactList.tags.filter((tag) => tag[0] === "p").map((tag) => tag[1]));
    })();
    let cachedFilteredProfiles = /* @__PURE__ */ new Map();
    const filteredFollows = (() => {
      if (!searchQuery) return Array.from(userFollows).slice(0, 10);
      const filtered = Array.from(cachedFilteredProfiles.entries()).filter(([pubkey]) => userFollows.has(pubkey)).map(([pubkey]) => pubkey);
      return filtered.slice(0, 10);
    })();
    if (filteredFollows.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_style(`position: fixed; top: ${stringify(position.top)}px; left: ${stringify(position.left)}px; max-width: 320px;`)} class="bg-card border border-border rounded-lg shadow-xl z-[1003] overflow-hidden"><div class="max-h-[300px] overflow-y-auto"><!--[-->`);
      const each_array = ensure_array_like(filteredFollows);
      for (let index = 0, $$length = each_array.length; index < $$length; index++) {
        let pubkey = each_array[index];
        MentionPickerItem($$renderer2, {
          pubkey,
          isSelected: index === selectedIndex
        });
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function useMentionPicker(textareaElement, value, setValue) {
  const state = {
    show: false,
    searchQuery: "",
    startIndex: 0,
    position: { top: 0, left: 0 },
    markers: /* @__PURE__ */ new Map()
  };
  function getCaretCoordinates(textarea) {
    const cursorPosition = textarea.selectionStart;
    const div = document.createElement("div");
    const styles = window.getComputedStyle(textarea);
    const properties = [
      "boxSizing",
      "width",
      "height",
      "overflowX",
      "overflowY",
      "borderTopWidth",
      "borderRightWidth",
      "borderBottomWidth",
      "borderLeftWidth",
      "paddingTop",
      "paddingRight",
      "paddingBottom",
      "paddingLeft",
      "fontStyle",
      "fontVariant",
      "fontWeight",
      "fontStretch",
      "fontSize",
      "lineHeight",
      "fontFamily",
      "textAlign",
      "textTransform",
      "textIndent",
      "textDecoration",
      "letterSpacing",
      "wordSpacing"
    ];
    properties.forEach((prop) => {
      div.style[prop] = styles[prop];
    });
    div.style.position = "absolute";
    div.style.visibility = "hidden";
    div.style.whiteSpace = "pre-wrap";
    div.style.wordWrap = "break-word";
    document.body.appendChild(div);
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);
    div.textContent = textBeforeCursor;
    const span = document.createElement("span");
    span.textContent = textarea.value.substring(cursorPosition) || ".";
    div.appendChild(span);
    const rect = textarea.getBoundingClientRect();
    const coordinates = {
      top: rect.top + span.offsetTop + parseInt(styles.borderTopWidth) - textarea.scrollTop + 20,
      left: rect.left + span.offsetLeft + parseInt(styles.borderLeftWidth)
    };
    document.body.removeChild(div);
    return coordinates;
  }
  function handleInput(event) {
    const textarea = event.target;
    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf("@");
    if (lastAtIndex !== -1) {
      const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1);
      const charBeforeAt = lastAtIndex > 0 ? textBeforeCursor[lastAtIndex - 1] : " ";
      const hasSpaceAfterAt = textAfterAt.includes(" ") || textAfterAt.includes("\n");
      if ((charBeforeAt === " " || charBeforeAt === "\n" || lastAtIndex === 0) && !hasSpaceAfterAt) {
        state.startIndex = lastAtIndex;
        state.searchQuery = textAfterAt;
        state.position = getCaretCoordinates(textarea);
        state.show = true;
        return;
      }
    }
    state.show = false;
  }
  async function insertMention(nprofile) {
    const textarea = textareaElement();
    if (!textarea) return;
    const currentValue = value();
    const cursorPosition = textarea.selectionStart;
    const pubkeyMatch = nprofile.match(/nostr:nprofile1([a-z0-9]+)/);
    if (!pubkeyMatch) return;
    const user = ndk.getUser({ nprofile: nprofile.replace("nostr:", "") });
    await user.fetchProfile();
    const marker = user.profile?.nip05 ? `@${user.profile.nip05}` : `@${user.profile?.displayName || user.profile?.name || user.npub.slice(0, 12)}`;
    state.markers.set(marker, nprofile);
    const beforeMention = currentValue.substring(0, state.startIndex);
    const afterMention = currentValue.substring(cursorPosition);
    setValue(beforeMention + marker + " " + afterMention);
    const newCursorPos = state.startIndex + marker.length + 1;
    setTimeout(
      () => {
        textarea.selectionStart = textarea.selectionEnd = newCursorPos;
        textarea.focus();
      },
      0
    );
    state.show = false;
    state.searchQuery = "";
  }
  function closeMentionPicker() {
    state.show = false;
    state.searchQuery = "";
  }
  function getContentWithNostrEntities(content) {
    let result = content;
    for (const [marker, entity] of state.markers) {
      while (result.includes(marker)) {
        result = result.replace(marker, entity);
      }
    }
    return result;
  }
  function reset() {
    state.markers.clear();
    state.show = false;
    state.searchQuery = "";
  }
  return {
    get show() {
      return state.show;
    },
    get searchQuery() {
      return state.searchQuery;
    },
    get position() {
      return state.position;
    },
    handleInput,
    insertMention,
    closeMentionPicker,
    getContentWithNostrEntities,
    reset
  };
}
function ContentComposer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = "",
      placeholder = "What's on your mind?",
      autofocus = false,
      disabled = false,
      class: className = "",
      relayButton,
      selectedMentions = [],
      onMentionsChange
    } = $$props;
    new NDKBlossom(ndk);
    let textareaElement;
    let uploadedImages = [];
    let isUploading = false;
    const mentionPicker = useMentionPicker(() => textareaElement, () => value, (v) => value = v);
    function triggerFileInput() {
    }
    function getContentWithNostrEntities() {
      return mentionPicker.getContentWithNostrEntities(value);
    }
    function reset() {
      value = "";
      mentionPicker.reset();
      uploadedImages = [];
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div${attr_class(`relative flex-1 flex flex-col ${stringify(className)}`)}><input type="file" accept="image/*" multiple class="hidden"/> <div${attr_class(`flex-1 flex flex-col ${stringify("")}`)}><textarea${attr("placeholder", placeholder)}${attr("autofocus", autofocus, true)}${attr("disabled", disabled, true)} class="w-full min-h-[120px] max-md:flex-1 max-md:min-h-0 bg-transparent text-foreground placeholder-neutral-500 resize-none focus:outline-none focus:ring-0 text-lg">`);
      const $$body = escape_html(value);
      if ($$body) {
        $$renderer3.push(`${$$body}`);
      }
      $$renderer3.push(`</textarea> `);
      if (uploadedImages.length > 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="flex flex-wrap gap-2 mt-2"><!--[-->`);
        const each_array = ensure_array_like(uploadedImages);
        for (let index = 0, $$length = each_array.length; index < $$length; index++) {
          let image = each_array[index];
          $$renderer3.push(`<div class="relative group"><img${attr("src", image.preview)} alt="Upload preview"${attr_class(`w-20 h-20 object-cover rounded-lg border ${stringify(image.url ? "" : "opacity-50 animate-pulse")}`)}/> `);
          if (!image.url) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="absolute inset-0 flex items-center justify-center"><div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<button type="button" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600" aria-label="Remove image"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
          }
          $$renderer3.push(`<!--]--></div>`);
        }
        $$renderer3.push(`<!--]--></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> <div class="flex items-center gap-2 mt-2 pt-2 border-t border-border">`);
      if (relayButton) {
        $$renderer3.push("<!--[-->");
        relayButton($$renderer3);
        $$renderer3.push(`<!---->`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      Button($$renderer3, {
        type: "button",
        variant: "ghost",
        size: "icon",
        onclick: triggerFileInput,
        disabled: disabled || isUploading,
        class: "h-8 w-8",
        title: "Add image",
        children: ($$renderer4) => {
          $$renderer4.push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      UserSelector($$renderer3, {
        onSelect: onMentionsChange,
        disabled,
        get selectedPubkeys() {
          return selectedMentions;
        },
        set selectedPubkeys($$value) {
          selectedMentions = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div></div> `);
      if (mentionPicker.show) {
        $$renderer3.push("<!--[-->");
        MentionPicker($$renderer3, {
          position: mentionPicker.position,
          searchQuery: mentionPicker.searchQuery
        });
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]-->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { value, selectedMentions, getContentWithNostrEntities, reset });
  });
}
function useModalRelaySelection(isOpen) {
  const state = { selectedRelayUrls: [] };
  const allRelays = settings.relays.filter((r) => r.enabled);
  return {
    get selectedRelayUrls() {
      return state.selectedRelayUrls;
    },
    set selectedRelayUrls(value) {
      state.selectedRelayUrls = value;
    },
    get allRelays() {
      return allRelays;
    }
  };
}
function createAvatarGroup(config, ndk2) {
  const { pubkeys, skipCurrentUser = false, onlyFollows = false } = config();
  const follows = ndk2?.$follows || /* @__PURE__ */ new Set();
  const currentPubkey = ndk2?.$currentPubkey;
  const allUsers = (() => {
    if (!ndk2) return [];
    let filteredPubkeys = pubkeys;
    if (skipCurrentUser && currentPubkey) {
      filteredPubkeys = filteredPubkeys.filter((pk) => pk !== currentPubkey);
    }
    if (onlyFollows && currentPubkey) {
      filteredPubkeys = filteredPubkeys.filter((pk) => follows.has(pk));
    }
    return filteredPubkeys.map((pubkey) => ndk2.getUser({ pubkey }));
  })();
  const followedUsers = (() => {
    return allUsers.filter((user) => follows.has(user.pubkey));
  })();
  const unfollowedUsers = (() => {
    return allUsers.filter((user) => !follows.has(user.pubkey));
  })();
  const users = (() => {
    return [...followedUsers, ...unfollowedUsers];
  })();
  return {
    get users() {
      return users;
    },
    get followedUsers() {
      return followedUsers;
    },
    get unfollowedUsers() {
      return unfollowedUsers;
    }
  };
}
function Avatar_group($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ndk: ndk2,
      pubkeys = [],
      skipCurrentUser = false,
      onlyFollows = false,
      max = 5,
      size = 40,
      spacing = "normal",
      overflowVariant = "avatar",
      direction = "horizontal",
      class: className = "",
      onAvatarClick,
      onOverflowClick,
      overflowSnippet
    } = $$props;
    const avatarGroup = createAvatarGroup(() => ({ pubkeys, skipCurrentUser, onlyFollows }), ndk2);
    const visibleUsers = avatarGroup.users.slice(0, max);
    const overflowCount = Math.max(0, avatarGroup.users.length - max);
    const spacingValues = { tight: -8, normal: -12, loose: -6 };
    const marginValue = spacingValues[spacing];
    const isVertical = direction === "vertical";
    $$renderer2.push(`<div data-avatar-group=""${attr_class(clsx(cn$1("relative flex", isVertical ? "flex-col items-start" : "items-center", className)))} role="group" aria-label="User avatars"><!--[-->`);
    const each_array = ensure_array_like(visibleUsers);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let user = each_array[index];
      $$renderer2.push(`<div data-avatar-group="" class="relative transition-transform duration-200"${attr_style("", {
        "margin-left": !isVertical && index !== 0 ? `${marginValue}px` : "0",
        "margin-top": isVertical && index !== 0 ? `${marginValue}px` : "0",
        "z-index": visibleUsers.length - index
      })}><!---->`);
      User.Root($$renderer2, {
        ndk: ndk2,
        user,
        children: ($$renderer3) => {
          if (onAvatarClick) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<button type="button" class="block p-0 border-none bg-none cursor-pointer transition-transform duration-200 hover:scale-110 hover:!z-[9999] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:rounded-full"${attr_style("", {
              width: `${stringify(size)}px`,
              height: `${stringify(size)}px`
            })}><!---->`);
            User.Avatar($$renderer3, { class: "ring-2 ring-background w-full h-full" });
            $$renderer3.push(`<!----></button>`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<div data-avatar-group="" class="avatar-wrapper"${attr_style("", {
              width: `${stringify(size)}px`,
              height: `${stringify(size)}px`
            })}><!---->`);
            User.Avatar($$renderer3, { class: "ring-2 ring-background w-full h-full" });
            $$renderer3.push(`<!----></div>`);
          }
          $$renderer3.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (overflowCount > 0 && overflowVariant !== "none") {
      $$renderer2.push("<!--[-->");
      if (overflowSnippet) {
        $$renderer2.push("<!--[-->");
        overflowSnippet($$renderer2, overflowCount);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (overflowVariant === "text") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div data-avatar-group="" class="flex items-center font-semibold text-muted-foreground"${attr_style("", {
            "margin-left": !isVertical ? "8px" : "0",
            "margin-top": isVertical ? "8px" : "0"
          })}>`);
          if (onOverflowClick) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<button type="button" class="p-0 border-none bg-none cursor-pointer font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:rounded">+${escape_html(overflowCount)}</button>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<span class="inline-block">+${escape_html(overflowCount)}</span>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<div data-avatar-group="" class="relative rounded-full bg-muted border-2 border-background flex items-center justify-center font-semibold text-muted-foreground flex-shrink-0"${attr_style("", {
            "margin-left": !isVertical ? `${marginValue}px` : "0",
            "margin-top": isVertical ? `${marginValue}px` : "0",
            width: `${stringify(size)}px`,
            height: `${stringify(size)}px`,
            "font-size": `${stringify(size * 0.35)}px`,
            "z-index": 0
          })}>`);
          if (onOverflowClick) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<button type="button" class="w-full h-full rounded-full border-none bg-none cursor-pointer flex items-center justify-center font-semibold text-muted-foreground transition-all duration-200 hover:bg-muted-hover hover:text-foreground hover:scale-110 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">+${escape_html(overflowCount)}</button>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<div class="w-full h-full flex items-center justify-center">+${escape_html(overflowCount)}</div>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function Repost_button_avatars($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ndk: ndkProp,
      event,
      variant = "ghost",
      max = 3,
      avatarSize = 24,
      spacing = "tight",
      onlyFollows = true,
      class: className = ""
    } = $$props;
    const ndkContext = getContext("ndk");
    const ndk2 = ndkProp || ndkContext;
    const repostAction = createRepostAction(() => ({ event }), ndk2);
    const buttonStyles = T({
      base: "inline-flex items-center gap-2 cursor-pointer font-medium text-sm transition-all rounded-md outline-none disabled:pointer-events-none disabled:opacity-50",
      variants: {
        variant: {
          ghost: "px-3 py-2 hover:bg-accent hover:text-accent-foreground",
          outline: "px-3 py-2 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground border border-border",
          pill: "px-4 py-2 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground border border-border rounded-full",
          solid: "px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
        }
      }
    });
    $$renderer2.push(`<button data-repost-button-avatars=""${attr("data-variant", variant)} type="button"${attr_class(clsx(buttonStyles({ variant, class: className })))}${attr("aria-label", `${repostAction.count} ${"reposts"}`)}>`);
    Repost($$renderer2, { size: 16, class: "flex-shrink-0" });
    $$renderer2.push(`<!----> `);
    if (repostAction.pubkeys.length > 0) {
      $$renderer2.push("<!--[-->");
      Avatar_group($$renderer2, {
        ndk: ndk2,
        pubkeys: repostAction.pubkeys,
        max,
        size: avatarSize,
        spacing,
        overflowVariant: "none",
        skipCurrentUser: false,
        onlyFollows
      });
      $$renderer2.push(`<!----> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></button>`);
  });
}
function Reaction_button_avatars($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ndk: ndkProp,
      event,
      variant = "ghost",
      emoji = "❤️",
      max = 3,
      avatarSize = 24,
      spacing = "tight",
      showCount = true,
      countMode = "total",
      onlyFollows = true,
      class: className = ""
    } = $$props;
    const ndkContext = getContext("ndk");
    const ndk2 = ndkProp || ndkContext;
    const reactionState = createReactionAction(() => ({ event }), ndk2);
    const stats = reactionState?.get(emoji) ?? { count: 0, hasReacted: false, pubkeys: [] };
    const displayCount = countMode === "total" ? reactionState.totalCount : stats.count;
    const buttonStyles = T({
      base: "inline-flex items-center gap-2 cursor-pointer font-medium text-sm transition-all rounded-md outline-none disabled:pointer-events-none disabled:opacity-50",
      variants: {
        variant: {
          ghost: "px-3 py-2 hover:bg-accent hover:text-accent-foreground",
          outline: "px-3 py-2 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground border border-border",
          pill: "px-4 py-2 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground border border-border rounded-full",
          solid: "px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
        },
        active: { true: "text-red-500", false: "" }
      }
    });
    const iconStyles = T({
      base: "flex-shrink-0",
      variants: {
        active: { true: "animate-[heartbeat_0.3s_ease-in-out]", false: "" }
      }
    });
    $$renderer2.push(`<button data-reaction-button-avatars=""${attr("data-variant", variant)} type="button"${attr_class(clsx(buttonStyles({ variant, active: stats.hasReacted, class: className })))}${attr("aria-label", `${displayCount} ${displayCount === 1 ? "reaction" : "reactions"}`)}><svg${attr_class(clsx(iconStyles({ active: stats.hasReacted })))} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="currentColor"${attr("fill", stats.hasReacted ? "currentColor" : "none")}><path d="M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> `);
    if (stats.pubkeys.length > 0) {
      $$renderer2.push("<!--[-->");
      Avatar_group($$renderer2, {
        ndk: ndk2,
        pubkeys: stats.pubkeys,
        max,
        size: avatarSize,
        spacing,
        overflowVariant: "none",
        skipCurrentUser: false,
        onlyFollows
      });
      $$renderer2.push(`<!----> `);
      if (showCount && displayCount > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-sm font-medium text-muted-foreground">${escape_html(displayCount)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></button>`);
  });
}
function Reply_button_avatars($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ndk: ndkProp,
      event,
      variant = "ghost",
      max = 3,
      avatarSize = 24,
      spacing = "tight",
      onlyFollows = true,
      class: className = ""
    } = $$props;
    const ndkContext = getContext("ndk");
    const ndk2 = ndkProp || ndkContext;
    const replyAction = createReplyAction(() => ({ event }), ndk2);
    const buttonStyles = T({
      base: "inline-flex items-center gap-2 cursor-pointer font-medium text-sm transition-all rounded-md outline-none disabled:pointer-events-none disabled:opacity-50",
      variants: {
        variant: {
          ghost: "px-3 py-2 hover:bg-accent hover:text-accent-foreground",
          outline: "px-3 py-2 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground border border-border",
          pill: "px-4 py-2 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground border border-border rounded-full",
          solid: "px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
        }
      }
    });
    $$renderer2.push(`<button data-reply-button-avatars=""${attr("data-variant", variant)} type="button"${attr_class(clsx(buttonStyles({ variant, class: className })))}${attr("aria-label", `${replyAction.count} ${"replies"}`)}>`);
    Reply($$renderer2, { size: 16, class: "flex-shrink-0" });
    $$renderer2.push(`<!----> `);
    if (replyAction.pubkeys.length > 0) {
      $$renderer2.push("<!--[-->");
      Avatar_group($$renderer2, {
        ndk: ndk2,
        pubkeys: replyAction.pubkeys,
        max,
        size: avatarSize,
        spacing,
        overflowVariant: "none",
        skipCurrentUser: false,
        onlyFollows
      });
      $$renderer2.push(`<!----> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></button>`);
  });
}
function Zap_button_avatars($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ndk: ndkProp,
      event,
      user,
      variant = "ghost",
      max = 3,
      avatarSize = 24,
      spacing = "tight",
      showCount = true,
      onlyFollows = true,
      class: className = ""
    } = $$props;
    const EVENT_CARD_CONTEXT_KEY = Symbol.for("event-card");
    const ctx = getContext(EVENT_CARD_CONTEXT_KEY);
    const ndkContext = getContext("ndk");
    const ndk2 = ndkProp || ctx?.ndk || ndkContext;
    const eventFromContext = event || ctx?.event;
    const target = eventFromContext || user;
    const zapAction = createZapAction(() => ({ target }), ndk2);
    const zapperPubkeys = Array.from(new Set(zapAction.events.map(zapInvoiceFromEvent).filter(Boolean).map((invoice) => invoice.zapper).filter(Boolean)));
    const buttonStyles = T({
      base: "inline-flex items-center gap-2 cursor-pointer font-medium text-sm transition-all rounded-md outline-none disabled:pointer-events-none disabled:opacity-50",
      variants: {
        variant: {
          ghost: "px-3 py-2 hover:bg-accent hover:text-accent-foreground",
          outline: "px-3 py-2 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground border border-border",
          pill: "px-4 py-2 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground border border-border rounded-full",
          solid: "px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
        }
      }
    });
    const hasAnyZaps = zapperPubkeys.length > 0 || zapAction.hasZapped;
    $$renderer2.push(`<button data-zap-button-avatars=""${attr("data-variant", variant)} type="button"${attr_class(clsx(buttonStyles({ variant, class: className })))}${attr("aria-label", `${zapAction.totalAmount} sats from ${zapAction.count} ${zapAction.count === 1 ? "zapper" : "zappers"}`)}>`);
    Zap($$renderer2, { size: 16, filled: hasAnyZaps, class: "flex-shrink-0" });
    $$renderer2.push(`<!----> `);
    if (zapperPubkeys.length > 0) {
      $$renderer2.push("<!--[-->");
      Avatar_group($$renderer2, {
        ndk: ndk2,
        pubkeys: zapperPubkeys,
        max,
        size: avatarSize,
        spacing,
        overflowVariant: "none",
        skipCurrentUser: false,
        onlyFollows
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (showCount && zapAction.totalAmount > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-sm font-medium text-amber-500">${escape_html(zapAction.totalAmount)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></button>`);
  });
}
function NoteCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const {
      event,
      showActions = true,
      variant = "default",
      showThreadLine = false,
      onNavigate,
      compact = false
    } = $$props;
    let showReplyModal = false;
    const avatarSize = variant === "thread-main" ? "lg" : variant === "thread-reply" ? "md" : "sm";
    const contentClass = variant === "thread-main" ? "text-lg leading-relaxed" : "text-base";
    const cardClass = variant === "thread-main" ? "bg-card/50" : variant === "default" ? "hover:bg-card/30" : "hover:bg-card/30";
    const interactive = variant === "default" || onNavigate !== void 0;
    const headerVariant = variant === "thread-main" ? "full" : "compact";
    const spacingClass = variant === "thread-main" ? "mb-2" : "mb-1.5";
    function userClicked(pubkey) {
      const user = ndk.getUser(pubkey);
      goto(`/p/${user.npub}`);
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      EventCard.Root($$renderer3, {
        ndk,
        event,
        interactive,
        onclick: () => goto(`/e/${event.encode()}`),
        onUserClick: userClicked,
        class: `p-3 sm:p-4 flex flex-col max-sm:max-w-screen ${stringify(cardClass)} transition-colors min-w-0 border-b border-border`,
        children: ($$renderer4) => {
          $$renderer4.push(`<div${attr_class(clsx(cn(spacingClass, "flex flex-row justify-between")))}><!---->`);
          EventCard.Header($$renderer4, { variant: headerVariant, avatarSize });
          $$renderer4.push(`<!----> <!---->`);
          EventCard.Dropdown($$renderer4, {});
          $$renderer4.push(`<!----></div> <!---->`);
          EventCard.ReplyIndicator($$renderer4, {});
          $$renderer4.push(`<!----> <div class="mb-2"><!---->`);
          EventCard.Content($$renderer4, { class: contentClass });
          $$renderer4.push(`<!----></div> <!---->`);
          EventCard.Actions($$renderer4, {
            children: ($$renderer5) => {
              Reply_button_avatars($$renderer5, {
                ndk,
                event,
                class: "hover:bg-muted"
              });
              $$renderer5.push(`<!----> `);
              Reaction_button_avatars($$renderer5, { ndk, event, class: "hover:bg-muted" });
              $$renderer5.push(`<!----> `);
              Repost_button_avatars($$renderer5, { ndk, event, class: "hover:bg-muted" });
              $$renderer5.push(`<!----> `);
              Zap_button_avatars($$renderer5, { ndk, event, class: "hover:bg-muted" });
              $$renderer5.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      ComposeDialog($$renderer3, {
        replyTo: event,
        get open() {
          return showReplyModal;
        },
        set open($$value) {
          showReplyModal = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
function ComposeDialog($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { open = false, onClose, replyTo, quotedEvent, onPublished } = $$props;
    let content = "";
    let isPublishing = false;
    let isRelayDropdownOpen = false;
    let isProtected = false;
    let selectedMentions = [];
    let composerRef;
    const relaySelection = useModalRelaySelection();
    const { selectedRelayUrls, allRelays } = relaySelection;
    async function publishNote() {
      if (!content.trim() || isPublishing || selectedRelayUrls.length === 0) return;
      try {
        isPublishing = true;
        const contentWithEntities = composerRef?.getContentWithNostrEntities() ?? content;
        let event;
        if (replyTo) {
          event = replyTo.reply();
        } else if (quotedEvent) {
          event = new NDKEvent(ndk);
          event.kind = 1;
          event.tag(quotedEvent, void 0, false, "q");
        } else {
          event = new NDKEvent(ndk);
          event.kind = 1;
        }
        event.content = quotedEvent ? `${contentWithEntities}
nostr:${quotedEvent.encode()}` : contentWithEntities;
        if (!replyTo) {
          event.isProtected = isProtected;
        }
        selectedMentions.forEach((pubkey) => {
          event.tags.push(["p", pubkey]);
        });
        await event.sign();
        const relaySet = NDKRelaySet.fromRelayUrls(selectedRelayUrls, ndk);
        await event.publish(relaySet);
        if (event.publishStatus === "error") {
          const error = event.publishError;
          console.error("Publish error object:", error);
          console.error("Relay errors:", error?.relayErrors);
          const relayErrors = error?.relayErrors || {};
          const relayErrorEntries = Object.entries(relayErrors);
          if (relayErrorEntries.length > 0) {
            const errorMessages = relayErrorEntries.map(([relay, err]) => `• ${relay.replace("wss://", "")}: ${err}`).join("\n");
            toast.error(`Failed to publish to relays:

${errorMessages}`);
          } else {
            toast.error(`Failed to publish: ${error?.message || "Not enough relays received the event"}`);
          }
          return;
        }
        composerRef?.reset();
        content = "";
        selectedMentions = [];
        open = false;
        toast.success(replyTo ? "Reply published" : quotedEvent ? "Quote published" : "Note published");
        onPublished?.();
        onClose?.();
      } catch (error) {
        console.error("Failed to publish note:", error);
        toast.error(`Failed to publish: ${error instanceof Error ? error.message : "Unknown error"}`);
      } finally {
        isPublishing = false;
      }
    }
    function toggleRelay(url) {
      if (relaySelection.selectedRelayUrls.includes(url)) {
        relaySelection.selectedRelayUrls = relaySelection.selectedRelayUrls.filter((u) => u !== url);
      } else {
        relaySelection.selectedRelayUrls = [...relaySelection.selectedRelayUrls, url];
      }
    }
    function selectOnlyRelay(url) {
      relaySelection.selectedRelayUrls = [url];
      isRelayDropdownOpen = false;
    }
    function handleClose() {
      if (!isPublishing) {
        open = false;
        content = "";
        selectedMentions = [];
        onClose?.();
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Root($$renderer3, {
        open,
        onOpenChange: (isOpen) => {
          if (!isOpen) {
            handleClose();
          } else {
            open = true;
          }
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Dialog_content($$renderer4, {
            class: "md:max-w-2xl !overflow-visible",
            hideClose: true,
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex items-center justify-between -mx-6 -mt-6 px-4 py-3 mb-4 border-b border-border">`);
              Button($$renderer5, {
                variant: "ghost",
                size: "icon",
                onclick: handleClose,
                disabled: isPublishing,
                class: "h-10 w-10",
                children: ($$renderer6) => {
                  Icon($$renderer6, { name: "close", size: "lg" });
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Dialog_title($$renderer5, {
                class: "text-lg",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->${escape_html(replyTo ? "Reply" : quotedEvent ? "Quote" : "Compose")}`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Button($$renderer5, {
                onclick: publishNote,
                disabled: !content.trim() || isPublishing || selectedRelayUrls.length === 0,
                class: "rounded-full px-6",
                size: "sm",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->${escape_html(isPublishing ? "Publishing..." : "Post")}`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div> `);
              {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--> <div class="relative mb-4">`);
              {
                let relayButton = function($$renderer6) {
                  $$renderer6.push(`<div class="relative">`);
                  Button($$renderer6, {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    onclick: () => isRelayDropdownOpen = !isRelayDropdownOpen,
                    disabled: isPublishing,
                    class: "h-8 w-8",
                    title: "Select relays",
                    children: ($$renderer7) => {
                      if (selectedRelayUrls.length <= 2 && selectedRelayUrls.length > 0) {
                        $$renderer7.push("<!--[-->");
                        $$renderer7.push(`<div class="flex items-center -space-x-1"><!--[-->`);
                        const each_array = ensure_array_like(selectedRelayUrls);
                        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                          let relayUrl = each_array[$$index];
                          const relay = allRelays.find((r) => r.url === relayUrl);
                          const relayInfo = relay ? useRelayInfoCached(relay.url) : null;
                          if (relayInfo?.info?.icon) {
                            $$renderer7.push("<!--[-->");
                            $$renderer7.push(`<img${attr("src", relayInfo.info.icon)} alt="" class="w-5 h-5 rounded border border-background"/>`);
                          } else {
                            $$renderer7.push("<!--[!-->");
                            $$renderer7.push(`<div class="w-5 h-5 rounded bg-muted flex items-center justify-center border border-background">`);
                            Icon($$renderer7, { name: "relay", size: "xs", class: "text-muted-foreground" });
                            $$renderer7.push(`<!----></div>`);
                          }
                          $$renderer7.push(`<!--]-->`);
                        }
                        $$renderer7.push(`<!--]--></div>`);
                      } else {
                        $$renderer7.push("<!--[!-->");
                        $$renderer7.push(`<div class="relative">`);
                        Icon($$renderer7, { name: "relay", size: "md" });
                        $$renderer7.push(`<!----> `);
                        if (selectedRelayUrls.length > 2) {
                          $$renderer7.push("<!--[-->");
                          $$renderer7.push(`<span class="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-medium rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-0.5">${escape_html(selectedRelayUrls.length)}</span>`);
                        } else {
                          $$renderer7.push("<!--[!-->");
                        }
                        $$renderer7.push(`<!--]--></div>`);
                      }
                      $$renderer7.push(`<!--]-->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  if (isRelayDropdownOpen) {
                    $$renderer6.push("<!--[-->");
                    $$renderer6.push(`<div class="absolute top-full left-0 mt-2 bg-popover border border-border rounded-lg shadow-xl z-[100] w-80 max-h-[400px] overflow-y-auto transition-all duration-200">`);
                    RelayPublishDropdownContent($$renderer6, {
                      selectedRelayUrls,
                      onToggleRelay: toggleRelay,
                      onSelectOnly: selectOnlyRelay,
                      get isProtected() {
                        return isProtected;
                      },
                      set isProtected($$value) {
                        isProtected = $$value;
                        $$settled = false;
                      }
                    });
                    $$renderer6.push(`<!----></div>`);
                  } else {
                    $$renderer6.push("<!--[!-->");
                  }
                  $$renderer6.push(`<!--]--></div>`);
                };
                ContentComposer($$renderer5, {
                  placeholder: replyTo ? "Write your reply..." : quotedEvent ? "Add your thoughts..." : "What's on your mind?",
                  autofocus: true,
                  disabled: isPublishing,
                  get value() {
                    return content;
                  },
                  set value($$value) {
                    content = $$value;
                    $$settled = false;
                  },
                  get selectedMentions() {
                    return selectedMentions;
                  },
                  set selectedMentions($$value) {
                    selectedMentions = $$value;
                    $$settled = false;
                  },
                  relayButton,
                  $$slots: { relayButton: true }
                });
              }
              $$renderer5.push(`<!----></div> `);
              if (quotedEvent) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="-mx-6 px-4 py-3 mb-4 border-y border-border bg-muted/30"><div class="text-xs text-muted-foreground mb-2">Quoting</div> <div class="border border-border rounded-lg overflow-hidden bg-card">`);
                NoteCard($$renderer5, { event: quotedEvent, showActions: false });
                $$renderer5.push(`<!----></div></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]-->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { open });
  });
}

export { Avatar_group as A, ComposeDialog as C, NDKBlossom as N, NoteCard as a, ContentComposer as b, createReactionAction as c };
//# sourceMappingURL=ComposeDialog-rF5DhufZ.js.map
