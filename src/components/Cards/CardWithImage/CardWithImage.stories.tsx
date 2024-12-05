import type { Meta, StoryObj } from "@storybook/react";
import CardWithImage from ".";

const meta: Meta<typeof CardWithImage> = {
  title: "Components/Cards/CardWithImage",
  component: CardWithImage,
  decorators: (Story) => <div className="w-1/3">{Story()}</div>,
};

export default meta;
type Story = StoryObj<typeof CardWithImage>;

export const Primary: Story = {
  args: {
    image:
      "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2016/04/580168-dark-souls-3-analisis.jpg?tf=3840x",
    variantColorIndex: 0,
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};
