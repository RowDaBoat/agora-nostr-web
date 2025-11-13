import { g as store_get, u as unsubscribe_stores, a as attr_class, e as ensure_array_like, b as attr, d as attr_style } from './index2-DpBdzO5t.js';
import { p as page } from './stores-lKKGOiBk.js';
import { n as ndk } from './ndk.svelte-BfhDBrJw.js';
import { NDKArticle } from '@nostr-dev-kit/ndk';
import { a as NoteCard, N as NDKBlossom } from './ComposeDialog-rF5DhufZ.js';
import 'clsx';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import './utils-KcIDVAAe.js';
import './state.svelte-zw3OW0Pf.js';
import { $ as $format } from './runtime-9tjL5BFW.js';
import './button2-JT-_T3Ay.js';
import 'qrcode';
import { R as Root, D as Dialog_content, a as Dialog_title } from './index3-DOo-Ka_h.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './url-healing-Vba5GwtC.js';
import { c as createLazyFeed, L as LoadMoreTrigger } from './lazyFeed.svelte-SHZfUyBO.js';
import { C as CreateFollowPackDialog } from './CreateFollowPackDialog-gBFXSaz2.js';
import { c as createBlossomUpload } from './blossom-upload.svelte-Bf1gqD-l.js';
import { D as Dialog_header } from './dialog-header-DSVdIrOb.js';
import { D as Dialog_description } from './dialog-description-C9BRLaT0.js';
import './context-D7LG2f18.js';
import '@nostr-dev-kit/cache-sqlite-wasm';
import 'tty';
import 'util';
import 'os';
import './toast.svelte-BEvONWAz.js';
import './relayInfo.svelte-CrGOXzx2.js';
import './button-DBIbgud-.js';
import './utils2-B05Dmz_H.js';
import 'tailwind-merge';
import './index4-D71bD0RT.js';
import './RelayPublishDropdownContent-CzmVdnh5.js';
import './scroll-lock-YhRhLzPR.js';
import './events-CY0_bqjb.js';
import './RelayIcon-DEER5mbZ.js';
import './index5-D9xIoHLj.js';
import './event-content-COF8hoaI.js';
import './index.svelte-EYlAHNHC.js';
import './index-BCLI0M1W.js';
import './client-C1nnVzci.js';
import './index-BYTxiVRf.js';

