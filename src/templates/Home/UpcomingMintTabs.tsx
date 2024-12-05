"use client";
import Carrousel from "@/components/Carrousel/Carrousel";
import ItemTabs from "@/components/Tabs/ItemTabs";
import { UPCOMING_MINT_TABS } from "@/constants/Home/tabs";
import { useState } from "react";

function UpcomingMintTabs({ items }: { items: any[] }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="mb-6 flex items-center font-header text-xl text-grey-lightest">
        <h2 className="mr-5">Collections</h2>
        <ItemTabs
          tabs={UPCOMING_MINT_TABS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="flex w-full">
        {activeTab === 0 && (
          <>
            <Carrousel items={items} />
          </>
        )}
        {activeTab === 1 && (
          <>
            <Carrousel items={items} />
          </>
        )}
      </div>
    </>
  );
}

export default UpcomingMintTabs;
