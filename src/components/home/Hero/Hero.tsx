/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { DiGithubBadge } from "react-icons/di";
import { useTranslation } from "next-i18next";
import {
  Container,
  Group,
  Button,
  useMantineTheme,
  Text,
  Space,
  Box,
} from "@mantine/core";
import { NextLink } from "@mantine/next";

const BREAKPOINT = "@media (max-width: 960px)";

export interface IHeroProps {}

export function Hero(props: IHeroProps) {
  const theme = useMantineTheme();
  const { t } = useTranslation("home");
  return (
    <Container size="xl" px="16px" mt="xl">
      <Container
        sx={() => ({
          textAlign: "left",
          ["@media (min-width: 1024px)"]: {
            textAlign: "center",
          },
        })}
      >
        <Box
          component="h1"
          sx={() => ({
            fontSize: "2.25rem",
            lineHeight: "2.5rem",
            fontWeight: 800,
            letterSpacing: "-.025em",
            textAlign: "left",
            ["@media (min-width: 640px)"]: {
              fontSize: "3rem",
              lineHeight: 1,
            },
            ["@media (min-width: 768px)"]: {
              fontSize: "4rem",
              lineHeight: 1,
            },
            ["@media (min-width: 1024px)"]: {
              textAlign: "center",
            },
          })}
        >
          <Box>Build. Create. Innovate.</Box>
          <Box
            sx={{
              backgroundImage: "linear-gradient(to right, #09203F, #537895)",
              backgroundClip: "text",
              color: "transparent",
              lineHeight: 1.2,
              // FIX FOR SAFARI!
              paddingBottom: "0.1em",
            }}
          >
            with drag & drop
          </Box>
        </Box>
        <Box
          component="h1"
          sx={() => ({
            fontSize: "2.25rem",
            lineHeight: "2.5rem",
            fontWeight: 800,
            letterSpacing: "-.025em",
            textAlign: "left",
            ["@media (min-width: 640px)"]: {
              fontSize: "3rem",
              lineHeight: 1,
            },
            ["@media (min-width: 768px)"]: {
              fontSize: "4rem",
              lineHeight: 1,
            },
            ["@media (min-width: 1024px)"]: {
              textAlign: "center",
            },
          })}
        ></Box>
        <Text
          sx={() => ({
            fontSize: 24,
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[7],
            [BREAKPOINT]: {
              fontSize: 18,
            },
          })}
        >
          Your markdown, GitHub profiles, and brainstorms—effortlessly crafted.
        </Text>
        <Space h="lg" />
        <Group position="center">
          <Button
            component={NextLink}
            href="/editor"
            size="xl"
            variant="gradient"
            gradient={{
              from: "#614385",
              to: "#516395",
              deg: 105,
            }}
            sx={() => ({
              width: "100%",
              [theme.fn.largerThan("sm")]: {
                width: "auto",
              },
            })}
          >
            Get started
          </Button>
        </Group>
      </Container>
    </Container>
  );
}
