import Image from "next/image";

// import MyPlaygroundsWidget from "./MyPlaygroundsWidget";

async function TopSection() {
  return (
    <div className="flex w-full h-full pt-12 pb-4 xs:h-fit xs:pt-3">
      <div className="absolute w-full h-[70vh] noMax:h-[55vh] top-0 left-0 rounded-b-xl pointer-events-none">
        <Image
          alt="my playground background image"
          fill
          src="/playgrounds/bg.png"
          className="object-cover px-8 rounded-b-[5%] pointer-events-none"
        />
      </div>
      <div className="grid content-between w-full h-full gap-2 xs:gap-0">
        <div className="flex justify-between w-full"></div>
        <div className="flex relative justify-between xs:mr-5 noMinLg:flex-col">
          <div className="flex justify-between flex-col gap-5 bg-white-6 p-9 rounded-3xl backdrop-blur-lg border border-white-3 shadow-[0_0_20px_10px_rgba(236,216,246,0.1)]">
            <h3 className="font-header text-lg xs:text-base text-grey-lightest opacity-60 w-fit noMinLg:w-full">
              Mint your playground and take your game assets for a test drive.
            </h3>
            <h2 className="font-header text-4xl text-grey-light xs:text-xl">
              Player: Ready
            </h2>
            <h1 className="font-header text-6xl smallScreen:text-4xl xs:text-lg text-grey-lightest text-wrap">
              PLAYGROUNDS
            </h1>
          </div>
          {/* <MyPlaygroundsWidget /> */}
        </div>
      </div>
    </div>
  );
}

export default TopSection;
