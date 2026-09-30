import type { Plugin } from "vite";

export interface ComponentInspectorOptions {
  jsxSource?: boolean;
  tailwindConfig?: boolean;
  virtualOverrides?: boolean;
  debug?: boolean;
}

export function componentTagger(options?: ComponentInspectorOptions): Plugin;