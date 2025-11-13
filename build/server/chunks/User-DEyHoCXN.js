import { a as attr_class, c as clsx, p as props_id, h as spread_props, f as bind_props, k as attributes } from './index2-DpBdzO5t.js';
import { n as ndk } from './ndk.svelte-BfhDBrJw.js';
import { U as User$1, c as cn$1 } from './index4-D71bD0RT.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { c as cn } from './utils2-B05Dmz_H.js';
import { P as Popover, a as Popover_trigger, b as PopoverContentState } from './popover-BWwSCSLf.js';
import { P as Portal, d as createId, n as noop, b as boxWith, m as mergeProps } from './scroll-lock-YhRhLzPR.js';
import { P as Popper_layer_force_mount, a as Popper_layer } from './popper-layer-force-mount-B4z1kw84.js';
import { g as getFloatingContentCSSVars } from './floating-layer-anchor-DIntB4dN.js';

function Popover_content($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      child,
      children,
      ref = null,
      id = createId(uid),
      forceMount = false,
      onCloseAutoFocus = noop,
      onEscapeKeydown = noop,
      onInteractOutside = noop,
      trapFocus = true,
      preventScroll = false,
      customAnchor = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const contentState = PopoverContentState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v),
      onInteractOutside: boxWith(() => onInteractOutside),
      onEscapeKeydown: boxWith(() => onEscapeKeydown),
      customAnchor: boxWith(() => customAnchor)
    });
    const mergedProps = mergeProps(restProps, contentState.props);
    if (forceMount) {
      $$renderer2.push("<!--[-->");
      {
        let popper = function($$renderer3, { props, wrapperProps }) {
          const finalProps = mergeProps(props, { style: getFloatingContentCSSVars("popover") });
          if (child) {
            $$renderer3.push("<!--[-->");
            child($$renderer3, {
              props: finalProps,
              wrapperProps,
              ...contentState.snippetProps
            });
            $$renderer3.push(`<!---->`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<div${attributes({ ...wrapperProps })}><div${attributes({ ...finalProps })}>`);
            children?.($$renderer3);
            $$renderer3.push(`<!----></div></div>`);
          }
          $$renderer3.push(`<!--]-->`);
        };
        Popper_layer_force_mount($$renderer2, spread_props([
          mergedProps,
          contentState.popperProps,
          {
            ref: contentState.opts.ref,
            enabled: contentState.root.opts.open.current,
            id,
            trapFocus,
            preventScroll,
            loop: true,
            forceMount: true,
            customAnchor,
            onCloseAutoFocus,
            shouldRender: contentState.shouldRender,
            popper,
            $$slots: { popper: true }
          }
        ]));
      }
    } else {
      $$renderer2.push("<!--[!-->");
      if (!forceMount) {
        $$renderer2.push("<!--[-->");
        {
          let popper = function($$renderer3, { props, wrapperProps }) {
            const finalProps = mergeProps(props, { style: getFloatingContentCSSVars("popover") });
            if (child) {
              $$renderer3.push("<!--[-->");
              child($$renderer3, {
                props: finalProps,
                wrapperProps,
                ...contentState.snippetProps
              });
              $$renderer3.push(`<!---->`);
            } else {
              $$renderer3.push("<!--[!-->");
              $$renderer3.push(`<div${attributes({ ...wrapperProps })}><div${attributes({ ...finalProps })}>`);
              children?.($$renderer3);
              $$renderer3.push(`<!----></div></div>`);
            }
            $$renderer3.push(`<!--]-->`);
          };
          Popper_layer($$renderer2, spread_props([
            mergedProps,
            contentState.popperProps,
            {
              ref: contentState.opts.ref,
              open: contentState.root.opts.open.current,
              id,
              trapFocus,
              preventScroll,
              loop: true,
              forceMount: false,
              customAnchor,
              onCloseAutoFocus,
              shouldRender: contentState.shouldRender,
              popper,
              $$slots: { popper: true }
            }
          ]));
        }
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function User_card_classic($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { ndk: ndk2, pubkey, class: className = "" } = $$props;
    const notesSubscription = ndk2.$subscribe(() => pubkey ? { filters: [{ kinds: [1], authors: [pubkey] }], bufferMs: 100 } : void 0);
    const contactListSubscription = ndk2.$subscribe(() => pubkey ? { filters: [{ kinds: [3], authors: [pubkey] }], bufferMs: 100 } : void 0);
    const noteCount = (() => {
      return notesSubscription.events.filter((e) => !e.tags.some((tag) => tag[0] === "e")).length;
    })();
    const followingCount = (() => {
      const contactList = contactListSubscription.events[0];
      if (!contactList) return 0;
      return contactList.tags.filter((tag) => tag[0] === "p").length;
    })();
    $$renderer2.push(`<!---->`);
    User$1.Root($$renderer2, {
      ndk: ndk2,
      pubkey,
      children: ($$renderer3) => {
        $$renderer3.push(`<div data-user-card-classic=""${attr_class(clsx(cn$1("w-80 shrink-0 bg-card border border-border rounded-xl shadow-2xl overflow-hidden", className)))}><!---->`);
        User$1.Banner($$renderer3, { class: "h-20" });
        $$renderer3.push(`<!----> <div class="relative px-5 pb-5 -mt-10"><div class="relative inline-block mb-3"><!---->`);
        User$1.Avatar($$renderer3, { class: "border-4 border-card shadow-lg w-[80px] h-[80px]" });
        $$renderer3.push(`<!----></div> <div class="mb-3 flex flex-col gap-0.5"><!---->`);
        User$1.Name($$renderer3, { class: "text-base font-semibold" });
        $$renderer3.push(`<!----> <!---->`);
        User$1.Nip05($$renderer3, { class: "text-sm text-muted-foreground" });
        $$renderer3.push(`<!----></div> <!---->`);
        User$1.Bio($$renderer3, { class: "mb-4 text-sm text-muted-foreground line-clamp-3" });
        $$renderer3.push(`<!----> <div class="flex items-center gap-4 pt-3 border-t border-border text-sm"><div class="flex items-center gap-1.5"><span class="font-medium text-foreground">${escape_html(noteCount)}</span> <span class="text-muted-foreground">notes</span></div> <div class="flex items-center gap-1.5"><span class="font-medium text-foreground">${escape_html(followingCount)}</span> <span class="text-muted-foreground">following</span></div></div></div></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!---->`);
  });
}
function User($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const {
      pubkey,
      variant = "avatar",
      avatarSize = "w-10 h-10",
      nameSize = "text-base font-semibold",
      handleSize = "text-sm text-muted-foreground",
      bioSize = "text-sm text-muted-foreground",
      meta,
      showHoverCard = true,
      onclick,
      class: className = ""
    } = $$props;
    let open = false;
    let hoverTimeout = null;
    function handleMouseEnter() {
      if (!showHoverCard) return;
      if (hoverTimeout) clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(
        () => {
          open = true;
        },
        500
      );
    }
    function handleMouseLeave() {
      if (hoverTimeout) clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(
        () => {
          open = false;
        },
        100
      );
    }
    function handleClick(e) {
      if (onclick) {
        onclick(e);
      }
    }
    const displayName = `${pubkey?.slice(0, 8)}...`;
    const handle = pubkey?.slice(0, 8);
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Popover($$renderer3, {
        get open() {
          return open;
        },
        set open($$value) {
          open = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          if (variant === "avatar") {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<!---->`);
            Popover_trigger($$renderer4, {
              type: "button",
              onclick: handleClick,
              onmouseenter: handleMouseEnter,
              onmouseleave: handleMouseLeave,
              class: cn("flex-shrink-0", className),
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->`);
                User$1.Root($$renderer5, {
                  ndk,
                  pubkey,
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->`);
                    User$1.Avatar($$renderer6, {
                      class: cn(avatarSize, "cursor-pointer hover:opacity-80 transition-opacity")
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
          } else {
            $$renderer4.push("<!--[!-->");
            if (variant === "avatar-name") {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<!---->`);
              Popover_trigger($$renderer4, {
                type: "button",
                onclick: handleClick,
                onmouseenter: handleMouseEnter,
                onmouseleave: handleMouseLeave,
                class: cn("flex items-center gap-3 cursor-pointer", className),
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->`);
                  User$1.Root($$renderer5, {
                    ndk,
                    pubkey,
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->`);
                      User$1.Avatar($$renderer6, { class: cn(avatarSize, "hover:opacity-80 transition-opacity") });
                      $$renderer6.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> <p${attr_class(clsx(cn(nameSize, "text-foreground truncate hover:underline flex-1 min-w-0 text-left")), "svelte-8apr3t")}>${escape_html(displayName)}</p>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!---->`);
            } else {
              $$renderer4.push("<!--[!-->");
              if (variant === "avatar-name-handle") {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<!---->`);
                Popover_trigger($$renderer4, {
                  type: "button",
                  onclick: handleClick,
                  onmouseenter: handleMouseEnter,
                  onmouseleave: handleMouseLeave,
                  class: cn("flex items-center gap-3 cursor-pointer text-left w-full", className),
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->`);
                    User$1.Root($$renderer5, {
                      ndk,
                      pubkey,
                      children: ($$renderer6) => {
                        $$renderer6.push(`<!---->`);
                        User$1.Avatar($$renderer6, {
                          class: cn(avatarSize, "hover:opacity-80 transition-opacity flex-shrink-0")
                        });
                        $$renderer6.push(`<!---->`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer5.push(`<!----> <div class="flex-1 min-w-0 flex flex-col"><p${attr_class(clsx(cn(nameSize, "text-foreground truncate hover:underline")), "svelte-8apr3t")}>${escape_html(displayName)}</p> <p${attr_class(clsx(cn(handleSize, "truncate")), "svelte-8apr3t")}>@${escape_html(handle)}</p></div>`);
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!---->`);
              } else {
                $$renderer4.push("<!--[!-->");
                if (variant === "avatar-name-bio") {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<!---->`);
                  Popover_trigger($$renderer4, {
                    type: "button",
                    onclick: handleClick,
                    onmouseenter: handleMouseEnter,
                    onmouseleave: handleMouseLeave,
                    class: cn("flex items-center gap-3 cursor-pointer text-left w-full", className),
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->`);
                      User$1.Root($$renderer5, {
                        ndk,
                        pubkey,
                        children: ($$renderer6) => {
                          $$renderer6.push(`<!---->`);
                          User$1.Avatar($$renderer6, {
                            class: cn(avatarSize, "hover:opacity-80 transition-opacity flex-shrink-0")
                          });
                          $$renderer6.push(`<!---->`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer5.push(`<!----> <div class="flex-1 min-w-0"><p${attr_class(clsx(cn(nameSize, "text-foreground truncate hover:underline")), "svelte-8apr3t")}>${escape_html(displayName)}</p> `);
                      {
                        $$renderer5.push("<!--[!-->");
                      }
                      $$renderer5.push(`<!--]--></div>`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer4.push(`<!---->`);
                } else {
                  $$renderer4.push("<!--[!-->");
                  if (variant === "avatar-name-meta") {
                    $$renderer4.push("<!--[-->");
                    $$renderer4.push(`<div${attr_class(clsx(cn("flex items-center gap-3", className)), "svelte-8apr3t")}><!---->`);
                    Popover_trigger($$renderer4, {
                      type: "button",
                      onclick: handleClick,
                      class: "flex-shrink-0",
                      children: ($$renderer5) => {
                        $$renderer5.push(`<!---->`);
                        User$1.Root($$renderer5, {
                          ndk,
                          pubkey,
                          children: ($$renderer6) => {
                            $$renderer6.push(`<!---->`);
                            User$1.Avatar($$renderer6, {
                              class: cn(avatarSize, "cursor-pointer hover:opacity-80 transition-opacity")
                            });
                            $$renderer6.push(`<!---->`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push(`<!---->`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer4.push(`<!----> <div class="flex-1 min-w-0"><!---->`);
                    Popover_trigger($$renderer4, {
                      type: "button",
                      onclick: handleClick,
                      class: "text-left w-full min-w-0",
                      children: ($$renderer5) => {
                        $$renderer5.push(`<p${attr_class(clsx(cn(nameSize, "text-foreground truncate hover:underline")), "svelte-8apr3t")}>${escape_html(displayName)}</p>`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer4.push(`<!----> `);
                    if (meta) {
                      $$renderer4.push("<!--[-->");
                      meta($$renderer4);
                      $$renderer4.push(`<!---->`);
                    } else {
                      $$renderer4.push("<!--[!-->");
                    }
                    $$renderer4.push(`<!--]--></div></div>`);
                  } else {
                    $$renderer4.push("<!--[!-->");
                  }
                  $$renderer4.push(`<!--]-->`);
                }
                $$renderer4.push(`<!--]-->`);
              }
              $$renderer4.push(`<!--]-->`);
            }
            $$renderer4.push(`<!--]-->`);
          }
          $$renderer4.push(`<!--]--> `);
          if (showHoverCard) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<!---->`);
            Portal($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->`);
                Popover_content($$renderer5, {
                  class: "z-50",
                  sideOffset: 8,
                  onmouseenter: handleMouseEnter,
                  onmouseleave: handleMouseLeave,
                  children: ($$renderer6) => {
                    User_card_classic($$renderer6, { ndk, pubkey });
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!---->`);
              }
            });
            $$renderer4.push(`<!---->`);
          } else {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]-->`);
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
  });
}

export { User as U };
//# sourceMappingURL=User-DEyHoCXN.js.map
