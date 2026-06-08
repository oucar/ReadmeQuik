import * as React from "react";
import {
  LanguageSwitcher,
  NavbarLogo,
  ThemeSwitcher,
} from "~/components/common";
import {
  ActionButtons,
  SaveIndicator,
  WorkspaceSwitcher,
} from "~/components/editor";
import {
  Header,
  Box,
  MediaQuery,
  Burger,
  useMantineTheme,
  Group,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { useAtom } from "jotai";
import { FiRotateCcw, FiRotateCw } from "react-icons/fi";
import { sidebarDrawerStateAtom } from "~/store";
import { useDocumentHistory } from "~/hooks";

export interface IEditorNavbarProps {}

export function EditorNavbar(_props: IEditorNavbarProps) {
  const theme = useMantineTheme();
  const [isOpened, toggle] = useAtom(sidebarDrawerStateAtom);
  const { undo, redo, canUndo, canRedo } = useDocumentHistory();

  return (
    <Header height={70} p="md">
      <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Group align="center" position="apart" sx={{ width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={isOpened}
                onClick={() => toggle()}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <NavbarLogo />

            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <Group spacing="xs" ml="md">
                <WorkspaceSwitcher />
                <SaveIndicator />
              </Group>
            </MediaQuery>
          </Box>

          <Group position="center" spacing="sm">
            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <Group spacing="xs">
                <Tooltip label="Undo (Ctrl+Z)" withArrow>
                  <ActionIcon
                    variant="light"
                    onClick={undo}
                    disabled={!canUndo}
                    aria-label="Undo"
                  >
                    <FiRotateCcw size={15} aria-hidden />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Redo (Ctrl+Shift+Z)" withArrow>
                  <ActionIcon
                    variant="light"
                    onClick={redo}
                    disabled={!canRedo}
                    aria-label="Redo"
                  >
                    <FiRotateCw size={15} aria-hidden />
                  </ActionIcon>
                </Tooltip>
                <ActionButtons />
              </Group>
            </MediaQuery>
            <LanguageSwitcher />
            <ThemeSwitcher />
          </Group>
        </Group>
      </Box>
    </Header>
  );
}
