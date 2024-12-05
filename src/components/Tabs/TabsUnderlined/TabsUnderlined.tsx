"use client";

import Link from "next/link";
import React, { useState } from "react";

export type Tab = {
  name: string;
  link: string;
};

type TabsProps = {
  tabs: Tab[];
};

export default function TabsUnderlined({
  tabs = [{ name: "Collect", link: "/users" }],
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <ul className="flex flex-wrap text-sm font-medium text-center border-gray-700 text-gray-400">
      {tabs.map(({ name, link }, index) => (
        <li
          className={`mr-12 relative ${activeTab === index ? "text-gray-500" : "text-gray-400"}`}
          key={name}
        >
          <div className="flex mb-4 items-center">
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

            <Link
              href="#"
              aria-current="page"
              onClick={() => handleClick(index)}
              className="ml-2"
            >
              {name}
            </Link>
          </div>
          {activeTab === index && (
            <div className="bottom-0 left-0 right-0 h-1 bg-white animate-slideIn rounded-lg"></div>
          )}
          {activeTab !== index && (
            <div className="bottom-0 left-0 right-0 h-1 bg-gray-800 rounded-lg"></div>
          )}
        </li>
      ))}
    </ul>
  );
}
