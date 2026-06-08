import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
  activeBlocksAtom,
  blockValuesAtom,
  customBlocksAtom,
  inActiveBlocksAtom,
  nextIdAtom,
} from "./index";
import { cloneSnapshot, DocumentSnapshot } from "~/utils";

// Read-only derived snapshot of the entire document.
export const documentSnapshotAtom = atom<DocumentSnapshot>((get) => ({
  active: get(activeBlocksAtom),
  inactive: get(inActiveBlocksAtom),
  blockValues: get(blockValuesAtom),
  customBlocks: get(customBlocksAtom),
  nextId: get(nextIdAtom),
}));

// Write-only atom that overwrites every document atom from a snapshot.
// Uses immer recipes that fully replace the draft (replace-by-mutation since
// withImmer's setter only accepts recipes, not raw values).
export const restoreSnapshotAtom = atom(
  null,
  (_get, set, snapshot: DocumentSnapshot) => {
    const s = cloneSnapshot(snapshot);
    set(activeBlocksAtom, (draft) => {
      draft.splice(0, draft.length, ...s.active);
    });
    set(inActiveBlocksAtom, (draft) => {
      draft.splice(0, draft.length, ...s.inactive);
    });
    set(blockValuesAtom, (draft) => {
      for (const k of Object.keys(draft)) delete draft[k];
      Object.assign(draft, s.blockValues);
    });
    set(customBlocksAtom, (draft) => {
      for (const k of Object.keys(draft)) delete draft[k];
      Object.assign(draft, s.customBlocks);
    });
    set(nextIdAtom, () => s.nextId);
  }
);

// In-memory history (cleared on reload by design — undo/redo is for the session).
export type HistoryState = {
  past: DocumentSnapshot[];
  future: DocumentSnapshot[];
};

export const HISTORY_LIMIT = 50;

export const historyAtom = atom<HistoryState>({ past: [], future: [] });

export const canUndoAtom = atom((get) => get(historyAtom).past.length > 0);
export const canRedoAtom = atom((get) => get(historyAtom).future.length > 0);

// Counter incremented when a programmatic restore happens, so the autosaver
// effect can ignore that synthetic snapshot transition.
export const skipNextCommitAtom = atom<number>(0);

// Save status displayed in the navbar.
export type SaveStatus = "saved" | "saving" | "idle";
export const saveStatusAtom = atom<SaveStatus>("saved");

// Last successful autosave timestamp.
export const lastSavedAtAtom = atom<number | null>(null);

// Command palette open state.
export const commandPaletteStateAtom = atom<boolean>(false);

// ---- Workspaces ----

export type Workspace = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
};

export const WORKSPACE_SNAPSHOT_KEY_PREFIX = "workspace-snapshot:";

const DEFAULT_WORKSPACE: Workspace = {
  id: "default",
  name: "Default",
  createdAt: 0,
  updatedAt: 0,
};

export const workspacesAtom = atomWithStorage<Workspace[]>("workspaces", [
  DEFAULT_WORKSPACE,
]);

export const currentWorkspaceIdAtom = atomWithStorage<string>(
  "current-workspace",
  "default"
);

// ---- Write-only action atoms ----

export const undoAtom = atom(null, (get, set) => {
  const h = get(historyAtom);
  if (h.past.length === 0) return;
  const target = h.past[h.past.length - 1];
  const current = get(documentSnapshotAtom);
  set(skipNextCommitAtom, (n) => n + 1);
  set(restoreSnapshotAtom, target);
  set(historyAtom, {
    past: h.past.slice(0, -1),
    future: [...h.future, current],
  });
});

export const redoAtom = atom(null, (get, set) => {
  const h = get(historyAtom);
  if (h.future.length === 0) return;
  const target = h.future[h.future.length - 1];
  const current = get(documentSnapshotAtom);
  set(skipNextCommitAtom, (n) => n + 1);
  set(restoreSnapshotAtom, target);
  set(historyAtom, {
    past: [...h.past, current],
    future: h.future.slice(0, -1),
  });
});

export const loadSnapshotAtom = atom(
  null,
  (
    _get,
    set,
    payload: { snapshot: DocumentSnapshot; clearHistory?: boolean }
  ) => {
    set(skipNextCommitAtom, (n) => n + 1);
    set(restoreSnapshotAtom, payload.snapshot);
    if (payload.clearHistory ?? true) {
      set(historyAtom, { past: [], future: [] });
    }
  }
);

// Persist current snapshot to the active workspace's localStorage entry.
// Pure side-effect on the client; no-op on the server.
export const persistNowAtom = atom(null, (get, set) => {
  if (typeof window === "undefined") return;
  const snapshot = get(documentSnapshotAtom);
  const id = get(currentWorkspaceIdAtom);
  try {
    window.localStorage.setItem(
      `${WORKSPACE_SNAPSHOT_KEY_PREFIX}${id}`,
      JSON.stringify(snapshot)
    );
  } catch {
    return;
  }
  const now = Date.now();
  set(lastSavedAtAtom, now);
  set(workspacesAtom, (list) =>
    list.map((w) => (w.id === id ? { ...w, updatedAt: now } : w))
  );
  set(saveStatusAtom, "saved");
});
