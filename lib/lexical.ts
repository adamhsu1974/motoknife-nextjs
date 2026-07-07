/** Lexical richText 輔助：抽取 h2 標題供側邊目錄使用 */

export interface TocEntry {
  id: string;
  text: string;
}

interface LexicalNode {
  type?: string;
  tag?: string;
  text?: string;
  children?: LexicalNode[];
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9一-鿿]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function nodeText(node: LexicalNode): string {
  if (typeof node.text === "string") return node.text;
  return (node.children ?? []).map(nodeText).join("");
}

export function extractHeadings(data: unknown): TocEntry[] {
  const root = (data as { root?: LexicalNode } | null | undefined)?.root;
  if (!root?.children) return [];
  return root.children
    .filter((n) => n.type === "heading")
    .map((n) => {
      const text = nodeText(n);
      return { id: slugifyHeading(text), text };
    })
    .filter((e) => e.text.length > 0);
}
