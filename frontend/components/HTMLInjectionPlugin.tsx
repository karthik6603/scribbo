"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $getRoot } from "lexical";
import { $generateNodesFromDOM } from "@lexical/html";


interface HTMLInjectionPluginProps {
  html: string;
}

export default function HTMLInjectionPlugin({ html   }: HTMLInjectionPluginProps) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!html) return;

    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);

      const root = $getRoot();
      root.clear(); // Optional: clear existing content
      root.append(...nodes);
    });
  }, [editor, html]);

  return null;
}
