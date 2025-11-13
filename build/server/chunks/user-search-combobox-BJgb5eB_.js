import 'clsx';
import { CacheModuleStorage, NDKMessenger } from '@nostr-dev-kit/messages';
import { n as ndk } from './ndk.svelte-BfhDBrJw.js';
import { b as attr, a as attr_class, c as clsx, f as bind_props, e as ensure_array_like, j as derived, h as spread_props, k as attributes, p as props_id } from './index2-DpBdzO5t.js';
import '@nostr-dev-kit/ndk';
import { r as resolveNDK } from './index.svelte-EYlAHNHC.js';
import { c as cn, U as User } from './index4-D71bD0RT.js';
import { w as watch, b as boxWith, n as noop, C as Context, x as afterTick, y as DOMContext, a as PresenceManager, c as createBitsAttrs, m as mergeProps, v as styleToString, u as useId, d as createId, e as attachRef, z as ESCAPE, A as ARROW_UP, B as ARROW_DOWN, G as ARROW_LEFT, H as ARROW_RIGHT, I as SHIFT, J as CAPS_LOCK, K as CONTROL, L as ALT, N as META, E as ENTER, O as F1, Q as F2, R as F3, U as F4, V as F5, W as F6, X as F7, Y as F8, Z as F9, _ as F10, $ as F11, a0 as F12, a1 as TAB, a2 as BACKSPACE, a3 as PAGE_UP, a4 as HOME, a5 as PAGE_DOWN, a6 as END, f as boolToEmptyStrOrUndef, g as getDataOpenClosed, k as boolToStr, a7 as boolToTrueOrUndef, a8 as isIOS } from './scroll-lock-YhRhLzPR.js';
import { F as Floating_layer, a as Floating_layer_anchor, g as getFloatingContentCSSVars } from './floating-layer-anchor-DIntB4dN.js';
import { o as on } from './events-CY0_bqjb.js';
import { P as Popper_layer_force_mount, a as Popper_layer } from './popper-layer-force-mount-B4z1kw84.js';

