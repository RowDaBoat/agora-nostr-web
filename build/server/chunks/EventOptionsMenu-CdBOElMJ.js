import { g as store_get, e as ensure_array_like, b as attr, u as unsubscribe_stores } from './index2-DpBdzO5t.js';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { t as toast } from './toast.svelte-BEvONWAz.js';
import { R as Root, D as Dialog_content, a as Dialog_title } from './index3-DOo-Ka_h.js';
import { B as Button } from './button-DBIbgud-.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import 'clsx';
import { n as ndk } from './ndk.svelte-BfhDBrJw.js';
import { R as RelayIcon } from './RelayIcon-DEER5mbZ.js';
import { T as Textarea } from './textarea-DfKFjAUT.js';
import { $ as $format } from './runtime-9tjL5BFW.js';
import { D as Dialog_header } from './dialog-header-DSVdIrOb.js';
import { D as Dialog_description } from './dialog-description-C9BRLaT0.js';
import { I as Icon } from './RelayPublishDropdownContent-CzmVdnh5.js';
import { D as Dialog_footer } from './input-BbRZJqts.js';

function RelayBadge($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { relay, variant = "default" } = $$props;
    const relayInfo = relay.connectivity.nip11;
    const relayName = relayInfo?.name || new URL(relay.url).hostname;
    const relayDescription = relayInfo?.description;
    if (variant === "compact") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center gap-1.5 px-2 py-1 bg-muted/50 rounded text-xs text-muted-foreground group relative">`);
      RelayIcon($$renderer2, { relayUrl: relay.url, size: "xs" });
      $$renderer2.push(`<!----> <span class="truncate max-w-[120px]">${escape_html(relayName)}</span> `);
      if (relayDescription) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card border border-border rounded-lg shadow-xl z-50 w-64 text-xs"><div class="font-semibold text-foreground mb-1">${escape_html(relayName)}</div> <div class="text-muted-foreground">${escape_html(relayDescription)}</div> <div class="text-muted-foreground mt-1 break-all">${escape_html(relay.url)}</div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors">`);
      RelayIcon($$renderer2, { relayUrl: relay.url, size: "md" });
      $$renderer2.push(`<!----> <div class="flex-1 min-w-0"><div class="font-medium text-foreground truncate">${escape_html(relayName)}</div> `);
      if (relayDescription) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-xs text-muted-foreground truncate">${escape_html(relayDescription)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function ReportModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { target, open, onClose } = $$props;
    let selectedReportType = "";
    let additionalInfo = "";
    let isSubmitting = false;
    const reportTypes = [
      { value: "nudity", labelKey: "report.types.nudity" },
      { value: "malware", labelKey: "report.types.malware" },
      { value: "profanity", labelKey: "report.types.profanity" },
      { value: "illegal", labelKey: "report.types.illegal" },
      { value: "spam", labelKey: "report.types.spam" },
      {
        value: "impersonation",
        labelKey: "report.types.impersonation"
      },
      { value: "other", labelKey: "report.types.other" }
    ];
    async function handleSubmit() {
      if (!selectedReportType) {
        toast.error(store_get($$store_subs ??= {}, "$t", $format)("report.errors.selectType"));
        return;
      }
      const currentUser = ndk.activeUser;
      if (!currentUser) {
        toast.error(store_get($$store_subs ??= {}, "$t", $format)("report.errors.notLoggedIn"));
        return;
      }
      try {
        isSubmitting = true;
        const reportEvent = new NDKEvent(ndk);
        reportEvent.kind = 1984;
        reportEvent.tag(target, selectedReportType);
        if (additionalInfo.trim()) {
          reportEvent.content = additionalInfo.trim();
        }
        await reportEvent.publish();
        toast.success(store_get($$store_subs ??= {}, "$t", $format)("report.success"));
        onClose();
        selectedReportType = "";
        additionalInfo = "";
      } catch (error) {
        console.error("Failed to submit report:", error);
        toast.error(store_get($$store_subs ??= {}, "$t", $format)("report.errors.failed"));
      } finally {
        isSubmitting = false;
      }
    }
    function handleClose() {
      if (!isSubmitting) {
        selectedReportType = "";
        additionalInfo = "";
        onClose();
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Root($$renderer3, {
        get open() {
          return open;
        },
        set open($$value) {
          open = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Dialog_content($$renderer4, {
            class: "max-w-md",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_header($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_title($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", $format)("report.title"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <!---->`);
                  Dialog_description($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", $format)("report.description"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="space-y-4 py-4"><div><label class="text-sm font-medium mb-2 block">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("report.selectReason"))}</label> <div class="space-y-2"><!--[-->`);
              const each_array = ensure_array_like(reportTypes);
              for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                let type = each_array[$$index];
                $$renderer5.push(`<label class="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted cursor-pointer transition-colors"><input type="radio" name="reportType"${attr("value", type.value)}${attr("checked", selectedReportType === type.value, true)}${attr("disabled", isSubmitting, true)} class="w-4 h-4"/> <span class="text-sm">${escape_html(store_get($$store_subs ??= {}, "$t", $format)(type.labelKey))}</span></label>`);
              }
              $$renderer5.push(`<!--]--></div></div> <div><label for="report-additional-info" class="text-sm font-medium mb-2 block">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("report.additionalInfo"))} ${escape_html(store_get($$store_subs ??= {}, "$t", $format)("common.optional"))}</label> `);
              Textarea($$renderer5, {
                id: "report-additional-info",
                placeholder: store_get($$store_subs ??= {}, "$t", $format)("report.additionalInfoPlaceholder"),
                disabled: isSubmitting,
                class: "resize-none",
                rows: 3,
                get value() {
                  return additionalInfo;
                },
                set value($$value) {
                  additionalInfo = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div class="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"><p class="text-sm text-yellow-600 dark:text-yellow-400">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("report.warning"))}</p></div></div> <div class="flex gap-3 justify-end">`);
              Button($$renderer5, {
                variant: "outline",
                onclick: handleClose,
                disabled: isSubmitting,
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", $format)("common.cancel"))}`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Button($$renderer5, {
                onclick: handleSubmit,
                disabled: !selectedReportType || isSubmitting,
                variant: "destructive",
                children: ($$renderer6) => {
                  if (isSubmitting) {
                    $$renderer6.push("<!--[-->");
                    $$renderer6.push(`${escape_html(store_get($$store_subs ??= {}, "$t", $format)("report.submitting"))}`);
                  } else {
                    $$renderer6.push("<!--[!-->");
                    $$renderer6.push(`${escape_html(store_get($$store_subs ??= {}, "$t", $format)("report.submit"))}`);
                  }
                  $$renderer6.push(`<!--]-->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div>`);
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
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function EventOptionsMenu($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { event } = $$props;
    let showOptionsMenu = false;
    let showRawEventModal = false;
    let isReportModalOpen = false;
    const muteListSubscription = ndk.$subscribe(() => ndk.$currentUser?.pubkey ? {
      filters: [
        { kinds: [1e4], authors: [ndk.$currentUser.pubkey], limit: 1 }
      ],
      bufferMs: 100
    } : void 0);
    const isMuted = (() => {
      const muteList = muteListSubscription.events[0];
      if (!muteList || !event.author) return false;
      return muteList.tags.some((tag) => tag[0] === "p" && tag[1] === event.author.pubkey);
    })();
    async function copyToClipboard(text, label) {
      try {
        await navigator.clipboard.writeText(text);
        toast.success(`Copied ${label}`);
      } catch (err) {
        console.error("Failed to copy:", err);
        toast.error(`Failed to copy ${label}`);
      }
      showOptionsMenu = false;
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="relative flex-shrink-0"><button class="p-1 hover:bg-muted rounded-full transition-colors" type="button" aria-label="More options"><svg class="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg></button> `);
      if (showOptionsMenu) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="absolute right-0 mt-1 w-72 bg-popover border border-border rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto"><button class="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted transition-colors first:rounded-t-lg flex items-center gap-3" type="button">`);
        Icon($$renderer3, {
          name: isMuted ? "speaker" : "speaker-muted",
          size: "md",
          class: "text-red-500"
        });
        $$renderer3.push(`<!----> ${escape_html(isMuted ? store_get($$store_subs ??= {}, "$t", $format)("userDropdown.unmute") : store_get($$store_subs ??= {}, "$t", $format)("userDropdown.mute"))}</button> <button class="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-3" type="button">`);
        Icon($$renderer3, { name: "alert", size: "md", class: "text-yellow-500" });
        $$renderer3.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$t", $format)("noteDropdown.report"))}</button> <div class="border-t border-border my-1"></div> <button class="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors" type="button">Copy author (nprofile)</button> <button class="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors" type="button">Copy ID (nevent)</button> <button class="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors" type="button">View raw event</button> `);
        if (event.relay?.url) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="border-t border-border mt-1 pt-1"><div class="px-4 py-2 text-xs text-muted-foreground">${escape_html(event.relay.url)}</div></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
          if (event.onRelays && event.onRelays.length > 0) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="border-t border-border mt-1 pt-1"><div class="px-4 py-2 text-xs text-muted-foreground font-medium">Seen on ${escape_html(event.onRelays.length)} relay${escape_html(event.onRelays.length === 1 ? "" : "s")}</div> <div class="px-2 pb-2 space-y-1"><!--[-->`);
            const each_array = ensure_array_like(event.onRelays);
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let relay = each_array[$$index];
              RelayBadge($$renderer3, { relay, variant: "compact" });
            }
            $$renderer3.push(`<!--]--></div></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]--></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> <!---->`);
      Root($$renderer3, {
        get open() {
          return showRawEventModal;
        },
        set open($$value) {
          showRawEventModal = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Dialog_content($$renderer4, {
            class: "max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_header($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_title($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Raw Event`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <!---->`);
                  Dialog_description($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->JSON representation of this Nostr event`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="flex-1 overflow-auto bg-muted/50 rounded-lg p-4 font-mono text-sm"><pre class="whitespace-pre-wrap break-words">${escape_html(event.inspect)}</pre></div> <!---->`);
              Dialog_footer($$renderer5, {
                class: "flex justify-end gap-2",
                children: ($$renderer6) => {
                  Button($$renderer6, {
                    variant: "outline",
                    onclick: () => copyToClipboard(event.inspect, "raw event"),
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Copy to Clipboard`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Button($$renderer6, {
                    onclick: () => showRawEventModal = false,
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Close`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      ReportModal($$renderer3, {
        target: event,
        open: isReportModalOpen,
        onClose: () => isReportModalOpen = false
      });
      $$renderer3.push(`<!---->`);
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

export { EventOptionsMenu as E };
//# sourceMappingURL=EventOptionsMenu-CdBOElMJ.js.map
