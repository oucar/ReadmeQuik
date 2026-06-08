import * as React from "react";
import { useAtom, useAtomValue } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import {
  canRedoAtom,
  canUndoAtom,
  documentSnapshotAtom,
  HISTORY_LIMIT,
  historyAtom,
  loadSnapshotAtom,
  persistNowAtom,
  redoAtom,
  saveStatusAtom,
  skipNextCommitAtom,
  undoAtom,
  WORKSPACE_SNAPSHOT_KEY_PREFIX,
} from "~/store";
import { DocumentSnapshot, snapshotsEqual } from "~/utils";

const COMMIT_DEBOUNCE_MS = 500;

export function readWorkspaceSnapshot(id: string): DocumentSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(
      `${WORKSPACE_SNAPSHOT_KEY_PREFIX}${id}`
    );
    if (!raw) return null;
    return JSON.parse(raw) as DocumentSnapshot;
  } catch {
    return null;
  }
}

export function deleteWorkspaceSnapshot(id: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(`${WORKSPACE_SNAPSHOT_KEY_PREFIX}${id}`);
  } catch {
    // ignore
  }
}

// Pure read/write hook — no effects. Safe to call from multiple components.
// The history-capture / autosave loop lives in useHistoryAutosaverEffect.
export function useDocumentHistory() {
  const undo = useUpdateAtom(undoAtom);
  const redo = useUpdateAtom(redoAtom);
  const loadSnapshotAction = useUpdateAtom(loadSnapshotAtom);
  const saveNow = useUpdateAtom(persistNowAtom);
  const canUndo = useAtomValue(canUndoAtom);
  const canRedo = useAtomValue(canRedoAtom);

  const loadSnapshot = React.useCallback(
    (snapshot: DocumentSnapshot, opts?: { clearHistory?: boolean }) => {
      loadSnapshotAction({
        snapshot,
        clearHistory: opts?.clearHistory ?? true,
      });
    },
    [loadSnapshotAction]
  );

  return { undo, redo, canUndo, canRedo, loadSnapshot, saveNow };
}

// Watches the document snapshot and on every debounced change pushes the
// previous snapshot onto the undo stack and mirrors the current snapshot to
// the active workspace's localStorage entry. Mount via <HistoryAutosaver />.
export function useHistoryAutosaverEffect() {
  const snapshot = useAtomValue(documentSnapshotAtom);
  const setHistory = useUpdateAtom(historyAtom);
  const persistNow = useUpdateAtom(persistNowAtom);
  const setSaveStatus = useUpdateAtom(saveStatusAtom);
  const [skipPending, setSkipPending] = useAtom(skipNextCommitAtom);

  const prevRef = React.useRef<DocumentSnapshot | null>(null);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    const prev = prevRef.current;
    prevRef.current = snapshot;

    if (prev === null) return;
    if (snapshotsEqual(prev, snapshot)) return;

    if (skipPending > 0) {
      setSkipPending((n) => Math.max(0, n - 1));
      return;
    }

    setSaveStatus("saving");

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setHistory((h) => {
        const past = [...h.past, prev];
        if (past.length > HISTORY_LIMIT) {
          past.splice(0, past.length - HISTORY_LIMIT);
        }
        return { past, future: [] };
      });
      persistNow();
    }, COMMIT_DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, [
    snapshot,
    skipPending,
    setHistory,
    persistNow,
    setSaveStatus,
    setSkipPending,
  ]);
}
