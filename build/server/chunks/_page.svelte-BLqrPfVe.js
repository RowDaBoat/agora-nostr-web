import { d as attr_style, g as store_get, e as ensure_array_like, a as attr_class, b as attr, u as unsubscribe_stores, s as stringify, c as clsx } from './index2-DpBdzO5t.js';
import { f as getAgoraLanguage, s as settings, n as ndk, W as WALLET_DEFAULT_RELAYS, A as AGORA_RELAYS, i as isAgoraRelay } from './ndk.svelte-BfhDBrJw.js';
import './utils-KcIDVAAe.js';
import 'clsx';
import './state.svelte-zw3OW0Pf.js';
import { NDKEvent, NDKRelaySet, filterFromId, NDKKind, NDKFollowPack, NDKSubscriptionCacheUsage } from '@nostr-dev-kit/ndk';
import '@nostr-dev-kit/wallet';
import { a as $locale, $ as $format } from './runtime-9tjL5BFW.js';
import { n as npubCash } from './npubcash.svelte-CJyS_ttu.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { n as setContext, W as getContext } from './context-D7LG2f18.js';
import { g as getNDKFromContext } from './index5-D9xIoHLj.js';
import { N as NDKBlossom, A as Avatar_group, b as ContentComposer, a as NoteCard } from './ComposeDialog-rF5DhufZ.js';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import './url-healing-Vba5GwtC.js';
import { c as createBlossomUpload } from './blossom-upload.svelte-Bf1gqD-l.js';
import '@nostr-dev-kit/cache-sqlite-wasm';
import 'tty';
import 'util';
import 'os';
import './index-BYTxiVRf.js';
import './event-content-COF8hoaI.js';
import './index4-D71bD0RT.js';
import 'tailwind-merge';
import './toast.svelte-BEvONWAz.js';
import './relayInfo.svelte-CrGOXzx2.js';
import './index3-DOo-Ka_h.js';
import './scroll-lock-YhRhLzPR.js';
import './events-CY0_bqjb.js';
import './button-DBIbgud-.js';
import './utils2-B05Dmz_H.js';
import './button2-JT-_T3Ay.js';
import './index-BCLI0M1W.js';
import './RelayPublishDropdownContent-CzmVdnh5.js';
import './RelayIcon-DEER5mbZ.js';
import './index.svelte-EYlAHNHC.js';
import './client-C1nnVzci.js';

