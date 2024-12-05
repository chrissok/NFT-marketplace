"use client";

import MyPlaygroundCard from "./MyPlaygroundCard";

function TestPlaygroundSlider({ href }: { href: string }) {
  return (
    <div
      className="w-[420px] xs:w-[370px] rounded-[40px] flex-col 
		p-10 xs:p-3 bg-black-main border border-white-10 shadow-[0px_4px_46.6px_0px_rgba(173,_114,_233,_0.14)]"
    >
      <div className="flex justify-center mb-6">
        <h2 className="font-header text-grey-lightest text-xl">
          Test Playground
        </h2>
      </div>
      <div
        className="flex justify-center overflow-x-auto scrollbar-thin scrollbar-thumb-black-main
						 scrollbar-track-black-lighter-2 gap-5 pb-1 rounded-lg w-[310px] mx-auto"
      >
        <div className="rounded-lg overflow-hidden">
          <MyPlaygroundCard
            name="Testing Playground"
            img="/my-playgrounds/default-playground.png"
            href={href}
          />
        </div>
      </div>
    </div>
  );
}

export default TestPlaygroundSlider;
