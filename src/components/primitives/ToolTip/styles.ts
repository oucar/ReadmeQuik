import { cva } from "class-variance-authority";
import { ExtractClass, Component } from "~/types";

// cva: class-variance-authority
// ExtractClass: Extracts the class from the styles object
// Component: A generic component type
// ToolTipStyleProps: The props for the ToolTip component
export const toolTipStyles = cva(["tooltip"], {
  variants: {
    direction: {
      default: "",
      bottom: "tooltip-bottom",
      left: "tooltip-left",
      right: "tooltip-right",
    },
    scheme: {
      default: "",
      primary: "tooltip-primary",
      secondary: "tooltip-secondary",
      accent: "tooltip-accent",
      info: "tooltip-info",
      success: "tooltip-success",
      warning: "tooltip-warning",
      error: "tooltip-error",
    },
    forceOpen: {
      true: "tooltip-open",
    },
  },
});

export type ToolTipStyleProps = Component<"div"> &
  ExtractClass<typeof toolTipStyles>;
