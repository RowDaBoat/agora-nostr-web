import { b as attr, a as attr_class, f as bind_props } from './index2-DpBdzO5t.js';
import { n as ndk } from './ndk.svelte-BfhDBrJw.js';
import '@nostr-dev-kit/ndk';
import 'clsx';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import { e as escape_html } from './escaping-CqgfEcN3.js';

function CreateFollowPackDialog($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { open = false, onClose, initialPubkey, editingPack } = $$props;
    let isPublishing = false;
    let title = "";
    let description = "";
    let imageUrl = "";
    let selectedPubkeys = new Set(initialPubkey ? [initialPubkey] : []);
    const contactListSubscription = ndk.$subscribe(() => ndk.$currentUser?.pubkey ? {
      filters: [{ kinds: [3], authors: [ndk.$currentUser.pubkey], limit: 1 }],
      bufferMs: 100
    } : void 0);
    const userFollows = (() => {
      const contactList = contactListSubscription.events[0];
      if (!contactList) return /* @__PURE__ */ new Set();
      return new Set(contactList.tags.filter((tag) => tag[0] === "p").map((tag) => tag[1]));
    })();
    (() => {
      return Array.from(userFollows);
    })();
    if (
      // Load editing pack data when modal opens in edit mode
      open
    ) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm overflow-y-auto py-8" role="presentation"><div class="w-full max-w-3xl mx-4 bg-card rounded-2xl border border-border shadow-2xl my-auto" role="dialog" aria-modal="true"><div class="flex items-center justify-between px-6 py-4 border-b border-border"><div class="flex items-center gap-3"><button${attr("disabled", isPublishing, true)} class="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50" aria-label="Close"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button> <h2 class="text-xl font-bold text-foreground flex items-center gap-2"><svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg> ${escape_html(editingPack ? "Edit Follow Pack" : "Create Follow Pack")}</h2></div> <button${attr("disabled", !title.trim() || selectedPubkeys.size === 0 || isPublishing, true)} class="px-5 py-2.5 bg-primary hover:bg-accent-dark disabled:bg-muted disabled:cursor-not-allowed text-foreground rounded-lg transition-colors font-semibold text-sm">${escape_html(editingPack ? "Update Pack" : "Create Pack")}</button></div> <div class="flex border-b border-border"><button${attr_class(`flex-1 px-6 py-3 font-medium transition-colors ${"text-primary border-b-2 border-primary"}`)}>Details</button> <button${attr_class(`flex-1 px-6 py-3 font-medium transition-colors ${"text-muted-foreground hover:text-muted-foreground"}`)}>Members (${escape_html(selectedPubkeys.size)})</button></div> <div class="p-6">`);
      {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="space-y-5"><div><label class="block text-sm font-medium text-muted-foreground mb-2">Cover Image URL (optional)</label> <input type="url"${attr("value", imageUrl)} placeholder="https://example.com/image.jpg" class="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"/> `);
        if (imageUrl.trim()) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="mt-3 rounded-lg overflow-hidden border border-border"><img${attr("src", imageUrl)} alt="Preview" class="w-full h-48 object-cover" onerror="this.__e=event"/></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> <div><label class="block text-sm font-medium text-muted-foreground mb-2">Title <span class="text-red-500">*</span></label> <input type="text"${attr("value", title)} placeholder="e.g., Bitcoin Developers" class="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" maxlength="100"/></div> <div><label class="block text-sm font-medium text-muted-foreground mb-2">Description (optional)</label> <textarea placeholder="Describe what this follow pack is about..." class="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none" rows="4" maxlength="500">`);
        const $$body = escape_html(description);
        if ($$body) {
          $$renderer2.push(`${$$body}`);
        }
        $$renderer2.push(`</textarea> <p class="text-xs text-muted-foreground mt-1">${escape_html(description.length)}/500 characters</p></div></div>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="px-6 py-4 border-t border-border bg-card/50"><p class="text-xs text-muted-foreground">Press <kbd class="px-1.5 py-0.5 bg-muted rounded text-muted-foreground">Esc</kbd> to cancel</p></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { open });
  });
}

export { CreateFollowPackDialog as C };
//# sourceMappingURL=CreateFollowPackDialog-gBFXSaz2.js.map
