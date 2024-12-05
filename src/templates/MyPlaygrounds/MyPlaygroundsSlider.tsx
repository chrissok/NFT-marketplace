"use client";

import { useRef } from "react";
import MyPlaygroundCard from "./MyPlaygroundCard";
import Button from "@/components/Buttons/Button";
import Link from "next/link";

function MyPlaygroundsSlider({ playgrounds }: { playgrounds?: IAS_NFT[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: string) => {
    if (carouselRef.current) {
      const { scrollLeft } = carouselRef.current;
      const scrollTo =
        direction === "left" ? scrollLeft - 340 : scrollLeft + 329;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="rounded-[40px] flex-col p-10 bg-black-main w-[420px]  border border-white-10 shadow-[0px_4px_46.6px_0px_rgba(173,_114,_233,_0.14)]">
      <div className="flex justify-center mb-6">
        <h2 className="font-header text-grey-lightest text-xl">
          Your Playgrounds
        </h2>

        {playgrounds?.length && playgrounds?.length > 1 && (
          <div className="self-center">
            <button
              className="border p-3 rounded ml-4 border-gray-700 bg-gray-900"
              onClick={() => scroll("left")}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 3.488L0 6.832L9.196 10V8.152L0.66 5.292V5.028L9.196 2.168V0.32L0 3.488Z"
                  fill="#F1F7FA"
                />
              </svg>
            </button>

            <button
              className="border p-3 rounded ml-4 border-gray-700 bg-gray-900"
              onClick={() => scroll("right")}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 3.488V6.832L0.803999 10V8.152L9.34 5.292V5.028L0.803999 2.168V0.32L10 3.488Z"
                  fill="#F1F7FA"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div
        className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-black-main
						 scrollbar-track-black-lighter-2 w-full gap-5"
        ref={carouselRef}
      >
        {playgrounds?.length && playgrounds?.length > 0 ? (
          playgrounds.map((playground, index) => (
            <div className="w-fit" key={index}>
              <MyPlaygroundCard
                name={playground.NftElement?.NFTName}
                key={index}
                img={playground.ThumbnailElement?.LargeThumbnail?.url || ""}
                href={`/playground-viewer/${playground.NftElement.Chain.ChainName}:${playground.NftElement.Address}:${playground.NftElement.TokenNumber}/0?playgroundAsset=true`}
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-y-10">
            <p className="text-xl font-body text-grey-normal text-center">
              Looks like you do not own any Playgrounds yet
            </p>
            <div className="flex justify-center">
              <Link href="/playgrounds">
                <Button text="Explore Playgrounds" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPlaygroundsSlider;