const srOnlyStyles = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: "0",
  transform: "translateX(-100%)"
};
const srOnlyStylesString = styleToString(srOnlyStyles);
class Previous {
  #previousCallback = () => void 0;
  #previous = derived(() => this.#previousCallback());
  constructor(getter, initialValue) {
    let actualPrevious = void 0;
    if (initialValue !== void 0) actualPrevious = initialValue;
    this.#previousCallback = () => {
      try {
        return actualPrevious;
      } finally {
        actualPrevious = getter();
      }
    };
  }
  get current() {
    return this.#previous();
  }
}
function next(array, index, loop = true) {
  if (array.length === 0 || index < 0 || index >= array.length)
    return;
  if (array.length === 1 && index === 0)
    return array[0];
  if (index === array.length - 1)
    return loop ? array[0] : void 0;
  return array[index + 1];
}
function prev(array, index, loop = true) {
  if (array.length === 0 || index < 0 || index >= array.length)
    return;
  if (array.length === 1 && index === 0)
    return array[0];
  if (index === 0)
    return loop ? array[array.length - 1] : void 0;
  return array[index - 1];
}
function forward(array, index, increment, loop = true) {
  if (array.length === 0 || index < 0 || index >= array.length)
    return;
  let targetIndex = index + increment;
  if (loop) {
    targetIndex = (targetIndex % array.length + array.length) % array.length;
  } else {
    targetIndex = Math.max(0, Math.min(targetIndex, array.length - 1));
  }
  return array[targetIndex];
}
function backward(array, index, decrement, loop = true) {
  if (array.length === 0 || index < 0 || index >= array.length)
    return;
  let targetIndex = index - decrement;
  if (loop) {
    targetIndex = (targetIndex % array.length + array.length) % array.length;
  } else {
    targetIndex = Math.max(0, Math.min(targetIndex, array.length - 1));
  }
  return array[targetIndex];
}
function Hidden_input($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { value = void 0, $$slots, $$events, ...restProps } = $$props;
    const mergedProps = mergeProps(restProps, {
      "aria-hidden": "true",
      tabindex: -1,
      style: srOnlyStylesString
    });
    if (mergedProps.type === "checkbox") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<input${attributes({ ...mergedProps, value }, void 0, void 0, void 0, 4)}/>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<input${attributes({ value, ...mergedProps }, void 0, void 0, void 0, 4)}/>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { value });
  });
}
const INTERACTION_KEYS = [
  ARROW_LEFT,
  ESCAPE,
  ARROW_RIGHT,
  SHIFT,
  CAPS_LOCK,
  CONTROL,
  ALT,
  META,
  ENTER,
  F1,
  F2,
  F3,
  F4,
  F5,
  F6,
  F7,
  F8,
  F9,
  F10,
  F11,
  F12
];
const FIRST_KEYS = [ARROW_DOWN, PAGE_UP, HOME];
const LAST_KEYS = [ARROW_UP, PAGE_DOWN, END];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
const selectAttrs = createBitsAttrs({
  component: "select",
  parts: [
    "trigger",
    "content",
    "item",
    "viewport",
    "scroll-up-button",
    "scroll-down-button",
    "group",
    "group-label",
    "separator",
    "arrow",
    "input",
    "content-wrapper",
    "item-text",
    "value"
  ]
});
const SelectRootContext = new Context("Select.Root | Combobox.Root");
const SelectContentContext = new Context("Select.Content | Combobox.Content");
class SelectBaseRootState {
  opts;
  touchedInput = false;
  inputNode = null;
  contentNode = null;
  contentPresence;
  viewportNode = null;
  triggerNode = null;
  valueId = "";
  highlightedNode = null;
  #highlightedValue = derived(() => {
    if (!this.highlightedNode) return null;
    return this.highlightedNode.getAttribute("data-value");
  });
  get highlightedValue() {
    return this.#highlightedValue();
  }
  set highlightedValue($$value) {
    return this.#highlightedValue($$value);
  }
  #highlightedId = derived(() => {
    if (!this.highlightedNode) return void 0;
    return this.highlightedNode.id;
  });
  get highlightedId() {
    return this.#highlightedId();
  }
  set highlightedId($$value) {
    return this.#highlightedId($$value);
  }
  #highlightedLabel = derived(() => {
    if (!this.highlightedNode) return null;
    return this.highlightedNode.getAttribute("data-label");
  });
  get highlightedLabel() {
    return this.#highlightedLabel();
  }
  set highlightedLabel($$value) {
    return this.#highlightedLabel($$value);
  }
  isUsingKeyboard = false;
  isCombobox = false;
  domContext = new DOMContext(() => null);
  constructor(opts) {
    this.opts = opts;
    this.isCombobox = opts.isCombobox;
    this.contentPresence = new PresenceManager({
      ref: boxWith(() => this.contentNode),
      open: this.opts.open,
      onComplete: () => {
        this.opts.onOpenChangeComplete.current(this.opts.open.current);
      }
    });
  }
  setHighlightedNode(node, initial = false) {
    this.highlightedNode = node;
    if (node && (this.isUsingKeyboard || initial)) {
      node.scrollIntoView({ block: this.opts.scrollAlignment.current });
    }
  }
  getCandidateNodes() {
    const node = this.contentNode;
    if (!node) return [];
    return Array.from(node.querySelectorAll(`[${this.getBitsAttr("item")}]:not([data-disabled])`));
  }
  setHighlightedToFirstCandidate(initial = false) {
    this.setHighlightedNode(null);
    let nodes = this.getCandidateNodes();
    if (!nodes.length) return;
    if (this.viewportNode) {
      const viewportRect = this.viewportNode.getBoundingClientRect();
      nodes = nodes.filter((node) => {
        if (!this.viewportNode) return false;
        const nodeRect = node.getBoundingClientRect();
        const isNodeFullyVisible = nodeRect.right < viewportRect.right && nodeRect.left > viewportRect.left && nodeRect.bottom < viewportRect.bottom && nodeRect.top > viewportRect.top;
        return isNodeFullyVisible;
      });
    }
    this.setHighlightedNode(nodes[0], initial);
  }
  getNodeByValue(value) {
    const candidateNodes = this.getCandidateNodes();
    return candidateNodes.find((node) => node.dataset.value === value) ?? null;
  }
  setOpen(open) {
    this.opts.open.current = open;
  }
  toggleOpen() {
    this.opts.open.current = !this.opts.open.current;
  }
  handleOpen() {
    this.setOpen(true);
  }
  handleClose() {
    this.setHighlightedNode(null);
    this.setOpen(false);
  }
  toggleMenu() {
    this.toggleOpen();
  }
  getBitsAttr = (part) => {
    return selectAttrs.getAttr(part, this.isCombobox ? "combobox" : void 0);
  };
}
class SelectSingleRootState extends SelectBaseRootState {
  opts;
  isMulti = false;
  #hasValue = derived(() => this.opts.value.current !== "");
  get hasValue() {
    return this.#hasValue();
  }
  set hasValue($$value) {
    return this.#hasValue($$value);
  }
  #currentLabel = derived(() => {
    if (!this.opts.items.current.length) return "";
    return this.opts.items.current.find((item) => item.value === this.opts.value.current)?.label ?? "";
  });
  get currentLabel() {
    return this.#currentLabel();
  }
  set currentLabel($$value) {
    return this.#currentLabel($$value);
  }
  #candidateLabels = derived(() => {
    if (!this.opts.items.current.length) return [];
    const filteredItems = this.opts.items.current.filter((item) => !item.disabled);
    return filteredItems.map((item) => item.label);
  });
  get candidateLabels() {
    return this.#candidateLabels();
  }
  set candidateLabels($$value) {
    return this.#candidateLabels($$value);
  }
  #dataTypeaheadEnabled = derived(() => {
    if (this.isMulti) return false;
    if (this.opts.items.current.length === 0) return false;
    return true;
  });
  get dataTypeaheadEnabled() {
    return this.#dataTypeaheadEnabled();
  }
  set dataTypeaheadEnabled($$value) {
    return this.#dataTypeaheadEnabled($$value);
  }
  constructor(opts) {
    super(opts);
    this.opts = opts;
    watch(() => this.opts.open.current, () => {
      if (!this.opts.open.current) return;
      this.setInitialHighlightedNode();
    });
  }
  includesItem(itemValue) {
    return this.opts.value.current === itemValue;
  }
  toggleItem(itemValue, itemLabel = itemValue) {
    const newValue = this.includesItem(itemValue) ? "" : itemValue;
    this.opts.value.current = newValue;
    if (newValue !== "") {
      this.opts.inputValue.current = itemLabel;
    }
  }
  setInitialHighlightedNode() {
    afterTick(() => {
      if (this.highlightedNode && this.domContext.getDocument().contains(this.highlightedNode)) return;
      if (this.opts.value.current !== "") {
        const node = this.getNodeByValue(this.opts.value.current);
        if (node) {
          this.setHighlightedNode(node, true);
          return;
        }
      }
      this.setHighlightedToFirstCandidate(true);
    });
  }
}
class SelectMultipleRootState extends SelectBaseRootState {
  opts;
  isMulti = true;
  #hasValue = derived(() => this.opts.value.current.length > 0);
  get hasValue() {
    return this.#hasValue();
  }
  set hasValue($$value) {
    return this.#hasValue($$value);
  }
  constructor(opts) {
    super(opts);
    this.opts = opts;
    watch(() => this.opts.open.current, () => {
      if (!this.opts.open.current) return;
      this.setInitialHighlightedNode();
    });
  }
  includesItem(itemValue) {
    return this.opts.value.current.includes(itemValue);
  }
  toggleItem(itemValue, itemLabel = itemValue) {
    if (this.includesItem(itemValue)) {
      this.opts.value.current = this.opts.value.current.filter((v) => v !== itemValue);
    } else {
      this.opts.value.current = [...this.opts.value.current, itemValue];
    }
    this.opts.inputValue.current = itemLabel;
  }
  setInitialHighlightedNode() {
    afterTick(() => {
      if (!this.domContext) return;
      if (this.highlightedNode && this.domContext.getDocument().contains(this.highlightedNode)) return;
      if (this.opts.value.current.length && this.opts.value.current[0] !== "") {
        const node = this.getNodeByValue(this.opts.value.current[0]);
        if (node) {
          this.setHighlightedNode(node, true);
          return;
        }
      }
      this.setHighlightedToFirstCandidate(true);
    });
  }
}
class SelectRootState {
  static create(props) {
    const { type, ...rest } = props;
    const rootState = type === "single" ? new SelectSingleRootState(rest) : new SelectMultipleRootState(rest);
    return SelectRootContext.set(rootState);
  }
}
class SelectInputState {
  static create(opts) {
    return new SelectInputState(opts, SelectRootContext.get());
  }
  opts;
  root;
  attachment;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(opts.ref, (v) => this.root.inputNode = v);
    this.root.domContext = new DOMContext(opts.ref);
    this.onkeydown = this.onkeydown.bind(this);
    this.oninput = this.oninput.bind(this);
    watch(
      [
        () => this.root.opts.value.current,
        () => this.opts.clearOnDeselect.current
      ],
      ([value, clearOnDeselect], [prevValue]) => {
        if (!clearOnDeselect) return;
        if (Array.isArray(value) && Array.isArray(prevValue)) {
          if (value.length === 0 && prevValue.length !== 0) {
            this.root.opts.inputValue.current = "";
          }
        } else if (value === "" && prevValue !== "") {
          this.root.opts.inputValue.current = "";
        }
      }
    );
  }
  onkeydown(e) {
    this.root.isUsingKeyboard = true;
    if (e.key === ESCAPE) return;
    if (e.key === ARROW_UP || e.key === ARROW_DOWN) e.preventDefault();
    if (!this.root.opts.open.current) {
      if (INTERACTION_KEYS.includes(e.key)) return;
      if (e.key === TAB) return;
      if (e.key === BACKSPACE && this.root.opts.inputValue.current === "") return;
      this.root.handleOpen();
      if (this.root.hasValue) return;
      const candidateNodes = this.root.getCandidateNodes();
      if (!candidateNodes.length) return;
      if (e.key === ARROW_DOWN) {
        const firstCandidate = candidateNodes[0];
        this.root.setHighlightedNode(firstCandidate);
      } else if (e.key === ARROW_UP) {
        const lastCandidate = candidateNodes[candidateNodes.length - 1];
        this.root.setHighlightedNode(lastCandidate);
      }
      return;
    }
    if (e.key === TAB) {
      this.root.handleClose();
      return;
    }
    if (e.key === ENTER && !e.isComposing) {
      e.preventDefault();
      const isCurrentSelectedValue = this.root.highlightedValue === this.root.opts.value.current;
      if (!this.root.opts.allowDeselect.current && isCurrentSelectedValue && !this.root.isMulti) {
        this.root.handleClose();
        return;
      }
      if (this.root.highlightedValue && this.root.highlightedNode && this.root.highlightedNode.isConnected) {
        this.root.toggleItem(this.root.highlightedValue, this.root.highlightedLabel ?? void 0);
      }
      if (!this.root.isMulti && !isCurrentSelectedValue) {
        this.root.handleClose();
      }
    }
    if (e.key === ARROW_UP && e.altKey) {
      this.root.handleClose();
    }
    if (FIRST_LAST_KEYS.includes(e.key)) {
      e.preventDefault();
      const candidateNodes = this.root.getCandidateNodes();
      const currHighlightedNode = this.root.highlightedNode;
      const currIndex = currHighlightedNode ? candidateNodes.indexOf(currHighlightedNode) : -1;
      const loop = this.root.opts.loop.current;
      let nextItem;
      if (e.key === ARROW_DOWN) {
        nextItem = next(candidateNodes, currIndex, loop);
      } else if (e.key === ARROW_UP) {
        nextItem = prev(candidateNodes, currIndex, loop);
      } else if (e.key === PAGE_DOWN) {
        nextItem = forward(candidateNodes, currIndex, 10, loop);
      } else if (e.key === PAGE_UP) {
        nextItem = backward(candidateNodes, currIndex, 10, loop);
      } else if (e.key === HOME) {
        nextItem = candidateNodes[0];
      } else if (e.key === END) {
        nextItem = candidateNodes[candidateNodes.length - 1];
      }
      if (!nextItem) return;
      this.root.setHighlightedNode(nextItem);
      return;
    }
    if (INTERACTION_KEYS.includes(e.key)) return;
    if (!this.root.highlightedNode) {
      this.root.setHighlightedToFirstCandidate();
    }
  }
  oninput(e) {
    this.root.opts.inputValue.current = e.currentTarget.value;
    this.root.setHighlightedToFirstCandidate();
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "combobox",
    disabled: this.root.opts.disabled.current ? true : void 0,
    "aria-activedescendant": this.root.highlightedId,
    "aria-autocomplete": "list",
    "aria-expanded": boolToStr(this.root.opts.open.current),
    "data-state": getDataOpenClosed(this.root.opts.open.current),
    "data-disabled": boolToEmptyStrOrUndef(this.root.opts.disabled.current),
    onkeydown: this.onkeydown,
    oninput: this.oninput,
    [this.root.getBitsAttr("input")]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class SelectContentState {
  static create(opts) {
    return SelectContentContext.set(new SelectContentState(opts, SelectRootContext.get()));
  }
  opts;
  root;
  attachment;
  isPositioned = false;
  domContext;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(opts.ref, (v) => this.root.contentNode = v);
    this.domContext = new DOMContext(this.opts.ref);
    if (this.root.domContext === null) {
      this.root.domContext = this.domContext;
    }
    watch(() => this.root.opts.open.current, () => {
      if (this.root.opts.open.current) return;
      this.isPositioned = false;
    });
    this.onpointermove = this.onpointermove.bind(this);
  }
  onpointermove(_) {
    this.root.isUsingKeyboard = false;
  }
  #styles = derived(() => {
    return getFloatingContentCSSVars(this.root.isCombobox ? "combobox" : "select");
  });
  onInteractOutside = (e) => {
    if (e.target === this.root.triggerNode || e.target === this.root.inputNode) {
      e.preventDefault();
      return;
    }
    this.opts.onInteractOutside.current(e);
    if (e.defaultPrevented) return;
    this.root.handleClose();
  };
  onEscapeKeydown = (e) => {
    this.opts.onEscapeKeydown.current(e);
    if (e.defaultPrevented) return;
    this.root.handleClose();
  };
  onOpenAutoFocus = (e) => {
    e.preventDefault();
  };
  onCloseAutoFocus = (e) => {
    e.preventDefault();
  };
  get shouldRender() {
    return this.root.contentPresence.shouldRender;
  }
  #snippetProps = derived(() => ({ open: this.root.opts.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "listbox",
    "aria-multiselectable": this.root.isMulti ? "true" : void 0,
    "data-state": getDataOpenClosed(this.root.opts.open.current),
    [this.root.getBitsAttr("content")]: "",
    style: {
      display: "flex",
      flexDirection: "column",
      outline: "none",
      boxSizing: "border-box",
      pointerEvents: "auto",
      ...this.#styles()
    },
    onpointermove: this.onpointermove,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
  popperProps = {
    onInteractOutside: this.onInteractOutside,
    onEscapeKeydown: this.onEscapeKeydown,
    onOpenAutoFocus: this.onOpenAutoFocus,
    onCloseAutoFocus: this.onCloseAutoFocus,
    trapFocus: false,
    loop: false,
    onPlaced: () => {
      if (this.root.opts.open.current) {
        this.isPositioned = true;
      }
    }
  };
}
class SelectItemState {
  static create(opts) {
    return new SelectItemState(opts, SelectRootContext.get());
  }
  opts;
  root;
  attachment;
  #isSelected = derived(() => this.root.includesItem(this.opts.value.current));
  get isSelected() {
    return this.#isSelected();
  }
  set isSelected($$value) {
    return this.#isSelected($$value);
  }
  #isHighlighted = derived(() => this.root.highlightedValue === this.opts.value.current);
  get isHighlighted() {
    return this.#isHighlighted();
  }
  set isHighlighted($$value) {
    return this.#isHighlighted($$value);
  }
  prevHighlighted = new Previous(() => this.isHighlighted);
  mounted = false;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(opts.ref);
    watch([() => this.isHighlighted, () => this.prevHighlighted.current], () => {
      if (this.isHighlighted) {
        this.opts.onHighlight.current();
      } else if (this.prevHighlighted.current) {
        this.opts.onUnhighlight.current();
      }
    });
    watch(() => this.mounted, () => {
      if (!this.mounted) return;
      this.root.setInitialHighlightedNode();
    });
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onpointerup = this.onpointerup.bind(this);
    this.onpointermove = this.onpointermove.bind(this);
  }
  handleSelect() {
    if (this.opts.disabled.current) return;
    const isCurrentSelectedValue = this.opts.value.current === this.root.opts.value.current;
    if (!this.root.opts.allowDeselect.current && isCurrentSelectedValue && !this.root.isMulti) {
      this.root.handleClose();
      return;
    }
    this.root.toggleItem(this.opts.value.current, this.opts.label.current);
    if (!this.root.isMulti && !isCurrentSelectedValue) {
      this.root.handleClose();
    }
  }
  #snippetProps = derived(() => ({ selected: this.isSelected, highlighted: this.isHighlighted }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  onpointerdown(e) {
    e.preventDefault();
  }
  /**
   * Using `pointerup` instead of `click` allows power users to pointerdown
   * the trigger, then release pointerup on an item to select it vs having to do
   * multiple clicks.
   */
  onpointerup(e) {
    if (e.defaultPrevented || !this.opts.ref.current) return;
    if (e.pointerType === "touch" && !isIOS) {
      on(
        this.opts.ref.current,
        "click",
        () => {
          this.handleSelect();
          this.root.setHighlightedNode(this.opts.ref.current);
        },
        { once: true }
      );
      return;
    }
    e.preventDefault();
    this.handleSelect();
    if (e.pointerType === "touch") {
      this.root.setHighlightedNode(this.opts.ref.current);
    }
  }
  onpointermove(e) {
    if (e.pointerType === "touch") return;
    if (this.root.highlightedNode !== this.opts.ref.current) {
      this.root.setHighlightedNode(this.opts.ref.current);
    }
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "option",
    "aria-selected": this.root.includesItem(this.opts.value.current) ? "true" : void 0,
    "data-value": this.opts.value.current,
    "data-disabled": boolToEmptyStrOrUndef(this.opts.disabled.current),
    "data-highlighted": this.root.highlightedValue === this.opts.value.current && !this.opts.disabled.current ? "" : void 0,
    "data-selected": this.root.includesItem(this.opts.value.current) ? "" : void 0,
    "data-label": this.opts.label.current,
    [this.root.getBitsAttr("item")]: "",
    onpointermove: this.onpointermove,
    onpointerdown: this.onpointerdown,
    onpointerup: this.onpointerup,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class SelectHiddenInputState {
  static create(opts) {
    return new SelectHiddenInputState(opts, SelectRootContext.get());
  }
  opts;
  root;
  #shouldRender = derived(() => this.root.opts.name.current !== "");
  get shouldRender() {
    return this.#shouldRender();
  }
  set shouldRender($$value) {
    return this.#shouldRender($$value);
  }
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.onfocus = this.onfocus.bind(this);
  }
  onfocus(e) {
    e.preventDefault();
    if (!this.root.isCombobox) {
      this.root.triggerNode?.focus();
    } else {
      this.root.inputNode?.focus();
    }
  }
  #props = derived(() => ({
    disabled: boolToTrueOrUndef(this.root.opts.disabled.current),
    required: boolToTrueOrUndef(this.root.opts.required.current),
    name: this.root.opts.name.current,
    value: this.opts.value.current,
    onfocus: this.onfocus
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function Select_hidden_input($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { value = void 0, autocomplete } = $$props;
    const hiddenInputState = SelectHiddenInputState.create({ value: boxWith(() => value) });
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (hiddenInputState.shouldRender) {
        $$renderer3.push("<!--[-->");
        Hidden_input($$renderer3, spread_props([
          hiddenInputState.props,
          {
            autocomplete,
            get value() {
              return value;
            },
            set value($$value) {
              value = $$value;
              $$settled = false;
            }
          }
        ]));
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
    bind_props($$props, { value });
  });
}
function Combobox($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = void 0,
      onValueChange = noop,
      name = "",
      disabled = false,
      type,
      open = false,
      onOpenChange = noop,
      onOpenChangeComplete = noop,
      loop = false,
      scrollAlignment = "nearest",
      required = false,
      items = [],
      allowDeselect = true,
      inputValue = "",
      children
    } = $$props;
    if (value === void 0) {
      const defaultValue = type === "single" ? "" : [];
      value = defaultValue;
    }
    watch.pre(() => value, () => {
      if (value !== void 0) return;
      value = type === "single" ? "" : [];
    });
    const rootState = SelectRootState.create({
      type,
      value: boxWith(() => value, (v) => {
        value = v;
        onValueChange(v);
      }),
      disabled: boxWith(() => disabled),
      required: boxWith(() => required),
      open: boxWith(() => open, (v) => {
        open = v;
        onOpenChange(v);
      }),
      loop: boxWith(() => loop),
      scrollAlignment: boxWith(() => scrollAlignment),
      name: boxWith(() => name),
      isCombobox: true,
      items: boxWith(() => items),
      allowDeselect: boxWith(() => allowDeselect),
      inputValue: boxWith(() => inputValue, (v) => inputValue = v),
      onOpenChangeComplete: boxWith(() => onOpenChangeComplete)
    });
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      Floating_layer($$renderer3, {
        children: ($$renderer4) => {
          children?.($$renderer4);
          $$renderer4.push(`<!---->`);
        }
      });
      $$renderer3.push(`<!----> `);
      if (Array.isArray(rootState.opts.value.current)) {
        $$renderer3.push("<!--[-->");
        if (rootState.opts.value.current.length) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<!--[-->`);
          const each_array = ensure_array_like(rootState.opts.value.current);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let item = each_array[$$index];
            Select_hidden_input($$renderer3, { value: item });
          }
          $$renderer3.push(`<!--]-->`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      } else {
        $$renderer3.push("<!--[!-->");
        Select_hidden_input($$renderer3, {
          get value() {
            return rootState.opts.value.current;
          },
          set value($$value) {
            rootState.opts.value.current = $$value;
            $$settled = false;
          }
        });
      }
      $$renderer3.push(`<!--]-->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { value, open });
  });
}
function Combobox_input($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id = useId(),
      ref = null,
      child,
      defaultValue,
      clearOnDeselect = false,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const inputState = SelectInputState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v),
      clearOnDeselect: boxWith(() => clearOnDeselect)
    });
    if (defaultValue) {
      inputState.root.opts.inputValue.current = defaultValue;
    }
    const mergedProps = mergeProps(restProps, inputState.props, { value: inputState.root.opts.inputValue.current });
    $$renderer2.push(`<!---->`);
    Floating_layer_anchor($$renderer2, {
      id,
      ref: inputState.opts.ref,
      children: ($$renderer3) => {
        if (child) {
          $$renderer3.push("<!--[-->");
          child($$renderer3, { props: mergedProps });
          $$renderer3.push(`<!---->`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<input${attributes({ ...mergedProps }, void 0, void 0, void 0, 4)}/>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
    });
    $$renderer2.push(`<!---->`);
    bind_props($$props, { ref });
  });
}
function Select_content($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      id = createId(uid),
      ref = null,
      forceMount = false,
      side = "bottom",
      onInteractOutside = noop,
      onEscapeKeydown = noop,
      children,
      child,
      preventScroll = false,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const contentState = SelectContentState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v),
      onInteractOutside: boxWith(() => onInteractOutside),
      onEscapeKeydown: boxWith(() => onEscapeKeydown)
    });
    const mergedProps = mergeProps(restProps, contentState.props);
    if (forceMount) {
      $$renderer2.push("<!--[-->");
      {
        let popper = function($$renderer3, { props, wrapperProps }) {
          const finalProps = mergeProps(props, { style: contentState.props.style });
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
            side,
            enabled: contentState.root.opts.open.current,
            id,
            preventScroll,
            forceMount: true,
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
            const finalProps = mergeProps(props, { style: contentState.props.style });
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
              side,
              open: contentState.root.opts.open.current,
              id,
              preventScroll,
              forceMount: false,
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
function Mounted($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { mounted = false, onMountedChange = noop } = $$props;
    bind_props($$props, { mounted });
  });
}
function Select_item($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      id = createId(uid),
      ref = null,
      value,
      label = value,
      disabled = false,
      children,
      child,
      onHighlight = noop,
      onUnhighlight = noop,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const itemState = SelectItemState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v),
      value: boxWith(() => value),
      disabled: boxWith(() => disabled),
      label: boxWith(() => label),
      onHighlight: boxWith(() => onHighlight),
      onUnhighlight: boxWith(() => onUnhighlight)
    });
    const mergedProps = mergeProps(restProps, itemState.props);
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (child) {
        $$renderer3.push("<!--[-->");
        child($$renderer3, { props: mergedProps, ...itemState.snippetProps });
        $$renderer3.push(`<!---->`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div${attributes({ ...mergedProps })}>`);
        children?.($$renderer3, itemState.snippetProps);
        $$renderer3.push(`<!----></div>`);
      }
      $$renderer3.push(`<!--]--> `);
      Mounted($$renderer3, {
        get mounted() {
          return itemState.mounted;
        },
        set mounted($$value) {
          itemState.mounted = $$value;
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
    bind_props($$props, { ref });
  });
}
class MessagesStore {
  messenger = null;
  _conversations = [];
  _totalUnreadCount = 0;
  isStarted = false;
  // Lazy-start messenger when first accessed
  async ensureStarted() {
    if (!this.isStarted && ndk.$currentUser && ndk.signer) {
      this.isStarted = true;
      const storage = new CacheModuleStorage(ndk.cacheAdapter, ndk.$currentUser.pubkey);
      this.messenger = new NDKMessenger(ndk, { storage });
      this.messenger.on("message", (message) => {
        this.refreshConversations();
      });
      this.messenger.on("error", (error) => {
        console.error("Messenger error:", error);
      });
      await this.messenger.start();
      await this.refreshConversations();
    }
  }
  async refreshConversations() {
    if (!this.messenger) return;
    try {
      this._conversations = await this.messenger.getConversations();
      this._totalUnreadCount = this._conversations.reduce((total, conv) => total + conv.getUnreadCount(), 0);
    } catch (error) {
      console.error("Failed to refresh conversations:", error);
    }
  }
  async stop() {
    if (this.messenger) {
      this.messenger.destroy();
      this.messenger = null;
      this.isStarted = false;
      this._conversations = [];
      this._totalUnreadCount = 0;
    }
  }
  async getConversation(participantNpub) {
    await this.ensureStarted();
    if (!this.messenger) return null;
    const user = ndk.getUser({ npub: participantNpub });
    return await this.messenger.getConversation(user);
  }
  async sendMessage(recipientNpub, content) {
    await this.ensureStarted();
    if (!this.messenger) return null;
    const recipient = ndk.getUser({ npub: recipientNpub });
    const message = await this.messenger.sendMessage(recipient, content);
    await this.refreshConversations();
    return message;
  }
  async markConversationAsRead(conversationId) {
    const conversation = this._conversations.find((c) => c.id === conversationId);
    if (conversation) {
      await conversation.markAsRead();
      this._totalUnreadCount = this._conversations.reduce((total, conv) => total + conv.getUnreadCount(), 0);
    }
  }
  get conversations() {
    if (ndk.$currentUser) {
      this.ensureStarted();
    }
    return [...this._conversations].sort((a, b) => {
      const aTime = a.getLastMessage()?.timestamp || 0;
      const bTime = b.getLastMessage()?.timestamp || 0;
      return bTime - aTime;
    });
  }
  get totalUnreadCount() {
    if (ndk.$currentUser) {
      this.ensureStarted();
    }
    return this._totalUnreadCount;
  }
  getMessenger() {
    return this.messenger;
  }
}
const messagesStore = new MessagesStore();
function createUserInput(config, ndk2) {
  resolveNDK(ndk2);
  let results = [];
  let selectedUser = null;
  let loading = false;
  function selectUser(user) {
    selectedUser = user;
    const { onSelect } = config();
    if (onSelect) {
      onSelect(user);
    }
  }
  function clear() {
    selectedUser = null;
    results = [];
  }
  return {
    get results() {
      return results;
    },
    get selectedUser() {
      return selectedUser;
    },
    get loading() {
      return loading;
    },
    selectUser,
    clear
  };
}
function User_search_combobox($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ndk: ndk2,
      onSelect,
      placeholder = "Search users by name, NIP-05, npub...",
      debounceMs = 300,
      class: className = "",
      input
    } = $$props;
    let query = "";
    let selectedValue = [];
    let open = false;
    const userInputState = createUserInput(
      () => ({
        query,
        onSelect: (user) => {
          if (onSelect) onSelect(user);
          open = false;
          query = "";
          selectedValue = [];
        },
        debounceMs
      }),
      ndk2
    );
    const displayedResults = userInputState.results.slice(0, 8);
    displayedResults.map((result) => ({
      value: result.user.pubkey,
      label: result.user.profile?.displayName || result.user.profile?.name || result.user.npub
    }));
    function handleValueChange(value) {
      selectedValue = value;
      if (value.length > 0) {
        const pubkey = value[0];
        const result = displayedResults.find((r) => r.user.pubkey === pubkey);
        if (result) {
          userInputState.selectUser(result.user);
        }
      }
    }
    function handleInput(e) {
      query = e.target.value;
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div data-user-search-combobox=""${attr("data-loading", void 0)}${attr("data-open", open ? "" : void 0)}${attr_class(clsx(cn("relative w-full", className)))}><!---->`);
      Combobox($$renderer3, {
        type: "multiple",
        onValueChange: handleValueChange,
        get open() {
          return open;
        },
        set open($$value) {
          open = $$value;
          $$settled = false;
        },
        get value() {
          return selectedValue;
        },
        set value($$value) {
          selectedValue = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="relative">`);
          if (input) {
            $$renderer4.push("<!--[-->");
            input($$renderer4, {
              value: query,
              oninput: handleInput,
              loading: userInputState.loading
            });
            $$renderer4.push(`<!---->`);
          } else {
            $$renderer4.push("<!--[!-->");
            $$renderer4.push(`<!---->`);
            Combobox_input($$renderer4, {
              oninput: (e) => query = e.currentTarget.value,
              placeholder,
              "aria-label": "Search users",
              class: cn("flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm", "placeholder:text-muted-foreground", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50")
            });
            $$renderer4.push(`<!---->`);
          }
          $$renderer4.push(`<!--]--> `);
          {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]--></div> <!---->`);
          Select_content($$renderer4, {
            class: cn("z-50 max-h-96 min-w-full overflow-y-auto rounded-md border border-border bg-popover text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"),
            sideOffset: 4,
            children: ($$renderer5) => {
              if (displayedResults.length > 0) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<!--[-->`);
                const each_array = ensure_array_like(displayedResults);
                for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                  let result = each_array[$$index];
                  $$renderer5.push(`<!---->`);
                  Select_item($$renderer5, {
                    value: result.user.pubkey,
                    label: result.user.profile?.displayName || result.user.profile?.name || result.user.npub,
                    class: cn("relative flex cursor-pointer select-none items-center gap-3 px-4 py-3 border-b border-border last:border-b-0", "data-[highlighted]:bg-muted/50 transition-colors outline-none"),
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->`);
                      User.Root($$renderer6, {
                        ndk: ndk2,
                        pubkey: result.user.pubkey,
                        children: ($$renderer7) => {
                          $$renderer7.push(`<div class="flex items-center gap-3 w-full"><!---->`);
                          User.Avatar($$renderer7, { class: "w-10 h-10" });
                          $$renderer7.push(`<!----> <div class="flex-1 min-w-0"><!---->`);
                          User.Name($$renderer7, { field: "displayName", class: "text-sm truncate" });
                          $$renderer7.push(`<!----></div></div>`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer6.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!---->`);
                }
                $$renderer5.push(`<!--]-->`);
              } else {
                $$renderer5.push("<!--[!-->");
                if (query.trim().length > 0 && true) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<div class="py-6 text-center text-sm text-muted-foreground">No users found</div>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]-->`);
              }
              $$renderer5.push(`<!--]-->`);
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
  });
}

export { User_search_combobox as U, messagesStore as m };
//# sourceMappingURL=user-search-combobox-BJgb5eB_.js.map
