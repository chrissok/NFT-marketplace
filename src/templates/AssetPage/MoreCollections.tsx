"use client";
import SmallCardWithImage from "@/components/Cards/SmallCardWithImage";
import ItemTabs from "@/components/Tabs/ItemTabs";
import { MORE_COLLECTION_TABS } from "@/constants/AssetPage/moreCollections";

import React, { useState } from "react";

function MoreCollections() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="flex items-center w-full mb-6 px-8">
        <h2 className="mr-5 lg:text-xl md:text-sm sm:text-xs font-header text-grey-lightest flex-shrink-0">
          More Collections
        </h2>
        <ItemTabs
          tabs={MORE_COLLECTION_TABS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="flex px-8 gap-6 overflow-x-scroll">
        {activeTab === 0 && (
          <>
            <div className="min-w-56">
              <SmallCardWithImage
                image="https://p325k7wa.twic.pics/high/dark-souls/dark-souls-1/00-page-setup/ds1_game-thumbnail.jpg?twic=v1/resize=450/step=10/quality=100"
                avatarName="Jhon Moe"
              />
            </div>
            <div className="min-w-56">
              <SmallCardWithImage
                image="https://p325k7wa.twic.pics/high/dark-souls/dark-souls-1/00-page-setup/ds1_game-thumbnail.jpg?twic=v1/resize=450/step=10/quality=100"
                avatarName="Jhon Moe"
              />
            </div>
            <div className="min-w-56">
              <SmallCardWithImage
                image="https://p325k7wa.twic.pics/high/dark-souls/dark-souls-1/00-page-setup/ds1_game-thumbnail.jpg?twic=v1/resize=450/step=10/quality=100"
                avatarName="Jhon Moe"
              />
            </div>
            <div className="min-w-56">
              <SmallCardWithImage
                image="https://p325k7wa.twic.pics/high/dark-souls/dark-souls-1/00-page-setup/ds1_game-thumbnail.jpg?twic=v1/resize=450/step=10/quality=100"
                avatarName="Jhon Moe"
              />
            </div>
            <div className="min-w-56">
              <SmallCardWithImage
                image="https://p325k7wa.twic.pics/high/dark-souls/dark-souls-1/00-page-setup/ds1_game-thumbnail.jpg?twic=v1/resize=450/step=10/quality=100"
                avatarName="Jhon Moe"
              />
            </div>
            <div className="min-w-56">
              <SmallCardWithImage
                image="https://p325k7wa.twic.pics/high/dark-souls/dark-souls-1/00-page-setup/ds1_game-thumbnail.jpg?twic=v1/resize=450/step=10/quality=100"
                avatarName="Jhon Moe"
              />
            </div>
          </>
        )}
        {activeTab === 1 && (
          <>
            <div className="min-w-56">
              <SmallCardWithImage
                image="https://p325k7wa.twic.pics/high/dark-souls/dark-souls-1/00-page-setup/ds1_game-thumbnail.jpg?twic=v1/resize=450/step=10/quality=100"
                avatarName="Jhon Moe"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default MoreCollections;
