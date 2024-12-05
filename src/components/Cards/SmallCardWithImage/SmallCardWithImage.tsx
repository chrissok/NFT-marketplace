import { AvatarWithNameProps } from "@/components/Avatar/AvatarWithName";
import ButtonIcon from "@/components/Buttons/ButtonIcon";
import { IconEnum } from "@/constants/iconEnum";
import Image from "next/image";

export interface SmallCardWithImageProps extends AvatarWithNameProps {
  image: string;
}

function SmallCardWithImage({
  image,
  avatarImg,
  avatarName,
}: SmallCardWithImageProps) {
  return (
    <div className="w-full rounded-lg p-3 bg-white-3 backdrop-blur-lg border border-white-10 lg:max-h-80 lg:h-80 group">
      <div className="relative w-full lg:h-[70%] md:h-[50%] overflow-hidden">
        <Image
          src={image}
          alt="image"
          width={100}
          height={100}
          className="w-full rounded-md h-full object-cover transition ease-in-out group-hover:scale-110 duration-300"
          priority
        />

        <div className="absolute top-2 p-1 left-2 bg-blur-dark-6 rounded-md backdrop-blur-sm border-2 border-blur-dark-20">
          <div className="font-body text-grey-lightest font-semibold">
            23.365
          </div>
        </div>

        <ButtonIcon
          icon={IconEnum.ArrowRight}
          variant="MEDIUM"
          styles="!bg-black-main group-hover:!bg-black-lighter-2 absolute top-2 right-2 backdrop-blur-sm"
        />
      </div>

      <div className="flex w-full flex-col mt-3 h-1/4">
        <div className="font-header font-bold text-base text-grey-lightest md:text-center lg:text-left">
          The First Collection
        </div>

        <div className="flex justify-between items-center p-2 rounded-md r my-2 bg-white-3 h-10 text-xs">
          <div className="flex flex-col">
            <div className="font-body text-grey-lightest font-normal opacity-65">
              Floor
            </div>
            <div className="font-body text-grey-lightest font-semibold">
              Opening
            </div>
          </div>

          <div className="inline-block w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"></div>

          <div className="flex flex-col">
            <div className="font-body text-grey-lightest font-normal opacity-75">
              Volume
            </div>
            <div className="font-body text-grey-lightest font-semibold">
              13 ETH
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmallCardWithImage;
