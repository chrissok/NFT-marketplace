"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export type ItemTab = {
  label: string;
  index: number;
};

type TabsProps = {
  tabs: ItemTab[];
  activeTab: string;
  variant?: "PRIMARY" | "SECONDARY" | "SMALL";
};

const hoverTabStyle = "hover:bg-white-6";
const hoverTextStyle = "group-hover:text-grey-lightest group-hover:opacity-100";

const variants = {
  activeTabTextStyle: {
    PRIMARY: "text-blue-bright",
    SMALL: "text-blue-bright",
    SECONDARY: "text-grey-lightest",
  },
  activeTabStyle: {
    PRIMARY: "bg-blue-bright-10",
    SMALL: "bg-blue-bright-10",
    SECONDARY: "bg-white-10",
  },
  text: {
    PRIMARY: "text-base",
    SECONDARY: "text-xs",
    SMALL: "text-xs xs:text-[9px]",
  },
  size: {
    PRIMARY: "h-10 md:h-6 sm:h-6 py-2 md:py-0",
    SECONDARY: "h-10 md:h-6 sm:h-6 py-2 md:py-0",
    SMALL: "h-8 md:h-6 sm:h-6 py-1 3xl:px-2 2xl:px-1 xl:px-0 noMinLg:px-1",
  },
};

const applyFirstAndLastTabBorder = (index: number, length: number) => {
  if (index === 0) return "rounded-l-lg";
  if (index === length - 1) return "rounded-r-lg";
};

function ItemTabs({ tabs, activeTab, variant = "PRIMARY" }: TabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex w-full items-center">
      <div className="">
        {tabs.map(({ label, index }) => (
          <button
            className={`font-header ml-1 px-5 ${variants.size[variant]} ease-in-out duration-300 ${applyFirstAndLastTabBorder(index, tabs.length)}  ${activeTab === index.toString() ? variants.activeTabStyle[variant] : "bg-light-blur-5"} ${hoverTabStyle} group`}
            key={index}
            onClick={() =>
              router.push(
                pathname +
                  "?" +
                  createQueryString("activeTab", index.toString())
              )
            }
          >
            <p
              className={`${variants.text[variant]} ${hoverTextStyle} md:text-xs ease-in-out duration-300 ${activeTab === index.toString() ? variants.activeTabTextStyle[variant] : "text-grey-lightest opacity-40"}`}
            >
              {label}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ItemTabs;
