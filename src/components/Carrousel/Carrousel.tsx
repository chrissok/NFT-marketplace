"use client";
import { useRef } from "react";
// import CardWithImage from "../Cards/CardWithImage";

type CarrouselProps = {
  text?: string;
  items?: string[];
};

export default function Carrousel({ items }: CarrouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: string) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 3 + 50
          : scrollLeft + clientWidth / 3 + 50;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col w-full pr-5 relative">
      <div className="flex absolute right-0 -top-[16%]">
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
      </div>
      <div
        className="w-full mt-5 flex pr-5 overflow-x-scroll justify-between gap-4"
        ref={carouselRef}
      >
        {items?.map((image, index) => (
          <div className="flex-shrink-0 ml-2" key={index}>
            {/* <CardWithImage
              image="https://p325k7wa.twic.pics/high/dark-souls/dark-souls-1/00-page-setup/ds1_game-thumbnail.jpg?twic=v1/resize=450/step=10/quality=100"
              avatarName="Jhon Moe"
              variantColorIndex={index % 3}
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
}
