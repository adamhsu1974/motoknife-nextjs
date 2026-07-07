import {
  RichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import { nodeText, slugifyHeading } from "@/lib/lexical";

/** heading 加上 slug id（側邊目錄錨點）+ 站內排版樣式 */
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const text = nodeText(node as Parameters<typeof nodeText>[0]);
    const id = slugifyHeading(text);
    return (
      <h2 id={id} className="scroll-mt-24 text-xl font-bold text-text-primary">
        {nodesToJSX({ nodes: node.children })}
      </h2>
    );
  },
  paragraph: ({ node, nodesToJSX }) => (
    <p className="leading-relaxed text-text-secondary">
      {nodesToJSX({ nodes: node.children })}
    </p>
  ),
});

export default function LexicalContent({
  data,
  className = "space-y-4",
}: {
  data: SerializedEditorState;
  className?: string;
}) {
  return <RichText data={data} converters={converters} className={className} />;
}
