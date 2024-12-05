import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Buttons/Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    text: "Primary",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export const Small: Story = {
  args: {
    text: "Secondary",
    variant: "SMALL",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export const Submit: Story = {
  args: {
    text: "Submit",
    variant: "SUBMIT",
  },
};
