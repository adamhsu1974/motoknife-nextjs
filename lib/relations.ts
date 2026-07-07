/** depth ≥ 1 時 relationship 為 populated doc；過濾未 populate 的 id（client/server 皆可用） */
export function populated<T extends object>(rel: (number | T)[] | null | undefined): T[] {
  if (!rel) return [];
  return rel.filter((r): r is T => typeof r === "object");
}

export function populatedOne<T extends object>(rel: number | T | null | undefined): T | undefined {
  return typeof rel === "object" && rel !== null ? rel : undefined;
}
