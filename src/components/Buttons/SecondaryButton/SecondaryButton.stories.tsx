import type { Meta, StoryObj } from "@storybook/react";
import SecondaryButton from "./SecondaryButton";

const meta: Meta<typeof SecondaryButton> = {
  title: "Components/Buttons/SecondaryButton",
  component: SecondaryButton,
};

export default meta;
type Story = StoryObj<typeof SecondaryButton>;

export const Primary: Story = {
  args: {
    text: "Secondary",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};