function ProfileHeader($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function ProfileSettings($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { hideSubmitButton = false } = $$props;
    let user = ndk.$currentUser;
    let blossom = (() => {
      if (!user) return null;
      return new NDKBlossom(ndk);
    })();
    let pictureUpload = (() => {
      if (!blossom) return null;
      return createBlossomUpload(blossom);
    })();
    let bannerUpload = (() => {
      if (!blossom) return null;
      return createBlossomUpload(blossom);
    })();
    let formData = {
      name: "",
      displayName: "",
      about: "",
      picture: "",
      nip05: "",
      lud16: "",
      website: "",
      hashtags: ""
      // Comma-separated hashtags
    };
    function getInitials(name) {
      return "?";
    }
    $$renderer2.push(`<div class="max-w-2xl mx-auto space-y-8">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="space-y-2"><label class="block text-sm font-medium text-foreground">Banner Image</label> <input type="file" accept="image/*" class="hidden"/> <button type="button"${attr("disabled", bannerUpload?.status === "uploading", true)} class="w-full h-48 rounded-xl overflow-hidden relative group bg-gradient-to-br from-primary-500 to-primary-600 hover:opacity-90 transition-opacity"${attr_style("")}><div class="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">`);
    if (bannerUpload?.status === "uploading") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div> <span class="text-foreground text-sm font-medium">${escape_html(bannerUpload.progress?.percentage)}%</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<svg class="w-10 h-10 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> <span class="text-foreground text-sm font-medium">Click to upload banner</span>`);
    }
    $$renderer2.push(`<!--]--></div></button></div> <div class="space-y-2"><label class="block text-sm font-medium text-foreground">Profile Picture</label> <input type="file" accept="image/*" class="hidden"/> <div class="flex items-center gap-4"><button type="button"${attr("disabled", pictureUpload?.status === "uploading", true)} class="w-24 h-24 rounded-full overflow-hidden relative group bg-gradient-to-br from-primary-500 to-primary-600 hover:ring-4 hover:ring-orange-500/20 transition-all flex items-center justify-center">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<span class="text-foreground text-2xl font-bold">${escape_html(getInitials())}</span>`);
    }
    $$renderer2.push(`<!--]--> <div class="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">`);
    if (pictureUpload?.status === "uploading") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-col items-center gap-1"><div class="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> <span class="text-foreground text-xs">${escape_html(pictureUpload.progress?.percentage)}%</span></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<svg class="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`);
    }
    $$renderer2.push(`<!--]--></div></button> <div class="flex-1"><input type="url"${attr("value", formData.picture)} placeholder="Or paste image URL" class="w-full px-4 py-2 rounded-lg border border bg-card text-foreground placeholder-neutral-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"${attr("disabled", pictureUpload?.status === "uploading", true)}/></div></div></div> <div class="space-y-2"><label for="name" class="block text-sm font-medium text-foreground">Name</label> <input id="name" type="text"${attr("value", formData.name)} placeholder="Satoshi Nakamoto" class="w-full px-4 py-2 rounded-lg border border bg-card text-foreground placeholder-neutral-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"/></div> <div class="space-y-2"><label for="displayName" class="block text-sm font-medium text-foreground">Display Name <span class="text-muted-foreground text-xs font-normal">(optional)</span></label> <input id="displayName" type="text"${attr("value", formData.displayName)} placeholder="satoshi" class="w-full px-4 py-2 rounded-lg border border bg-card text-foreground placeholder-neutral-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"/></div> <div class="space-y-2"><label for="about-textarea" class="block text-sm font-medium text-foreground">About</label> <textarea id="about-textarea" placeholder="Tell the world about yourself..." rows="5" class="w-full px-4 py-3 rounded-lg border border bg-card text-foreground placeholder-neutral-500 resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all">`);
    const $$body = escape_html(formData.about);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> <div class="space-y-2"><label for="nip05" class="block text-sm font-medium text-foreground">NIP-05 Verification <span class="text-muted-foreground text-xs font-normal">(optional)</span></label> <input id="nip05" type="text"${attr("value", formData.nip05)} placeholder="name@domain.com" class="w-full px-4 py-2 rounded-lg border border bg-card text-foreground placeholder-neutral-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"/></div> <div class="space-y-2"><label for="lud16" class="block text-sm font-medium text-foreground">Lightning Address <span class="text-muted-foreground text-xs font-normal">(optional)</span></label> <input id="lud16" type="text"${attr("value", formData.lud16)} placeholder="name@getalby.com" class="w-full px-4 py-2 rounded-lg border border bg-card text-foreground placeholder-neutral-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"/></div> <div class="space-y-2"><label for="website" class="block text-sm font-medium text-foreground">Website <span class="text-muted-foreground text-xs font-normal">(optional)</span></label> <input id="website" type="url"${attr("value", formData.website)} placeholder="https://example.com" class="w-full px-4 py-2 rounded-lg border border bg-card text-foreground placeholder-neutral-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"/></div> <div class="space-y-2"><label for="hashtags" class="block text-sm font-medium text-foreground">Interest Hashtags <span class="text-muted-foreground text-xs font-normal">(optional)</span></label> <input id="hashtags" type="text"${attr("value", formData.hashtags)} placeholder="bitcoin, nostr, freedom (comma-separated)" class="w-full px-4 py-2 rounded-lg border border bg-card text-foreground placeholder-neutral-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"/> <p class="text-xs text-muted-foreground">Add hashtags that describe your interests. Separate multiple tags with commas.</p></div> `);
    if (!hideSubmitButton) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex justify-end pt-4"><button type="button"${attr("disabled", pictureUpload?.status === "uploading" || bannerUpload?.status === "uploading", true)} class="px-6 py-3 bg-primary hover:bg-accent-dark text-foreground font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">`);
      {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<span>Save Profile</span>`);
      }
      $$renderer2.push(`<!--]--></button></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    store_get($$store_subs ??= {}, "$page", page).params.identifier;
    let user = void 0;
    const pubkey = user?.pubkey;
    (() => ndk.$currentPubkey === pubkey)();
    let isCreatePackDialogOpen = false;
    let isEditProfileModalOpen = false;
    const allTextEventsFeed = createLazyFeed(
      ndk,
      () => void 0,
      { initialLimit: 20, pageSize: 20 }
    );
    const nip68MediaFeed = createLazyFeed(
      ndk,
      () => void 0,
      { initialLimit: 30, pageSize: 30 }
    );
    const articlesFeed = createLazyFeed(
      ndk,
      () => void 0,
      { initialLimit: 10, pageSize: 10 }
    );
    createLazyFeed(
      ndk,
      () => void 0,
      { initialLimit: 10, pageSize: 10 }
    );
    const createdPacksFeed = createLazyFeed(
      ndk,
      () => void 0,
      { initialLimit: 20, pageSize: 20 }
    );
    const appearsPacksFeed = createLazyFeed(
      ndk,
      () => void 0,
      { initialLimit: 20, pageSize: 20 }
    );
    const contactListSubscription = ndk.$subscribe(() => void 0);
    (() => {
      const contactList = contactListSubscription.events[0];
      if (!contactList) return 0;
      return contactList.tags.filter((tag) => tag[0] === "p").length;
    })();
    const notes = (() => allTextEventsFeed.events.filter((event) => !event.tags.some((tag) => tag[0] === "e")))();
    (() => allTextEventsFeed.events.filter((event) => event.tags.some((tag) => tag[0] === "e")))();
    function hasMediaUrl(content) {
      const urlRegex = /(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp|svg|avif|mp4|webm|mov|avi|mkv))/gi;
      return urlRegex.test(content);
    }
    const textMediaEvents = (() => allTextEventsFeed.allEvents.filter((event) => hasMediaUrl(event.content)))();
    (() => [...nip68MediaFeed.events, ...textMediaEvents])();
    (() => articlesFeed.events.map((e) => NDKArticle.from(e)))();
    const createdPacks = createdPacksFeed.events;
    const appearsPacks = appearsPacksFeed.events;
    (() => [...createdPacks, ...appearsPacks])();
    function handleLoadMore() {
      {
        allTextEventsFeed.loadMore();
      }
    }
    const hasMore = (() => {
      {
        return allTextEventsFeed.hasMore;
      }
    })();
    const isLoading = (() => {
      {
        return allTextEventsFeed.isLoading;
      }
    })();
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="w-full">`);
      ProfileHeader($$renderer3, {
        notesCount: allTextEventsFeed.allEvents.length
      });
      $$renderer3.push(`<!----> <div class="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border"><div class="flex justify-around lg:justify-start px-2 lg:px-4 overflow-x-auto"><button${attr_class(`flex items-center justify-center lg:justify-start gap-1.5 px-3 lg:px-4 py-3 font-medium whitespace-nowrap ${"text-primary border-b-2 border-primary"}`)} aria-label="Notes"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg> <span class="hidden lg:inline">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("profile.tabs.notes"))}</span></button> <button${attr_class(`flex items-center justify-center lg:justify-start gap-1.5 px-3 lg:px-4 py-3 font-medium whitespace-nowrap ${"text-muted-foreground hover:text-muted-foreground"}`)} aria-label="Replies"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg> <span class="hidden lg:inline">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("profile.tabs.replies"))}</span></button> <button${attr_class(`flex items-center justify-center lg:justify-start gap-1.5 px-3 lg:px-4 py-3 font-medium whitespace-nowrap ${"text-muted-foreground hover:text-muted-foreground"}`)} aria-label="Media"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> <span class="hidden lg:inline">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("profile.tabs.media"))}</span></button> <button${attr_class(`flex items-center justify-center lg:justify-start gap-1.5 px-3 lg:px-4 py-3 font-medium whitespace-nowrap ${"text-muted-foreground hover:text-muted-foreground"}`)} aria-label="Articles"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> <span class="hidden lg:inline">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("profile.tabs.articles"))}</span></button> <button${attr_class(`flex items-center justify-center lg:justify-start gap-1.5 px-3 lg:px-4 py-3 font-medium whitespace-nowrap ${"text-muted-foreground hover:text-muted-foreground"}`)} aria-label="Highlights"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg> <span class="hidden lg:inline">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("profile.tabs.highlights"))}</span></button> <button${attr_class(`flex items-center justify-center lg:justify-start gap-1.5 px-3 lg:px-4 py-3 font-medium whitespace-nowrap ${"text-muted-foreground hover:text-muted-foreground"}`)} aria-label="Follow Packs"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg> <span class="hidden lg:inline">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("profile.tabs.followPacks"))}</span></button></div></div> <div>`);
      {
        $$renderer3.push("<!--[-->");
        if (notes.length === 0) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="text-center py-8 text-muted-foreground">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("profile.emptyStates.noNotes"))}</div>`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<div class="divide-y divide-neutral-800/50"><!--[-->`);
          const each_array = ensure_array_like(notes);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let note = each_array[$$index];
            NoteCard($$renderer3, { event: note });
          }
          $$renderer3.push(`<!--]--></div>`);
        }
        $$renderer3.push(`<!--]--> `);
        LoadMoreTrigger($$renderer3, { onIntersect: handleLoadMore, hasMore, isLoading });
        $$renderer3.push(`<!---->`);
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      CreateFollowPackDialog($$renderer3, {
        initialPubkey: pubkey,
        get open() {
          return isCreatePackDialogOpen;
        },
        set open($$value) {
          isCreatePackDialogOpen = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> <!---->`);
      Root($$renderer3, {
        get open() {
          return isEditProfileModalOpen;
        },
        set open($$value) {
          isEditProfileModalOpen = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Dialog_content($$renderer4, {
            class: "max-w-2xl max-h-[90vh] overflow-y-auto",
            onClose: () => isEditProfileModalOpen = false,
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_header($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_title($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Edit Profile`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <!---->`);
                  Dialog_description($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Update your profile information and settings`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="py-4">`);
              ProfileSettings($$renderer5, {});
              $$renderer5.push(`<!----></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DyL2hbfN.js.map
