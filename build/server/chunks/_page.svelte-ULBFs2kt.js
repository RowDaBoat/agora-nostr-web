import { e as ensure_array_like, b as attr, d as attr_style, s as stringify, a as attr_class } from './index2-DpBdzO5t.js';
import { s as settings, i as isAgoraRelay, n as ndk } from './ndk.svelte-BfhDBrJw.js';
import { NDKSubscriptionCacheUsage } from '@nostr-dev-kit/ndk';
import { U as User } from './index4-D71bD0RT.js';
import './utils-KcIDVAAe.js';
import 'clsx';
import './state.svelte-zw3OW0Pf.js';
import { nip19 } from 'nostr-tools';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { f as formatTimeAgo } from './formatTime-CvNAVcDX.js';
import { N as NewMemberCard } from './NewMemberCard-33LCI8Hd.js';
import './context-D7LG2f18.js';
import '@nostr-dev-kit/cache-sqlite-wasm';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import 'tty';
import 'util';
import 'os';
import 'tailwind-merge';
import './follow-button-btj2XHXB.js';
import './index.svelte-EYlAHNHC.js';
import './index-BCLI0M1W.js';

function getProfileUrl(pubkey) {
  const npub = nip19.npubEncode(pubkey);
  return `/p/${npub}`;
}
function TopInvitersPodium($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { stats } = $$props;
    function getRankEmoji(rank) {
      if (rank === 1) return "🥇";
      if (rank === 2) return "🥈";
      if (rank === 3) return "🥉";
      return "";
    }
    const top3 = stats.slice(0, 3);
    stats.slice(3, 10);
    const maxSuccess = Math.max(...stats.map((s) => s.successfulInvites), 1);
    let profiles = /* @__PURE__ */ new Map();
    $$renderer2.push(`<div><h2 class="text-xl font-bold text-foreground mb-6">🏆 Top Inviters</h2> `);
    if (stats.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-muted-foreground text-center py-8">No invites yet in this Agora</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"><!--[-->`);
      const each_array = ensure_array_like(top3);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let stat = each_array[$$index];
        const profile = profiles.get(stat.pubkey);
        $$renderer2.push(`<a${attr("href", getProfileUrl(stat.pubkey))} class="relative bg-gradient-to-b from-primary/5 to-transparent border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg group"><div class="absolute -top-3 left-1/2 -translate-x-1/2"><div class="w-12 h-12 rounded-full bg-card border-2 border-border flex items-center justify-center text-2xl group-hover:border-primary transition-colors">${escape_html(getRankEmoji(stat.rank))}</div></div> <div class="flex justify-center mt-6 mb-4"><!---->`);
        User.Root($$renderer2, {
          ndk,
          pubkey: stat.pubkey,
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->`);
            User.Avatar($$renderer3, { class: "w-24 h-24 rounded-full ring-4 ring-primary/20" });
            $$renderer3.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer2.push(`<!----></div> <div class="text-center mb-4"><h3 class="font-bold text-lg text-foreground truncate mb-1">${escape_html(profile?.displayName || profile?.name || "Anonymous")}</h3> `);
        if (profile?.nip05) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-xs text-muted-foreground truncate">${escape_html(profile.nip05)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> <div class="bg-muted/50 rounded-lg p-3"><div class="text-center"><div class="text-3xl font-bold text-primary mb-1">${escape_html(stat.successfulInvites)}</div> <div class="text-xs text-muted-foreground">${escape_html(stat.successfulInvites === 1 ? "person joined" : "people joined")}</div></div></div> <div class="mt-3"><div class="h-1.5 bg-muted rounded-full overflow-hidden"><div class="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500"${attr_style(`width: ${stringify(Math.min(100, stat.successfulInvites / maxSuccess * 100))}%`)}></div></div></div></a>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (stats.length > 3) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors"><span>${escape_html(`View Top ${stats.length} Inviters`)}</span> <svg${attr_class(`w-4 h-4 transition-transform duration-200 ${stringify("")}`)} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function IntroductionCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { event } = $$props;
    $$renderer2.push(`<div class="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"><div class="flex items-center gap-3 mb-3"><!---->`);
    User.Root($$renderer2, {
      ndk,
      pubkey: event.pubkey,
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->`);
        User.Avatar($$renderer3, { class: "w-12 h-12 rounded-full" });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> <div class="flex-1 min-w-0"><div class="flex items-center gap-2"><span class="text-lg">👋</span> <span class="font-semibold text-foreground">${escape_html("Anonymous")}</span></div> <div class="text-sm text-muted-foreground">${escape_html(formatTimeAgo(event.created_at || 0))}</div></div></div> <div class="mb-3 text-foreground whitespace-pre-wrap line-clamp-4">${escape_html(event.content)}</div> <div class="flex items-center justify-between text-sm">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const selectedRelay = settings.selectedRelay;
    const isAgora = selectedRelay ? isAgoraRelay(selectedRelay) : false;
    const redemptionsSubscription = (() => {
      console.log("[INVITES] redemptionsSubscription $derived.by running", { selectedRelay, isAgora });
      if (!selectedRelay || !isAgora) return null;
      return ndk.$subscribe(() => ({
        filters: [{ kinds: [514] }],
        relayUrls: [selectedRelay],
        subId: "invite-redemptions",
        cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY,
        closeOnEose: true
      }));
    })();
    const introductionsSubscription = (() => {
      console.log("[INVITES] introductionsSubscription $derived.by running", { selectedRelay, isAgora });
      if (!selectedRelay || !isAgora) return null;
      return ndk.$subscribe(() => ({
        filters: [{ kinds: [1], "#t": ["introduction"], limit: 20 }],
        relayUrls: [selectedRelay],
        cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY,
        exclusiveRelay: true,
        closeOnEose: true
      }));
    })();
    const inviterStats = (() => {
      console.log("[INVITES] inviterStats $derived.by running", redemptionsSubscription?.events.length);
      if (!redemptionsSubscription) return [];
      const redemptions = redemptionsSubscription.events;
      const inviteCountByInviter = /* @__PURE__ */ new Map();
      for (const redemption of redemptions) {
        const inviterTag = redemption.tags.find((tag) => tag[0] === "p");
        if (inviterTag?.[1]) {
          const inviterPubkey = inviterTag[1];
          inviteCountByInviter.set(inviterPubkey, (inviteCountByInviter.get(inviterPubkey) || 0) + 1);
        }
      }
      const stats = Array.from(inviteCountByInviter.entries()).map(([pubkey, count]) => ({
        pubkey,
        totalInvites: count,
        successfulInvites: count,
        rank: 0
      }));
      stats.sort((a, b) => b.successfulInvites - a.successfulInvites);
      stats.forEach((stat, index) => {
        stat.rank = index + 1;
      });
      return stats.slice(0, 10);
    })();
    const introductions = (() => {
      console.log("[INVITES] introductions $derived.by running", introductionsSubscription?.events.length, redemptionsSubscription?.events.length);
      if (!introductionsSubscription || !redemptionsSubscription) return [];
      const intros = introductionsSubscription.events;
      const redemptions = redemptionsSubscription.events;
      const memberToInviter = /* @__PURE__ */ new Map();
      for (const redemption of redemptions) {
        const inviterTag = redemption.tags.find((tag) => tag[0] === "p");
        if (inviterTag && inviterTag[1]) {
          memberToInviter.set(redemption.pubkey, inviterTag[1]);
        }
      }
      return intros.map((event) => ({ event, invitedBy: memberToInviter.get(event.pubkey) || null })).sort((a, b) => (b.event.created_at || 0) - (a.event.created_at || 0)).slice(0, 10);
    })();
    const newMembers = (() => {
      console.log("[INVITES] newMembers $derived.by running", redemptionsSubscription?.events.length);
      if (!redemptionsSubscription) return [];
      const redemptions = redemptionsSubscription.events;
      return redemptions.map((redemption) => {
        const inviterTag = redemption.tags.find((tag) => tag[0] === "p");
        return {
          memberPubkey: redemption.pubkey,
          inviterPubkey: inviterTag?.[1] || null,
          joinedAt: redemption.created_at || 0
        };
      }).sort((a, b) => b.joinedAt - a.joinedAt).slice(0, 20);
    })();
    if (
      // Set up header
      !isAgora
    ) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="min-h-screen flex items-center justify-center p-4"><div class="text-center"><svg class="w-16 h-16 mx-auto mb-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> <h2 class="text-xl font-semibold text-foreground mb-2">Select an Agora</h2> <p class="text-muted-foreground">This page shows community invites for a specific Agora</p></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="w-full lg:max-w-4xl mx-auto p-4 space-y-6">`);
      TopInvitersPodium($$renderer2, { stats: inviterStats });
      $$renderer2.push(`<!----> <div class="bg-card rounded-xl border border-border p-6"><h2 class="text-xl font-bold text-foreground mb-4">👋 New Members</h2> `);
      if (newMembers.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-muted-foreground text-center py-8">No new members yet</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-3"><!--[-->`);
        const each_array = ensure_array_like(newMembers.slice(0, 6));
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let member = each_array[$$index];
          NewMemberCard($$renderer2, {
            memberPubkey: member.memberPubkey,
            inviterPubkey: member.inviterPubkey,
            joinedAt: member.joinedAt
          });
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="bg-card rounded-xl border border-border p-6"><h2 class="text-xl font-bold text-foreground mb-4">💬 Introductions</h2> `);
      if (introductions.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-muted-foreground text-center py-8">No introductions yet</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="space-y-4"><!--[-->`);
        const each_array_1 = ensure_array_like(introductions);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let intro = each_array_1[$$index_1];
          IntroductionCard($$renderer2, { event: intro.event, invitedBy: intro.invitedBy });
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-ULBFs2kt.js.map
