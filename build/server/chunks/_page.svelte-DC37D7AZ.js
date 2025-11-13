import { e as ensure_array_like, b as attr } from './index2-DpBdzO5t.js';
import { n as ndk } from './ndk.svelte-BfhDBrJw.js';
import '@nostr-dev-kit/ndk';
import { f as formatTimeAgo } from './formatTime-CvNAVcDX.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './context-D7LG2f18.js';
import 'clsx';
import '@nostr-dev-kit/cache-sqlite-wasm';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import 'tty';
import 'util';
import 'os';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let invites = [];
    let copiedId = null;
    ndk.$currentUser?.pubkey;
    function getInviteLink(event) {
      const dTag = event.tags.find((tag) => tag[0] === "d")?.[1];
      if (!dTag) return "";
      return `${window.location.origin}/i/${dTag}`;
    }
    function getInviteData(event) {
      try {
        const content = JSON.parse(event.content);
        return {
          welcomeMessage: content.welcomeMessage,
          recipientName: content.recipientName,
          isPersonalized: !!content.recipientName
        };
      } catch {
        return { isPersonalized: false };
      }
    }
    $$renderer2.push(`<div class="w-full lg:max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">`);
    if (
      // Set up header
      invites.length === 0
    ) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12"><div class="w-16 h-16 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"></path></svg></div> <h3 class="text-lg font-semibold text-foreground mb-2">No invites yet</h3> <p class="text-sm text-muted-foreground">Create your first invite to start sharing Agora with others</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="space-y-4"><!--[-->`);
      const each_array = ensure_array_like(invites);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let invite = each_array[$$index];
        const inviteData = getInviteData(invite);
        const inviteLink = getInviteLink(invite);
        $$renderer2.push(`<div class="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6"><div class="flex items-start justify-between mb-4"><div class="flex-1"><div class="flex items-center gap-2 mb-2">`);
        if (inviteData.isPersonalized) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-400"><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg> Personalized</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-neutral-800 dark:text-neutral-400">General Invite</span>`);
        }
        $$renderer2.push(`<!--]--></div> `);
        if (inviteData.recipientName) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<h3 class="text-lg font-semibold text-foreground mb-1">For ${escape_html(inviteData.recipientName)}</h3>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <p class="text-sm text-neutral-500 dark:text-neutral-400">Created ${escape_html(formatTimeAgo(invite.created_at || 0))}</p></div> <button class="p-2 text-neutral-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors" title="Delete invite"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div> `);
        if (inviteData.welcomeMessage) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="mb-4 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg"><p class="text-sm text-foreground whitespace-pre-wrap line-clamp-3">${escape_html(inviteData.welcomeMessage)}</p></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <div class="bg-muted rounded-lg p-3 flex items-center space-x-2"><input type="text"${attr("value", inviteLink)} readonly class="flex-1 bg-transparent text-sm text-foreground outline-none truncate"/> <button class="px-3 py-1.5 bg-primary hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center space-x-1 text-sm flex-shrink-0">`);
        if (copiedId === invite.id) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span>Copied!</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> <span>Copy</span>`);
        }
        $$renderer2.push(`<!--]--></button></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DC37D7AZ.js.map
