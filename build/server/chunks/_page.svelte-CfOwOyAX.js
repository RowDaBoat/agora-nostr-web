import 'clsx';
import { n as ndk } from './ndk.svelte-BfhDBrJw.js';
import { e as ensure_array_like } from './index2-DpBdzO5t.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './utils-KcIDVAAe.js';
import './state.svelte-zw3OW0Pf.js';
import { U as User } from './index4-D71bD0RT.js';
import { T as TimeAgo } from './TimeAgo-B1T5QF8y.js';
import { g as goto } from './client-C1nnVzci.js';
import { R as Root, D as Dialog_content, a as Dialog_title } from './index3-DOo-Ka_h.js';
import { m as messagesStore, U as User_search_combobox } from './user-search-combobox-BJgb5eB_.js';
import { D as Dialog_header } from './dialog-header-DSVdIrOb.js';
import '@nostr-dev-kit/cache-sqlite-wasm';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/ndk';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import 'tty';
import 'util';
import 'os';
import './context-D7LG2f18.js';
import 'tailwind-merge';
import './formatTime-CvNAVcDX.js';
import './index-BYTxiVRf.js';
import './scroll-lock-YhRhLzPR.js';
import './events-CY0_bqjb.js';
import '@nostr-dev-kit/messages';
import './index.svelte-EYlAHNHC.js';
import './floating-layer-anchor-DIntB4dN.js';
import './popper-layer-force-mount-B4z1kw84.js';

function ConversationListItem($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { conversation } = $$props;
    const participant = conversation.getOtherParticipant();
    const lastMessage = conversation.getLastMessage();
    $$renderer2.push(`<button class="w-full flex items-center gap-3 px-4 py-4 hover:bg-neutral-900/50 transition-colors text-left">`);
    if (participant) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!---->`);
      User.Root($$renderer2, {
        ndk,
        pubkey: participant.pubkey,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->`);
          User.Avatar($$renderer3, { class: "w-12 h-12 flex-shrink-0" });
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="flex-1 min-w-0"><div class="flex items-center justify-between mb-1"><div class="font-semibold text-white truncate">${escape_html("Anonymous")}</div> `);
    if (lastMessage) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-xs text-neutral-500 flex-shrink-0 ml-2">`);
      TimeAgo($$renderer2, { timestamp: lastMessage.timestamp });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="flex items-center justify-between"><p class="text-sm text-neutral-400 truncate flex-1">`);
    if (lastMessage) {
      $$renderer2.push("<!--[-->");
      if (lastMessage.sender.pubkey === ndk.activeUser?.pubkey) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-neutral-500">You:</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> ${escape_html(lastMessage.content)}`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`No messages yet`);
    }
    $$renderer2.push(`<!--]--></p> `);
    if (conversation.getUnreadCount() > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="ml-2 flex-shrink-0 min-w-[20px] h-5 px-1.5 rounded-full bg-primary flex items-center justify-center"><span class="text-xs font-bold text-primary-foreground">${escape_html(conversation.getUnreadCount() > 99 ? "99+" : conversation.getUnreadCount())}</span></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></button>`);
  });
}
function ConversationList($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { conversations } = $$props;
    $$renderer2.push(`<div class="divide-y divide-neutral-800/50">`);
    if (conversations.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-col items-center justify-center py-16 px-6 text-center"><svg class="w-20 h-20 text-neutral-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg> <h3 class="text-xl font-semibold text-white mb-2">No messages yet</h3> <p class="text-neutral-400 max-w-sm">Start a conversation by visiting someone's profile and clicking the message button</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(conversations);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let conversation = each_array[$$index];
        ConversationListItem($$renderer2, { conversation });
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function NewMessageModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { isOpen, onClose } = $$props;
    function handleUserSelect(user) {
      goto(`/messages/${user.npub}`);
      onClose();
    }
    $$renderer2.push(`<!---->`);
    Root($$renderer2, {
      open: isOpen,
      onOpenChange: (newOpen) => {
        if (!newOpen) onClose();
      },
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->`);
        Dialog_content($$renderer3, {
          class: "max-w-md",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            Dialog_header($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->`);
                Dialog_title($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->New Message`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!---->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            User_search_combobox($$renderer4, {
              ndk,
              onSelect: handleUserSelect,
              placeholder: "Search by name, NIP-05, or paste npub..."
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!---->`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let showNewMessageModal = false;
    $$renderer2.push(`<div class="h-full flex flex-col"><div class="sticky top-0 z-10 bg-background border-b border-border/50 px-4 py-3"><div class="flex items-center justify-between"><h1 class="text-xl font-bold text-foreground">Messages</h1> <button class="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary" title="New message"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg></button></div></div> <div class="flex-1 overflow-y-auto">`);
    if (!ndk.$currentUser) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-col items-center justify-center h-full px-6 text-center"><svg class="w-20 h-20 text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> <h3 class="text-xl font-semibold text-foreground mb-2">Sign in required</h3> <p class="text-muted-foreground max-w-sm">Please sign in to view and send direct messages</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      ConversationList($$renderer2, { conversations: messagesStore.conversations });
    }
    $$renderer2.push(`<!--]--></div></div> `);
    NewMessageModal($$renderer2, {
      isOpen: showNewMessageModal,
      onClose: () => showNewMessageModal = false
    });
    $$renderer2.push(`<!---->`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CfOwOyAX.js.map
