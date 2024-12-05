import type { Meta, StoryObj } from "@storybook/react";
import ItemTabs from ".";
import { useState } from "react";

const tabs = [
  { label: "First Tab", index: 0 },
  { label: "Second Tab", index: 1 },
];

const meta: Meta<typeof ItemTabs> = {
  title: "Components/Tabs/ItemTabs",
  component: ItemTabs,
};

export default meta;
type Story = StoryObj<typeof ItemTabs>;

const ItemTabsWithState = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <ItemTabs
        tabs={tabs}
        activeTab={activeIndex}
        setActiveTab={setActiveIndex}
      />
      {activeIndex}
    </>
  );
};

export const Primary: Story = {
  render: () => <ItemTabsWithState />,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};