const FOLLOW_PACK_CONTEXT_KEY = Symbol("follow-pack");
function Follow_pack_root($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ndk: providedNdk,
      followPack,
      onclick,
      class: className = "",
      children
    } = $$props;
    const ndk2 = getNDKFromContext(providedNdk);
    const context = {
      get ndk() {
        return ndk2;
      },
      get followPack() {
        return followPack;
      },
      get onclick() {
        return onclick;
      }
    };
    setContext(FOLLOW_PACK_CONTEXT_KEY, context);
    $$renderer2.push(`<div${attr_class(`contents ${stringify(className)}`)}>`);
    children($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
function Follow_pack_image($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className = "", showGradient = false, fallback } = $$props;
    const context = getContext(FOLLOW_PACK_CONTEXT_KEY);
    const imageUrl = context.followPack.image || fallback;
    if (imageUrl) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(`follow-pack-image relative overflow-hidden ${stringify(className)}`)}><img${attr("src", imageUrl)}${attr("alt", context.followPack.title || "Follow pack")} class="w-full h-full object-cover"/> `);
      if (showGradient) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (fallback === void 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div${attr_class(`follow-pack-image-fallback bg-muted flex items-center justify-center ${stringify(className)}`)}><svg class="w-1/3 h-1/3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Follow_pack_title($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className = "", lines } = $$props;
    const context = getContext(FOLLOW_PACK_CONTEXT_KEY);
    const title = context.followPack.title || "Untitled Pack";
    const lineClampClass = lines ? `line-clamp-${lines}` : "";
    $$renderer2.push(`<span${attr_class(`follow-pack-title ${stringify(lineClampClass)} ${stringify(className)}`)}>${escape_html(title)}</span>`);
  });
}
function Follow_pack_description($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className = "", maxLength, lines } = $$props;
    const context = getContext(FOLLOW_PACK_CONTEXT_KEY);
    const description = context.followPack.description || "";
    const truncatedDescription = maxLength && description.length > maxLength ? description.slice(0, maxLength) + "..." : description;
    const lineClampClass = lines ? `line-clamp-${lines}` : "";
    if (description) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span${attr_class(`follow-pack-description ${stringify(lineClampClass)} ${stringify(className)}`)}>${escape_html(truncatedDescription)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Follow_pack_member_count($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className = "", format = "short" } = $$props;
    const context = getContext(FOLLOW_PACK_CONTEXT_KEY);
    const count = context.followPack.pubkeys.length;
    const displayText = format === "long" ? `${count} ${count === 1 ? "person" : "people"}` : count.toString();
    $$renderer2.push(`<span${attr_class(`follow-pack-member-count ${stringify(className)}`)}>${escape_html(displayText)}</span>`);
  });
}
const FollowPack = {
  Root: Follow_pack_root,
  Image: Follow_pack_image,
  Title: Follow_pack_title,
  Description: Follow_pack_description,
  MemberCount: Follow_pack_member_count
};
const DEFAULT_STATE = {
  invite: null,
  currentStep: 1,
  selectedCommunity: null,
  selectedPacks: [],
  profileData: {
    name: "",
    bio: "",
    location: "",
    banner: void 0,
    picture: void 0,
    nip05: ""
  },
  introductionText: void 0,
  hasPublishedInviteConfirmation: false,
  hasCompletedInviteSetup: false
};
function loadState() {
  if (typeof window === "undefined") {
    console.log("[Store] Server-side, returning DEFAULT_STATE");
    return DEFAULT_STATE;
  }
  try {
    const stored = sessionStorage.getItem("voces-onboarding");
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log("[Store] Loaded state from sessionStorage:", parsed);
      if (parsed.invite) {
        return { ...DEFAULT_STATE, ...parsed };
      } else {
        console.log("[Store] No active invite, ignoring stored state and starting fresh");
        return DEFAULT_STATE;
      }
    } else {
      console.log("[Store] No stored state found, using DEFAULT_STATE");
    }
  } catch (e) {
    console.error("[Store] Failed to load onboarding state:", e);
  }
  return DEFAULT_STATE;
}
function saveState(state) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem("voces-onboarding", JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save onboarding state:", e);
  }
}
class OnboardingStore {
  state = loadState();
  get invite() {
    return this.state.invite;
  }
  get currentStep() {
    return this.state.currentStep;
  }
  get selectedCommunity() {
    return this.state.selectedCommunity;
  }
  get selectedPacks() {
    return this.state.selectedPacks;
  }
  get profileData() {
    return this.state.profileData;
  }
  get introductionText() {
    return this.state.introductionText;
  }
  get hasInvite() {
    return !!this.state.invite;
  }
  get hasCompletedInviteSetup() {
    return this.state.hasCompletedInviteSetup;
  }
  get totalSteps() {
    return this.hasInvite ? 4 : 6;
  }
  get minStep() {
    return this.hasInvite ? 3 : 1;
  }
  setInvite(invite) {
    console.log("[Store] setInvite called with:", invite);
    this.state.invite = invite;
    if (invite.recipientName && !this.state.profileData.name) {
      console.log("[Store] Pre-filling profile name:", invite.recipientName);
      this.state.profileData.name = invite.recipientName;
    }
    if (invite.inviteRelay) {
      const agoraLanguage = getAgoraLanguage(invite.inviteRelay);
      if (agoraLanguage) {
        console.log(`[Store] Setting language to ${agoraLanguage} based on agora relay ${invite.inviteRelay}`);
        settings.setLanguage(agoraLanguage);
        $locale.set(agoraLanguage);
      }
    }
    console.log("[Store] Setting step to 3 (features)");
    this.state.currentStep = 3;
    saveState(this.state);
    console.log("[Store] ✓ Invite data saved to sessionStorage");
  }
  setStep(step) {
    this.state.currentStep = step;
    saveState(this.state);
  }
  setSelectedCommunity(community) {
    this.state.selectedCommunity = community;
    if (community) {
      const communityToLocale = {
        venezuela: "es",
        nicaragua: "es",
        cambodia: "km",
        zimbabwe: "sn",
        afghanistan: "fa",
        iran: "fa"
      };
      const newLocale = communityToLocale[community];
      if (newLocale) {
        console.log(`[Store] Setting language to ${newLocale} based on community ${community}`);
        settings.setLanguage(newLocale);
        $locale.set(newLocale);
      }
    }
    saveState(this.state);
  }
  setSelectedPacks(packs) {
    this.state.selectedPacks = packs;
    saveState(this.state);
  }
  setProfileData(data) {
    this.state.profileData = { ...this.state.profileData, ...data };
    saveState(this.state);
  }
  setIntroductionText(text) {
    this.state.introductionText = text;
    saveState(this.state);
  }
  async publishInviteConfirmation(signer) {
    console.log("[Store] publishInviteConfirmation called:", {
      hasPublished: this.state.hasPublishedInviteConfirmation,
      inviteData: this.state.invite
    });
    if (this.state.hasPublishedInviteConfirmation) {
      console.log("[Store] ⊘ Invite confirmation already published");
      return;
    }
    const invite = this.state.invite;
    console.log("[Store] Checking invite data:", {
      hasInvite: !!invite,
      inviteEventId: invite?.inviteEventId,
      inviter: invite?.inviter,
      inviteRelay: invite?.inviteRelay,
      inviteCode: invite?.inviteCode
    });
    if (!invite?.inviteEventId || !invite?.inviter || !invite?.inviteRelay || !invite?.inviteCode) {
      console.warn("[Store] ✗ Missing required invite data for confirmation");
      return;
    }
    try {
      console.log("[Store] Creating kind:514 event...");
      const confirmationEvent = new NDKEvent(ndk);
      confirmationEvent.kind = 514;
      confirmationEvent.content = "";
      confirmationEvent.tags = [
        ["e", invite.inviteEventId],
        ["p", invite.inviter],
        ["code", invite.inviteCode]
      ];
      confirmationEvent.isProtected = true;
      console.log("[Store] Signing event...");
      await confirmationEvent.sign();
      console.log("[Store] ✓ Event signed");
      console.log("[Store] Getting relay:", invite.inviteRelay);
      const relay = ndk.pool.getRelay(invite.inviteRelay, true);
      if (relay) {
        console.log("[Store] ✓ Relay obtained:", relay.url);
        const relaySet = new NDKRelaySet(/* @__PURE__ */ new Set([relay]), ndk);
        console.log("[Store] Publishing kind:514 invite confirmation to", invite.inviteRelay);
        await confirmationEvent.publish(relaySet);
        console.log("[Store] ✓ Successfully published kind:514 invite confirmation");
        console.log("[Store] Setting selected relay in settings...");
        settings.setSelectedRelay(invite.inviteRelay);
        const existingRelay = settings.relays.find((r) => r.url === invite.inviteRelay);
        if (!existingRelay) {
          console.log("[Store] Adding relay to settings...");
          settings.addRelay({
            url: invite.inviteRelay,
            read: true,
            write: true,
            enabled: true
          });
        } else {
          console.log("[Store] Relay already in settings");
        }
        this.state.hasPublishedInviteConfirmation = true;
        saveState(this.state);
        console.log("[Store] ✓ Marked as published in state");
      } else {
        console.error("[Store] ✗ Failed to get relay:", invite.inviteRelay);
      }
    } catch (err) {
      console.error("[Store] ✗ Error publishing invite confirmation:", err);
      throw err;
    }
  }
  async publishProfileAndSetup(signer) {
    console.log("[Store] publishProfileAndSetup called for non-invited user");
    const profile = this.state.profileData;
    if (!profile.name) {
      console.warn("[Store] ✗ No profile name, skipping");
      return;
    }
    if (!ndk.$sessions) {
      console.error("[Store] ✗ No sessions manager available");
      return;
    }
    try {
      const user = await signer.user();
      npubCash.setEnabled(true);
      const lud16 = npubCash.getLightningAddress();
      const relays = /* @__PURE__ */ new Set();
      relays.add("wss://purplepag.es");
      relays.add("wss://relay.primal.net");
      console.log("[Store] Creating account with createAccount() using existing signer...");
      const { events } = await ndk.$sessions.createAccount(
        {
          profile: {
            name: profile.name,
            about: profile.bio,
            ...profile.location && { location: profile.location },
            ...profile.picture && { picture: profile.picture },
            ...profile.nip05 && { nip05: profile.nip05 },
            ...lud16 && { lud16 }
          },
          relays: Array.from(relays),
          wallet: {
            mints: ["https://mint.minibits.cash/Bitcoin"],
            relays: [...WALLET_DEFAULT_RELAYS]
          }
        },
        { publish: false, signer }
      );
      console.log("[Store] ✓ Created signed events:", events.length);
      console.log("[Store] Publishing events to default relays...");
      for (const event of events) {
        await event.publish();
        console.log(`[Store] ✓ Published kind:${event.kind} to default relays`);
      }
      console.log("[Store] ✓ Profile and setup complete");
    } catch (err) {
      console.error("[Store] ✗ Error publishing profile and setup:", err);
      throw err;
    }
  }
  async completeInviteSetup(signer) {
    console.log("[Store] completeInviteSetup called:", {
      hasCompletedSetup: this.state.hasCompletedInviteSetup,
      hasInvite: this.hasInvite
    });
    if (this.state.hasCompletedInviteSetup) {
      console.log("[Store] ⊘ Invite setup already completed, skipping");
      return;
    }
    if (!this.hasInvite) {
      console.log("[Store] ⊘ No invite data, skipping invite setup");
      return;
    }
    try {
      console.log("[Store] Publishing kind:514 invite confirmation...");
      await this.publishInviteConfirmation(signer);
      this.state.hasCompletedInviteSetup = true;
      saveState(this.state);
      console.log("[Store] ✓ Invite acceptance complete (kind:514 published)");
    } catch (err) {
      await this.publishInviteConfirmation(signer);
      console.error("[Store] ✗ Error during invite acceptance:", err);
    }
  }
  clear() {
    this.state = { ...DEFAULT_STATE };
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("voces-onboarding");
    }
  }
}
const onboardingStore = new OnboardingStore();
function Step1Community($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { selectedCommunity } = $$props;
    const communities = [
      {
        id: "venezuela",
        name: "Venezuela",
        flag: "🇻🇪",
        description: "Connect with the resilient Venezuelan community",
        image: "https://images.unsplash.com/photo-1520525003249-2b9cdda513bc?w=800&q=80",
        fallbackColor: "from-yellow-500 to-blue-600",
        leaders: ["María Rodríguez", "Carlos Mendoza", "Ana Lucia"]
      },
      {
        id: "cambodia",
        name: "Cambodia",
        flag: "🇰🇭",
        description: "Join voices from the Kingdom of Wonder",
        image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=80",
        fallbackColor: "from-red-500 to-blue-700",
        leaders: ["Sokha Chen", "Dara Vong", "Srey Mom"]
      },
      {
        id: "nicaragua",
        name: "Nicaragua",
        flag: "🇳🇮",
        description: "Unite with Nicaraguan changemakers",
        image: "https://images.unsplash.com/photo-1503542724004-53f16c988e63?w=800&q=80",
        fallbackColor: "from-blue-500 to-sky-600",
        leaders: ["Roberto Silva", "Elena Martinez", "Juan Carlos"]
      },
      {
        id: "zimbabwe",
        name: "Zimbabwe",
        flag: "🇿🇼",
        description: "Connect with Zimbabwe's innovators",
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
        fallbackColor: "from-green-600 to-yellow-500",
        leaders: ["Tendai Moyo", "Grace Ndlovu", "David Chuma"]
      },
      {
        id: "afghanistan",
        name: "Afghanistan",
        flag: "🇦🇫",
        description: "Support Afghan voices of hope",
        image: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=800&q=80",
        fallbackColor: "from-black to-red-700",
        leaders: ["Ahmad Shah", "Fatima Rashidi", "Nasir Khan"]
      },
      {
        id: "iran",
        name: "Iran",
        flag: "🇮🇷",
        description: "Join the Persian community",
        image: "https://images.unsplash.com/photo-1608592077365-c6399182e63c?w=800&q=80",
        fallbackColor: "from-green-600 to-red-600",
        leaders: ["Reza Hosseini", "Maryam Azadi", "Ali Karimi"]
      }
    ];
    $$renderer2.push(`<div class="flex min-h-screen"><div class="hidden lg:block w-1/2 relative">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<img src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&amp;q=80" alt="Community gathering" class="absolute inset-0 w-full h-full object-cover" onerror="this.__e=event"/>`);
    }
    $$renderer2.push(`<!--]--> <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div> <div class="absolute bottom-12 left-12 right-12 text-foreground"><h1 class="text-5xl font-bold mb-4">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step1Community.title"))}</h1> <p class="text-xl opacity-90">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step1Community.subtitle"))}</p></div></div> <div class="flex-1 flex items-center justify-center p-8 lg:p-12"><div class="max-w-xl w-full"><div class="mb-12 lg:hidden"><h1 class="text-4xl font-bold mb-3">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step1Community.titleMobile"))}</h1> <p class="text-muted-foreground">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step1Community.subtitleMobile"))}</p></div> <div class="lg:mb-8"><h2 class="text-2xl font-semibold mb-3">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step1Community.chooseCommunity"))}</h2> <p class="text-muted-foreground text-sm">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step1Community.selectDescription"))}</p></div> <div class="grid grid-cols-2 gap-3 mb-8"><!--[-->`);
    const each_array = ensure_array_like(communities);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let community = each_array[$$index];
      const isSelected = selectedCommunity === community.id;
      $$renderer2.push(`<button${attr_class(`
              relative overflow-hidden rounded-lg border-2 transition-all
              ${isSelected ? "border-black dark:border-white shadow-lg scale-[1.02]" : "border hover:border dark:hover:border"}
            `)}><div class="relative h-32"><img${attr("src", community.image)}${attr("alt", community.name)} class="absolute inset-0 w-full h-full object-cover" onerror="this.__e=event"/> <div${attr_class(`absolute inset-0 bg-gradient-to-br ${community.fallbackColor}`)} style="display: none;"></div> <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div class="absolute bottom-3 left-3 right-3"><div class="flex items-center gap-2 text-foreground"><span class="text-2xl">${escape_html(community.flag)}</span> <span class="font-semibold">${escape_html(community.name)}</span></div> <div class="text-xs text-foreground/80 mt-1">${escape_html(community.leaders.length)} ${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step1Community.communityLeaders"))}</div></div></div></button>`);
    }
    $$renderer2.push(`<!--]--></div> <button${attr("disabled", !selectedCommunity, true)}${attr_class(`
          w-full py-4 px-6 rounded-lg font-medium transition-all
          ${selectedCommunity ? "bg-background dark:bg-white text-foreground dark:text-black hover:bg-muted dark:hover:bg-neutral-200" : "bg-neutral-100 dark:bg-background text-muted-foreground cursor-not-allowed"}
        `)}>${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step1Community.continue"))} →</button></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
const COMMUNITY_RELAYS = {
  venezuela: [AGORA_RELAYS[1]],
  // ve.agorawlc.com
  nicaragua: [AGORA_RELAYS[2]]
  // ni.agorawlc.com
  // Other communities can be added here as they get their own relays
};
const HARDCODED_COMMUNITY_PACKS = {
  venezuela: [
    "naddr1qvzqqqyckypzp75v7yjjc7h7lzaf3gfvpck39mvcjmylz7aleup9mtutd5yrlxv7qythwumn8ghj7un9d3shjtnswf5k6ctv9ehx2ap0qythwumn8ghj7un9d3shjtnwdaehgu3wvfskuep0qqv4qmmv946xjcmp94tx2mn90f6k2mrp945kwart09hsc909n2"
  ]
  // Other communities can be added here as needed
};
const FOLLOW_PACK_KIND = NDKKind.FollowPack;
const COMMUNITY_METADATA = {
  venezuela: {
    name: "Venezuela",
    description: "Connect with the Venezuelan community"
  },
  cambodia: {
    name: "Cambodia",
    description: "Join voices from the Kingdom of Wonder"
  },
  nicaragua: {
    name: "Nicaragua",
    description: "Unite with Nicaraguan changemakers"
  },
  zimbabwe: {
    name: "Zimbabwe",
    description: "Connect with Zimbabwe's innovators"
  },
  afghanistan: {
    name: "Afghanistan",
    description: "Support Afghan voices of hope"
  },
  iran: {
    name: "Iran",
    description: "Join the Persian community"
  }
};
function Follow_pack_compact($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { ndk: providedNdk, followPack, onclick, class: className = "" } = $$props;
    const ndk2 = getNDKFromContext(providedNdk);
    $$renderer2.push(`<!---->`);
    FollowPack.Root($$renderer2, {
      ndk: ndk2,
      followPack,
      onclick,
      children: ($$renderer3) => {
        $$renderer3.push(`<button data-follow-pack-compact="" type="button"${attr_class(`group flex items-center gap-4 w-full p-4 rounded-xl bg-card hover:bg-muted transition-colors ${stringify(className)}`)}><!---->`);
        FollowPack.Image($$renderer3, { class: "w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden" });
        $$renderer3.push(`<!----> <div class="flex-1 min-w-0 text-left"><!---->`);
        FollowPack.Title($$renderer3, { class: "text-sm font-semibold mb-1", lines: 1 });
        $$renderer3.push(`<!----> <!---->`);
        FollowPack.Description($$renderer3, {
          class: "text-xs text-muted-foreground mb-3",
          maxLength: 80,
          lines: 2
        });
        $$renderer3.push(`<!----> <div class="flex items-center gap-3">`);
        Avatar_group($$renderer3, { ndk: ndk2, pubkeys: followPack.pubkeys, max: 3, size: 20 });
        $$renderer3.push(`<!----> <div class="flex items-center gap-1.5 text-xs text-muted-foreground"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> <!---->`);
        FollowPack.MemberCount($$renderer3, { format: "long" });
        $$renderer3.push(`<!----></div></div></div></button>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!---->`);
  });
}
function Step2FollowPacks($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { selectedCommunity, selectedPacks, onSelectPacks } = $$props;
    const communityKey = selectedCommunity || "venezuela";
    const hardcodedNaddrs = HARDCODED_COMMUNITY_PACKS[communityKey];
    const followPacksSubscription = (() => {
      if (hardcodedNaddrs && hardcodedNaddrs.length > 0) {
        const filters = hardcodedNaddrs.map((naddr) => filterFromId(naddr));
        return ndk.$subscribe(() => ({ filters, subId: "followpacks", closeOnEose: true }));
      } else {
        const relayUrls = COMMUNITY_RELAYS[communityKey];
        if (!relayUrls || relayUrls.length === 0) {
          console.warn(`No relay configured for community: ${communityKey}`);
          return null;
        }
        return ndk.$subscribe(() => ({
          filters: [{ kinds: [FOLLOW_PACK_KIND] }],
          subId: "followpacks",
          closeOnEose: true,
          relayUrls,
          exclusiveRelay: true
        }));
      }
    })();
    const followPacks = (() => {
      if (!followPacksSubscription) return [];
      const events = Array.from(followPacksSubscription.events ?? []);
      return events.map((event) => NDKFollowPack.from(event));
    })();
    const loading = followPacksSubscription?.eoseReceived === false;
    const communityInfo = COMMUNITY_METADATA[communityKey] || COMMUNITY_METADATA.venezuela;
    function handlePackClick(pack) {
      const packId = pack.encode();
      console.log("[Step2] Pack clicked:", pack.title, "packId:", packId);
      if (selectedPacks.includes(packId)) {
        console.log("[Step2] Deselecting pack");
        onSelectPacks(selectedPacks.filter((id) => id !== packId));
      } else {
        console.log("[Step2] Selecting pack");
        onSelectPacks([...selectedPacks, packId]);
      }
      console.log("[Step2] Selected packs count:", selectedPacks.length);
    }
    $$renderer2.push(`<div class="flex min-h-screen"><div class="hidden lg:block w-1/2 relative"><img src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&amp;q=80" alt="Community leaders" class="absolute inset-0 w-full h-full object-cover"/> <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70"></div> <div class="absolute bottom-0 left-0 right-0 p-12"><div class="mb-8"><p class="text-3xl text-foreground/90 italic leading-relaxed">"${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step2FollowPacks.quote"))}"</p></div> <div class="flex items-center gap-4"><div class="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-foreground font-semibold">MR</div> <div class="text-foreground"><div class="font-semibold">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step2FollowPacks.quoteName"))}</div> <div class="text-sm opacity-75">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step2FollowPacks.quoteTitle"))}</div></div></div></div></div> <div class="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-12"><div class="max-w-xl w-full"><div class="mb-6 lg:mb-8"><h1 class="text-2xl lg:text-3xl font-bold mb-2 lg:mb-3">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step2FollowPacks.title"))}</h1> <p class="text-sm lg:text-base text-muted-foreground">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step2FollowPacks.subtitle", { values: { community: communityInfo.name } }))}</p></div> `);
    if (loading) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div> <p class="mt-4 text-sm text-muted-foreground">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step2FollowPacks.loading"))}</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (followPacks.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-center py-8 text-muted-foreground">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step2FollowPacks.noPacksAvailable"))}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="space-y-2 mb-6 lg:mb-8 max-h-[50vh] lg:max-h-[60vh] overflow-y-auto p-2 -m-2"><!--[-->`);
        const each_array = ensure_array_like(followPacks.slice(0, 6));
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let pack = each_array[$$index];
          const isSelected = selectedPacks.includes(pack.encode());
          $$renderer2.push(`<div class="relative">`);
          Follow_pack_compact($$renderer2, {
            ndk,
            followPack: pack,
            onclick: () => handlePackClick(pack),
            class: isSelected ? "ring-2 ring-orange-500 bg-primary-50 dark:bg-primary-950/20" : ""
          });
          $$renderer2.push(`<!----> `);
          if (isSelected) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="absolute top-1/2 right-4 -translate-y-1/2 bg-primary text-foreground rounded-full p-1.5 z-10 pointer-events-none"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--> <button${attr_class(`
          w-full py-3 lg:py-4 px-6 rounded-lg font-medium transition-all text-sm lg:text-base
          bg-primary/80 text-primary-foreground dark:text-foreground hover:bg-primary
          }
        `)}>${escape_html(selectedPacks.length > 0 ? store_get($$store_subs ??= {}, "$t", $format)("onboarding.step2FollowPacks.continue") : store_get($$store_subs ??= {}, "$t", $format)("onboarding.step2FollowPacks.skip"))} →</button></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Step3Features($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    $$renderer2.push(`<div class="min-h-screen flex items-center justify-center p-8 py-16"><div class="max-w-5xl w-full"><div class="text-center mb-12"><h2 class="text-3xl font-bold mb-3">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step3Features.title"))}</h2> <p class="text-lg text-muted-foreground">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step3Features.subtitle"))}</p></div> <div class="grid md:grid-cols-3 gap-6 mb-12"><div class="bg-neutral-50 dark:bg-card rounded-xl p-6 border border"><div class="text-5xl mb-4 text-center">🛍️</div> <h3 class="text-xl font-bold mb-2 text-center">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step3Features.marketplace.title"))}</h3> <p class="text-sm text-muted-foreground mb-4 text-center">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step3Features.marketplace.description"))}</p> <div class="bg-card rounded-lg p-4 text-left border border"><div class="flex items-center gap-2 mb-2"><div class="w-8 h-8 bg-neutral-300 dark:bg-muted rounded-full flex items-center justify-center text-xs font-medium">MR</div> <div class="flex-1 min-w-0"><div class="font-semibold text-sm truncate">María's Bakery</div> <div class="text-xs text-muted-foreground">2km away</div></div></div> <div class="text-sm font-medium mb-1">Fresh Bread &amp; Pastries</div> <div class="text-xs text-muted-foreground mb-2">Daily baked goods, accepting sats</div> <div class="text-sm font-semibold">2,500 sats / dozen</div></div></div> <div class="bg-neutral-50 dark:bg-card rounded-xl p-6 border border"><div class="text-5xl mb-4 text-center">🤝</div> <h3 class="text-xl font-bold mb-2 text-center">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step3Features.p2p.title"))}</h3> <p class="text-sm text-muted-foreground mb-4 text-center">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step3Features.p2p.description"))}</p> <div class="bg-card rounded-lg p-4 border border"><div class="space-y-2"><div class="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded text-xs"><div class="flex items-center gap-2"><span class="text-green-600 dark:text-green-400 font-semibold">BUY</span> <span class="font-medium">100 USD</span></div> <div class="text-right"><div class="font-semibold">485k sats</div></div></div> <div class="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/20 rounded text-xs"><div class="flex items-center gap-2"><span class="text-red-600 dark:text-red-400 font-semibold">SELL</span> <span class="font-medium">50 USD</span></div> <div class="text-right"><div class="font-semibold">240k sats</div></div></div></div> <div class="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-3"><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> <span>${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step3Features.p2p.reputationBased"))}</span></div></div></div> <div class="bg-neutral-50 dark:bg-card rounded-xl p-6 border border"><div class="text-5xl mb-4 text-center">📰</div> <h3 class="text-xl font-bold mb-2 text-center">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step3Features.news.title"))}</h3> <p class="text-sm text-muted-foreground mb-4 text-center">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step3Features.news.description"))}</p> <div class="bg-card rounded-lg p-4 text-left border border"><div class="flex items-center gap-2 mb-2"><div class="w-8 h-8 bg-neutral-300 dark:bg-muted rounded-full flex items-center justify-center text-xs font-medium">CM</div> <div class="flex-1 min-w-0"><div class="font-semibold text-sm truncate">Carlos Mendoza</div> <div class="text-xs text-muted-foreground">2 hours ago</div></div></div> <div class="text-sm font-medium mb-1">Alternative Supply Chain</div> <div class="text-xs text-muted-foreground mb-2">Direct farmer-to-community network reduces costs by 40%...</div> <div class="flex items-center gap-3 text-xs text-muted-foreground"><span>⚡ 23.5k</span> <span>💬 156</span> <span>🔁 89</span></div></div></div></div> <div class="text-center"><button class="bg-background dark:bg-white text-foreground dark:text-black px-8 py-3 rounded-lg font-medium hover:bg-muted dark:hover:bg-neutral-200 transition-colors">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step3Features.continue"))} →</button></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function PictureUpload($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let {
      ndk: ndk2,
      signer,
      currentImageUrl,
      fallbackInitials
    } = $$props;
    const blossom = new NDKBlossom(ndk2, signer);
    const upload = createBlossomUpload(blossom);
    let previewUrl = currentImageUrl || null;
    $$renderer2.push(`<div class="w-full"><input type="file" accept="image/*" class="hidden"/> <div role="button" tabindex="0"${attr_class(`
      relative w-32 h-32 rounded-full overflow-hidden cursor-pointer
      border-4 border-background
      transition-all duration-200
      ${""}
      ${upload.status === "uploading" ? "pointer-events-none" : ""}
    `)}>`);
    if (previewUrl && upload.status !== "uploading") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<img${attr("src", previewUrl)} alt="Profile" class="w-full h-full object-cover"/> <div class="absolute inset-0 bg-background/0 hover:bg-background/40 transition-all flex items-center justify-center opacity-0 hover:opacity-100"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (upload.status === "uploading") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="w-full h-full bg-neutral-100 dark:bg-muted flex flex-col items-center justify-center"><div class="w-12 h-12 border-4 border border-t-neutral-900 dark:border-t-white rounded-full animate-spin"></div> `);
        if (upload.progress) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-xs mt-2 text-muted-foreground">${escape_html(upload.progress.percentage)}%</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="w-full h-full bg-card dark:bg-white text-foreground dark:text-black hover:bg-muted dark:hover:bg-neutral-100 transition-colors flex flex-col items-center justify-center gap-2 group">`);
        if (fallbackInitials) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="text-3xl font-bold group-hover:opacity-50 transition-opacity">${escape_html(fallbackInitials)}</span> <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 flex items-center justify-center bg-background/40"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted-foreground"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (upload.status === "error") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-xs text-red-600 dark:text-red-400 mt-2 text-center">${escape_html(upload.error?.message || store_get($$store_subs ??= {}, "$t", $format)("onboarding.pictureUpload.uploadFailed"))}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function extractDomainFromRelay(relayUrl) {
  try {
    const url = new URL(relayUrl);
    return url.hostname;
  } catch {
    return "";
  }
}
function Step6Profile($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { profileData, inviteRelay, signer } = $$props;
    const showNip05 = inviteRelay && isAgoraRelay(inviteRelay);
    const nip05Domain = inviteRelay ? extractDomainFromRelay(inviteRelay) : "";
    let nip05Username = "";
    const user = ndk.$currentUser;
    const blossom = (() => {
      if (!user) return null;
      return new NDKBlossom(ndk, signer);
    })();
    const bannerUpload = (() => {
      if (!blossom) return null;
      return createBlossomUpload(blossom);
    })();
    function getInitials(name) {
      if (!name) return "?";
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    }
    $$renderer2.push(`<div class="min-h-screen flex flex-col items-center justify-center p-8"><div class="text-center mb-8 max-w-2xl"><h1 class="text-4xl font-bold mb-3">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step4Profile.title"))}</h1> <p class="text-lg text-muted-foreground">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step4Profile.subtitle"))}</p></div> <div class="relative flex items-center justify-center gap-6 mb-12"><div class="w-80 bg-card border border rounded-xl overflow-hidden transform -rotate-3 scale-95 opacity-80"><div class="h-32 bg-cover bg-center" style="background-image: url(https://m.primal.net/OQwX.jpg)"></div> <div class="relative -mt-12 px-6 pb-6"><img src="https://m.primal.net/OQwW.jpg" alt="Leopoldo López" class="w-24 h-24 rounded-full border-4 border-background object-cover"/> <div class="mt-4"><h3 class="text-xl font-bold">Leopoldo López</h3> <p class="text-sm text-muted-foreground mb-2">✓ leo@primal.net</p> <p class="text-sm text-muted-foreground">Former Mayor of Caracas (2000-08). Political prisoner 2014-21. Co-founder of World Liberty Congress.</p></div></div></div> <div class="w-96 bg-card border-2 border-foreground rounded-xl overflow-hidden shadow-2xl transform scale-105 z-10"><input type="file" accept="image/*" class="hidden"/> <button type="button"${attr("disabled", bannerUpload?.status === "uploading", true)} class="h-36 relative w-full group bg-gradient-to-br from-primary-500 to-primary-600"${attr_style(profileData.banner ? `background-image: url(${profileData.banner}); background-size: cover; background-position: center;` : "")}><div class="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">`);
    if (bannerUpload?.status === "uploading") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> <span class="text-foreground text-sm font-medium">${escape_html(bannerUpload.progress?.percentage)}%</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<svg class="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`);
    }
    $$renderer2.push(`<!--]--></div></button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="relative -mt-14 px-6 pb-6">`);
    PictureUpload($$renderer2, {
      ndk,
      signer,
      currentImageUrl: profileData.picture,
      fallbackInitials: getInitials(profileData.name)
    });
    $$renderer2.push(`<!----> <div class="space-y-3"><div><input type="text"${attr("value", profileData.name)}${attr("placeholder", store_get($$store_subs ??= {}, "$t", $format)("onboarding.step4Profile.namePlaceholder"))} class="text-2xl font-bold bg-transparent border-b-2 border-transparent hover:border !ring-0 outline-none transition-colors w-full text-foreground"/></div> <div><textarea${attr("placeholder", store_get($$store_subs ??= {}, "$t", $format)("onboarding.step4Profile.bioPlaceholder"))} class="text-sm text-muted-foreground bg-transparent border border-transparent hover:border !ring-0 outline-none transition-colors w-full resize-none rounded p-2"${attr("rows", 3)}>`);
    const $$body = escape_html(profileData.bio);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> `);
    if (showNip05) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-1"><div class="text-xs text-muted-foreground font-medium">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step4Profile.usernameLabel"))}</div> <div class="flex items-center gap-1"><input type="text"${attr("value", nip05Username)}${attr("placeholder", store_get($$store_subs ??= {}, "$t", $format)("onboarding.step4Profile.usernamePlaceholder"))} class="text-sm text-foreground bg-transparent border-b-2 border hover:border focus:border-primary dark:focus:border-primary outline-none transition-colors flex-1 min-w-0"/> <span class="text-sm text-muted-foreground">@${escape_html(nip05Domain)}</span></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="w-80 bg-card border border rounded-xl overflow-hidden transform rotate-3 scale-95 opacity-80"><div class="h-32 bg-cover bg-center" style="background-image: url(https://m.primal.net/OTue.jpg)"></div> <div class="relative -mt-12 px-6 pb-6"><img src="https://m.primal.net/OTkq.jpg" alt="Enderson Sequera" class="w-24 h-24 rounded-full border-4 border-background object-cover"/> <div class="mt-4"><h3 class="text-xl font-bold">Enderson Sequera</h3> <p class="text-sm text-muted-foreground mb-2">🇻🇪 Political Scientist</p> <p class="text-sm text-muted-foreground">Political advisor &amp; freedom fighter. Bitcoin is freedom - in the fight against dictatorship it saves lives.</p></div></div></div></div> <button${attr("disabled", !profileData.name, true)}${attr_class(`
      px-8 py-3 rounded-lg font-medium transition-all
      ${profileData.name ? "bg-card dark:bg-white text-foreground dark:text-black hover:bg-muted dark:hover:bg-neutral-100" : "bg-neutral-100 dark:bg-muted text-muted-foreground cursor-not-allowed"}
    `)}>${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step4Profile.continue"))} →</button></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Step7Introduction($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { profileData, inviterPubkey } = $$props;
    let introText = "";
    let publishing = false;
    let mentionInviter = !!inviterPubkey;
    const hasValidIntro = introText.length > 10;
    const charCount = introText.length;
    const inviterName = "your inviter";
    const introductionPosts = ndk.$subscribe(
      () => ({
        filters: [{ kinds: [1], "#t": ["introductions"] }],
        relays: ["wss://pyramid.fiatjaf.com"],
        cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY,
        exclusiveRelay: true,
        limit: 10
      }),
      ndk
    );
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="min-h-screen flex flex-col"><div class="flex-1 px-4 lg:px-8 py-6 max-w-[1400px] mx-auto w-full pb-32 lg:pb-6"><div class="text-center mb-6"><h1 class="text-2xl lg:text-3xl font-bold mb-2">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step5Introduction.title"))}</h1> <p class="text-muted-foreground">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step5Introduction.subtitle"))}</p></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:h-[calc(100vh-200px)]"><div class="flex flex-col order-1 lg:order-2"><div class="lg:p-6"><label class="block font-semibold mb-3">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step5Introduction.writeLabel"))}</label> <div class="p-4 bg-card border border rounded-lg">`);
      ContentComposer($$renderer3, {
        placeholder: store_get($$store_subs ??= {}, "$t", $format)("onboarding.step5Introduction.placeholder"),
        disabled: publishing,
        get value() {
          return introText;
        },
        set value($$value) {
          introText = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div class="flex items-center justify-between mt-3"><div class="text-xs text-muted-foreground">`);
      if (profileData.location) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step5Introduction.tipLocation", { values: { location: profileData.location } }))}`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> <div class="text-xs"><span${attr_class(clsx(charCount > 500 ? "text-red-500" : "text-muted-foreground"))}>${escape_html(charCount)}
                ${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step5Introduction.characters"))}</span></div></div> `);
      if (inviterPubkey) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="mt-4 p-3 bg-primary-50 dark:bg-primary-900/10 border border-primary-200 dark:border-primary-800 rounded-lg"><div class="flex items-center justify-between"><div class="flex items-center gap-2 text-sm">`);
        if (mentionInviter) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg> <span class="text-muted-foreground">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step5Introduction.inviterNotify", { values: { name: inviterName } }))}</span>`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg> <span class="text-muted-foreground">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step5Introduction.inviterNoNotify", { values: { name: inviterName } }))}</span>`);
        }
        $$renderer3.push(`<!--]--></div> <button class="text-xs px-2 py-1 rounded hover:bg-primary-100 dark:hover:bg-primary-900/20 transition-colors text-primary dark:text-primary font-medium">${escape_html(mentionInviter ? store_get($$store_subs ??= {}, "$t", $format)("onboarding.step5Introduction.inviterRemove") : store_get($$store_subs ??= {}, "$t", $format)("onboarding.step5Introduction.inviterAddBack"))}</button></div></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <div class="hidden lg:flex gap-3 mt-6"><button class="flex-1 py-3 px-6 border border rounded-lg font-medium hover:bg-accent transition-colors">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step5Introduction.skipForNow"))}</button> <button${attr("disabled", !hasValidIntro || publishing, true)}${attr_class(`
                flex-1 py-3 px-6 rounded-lg font-medium transition-all
                ${hasValidIntro && !publishing ? "bg-background dark:bg-white text-foreground dark:text-black hover:bg-muted dark:hover:bg-neutral-200" : "bg-neutral-100 dark:bg-background text-muted-foreground cursor-not-allowed"}
              `)}>${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step5Introduction.postIntroduction"))}</button></div></div></div> <div class="flex flex-col order-2 lg:order-1"><h3 class="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step5Introduction.recentIntroductions"))}</h3> <div class="space-y-3 overflow-y-auto flex-1 pr-2 max-h-[400px] lg:max-h-none"><!--[-->`);
      const each_array = ensure_array_like(introductionPosts.events.slice(0, 10));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let event = each_array[$$index];
        NoteCard($$renderer3, { event });
      }
      $$renderer3.push(`<!--]--></div></div></div></div> <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border p-4 z-50"><div class="flex gap-3 max-w-[1400px] mx-auto"><button class="flex-1 py-3 px-6 border border rounded-lg font-medium hover:bg-accent transition-colors">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step5Introduction.skipForNow"))}</button> <button${attr("disabled", !hasValidIntro || publishing, true)}${attr_class(`
          flex-1 py-3 px-6 rounded-lg font-medium transition-all
          ${hasValidIntro && !publishing ? "bg-background dark:bg-white text-foreground dark:text-black hover:bg-muted dark:hover:bg-neutral-200" : "bg-neutral-100 dark:bg-background text-muted-foreground cursor-not-allowed"}
        `)}>${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step5Introduction.postIntroduction"))}</button></div></div></div>`);
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
function Step8Welcome($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { selectedPacks, profileData } = $$props;
    const followCount = selectedPacks.length * 25;
    $$renderer2.push(`<div class="min-h-screen flex items-center justify-center p-8"><div class="max-w-2xl w-full text-center"><div class="text-7xl mb-6">🎉</div> <h1 class="text-4xl font-bold mb-4">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step8Welcome.title", {
      values: {
        name: profileData.name || store_get($$store_subs ??= {}, "$t", $format)("onboarding.step8Welcome.friend")
      }
    }))}</h1> <p class="text-xl text-muted-foreground mb-12">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step8Welcome.subtitle"))}</p> <div class="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12"><div class="bg-neutral-50 dark:bg-card rounded-xl p-6"><div class="text-3xl font-bold mb-1">${escape_html(followCount)}</div> <div class="text-sm text-muted-foreground">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step8Welcome.stats.peopleFollowing"))}</div></div> <div class="bg-neutral-50 dark:bg-card rounded-xl p-6"><div class="text-3xl font-bold mb-1">${escape_html(selectedPacks.length)}</div> <div class="text-sm text-muted-foreground">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step8Welcome.stats.followPacks"))}</div></div> <div class="bg-neutral-50 dark:bg-card rounded-xl p-6"><div class="text-3xl font-bold mb-1">1</div> <div class="text-sm text-muted-foreground">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step8Welcome.stats.postPublished"))}</div></div></div> <div class="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 rounded-xl p-8 mb-8 text-left max-w-lg mx-auto"><h3 class="font-semibold mb-4">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step8Welcome.whatsNext.title"))}</h3> <ul class="space-y-3 text-sm"><li class="flex items-start gap-3"><span class="text-green-500 mt-0.5">✓</span> <span>${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step8Welcome.whatsNext.feedReady", { values: { count: followCount } }))}</span></li> <li class="flex items-start gap-3"><span class="text-green-500 mt-0.5">✓</span> <span>${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step8Welcome.whatsNext.marketplace"))}</span></li> <li class="flex items-start gap-3"><span class="text-green-500 mt-0.5">✓</span> <span>${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step8Welcome.whatsNext.p2pTrades"))}</span></li> <li class="flex items-start gap-3"><span class="text-green-500 mt-0.5">✓</span> <span>${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step8Welcome.whatsNext.earnSats"))}</span></li></ul></div> <button class="bg-background dark:bg-white text-foreground dark:text-black px-12 py-4 rounded-lg font-medium text-lg hover:bg-muted dark:hover:bg-neutral-200 transition-colors">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.step8Welcome.enterAgora"))} →</button></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const currentStep = onboardingStore.currentStep;
    const totalSteps = onboardingStore.totalSteps;
    const progressPercentage = currentStep / totalSteps * 100;
    const inviteData = onboardingStore.invite;
    onboardingStore.hasCompletedInviteSetup;
    const selectedCommunity = onboardingStore.selectedCommunity;
    const selectedPacks = onboardingStore.selectedPacks;
    const profileData = onboardingStore.profileData;
    $$renderer2.push(`<div class="min-h-screen bg-card"><div class="fixed top-0 left-0 right-0 z-40 bg-card"><div class="h-1 bg-neutral-200 dark:bg-muted"><div class="h-full bg-background dark:bg-white transition-all duration-300 ease-out"${attr_style(`width: ${progressPercentage}%`)}></div></div></div> `);
    if (currentStep > (inviteData ? 3 : 1)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="fixed top-6 left-6 z-50 w-9 h-9 bg-card border border rounded-full flex items-center justify-center hover:bg-accent transition-colors" aria-label="Go back"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"></path></svg></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="relative pt-8">`);
    if (currentStep === 1 && !inviteData) {
      $$renderer2.push("<!--[-->");
      Step1Community($$renderer2, {
        selectedCommunity
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (currentStep === 2 && !inviteData) {
      $$renderer2.push("<!--[-->");
      Step2FollowPacks($$renderer2, {
        selectedCommunity,
        selectedPacks,
        onSelectPacks: (p) => onboardingStore.setSelectedPacks(p)
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (currentStep === 3) {
      $$renderer2.push("<!--[-->");
      Step3Features($$renderer2);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (currentStep === 4) {
      $$renderer2.push("<!--[-->");
      Step6Profile($$renderer2, {
        profileData,
        inviteRelay: inviteData?.inviteRelay,
        signer: void 0
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (currentStep === 5) {
      $$renderer2.push("<!--[-->");
      Step7Introduction($$renderer2, {
        profileData,
        inviterPubkey: inviteData?.inviter,
        inviteRelay: inviteData?.inviteRelay
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (currentStep === 6) {
      $$renderer2.push("<!--[-->");
      Step8Welcome($$renderer2, { selectedPacks, profileData });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BLqrPfVe.js.map
