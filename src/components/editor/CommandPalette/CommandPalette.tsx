import * as React from "react";
import { useAtom, useAtomValue } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import {
  Box,
  Group,
  Kbd,
  Modal,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import {
  FiCornerDownLeft,
  FiPlus,
  FiRotateCcw,
  FiRotateCw,
  FiSearch,
} from "react-icons/fi";
import {
  activeBlocksAtom,
  allBlocks,
  commandPaletteStateAtom,
  inActiveBlocksAtom,
  makeBlockActiveAtom,
  removeBlockAtom,
} from "~/store";
import { useDocumentHistory } from "~/hooks";

type Item =
  | { kind: "add"; id: string; name: string }
  | { kind: "remove"; id: string; name: string }
  | { kind: "action"; id: string; name: string; run: () => void; icon: React.ReactNode };

export interface ICommandPaletteProps {}

export function CommandPalette(_props: ICommandPaletteProps) {
  const [open, setOpen] = useAtom(commandPaletteStateAtom);
  const inactive = useAtomValue(inActiveBlocksAtom);
  const active = useAtomValue(activeBlocksAtom);
  const blocks = useAtomValue(allBlocks);
  const makeActive = useUpdateAtom(makeBlockActiveAtom);
  const removeBlock = useUpdateAtom(removeBlockAtom);
  const { undo, redo, canUndo, canRedo, saveNow } = useDocumentHistory();

  const [query, setQuery] = React.useState("");
  const [highlighted, setHighlighted] = React.useState(0);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setHighlighted(0);
    }
  }, [open]);

  const items: Item[] = React.useMemo(() => {
    const list: Item[] = [];
    list.push({
      kind: "action",
      id: "undo",
      name: "Undo",
      run: undo,
      icon: <FiRotateCcw size={14} aria-hidden />,
    });
    list.push({
      kind: "action",
      id: "redo",
      name: "Redo",
      run: redo,
      icon: <FiRotateCw size={14} aria-hidden />,
    });
    list.push({
      kind: "action",
      id: "save",
      name: "Save now",
      run: saveNow,
      icon: <FiCornerDownLeft size={14} aria-hidden />,
    });
    for (const id of inactive) {
      const b = blocks[id];
      if (!b) continue;
      list.push({ kind: "add", id, name: `Add block: ${b.name}` });
    }
    for (const id of active) {
      const b = blocks[id];
      if (!b) continue;
      list.push({ kind: "remove", id, name: `Remove block: ${b.name}` });
    }
    return list;
  }, [active, blocks, inactive, undo, redo, saveNow]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => it.name.toLowerCase().includes(q));
  }, [items, query]);

  React.useEffect(() => {
    setHighlighted(0);
  }, [query]);

  const runItem = (it: Item) => {
    if (it.kind === "add") {
      makeActive({ id: it.id });
    } else if (it.kind === "remove") {
      removeBlock({ id: it.id });
    } else if (it.kind === "action") {
      // Defer to allow Modal to close before action causes state churn.
      it.run();
    }
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, Math.max(0, filtered.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(0, h - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const it = filtered[highlighted];
      if (it) runItem(it);
    }
  };

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      withCloseButton={false}
      padding={0}
      size="lg"
      overlayOpacity={0.4}
      styles={{
        modal: { paddingTop: 0, paddingBottom: 0 },
      }}
    >
      <Stack spacing={0}>
        <Box sx={(t) => ({ padding: t.spacing.sm, borderBottom: `1px solid ${t.colorScheme === "dark" ? t.colors.dark[5] : t.colors.gray[2]}` })}>
          <TextInput
            data-autofocus
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            onKeyDown={onKeyDown}
            placeholder="Search blocks or run a command…"
            icon={<FiSearch size={14} aria-hidden />}
            variant="unstyled"
            size="md"
            sx={{ width: "100%" }}
          />
        </Box>
        <Box sx={{ maxHeight: 360, overflowY: "auto" }}>
          {filtered.length === 0 ? (
            <Box p="md">
              <Text size="sm" color="dimmed">
                No matches
              </Text>
            </Box>
          ) : (
            filtered.map((it, idx) => {
              const isHi = idx === highlighted;
              const icon =
                it.kind === "action" ? (
                  it.icon
                ) : (
                  <FiPlus size={14} aria-hidden />
                );
              const disabled =
                (it.kind === "action" && it.id === "undo" && !canUndo) ||
                (it.kind === "action" && it.id === "redo" && !canRedo);
              return (
                <UnstyledButton
                  key={`${it.kind}:${it.id}`}
                  onMouseEnter={() => setHighlighted(idx)}
                  onClick={() => !disabled && runItem(it)}
                  sx={(t) => ({
                    display: "block",
                    width: "100%",
                    padding: t.spacing.sm,
                    backgroundColor: isHi
                      ? t.colorScheme === "dark"
                        ? t.colors.dark[6]
                        : t.colors.gray[1]
                      : "transparent",
                    opacity: disabled ? 0.5 : 1,
                    cursor: disabled ? "not-allowed" : "pointer",
                  })}
                >
                  <Group spacing="sm">
                    {icon}
                    <Text size="sm">{it.name}</Text>
                  </Group>
                </UnstyledButton>
              );
            })
          )}
        </Box>
        <Box sx={(t) => ({ padding: t.spacing.xs, borderTop: `1px solid ${t.colorScheme === "dark" ? t.colors.dark[5] : t.colors.gray[2]}` })}>
          <Group spacing="md" position="right">
            <Group spacing={4}>
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
              <Text size="xs" color="dimmed">to navigate</Text>
            </Group>
            <Group spacing={4}>
              <Kbd>Enter</Kbd>
              <Text size="xs" color="dimmed">to select</Text>
            </Group>
            <Group spacing={4}>
              <Kbd>Esc</Kbd>
              <Text size="xs" color="dimmed">to close</Text>
            </Group>
          </Group>
        </Box>
      </Stack>
    </Modal>
  );
}

export default CommandPalette;
