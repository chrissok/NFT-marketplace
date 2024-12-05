"use client";

import SmallPlaygroundCard from "./SmallPlaygroundCard";
import FeaturedPlayground from "./FeaturedPlayground";
import { useState, useRef } from "react";

function PlaygroundsSelector({
  thumbnails,
  collectionId,
  name,
}: {
  thumbnails: FeaturedFile[];
  collectionId: string;
  name: string;
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null); // Properly typing the ref

  const handleSwap = (index: number) => {
    setImageIndex(index);
  };

  const scrollUp = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: -100, // Scroll up by 100px
        behavior: "smooth",
      });
    }
  };

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: 100, // Scroll down by 100px
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="p-5 bg-black-light flex flex-col rounded-3xl select-none shadow-[0_0_20px_10px_rgba(236,216,246,0.1)] border border-white-3">
        <div className="flex justify-between">
          <div className="flex gap-3 text-grey-lightest font-header text-2xl xs:text-xl items-center mb-5">
            <h2>Featured Playground</h2>
          </div>
        </div>
        <div className="flex gap-11">
          <div className="my-auto mx-auto w-[1054px]">
            <FeaturedPlayground
              img={thumbnails[imageIndex].Value}
              collectionId={collectionId}
              name={name}
            />
          </div>
          <div className="flex flex-col mx-auto h-[650px] noMinLg:hidden">
            <div className="mx-auto cursor-pointer mb-2" onClick={scrollUp}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-grey-normal"
              >
                <path d="M2.33463 11.0834L11.668 11.0834L7.0013 2.68337L2.33463 11.0834Z" />
              </svg>
            </div>

            <div
              ref={scrollRef}
              className="h-[620px] overflow-auto my-auto w-[222px] scrollbar-none r-2"
            >
              {thumbnails.map((thumbnail, index) => (
                <div className="mb-2" key={index}>
                  <SmallPlaygroundCard
                    onClick={() => handleSwap(index)}
                    img={thumbnail.Value}
                  />
                </div>
              ))}
            </div>

            <div className="mx-auto cursor-pointer" onClick={scrollDown}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-grey-normal"
              >
                <path d="M11.6654 2.91675L2.33203 2.91675L6.9987 11.3167L11.6654 2.91675Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlaygroundsSelector;
