import { b as attr, a as attr_class, c as clsx } from './index2-DpBdzO5t.js';
import { f as formatTimeAgo } from './formatTime-CvNAVcDX.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';

function TimeAgo($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { timestamp, class: className = "" } = $$props;
    let formattedTime = formatTimeAgo(timestamp);
    $$renderer2.push(`<time${attr(
      "datetime",
      // Set up interval to update the time
      new Date(timestamp * 1e3).toISOString()
    )}${attr_class(clsx(className))}${attr("title", new Date(timestamp * 1e3).toLocaleString())}>${escape_html(formattedTime)}</time>`);
  });
}

export { TimeAgo as T };
//# sourceMappingURL=TimeAgo-B1T5QF8y.js.map
