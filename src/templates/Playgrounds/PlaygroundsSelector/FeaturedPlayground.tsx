// import ButtonIcon from "@/components/Buttons/ButtonIcon";
import LargeButton from "@/components/Buttons/LargeButton";
// import ShopButton from "@/components/Buttons/ShopButton";
import { IconEnum } from "@/constants/iconEnum";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

function FeaturedPlayground({
  img,
  collectionId,
  name,
}: {
  img: string;
  collectionId: string;
  name: string;
}) {
  const [isVisible, setIsVisible] = useState(true); // Controls fade-in and fade-out
  const [currentImage, setCurrentImage] = useState(img); // Keeps track of the currently displayed image

  useEffect(() => {
    if (img !== currentImage) {
      // Step 1: Fade out the current image
      setIsVisible(false);

      // Step 2: After the fade-out transition is done (300ms), swap the image and fade it back in
      const timeoutId = setTimeout(() => {
        setCurrentImage(img); // Change to the new image
        setIsVisible(true); // Fade in the new image
      }, 300); // Match this with the fade-out duration (300ms)

      // Clean up the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [img, currentImage]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl ">
      <div
        className={`transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          alt="playground featured"
          width={1054}
          height={663}
          src={currentImage} // Display the current image, not the incoming one
          className="rounded-[5%] object-cover w-full h-[663px] xs:h-[300px] select-none hover:scale-110 duration-300"
        />
      </div>
      {/* <div className="absolute right-[2%] top-[5%] p-5 bg-blur-dark-60 backdrop-blur-xl font-body font-semibold text-xl xs:text-sm xs:p-2 rounded-xl text-grey-lightest">
        $122 USD // 0.15 ETH
      </div> */}

      <div className="absolute bottom-[5%] left-[2%] flex items-end w-[95%] justify-between gap-6 noMinLg:flex-col noMinLg:items-start">
        <div className="p-5 bg-blur-dark-60 backdrop-blur-xl font-body font-semibold text-xl rounded-xl max-w-[611px] flex flex-col gap-5 noMinLg:w-full">
          <div className="flex justify-between">
            <h3 className="font-header text-3xl xs:text-lg  text-grey-lightest">
              {name}
            </h3>
          </div>
          <div className="flex items-center justify-between gap-5 xs:flex-col">
            <Link
              href={`/playground-viewer/${collectionId}/0?type=playgroundCollection`}
              className="w-[275px] xs:w-[200px]"
            >
              <LargeButton text="Test Drive" icon={IconEnum.ArrowRight} />
            </Link>
            {/* <Link
              href={`/collection/${collectionId}`}
              className="w-[275px] xs:w-[200px]"
            >
              <ShopButton text="View In Store" />
            </Link> */}
          </div>
        </div>

        {/* <div className="bg-black-main rounded-xl flex flex-col p-5 w-[379px] gap-6 noMinLg:hidden">
          <div className="flex justify-center">
            <div className="px-2 py-1 flex bg-green-main rounded font-body text-grey-lightest items-center gap-1">
              <p className="font-semibold text-lg">5%</p>
              <p className="text-sm">Creator Royalties</p>
            </div>
          </div>

          <div className="bg-black-main flex justify-between">
            <div className="flex font-body text-grey-lightest gap-3 items-center">
              <ButtonIcon
                icon={IconEnum.sepolia}
                variant="MEDIUM"
                disableHover
              />
              <div className="flex flex-col">
                <p className="opacity-65 text-sm">Blockchain</p>
                <p className="font-semibold text-lg">Sepolia</p>
              </div>
            </div>
            <div className="bg-[#313741] w-[1px] h-[40px]"></div>
            <div className="flex font-body text-grey-lightest gap-3 items-center">
              <ButtonIcon
                icon={IconEnum.polygon}
                variant="MEDIUM"
                disableHover
              />
              <div className="flex flex-col">
                <p className="opacity-65 text-sm">Token Standard</p>
                <p className="font-semibold text-lg">ERC721</p>
              </div>
            </div>
          </div>
        </div>
				*/}
      </div>
    </div>
  );
}

export default FeaturedPlayground;
