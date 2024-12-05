import LargeButton from "@/components/Buttons/LargeButton";
import { IconEnum } from "@/constants/iconEnum";
import Link from "next/link";

function Playgrounds() {
  return (
    <div className="overflow-hidden rounded-3xl relative mx-auto max-w-[1380px]">
      <div
        className="absolute bg-white-3 rounded-3xl flex flex-col p-14 noMinLg:p-4 z-50 
			backdrop-blur-md top-[25%] left-[26%] gap-6 w-1/2 border border-white-3 min-w-[500px]
			 noMinLg:min-w-[200px] xs:w-1/2 xs:top-[5%] xs:left-[20%]"
      >
        <h1 className="text-3xl noMinLg:text-xl text-grey-lightest font-header">
          Explore Playgrounds
        </h1>
        <p className="font-body text-grey-light w-[80%] xs:w-full noMinLg:text-xs">
          Playgrounds are fully interoperable &quot;spaces&quot; in GLB file
          format. You can download and import a Playground to any compatible
          world or game engine.
        </p>
        <Link href={"/playgrounds"}>
          <LargeButton
            text="Explore Playgrounds"
            icon={IconEnum.ArrowRightBig}
          />
        </Link>
      </div>

      <video
        loop
        muted
        autoPlay
        controls={false}
        className="object-cover h-[541px] xs:h-[300px]"
      >
        <source src="/playgrounds/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Playgrounds;
