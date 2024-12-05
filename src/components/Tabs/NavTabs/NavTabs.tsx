"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Import the hook

type TabsProps = {
  tabs: Tab[];
};

function NavTabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    const activeIndex = tabs.findIndex(({ link }) => pathname === link);
    if (activeIndex !== -1) {
      setActiveTab(activeIndex);
    } else {
      setActiveTab(null);
    }
  }, [pathname, tabs]);

  const handleClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <ul className="flex flex-wrap text-sm font-medium text-center border-gray-700 text-grey-normal 4xs:max-lg:text-xs">
      {tabs.map(({ name, link }, index) => (
        <li
          className={`mr-12 noMinLg:mr-2 relative ease-in-out duration-300 hover:text-grey-lightest ${
            activeTab === index ? "text-blue-light" : "text-grey-normal"
          }`}
          key={name}
        >
          <Link
            href={link}
            aria-current="page"
            onClick={() => handleClick(index)}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NavTabs;
