import type { Meta, StoryObj } from "@storybook/react";
import ButtonIcon from "./ButtonIcon";
import { IconEnum } from "@/constants/iconEnum";

const meta: Meta<typeof ButtonIcon> = {
  title: "Components/Buttons/ButtonIcon",
  component: ButtonIcon,
  argTypes: { icon: IconEnum },
};

export default meta;
type Story = StoryObj<typeof ButtonIcon>;

export const Medium: Story = {
  args: {
    icon: IconEnum.Search,
    variant: "MEDIUM",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};
export const Big: Story = {
  args: {
    icon: IconEnum.ArrowRightBig,
    variant: "BIG",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};
