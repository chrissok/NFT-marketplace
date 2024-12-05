import type { Meta, StoryObj } from "@storybook/react";
import LargeButton from "./";
import { IconEnum } from "@/constants/iconEnum";

const meta: Meta<typeof LargeButton> = {
  title: "Components/Buttons/LargeButton",
  component: LargeButton,
};

export default meta;
type Story = StoryObj<typeof LargeButton>;

export const Primary: Story = {
  args: {
    text: "Primary",
    icon: IconEnum.Search,
  },
};

export const Secondary: Story = {
  args: {
    text: "Secondary",
    variant: "SECONDARY",
    icon: IconEnum.Search,
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
    icon: IconEnum.Search,
  },
};
