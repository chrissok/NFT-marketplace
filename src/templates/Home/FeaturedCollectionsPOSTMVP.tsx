"use client";
import Button from "@/components/Buttons/Button";
import SmallCardWithImage from "@/components/Cards/SmallCardWithImage";
import Dropdown from "@/components/Dropdown";
import Checkbox from "@/components/Inputs/Checkbox/Checkbox";
import ItemTabs from "@/components/Tabs/ItemTabs";
import {
  FEATURED_COLLECTION_FILTERS,
  FEATURED_COLLECTION_TABS,
} from "@/constants/Home/tabs";
import React, { useState } from "react";

function FeaturedCollections() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeFilterTab, setActiveFilterTab] = useState(0);

  return (
    <>
      <div className="mb-6 flex items-center font-header text-xl text-grey-lightest w-full justify-between">
        <div className="w-1/2 flex items-center">
          <h2 className="mr-5 lg:text-base md:text-sm sm:text-xs">
            Collections
          </h2>
          <ItemTabs
            tabs={FEATURED_COLLECTION_TABS}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="flex gap-6 mr-10">
          <ItemTabs
            tabs={FEATURED_COLLECTION_FILTERS}
            activeTab={activeFilterTab}
            setActiveTab={setActiveFilterTab}
            variant="SECONDARY"
          />
          <Dropdown label="Type">
            <div className="bg-grey-medium rounded-xl px-3 py-2 mt-2">
              <div className="flex items-center gap-2">
                <Checkbox />
                <p className="font-body text-grey-lightest text-base">VRM</p>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox />
                <p className="font-body text-grey-lightest text-base">Music</p>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox />
                <p className="font-body text-grey-lightest text-base">
                  Playground
                </p>
              </div>
            </div>
          </Dropdown>

          <Dropdown label="Chain">
            <div className="bg-grey-medium rounded-xl px-3 py-2 mt-2">
              <div className="flex items-center gap-2">
                <Checkbox />
                <p className="font-body text-grey-lightest pb-1 text-base">
                  ETH
                </p>
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
      <div
        className={`grid gap-6 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-4`}
      >
        {activeTab === 0 && (
          <>
            <SmallCardWithImage
              image="https://p325k7wa.twic.pics/high/dark-souls/dark-souls-1/00-page-setup/ds1_game-thumbnail.jpg?twic=v1/resize=450/step=10/quality=100"
              avatarName="Jhon Moe"
            />
            <SmallCardWithImage
              image="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2016/04/580168-dark-souls-3-analisis.jpg"
              avatarName="AmazingLee"
              avatarImg=""
            />
            <SmallCardWithImage
              image="https://p325k7wa.twic.pics/high/dark-souls/dark-souls-1/00-page-setup/ds1_game-thumbnail.jpg?twic=v1/resize=450/step=10/quality=100"
              avatarName="Susan Strong"
            />
            <SmallCardWithImage
              image="https://p325k7wa.twic.pics/high/dark-souls/dark-souls-1/00-page-setup/ds1_game-thumbnail.jpg?twic=v1/resize=450/step=10/quality=100"
              avatarName="Susan Strong"
            />
            <SmallCardWithImage
              image="https://p325k7wa.twic.pics/high/dark-souls/dark-souls-1/00-page-setup/ds1_game-thumbnail.jpg?twic=v1/resize=450/step=10/quality=100"
              avatarName="Susan Strong"
            />
            <SmallCardWithImage
              image="https://p325k7wa.twic.pics/high/dark-souls/dark-souls-1/00-page-setup/ds1_game-thumbnail.jpg?twic=v1/resize=450/step=10/quality=100"
              avatarName="Jhon Moe"
            />
            <SmallCardWithImage
              image="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2016/04/580168-dark-souls-3-analisis.jpg"
              avatarName="AmazingLee"
              avatarImg=""
            />
            <SmallCardWithImage
              image="https://p325k7wa.twic.pics/high/dark-souls/dark-souls-1/00-page-setup/ds1_game-thumbnail.jpg?twic=v1/resize=450/step=10/quality=100"
              avatarName="Susan Strong"
            />
            <SmallCardWithImage
              image="https://p325k7wa.twic.pics/high/dark-souls/dark-souls-1/00-page-setup/ds1_game-thumbnail.jpg?twic=v1/resize=450/step=10/quality=100"
              avatarName="Susan Strong"
            />
            <SmallCardWithImage
              image="https://p325k7wa.twic.pics/high/dark-souls/dark-souls-1/00-page-setup/ds1_game-thumbnail.jpg?twic=v1/resize=450/step=10/quality=100"
              avatarName="Susan Strong"
            />
          </>
        )}
        {activeTab === 1 && (
          <>
            <SmallCardWithImage
              image="https://p325k7wa.twic.pics/high/dark-souls/dark-souls-1/00-page-setup/ds1_game-thumbnail.jpg?twic=v1/resize=450/step=10/quality=100"
              avatarName="Jhon Moe"
            />
          </>
        )}
      </div>
      <div className="mx-auto mt-6">
        <Button text="Show More" />
      </div>
    </>
  );
}

export default FeaturedCollections;
