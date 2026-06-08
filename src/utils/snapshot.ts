import { BlocksObjectWithId, BlockValuesObject } from "~/types";

export type DocumentSnapshot = {
  active: string[];
  inactive: string[];
  blockValues: BlockValuesObject;
  customBlocks: BlocksObjectWithId;
  nextId: number;
};

export function cloneSnapshot(s: DocumentSnapshot): DocumentSnapshot {
  return {
    active: [...s.active],
    inactive: [...s.inactive],
    blockValues: JSON.parse(JSON.stringify(s.blockValues)),
    customBlocks: JSON.parse(JSON.stringify(s.customBlocks)),
    nextId: s.nextId,
  };
}

export function snapshotsEqual(a: DocumentSnapshot, b: DocumentSnapshot): boolean {
  if (a === b) return true;
  if (a.nextId !== b.nextId) return false;
  if (a.active.length !== b.active.length) return false;
  if (a.inactive.length !== b.inactive.length) return false;
  for (let i = 0; i < a.active.length; i++) if (a.active[i] !== b.active[i]) return false;
  for (let i = 0; i < a.inactive.length; i++) if (a.inactive[i] !== b.inactive[i]) return false;
  // Stable JSON compare for nested objects (sorts object keys deterministically)
  const stable = (v: unknown) =>
    JSON.stringify(v, (_k, val) => {
      if (val && typeof val === "object" && !Array.isArray(val)) {
        const obj = val as Record<string, unknown>;
        return Object.keys(obj)
          .sort()
          .reduce<Record<string, unknown>>((acc, key) => {
            acc[key] = obj[key];
            return acc;
          }, {});
      }
      return val;
    });

  return stable(a.blockValues) === stable(b.blockValues) && stable(a.customBlocks) === stable(b.customBlocks);
}
