"use client";
import React, { useState } from "react";
import Image from "next/image";
import ExpandableCard from "./ExpandableCard";

function FreeMintPlayground() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <div className="">
      <div className="flex gap-3 text-grey-lightest font-header text-2xl items-center mb-5">
        <div className="bg-[rgba(115,_212,_70,_0.20)] rounded-lg px-5 py-2 flex items-center gap-3">
          <Image
            alt="premium-logo"
            width={32}
            height={21}
            src={"/playgrounds/free-icon.png"}
            className="object-cover w-full h-[21px]"
          />
          <h2>Free</h2>
        </div>
        <h2>Mint</h2>
      </div>

      <div className="flex gap-6">
        <ExpandableCard
          isExpanded={expandedCard === 0}
          onHover={() => setExpandedCard(expandedCard === 0 ? null : 0)}
          onMouseLeave={() => setExpandedCard(null)}
        />
        <ExpandableCard
          isExpanded={expandedCard === 1}
          onHover={() => setExpandedCard(expandedCard === 1 ? null : 1)}
          onMouseLeave={() => setExpandedCard(null)}
        />
      </div>
    </div>
  );
}

export default FreeMintPlayground;
