import * as React from "react";
import { useAtom } from "jotai";
import {
  Button,
  Group,
  Menu,
  Modal,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { FiCheck, FiChevronDown, FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { currentWorkspaceIdAtom, workspacesAtom } from "~/store";
import {
  deleteWorkspaceSnapshot,
  readWorkspaceSnapshot,
  useDocumentHistory,
} from "~/hooks";
import { Workspace } from "~/store/history";

function generateId(): string {
  return `ws_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export interface IWorkspaceSwitcherProps {}

export function WorkspaceSwitcher(_props: IWorkspaceSwitcherProps) {
  const [workspaces, setWorkspaces] = useAtom(workspacesAtom);
  const [currentId, setCurrentId] = useAtom(currentWorkspaceIdAtom);
  const { saveNow, loadSnapshot } = useDocumentHistory();

  const [createOpen, setCreateOpen] = React.useState(false);
  const [renameOpen, setRenameOpen] = React.useState(false);
  const [draftName, setDraftName] = React.useState("");

  const current = workspaces.find((w) => w.id === currentId) ?? workspaces[0];

  const switchTo = (id: string) => {
    if (id === currentId) return;
    // Persist current state first.
    saveNow();
    const next = readWorkspaceSnapshot(id);
    if (next) {
      loadSnapshot(next);
    }
    setCurrentId(id);
  };

  const createWorkspace = () => {
    const name = draftName.trim() || `Workspace ${workspaces.length + 1}`;
    // Save current before switching.
    saveNow();
    const id = generateId();
    const now = Date.now();
    const fresh: Workspace = { id, name, createdAt: now, updatedAt: now };
    setWorkspaces([...workspaces, fresh]);
    // New workspace inherits current document as its starting state.
    // (User-friendly; "blank" workspaces can be created by deleting blocks after.)
    setCurrentId(id);
    setCreateOpen(false);
    setDraftName("");
  };

  const renameWorkspace = () => {
    const name = draftName.trim();
    if (!name) return;
    setWorkspaces(workspaces.map((w) => (w.id === currentId ? { ...w, name } : w)));
    setRenameOpen(false);
    setDraftName("");
  };

  const deleteCurrentWorkspace = () => {
    if (workspaces.length <= 1) return;
    const idx = workspaces.findIndex((w) => w.id === currentId);
    const remaining = workspaces.filter((w) => w.id !== currentId);
    deleteWorkspaceSnapshot(currentId);
    setWorkspaces(remaining);
    const fallback = remaining[Math.max(0, idx - 1)] ?? remaining[0];
    const next = readWorkspaceSnapshot(fallback.id);
    if (next) loadSnapshot(next);
    setCurrentId(fallback.id);
  };

  return (
    <>
      <Menu
        size="md"
        control={
          <Button
            variant="subtle"
            size="xs"
            rightIcon={<FiChevronDown size={14} aria-hidden />}
          >
            {current?.name ?? "Workspace"}
          </Button>
        }
      >
        <Menu.Label>Workspaces</Menu.Label>
        {workspaces.map((w) => (
          <Menu.Item
            key={w.id}
            icon={
              w.id === currentId ? (
                <FiCheck size={14} aria-hidden />
              ) : (
                <span style={{ width: 14, display: "inline-block" }} />
              )
            }
            onClick={() => switchTo(w.id)}
          >
            {w.name}
          </Menu.Item>
        ))}
        <Menu.Item
          icon={<FiPlus size={14} aria-hidden />}
          onClick={() => {
            setDraftName("");
            setCreateOpen(true);
          }}
        >
          New workspace
        </Menu.Item>
        <Menu.Item
          icon={<FiEdit2 size={14} aria-hidden />}
          onClick={() => {
            setDraftName(current?.name ?? "");
            setRenameOpen(true);
          }}
        >
          Rename current
        </Menu.Item>
        <Menu.Item
          icon={<FiTrash2 size={14} aria-hidden />}
          color="red"
          disabled={workspaces.length <= 1}
          onClick={deleteCurrentWorkspace}
        >
          Delete current
        </Menu.Item>
      </Menu>

      <Modal
        opened={createOpen}
        onClose={() => setCreateOpen(false)}
        title="New workspace"
      >
        <Stack>
          <Text size="sm" color="dimmed">
            Creates a new workspace using your current document as a starting point.
          </Text>
          <TextInput
            data-autofocus
            label="Name"
            value={draftName}
            onChange={(e) => setDraftName(e.currentTarget.value)}
            placeholder="e.g. portfolio readme"
          />
          <Group position="right">
            <Button variant="default" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createWorkspace}>Create</Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={renameOpen}
        onClose={() => setRenameOpen(false)}
        title="Rename workspace"
      >
        <Stack>
          <TextInput
            data-autofocus
            label="Name"
            value={draftName}
            onChange={(e) => setDraftName(e.currentTarget.value)}
          />
          <Group position="right">
            <Button variant="default" onClick={() => setRenameOpen(false)}>
              Cancel
            </Button>
            <Button onClick={renameWorkspace}>Save</Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}

export default WorkspaceSwitcher;
