"use client";
export type ItemTab = {
  label: string;
  index: number;
};

type TabsProps = {
  tabs: ItemTab[];
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  activeTab: number;
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
    PRIMARY: "lg:text-base",
    SECONDARY: "lg:text-xs",
    SMALL: "lg:text-xs",
  },
  size: {
    PRIMARY: "lg:h-10 md:h-6 sm:h-6 lg:py-2 md:py-0 sm:py-0",
    SECONDARY: "lg:h-10 md:h-6 sm:h-6 lg:py-2 md:py-0 sm:py-0",
    SMALL: "lg:h-8 md:h-6 sm:h-6 lg:py-1 md:py-0 sm:py-0",
  },
};

const applyFirstAndLastTabBorder = (index: number, length: number) => {
  if (index === 0) return "rounded-l-lg";
  if (index === length - 1) return "rounded-r-lg";
};

function ItemTabs({
  tabs,
  setActiveTab,
  activeTab,
  variant = "PRIMARY",
}: TabsProps) {
  return (
    <div className="flex w-full items-center">
      <div className="">
        {tabs.map(({ label, index }) => (
          <button
            className={`font-header ml-1 px-5 ${variants.size[variant]}  ease-in-out duration-300 ${applyFirstAndLastTabBorder(index, tabs.length)}  ${activeTab === index ? variants.activeTabStyle[variant] : "bg-light-blur-5"} ${hoverTabStyle} group`}
            key={index}
            onClick={() => setActiveTab(index)}
          >
            <p
              className={`${variants.text[variant]} ${hoverTextStyle} md:text-xs sm:text-xs ease-in-out duration-300 ${activeTab === index ? variants.activeTabTextStyle[variant] : "text-grey-lightest opacity-40"}`}
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
