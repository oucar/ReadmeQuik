import * as React from "react";
import { useAtomValue } from "jotai";
import { Group, Loader, Text } from "@mantine/core";
import { FiCheck } from "react-icons/fi";
import { lastSavedAtAtom, saveStatusAtom } from "~/store/history";

function formatTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export interface ISaveIndicatorProps {}

export function SaveIndicator(_props: ISaveIndicatorProps) {
  const status = useAtomValue(saveStatusAtom);
  const lastSavedAt = useAtomValue(lastSavedAtAtom);

  if (status === "saving") {
    return (
      <Group spacing={6} sx={{ minWidth: 90 }}>
        <Loader size={12} />
        <Text size="xs" color="dimmed">
          Saving…
        </Text>
      </Group>
    );
  }

  return (
    <Group spacing={6} sx={{ minWidth: 90 }}>
      <FiCheck size={12} aria-hidden />
      <Text size="xs" color="dimmed">
        {lastSavedAt ? `Saved ${formatTime(lastSavedAt)}` : "Saved"}
      </Text>
    </Group>
  );
}

export default SaveIndicator;
