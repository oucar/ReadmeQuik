import * as React from "react";
import type { NextPage } from "next";
import {
  CommandPalette,
  HistoryAutosaver,
  MobileOnlyHeader,
  PreviewColumnTab,
} from "~/components/editor";
import { EditorLayout } from "~/components/layouts";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { useAtom } from "jotai";
import { useAtomCallback, useUpdateAtom } from "jotai/utils";
import { useCallback } from "react";
import {
  activeBlocksAtom,
  commandPaletteStateAtom,
  redoAtom,
  undoAtom,
} from "~/store";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

function useEditorShortcuts() {
  const [paletteOpen, setPaletteOpen] = useAtom(commandPaletteStateAtom);
  const undo = useUpdateAtom(undoAtom);
  const redo = useUpdateAtom(redoAtom);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.ctrlKey || e.metaKey;
      if (!meta) return;
      const target = e.target as HTMLElement | null;
      const isEditableTarget =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable === true;

      // Cmd/Ctrl+K — palette toggle (always available)
      if (e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
        return;
      }

      // Undo/redo: skip when user is editing text (let native handlers work)
      if (isEditableTarget) return;

      const key = e.key.toLowerCase();
      if (key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((key === "z" && e.shiftKey) || key === "y") {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, redo, setPaletteOpen, undo]);
}

const Editor: NextPage = () => {
  const moveBlocks = useUpdateAtom(activeBlocksAtom);
  const blockIds = useAtomCallback(
    useCallback((get) => {
      const ids = get(activeBlocksAtom);
      return ids;
    }, [])
  );

  useEditorShortcuts();

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    const ids = await blockIds();
    if (over?.id) {
      if (active.id !== over.id) {
        const oldIndex = ids.findIndex((s) => s === active.id);
        const newIndex = ids.findIndex((s) => s === over.id);
        moveBlocks((draft) => {
          const movedArray = arrayMove(draft, oldIndex, newIndex);
          return (draft = movedArray);
        });
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <HistoryAutosaver />
      <EditorLayout>
        <MobileOnlyHeader />
        <PreviewColumnTab />
      </EditorLayout>
      <CommandPalette />
    </DndContext>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "", ["common", "editor"])),
  },
});

export default Editor;
