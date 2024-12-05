import type { Meta, StoryObj } from "@storybook/react";
import SmallCardWithImage from ".";

const meta: Meta<typeof SmallCardWithImage> = {
  title: "Components/Cards/SmallCardWithImage",
  component: SmallCardWithImage,
  decorators: (Story) => <div className="w-1/6">{Story()}</div>,
};

export default meta;
type Story = StoryObj<typeof SmallCardWithImage>;

export const Primary: Story = {
  args: {
    image:
      "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2016/04/580168-dark-souls-3-analisis.jpg?tf=3840x",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};
