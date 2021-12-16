import presetUno from "@unocss/preset-uno";
import { extractorSvelte } from "@unocss/core";

export default {
  presets: [presetUno()],
  extractors: [extractorSvelte],
  theme: {
    transitionProperty: {
      'opacity-transform': 'opacity,transform',
    }
  },
  rules: [
    // your custom rules
  ],
  shortcuts: [
    // shortcuts to multiple utilities
    {
      "inactive-svg":"absolute opacity-0 group-focus:opacity-100 group-hover:opacity-100 h-7 w-7 group-focus:scale-[1.2] group-hover:scale-125 transition-opacity-transform duration-700",
    "frontsvg":"relative group-focus:scale-0 group-hover:scale-0 group-focus:opacity-0 group-hover:opacity-0 h-7 w-7 transition-opacity-transform duration-200"
    },
    [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
  ],
  /* options */
};
