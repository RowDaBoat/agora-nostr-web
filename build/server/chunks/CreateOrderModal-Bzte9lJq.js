import { f as bind_props, e as ensure_array_like, s as stringify, b as attr, d as attr_style } from './index2-DpBdzO5t.js';
import { NDKEvent, NDKRelaySet } from '@nostr-dev-kit/ndk';
import { s as settings, n as ndk } from './ndk.svelte-BfhDBrJw.js';
import { u as useRelayInfoCached } from './relayInfo.svelte-CrGOXzx2.js';
import { t as toast } from './toast.svelte-BEvONWAz.js';
import { R as Root, D as Dialog_content, a as Dialog_title } from './index3-DOo-Ka_h.js';
import { B as Button } from './button-DBIbgud-.js';
import { I as Input, D as Dialog_footer } from './input-BbRZJqts.js';
import { L as Label, R as RelayPublishDropdownContent } from './RelayPublishDropdownContent-CzmVdnh5.js';
import { D as Dialog_header } from './dialog-header-DSVdIrOb.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';

function CreateOrderModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { open = false, onClose } = $$props;
    const currencies = [
      { code: "USD", symbol: "$", name: "US Dollar" },
      { code: "EUR", symbol: "€", name: "Euro" },
      { code: "GBP", symbol: "£", name: "British Pound" },
      { code: "BRL", symbol: "R$", name: "Brazilian Real" },
      { code: "ARS", symbol: "$", name: "Argentine Peso" },
      { code: "PLN", symbol: "zł", name: "Polish Złoty" }
    ];
    const paymentMethods = [
      {
        id: "Cash (F2F)",
        name: "Cash (F2F)",
        icon: "💵",
        requiresLocation: true
      },
      { id: "Revolut", name: "Revolut", icon: "💳" },
      { id: "PIX", name: "PIX (Brazil)", icon: "🔄" },
      { id: "BLIK", name: "BLIK (Poland)", icon: "📱" },
      { id: "Zelle", name: "Zelle", icon: "🏦" },
      { id: "CashApp", name: "Cash App", icon: "📲" },
      { id: "custom", name: "Other...", icon: "✏️" }
    ];
    function encodeGeohash(lat, lon, precision = 5) {
      const base32 = "0123456789bcdefghjkmnpqrstuvwxyz";
      let idx = 0;
      let bit = 0;
      let evenBit = true;
      let geohash2 = "";
      let latRange = [-90, 90];
      let lonRange = [-180, 180];
      while (geohash2.length < precision) {
        if (evenBit) {
          const mid = (lonRange[0] + lonRange[1]) / 2;
          if (lon >= mid) {
            idx |= 1 << 4 - bit;
            lonRange[0] = mid;
          } else {
            lonRange[1] = mid;
          }
        } else {
          const mid = (latRange[0] + latRange[1]) / 2;
          if (lat >= mid) {
            idx |= 1 << 4 - bit;
            latRange[0] = mid;
          } else {
            latRange[1] = mid;
          }
        }
        evenBit = !evenBit;
        bit++;
        if (bit === 5) {
          geohash2 += base32[idx];
          bit = 0;
          idx = 0;
        }
      }
      return geohash2;
    }
    let orderType = "buy";
    let currency = "USD";
    let satsAmount = "100000";
    let fiatAmount = "50";
    let paymentMethod = "Cash (F2F)";
    let customPaymentMethod = "";
    let location = "";
    let geohash = "";
    let premium = "0";
    let expirationHours = "24";
    let creating = false;
    let selectedRelayUrls = [];
    let isProtected = false;
    let isRelayDropdownOpen = false;
    let relayButtonElement = null;
    let dropdownPosition = { top: 0, left: 0 };
    const allRelays = settings.relays.filter((r) => r.enabled);
    const showLocationPicker = paymentMethods.find((m) => m.id === paymentMethod)?.requiresLocation || false;
    function handleLocationRequest() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const gh = encodeGeohash(lat, lon, 5);
            geohash = gh;
            location = `Near ${gh} (auto-detected)`;
            toast.success("Location detected");
          },
          (error) => {
            console.error("Error getting location:", error);
            toast.error("Could not get your location. Please enter city/area manually.");
          }
        );
      } else {
        toast.error("Geolocation is not supported by your browser");
      }
    }
    function toggleRelay(url) {
      if (selectedRelayUrls.includes(url)) {
        selectedRelayUrls = selectedRelayUrls.filter((u) => u !== url);
      } else {
        selectedRelayUrls = [...selectedRelayUrls, url];
      }
    }
    function selectOnlyRelay(url) {
      selectedRelayUrls = [url];
      isRelayDropdownOpen = false;
    }
    function toggleRelayDropdown() {
      if (!isRelayDropdownOpen && relayButtonElement) {
        const rect = relayButtonElement.getBoundingClientRect();
        const dropdownHeight = 400;
        const spaceBelow = window.innerHeight - rect.bottom;
        const shouldShowAbove = spaceBelow < dropdownHeight && rect.top > dropdownHeight;
        dropdownPosition = {
          top: shouldShowAbove ? rect.top - dropdownHeight - 8 : rect.bottom + 8,
          left: rect.left
        };
      }
      isRelayDropdownOpen = !isRelayDropdownOpen;
    }
    async function handleCreate() {
      const actualPaymentMethod = paymentMethod === "custom" ? customPaymentMethod : paymentMethod;
      if (!actualPaymentMethod) {
        toast.error("Please specify a payment method");
        return;
      }
      if (paymentMethod === "Cash (F2F)" && !location && !geohash) {
        toast.error("Please provide a location for face-to-face trades");
        return;
      }
      creating = true;
      try {
        const event = new NDKEvent(ndk);
        event.kind = 38383;
        const orderId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const tags = [
          ["d", orderId],
          ["k", orderType],
          ["f", currency],
          ["s", "pending"],
          ["amt", satsAmount],
          ["fa", fiatAmount],
          ["pm", actualPaymentMethod],
          ["premium", premium],
          ["y", "Agora"],
          ["z", "order"],
          ["network", "mainnet"],
          ["layer", "lightning"],
          [
            "expiration",
            (Math.floor(Date.now() / 1e3) + Number.parseInt(expirationHours) * 3600).toString()
          ]
        ];
        if (geohash) {
          tags.push(["g", geohash]);
        }
        if (isProtected) {
          tags.push(["-"]);
        }
        event.tags = tags;
        event.content = "";
        const relaySet = NDKRelaySet.fromRelayUrls(selectedRelayUrls, ndk);
        await event.publish(relaySet);
        toast.success("Order created successfully");
        open = false;
        onClose();
      } catch (error) {
        console.error("Failed to create order:", error);
        toast.error("Failed to create order");
      } finally {
        creating = false;
      }
    }
    const btcAmount = parseInt(satsAmount) / 1e8;
    const pricePerBtc = parseFloat(fiatAmount) / btcAmount;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Root($$renderer3, {
        open,
        onOpenChange: (newOpen) => {
          open = newOpen;
          if (!newOpen) onClose();
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Dialog_content($$renderer4, {
            class: "max-w-lg max-h-[90vh] overflow-y-auto",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_header($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_title($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Create P2P Order`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="space-y-6"><div>`);
              Label($$renderer5, {
                class: "block mb-2",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Order Type`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="grid grid-cols-2 gap-3">`);
              Button($$renderer5, {
                variant: orderType === "buy" ? "default" : "outline",
                onclick: () => orderType = "buy",
                class: orderType === "buy" ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40" : "",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->I want to buy Bitcoin`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Button($$renderer5, {
                variant: orderType === "sell" ? "default" : "outline",
                onclick: () => orderType = "sell",
                class: orderType === "sell" ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40" : "",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->I want to sell Bitcoin`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div></div> <div>`);
              Label($$renderer5, {
                for: "sats-amount",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Bitcoin Amount (sats)`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="relative mt-2"><svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"></path></svg> `);
              Input($$renderer5, {
                id: "sats-amount",
                type: "number",
                class: "pl-10",
                placeholder: "100000",
                get value() {
                  return satsAmount;
                },
                set value($$value) {
                  satsAmount = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <p class="mt-1 text-xs text-muted-foreground">= ${escape_html(btcAmount.toFixed(8))} BTC</p></div> <div class="grid grid-cols-2 gap-4"><div>`);
              Label($$renderer5, {
                for: "fiat-amount",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Fiat Amount`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "fiat-amount",
                type: "number",
                placeholder: "50",
                class: "mt-2",
                get value() {
                  return fiatAmount;
                },
                set value($$value) {
                  fiatAmount = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----> <p class="mt-1 text-xs text-muted-foreground">≈ $${escape_html(pricePerBtc.toFixed(2))}/BTC</p></div> <div>`);
              Label($$renderer5, {
                for: "currency",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Currency`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              $$renderer5.select(
                {
                  id: "currency",
                  value: currency,
                  class: "mt-2 w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                },
                ($$renderer6) => {
                  $$renderer6.push(`<!--[-->`);
                  const each_array = ensure_array_like(currencies);
                  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                    let curr = each_array[$$index];
                    $$renderer6.option({ value: curr.code }, ($$renderer7) => {
                      $$renderer7.push(`${escape_html(curr.symbol)} ${escape_html(curr.code)}`);
                    });
                  }
                  $$renderer6.push(`<!--]-->`);
                }
              );
              $$renderer5.push(`</div></div> <div>`);
              Label($$renderer5, {
                class: "block mb-2",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Payment Method`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="grid grid-cols-2 gap-3"><!--[-->`);
              const each_array_1 = ensure_array_like(paymentMethods);
              for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                let method = each_array_1[$$index_1];
                Button($$renderer5, {
                  variant: paymentMethod === method.id ? "default" : "outline",
                  onclick: () => paymentMethod = method.id,
                  class: `justify-start h-auto py-2 ${stringify(paymentMethod === method.id ? "border-primary" : "")}`,
                  children: ($$renderer6) => {
                    $$renderer6.push(`<span class="text-lg mr-2">${escape_html(method.icon)}</span> <span class="text-sm">${escape_html(method.name)}</span>`);
                  },
                  $$slots: { default: true }
                });
              }
              $$renderer5.push(`<!--]--></div> `);
              if (paymentMethod === "custom") {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="mt-3">`);
                Input($$renderer5, {
                  placeholder: "Enter payment method (e.g., Bank Transfer, PayPal, etc.)",
                  autofocus: true,
                  get value() {
                    return customPaymentMethod;
                  },
                  set value($$value) {
                    customPaymentMethod = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--></div> `);
              if (showLocationPicker) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div>`);
                Label($$renderer5, {
                  for: "location",
                  class: "flex items-center gap-1",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Location (Required for F2F)`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <div class="space-y-2 mt-2"><div class="flex gap-2">`);
                Input($$renderer5, {
                  id: "location",
                  placeholder: "City, neighborhood, or area",
                  class: "flex-1",
                  get value() {
                    return location;
                  },
                  set value($$value) {
                    location = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----> `);
                Button($$renderer5, {
                  variant: "outline",
                  size: "icon",
                  onclick: handleLocationRequest,
                  title: "Use current location",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div> `);
                if (geohash) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<p class="text-xs text-muted-foreground">Geohash: ${escape_html(geohash)} (approximate location)</p>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]--></div></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--> <div>`);
              Label($$renderer5, {
                for: "premium",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Premium (%)`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "premium",
                type: "number",
                placeholder: "0",
                class: "mt-2",
                get value() {
                  return premium;
                },
                set value($$value) {
                  premium = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----> <p class="mt-1 text-xs text-muted-foreground">Positive for above market, negative for below</p></div> <div>`);
              Label($$renderer5, {
                for: "expiration",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Expiration (hours)`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              $$renderer5.select(
                {
                  id: "expiration",
                  value: expirationHours,
                  class: "mt-2 w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                },
                ($$renderer6) => {
                  $$renderer6.option({ value: "1" }, ($$renderer7) => {
                    $$renderer7.push(`1 hour`);
                  });
                  $$renderer6.option({ value: "6" }, ($$renderer7) => {
                    $$renderer7.push(`6 hours`);
                  });
                  $$renderer6.option({ value: "12" }, ($$renderer7) => {
                    $$renderer7.push(`12 hours`);
                  });
                  $$renderer6.option({ value: "24" }, ($$renderer7) => {
                    $$renderer7.push(`24 hours`);
                  });
                  $$renderer6.option({ value: "48" }, ($$renderer7) => {
                    $$renderer7.push(`48 hours`);
                  });
                  $$renderer6.option({ value: "72" }, ($$renderer7) => {
                    $$renderer7.push(`72 hours`);
                  });
                }
              );
              $$renderer5.push(`</div></div> <!---->`);
              Dialog_footer($$renderer5, {
                class: "mt-6 flex items-center justify-between gap-4",
                children: ($$renderer6) => {
                  $$renderer6.push(`<div class="relative">`);
                  Button($$renderer6, {
                    type: "button",
                    variant: "outline",
                    size: "icon",
                    onclick: toggleRelayDropdown,
                    disabled: creating,
                    class: "h-10 w-10",
                    title: "Select relays",
                    get ref() {
                      return relayButtonElement;
                    },
                    set ref($$value) {
                      relayButtonElement = $$value;
                      $$settled = false;
                    },
                    children: ($$renderer7) => {
                      if (selectedRelayUrls.length <= 2 && selectedRelayUrls.length > 0) {
                        $$renderer7.push("<!--[-->");
                        $$renderer7.push(`<div class="flex items-center -space-x-1"><!--[-->`);
                        const each_array_2 = ensure_array_like(selectedRelayUrls);
                        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                          let relayUrl = each_array_2[$$index_2];
                          const relay = allRelays.find((r) => r.url === relayUrl);
                          const relayInfo = relay ? useRelayInfoCached(relay.url) : null;
                          if (relayInfo?.info?.icon) {
                            $$renderer7.push("<!--[-->");
                            $$renderer7.push(`<img${attr("src", relayInfo.info.icon)} alt="" class="w-5 h-5 rounded border border-background"/>`);
                          } else {
                            $$renderer7.push("<!--[!-->");
                            $$renderer7.push(`<div class="w-5 h-5 rounded bg-muted flex items-center justify-center border border-background"><svg class="w-3 h-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg></div>`);
                          }
                          $$renderer7.push(`<!--]-->`);
                        }
                        $$renderer7.push(`<!--]--></div>`);
                      } else {
                        $$renderer7.push("<!--[!-->");
                        $$renderer7.push(`<div class="relative"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg> `);
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
                    $$renderer6.push(`<div${attr_style(`position: fixed; top: ${stringify(dropdownPosition.top)}px; left: ${stringify(dropdownPosition.left)}px;`)} class="bg-popover border border-border rounded-lg shadow-xl z-50 w-80 max-h-[400px] overflow-y-auto">`);
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
                  $$renderer6.push(`<!--]--></div> <div class="flex gap-2">`);
                  Button($$renderer6, {
                    variant: "outline",
                    onclick: () => {
                      open = false;
                      onClose();
                    },
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Cancel`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Button($$renderer6, {
                    onclick: handleCreate,
                    disabled: creating || !satsAmount || !fiatAmount,
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(creating ? "Creating..." : "Create Order")}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----></div>`);
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

export { CreateOrderModal as C };
//# sourceMappingURL=CreateOrderModal-Bzte9lJq.js.map
