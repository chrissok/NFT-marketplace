"use client";

import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";

export type Tab = {
  name: string;
  link: string;
};

type TabsProps = {
  tabs: Tab[];
  onTabChange: Dispatch<SetStateAction<string>>;
};

function FeaturedTabs({ tabs, onTabChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (index: number, link: string) => {
    setActiveTab(index);
    onTabChange(link);
  };

  return (
    <ul className="flex p-5 bg-blur-dark-3 backdrop-blur-xl rounded-3xl">
      {tabs.map(({ name, link }, index) => (
        <li
          className={`w-1/4 mr-4 text-lg font-body relative ease-in-out duration-300 cursor-pointer ${activeTab === index ? "text-grey-light opacity-100" : "text-grey-normal opacity-20"}`}
          key={index}
          onClick={() => handleClick(index, link)}
        >
          <div className="flex items-center">
            <Image
              src={"/home/remove-example-img.png"}
              width={42}
              height={42}
              alt="collection thumbnail img"
            />
            <div className="flex flex-col w-full ml-2">
              <div className="flex items-center mb-2">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="8"
                    height="8"
                    transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 11.3135 6)"
                    fill="#5E9FF2"
                  />
                </svg>

                <p className="ml-2">{name}</p>
              </div>
              {activeTab === index && (
                <div className="bottom-0 left-0 right-0 h-1 bg-grey-light animate-slideIn rounded-lg opacity-100"></div>
              )}
              {activeTab !== index && (
                <div className="bottom-0 left-0 right-0 h-1 bg-grey-normal opacity-20 rounded-lg"></div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FeaturedTabs;
