import ButtonIcon from "@/components/Buttons/ButtonIcon";
import { IconEnum } from "@/constants/iconEnum";
import Image from "next/image";
import Link from "next/link";

function MyPlaygroundCard({
  name,
  onClick,
  img,
  href,
}: {
  name: string;
  onClick?: VoidFunction;
  img: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="relative rounded-lg overflow-hidden group cursor-pointer w-[310px] h-[200px]"
      onClick={onClick}
    >
      <div className="absolute rounded-lg">
        {img && (
          <Image
            alt="playground background"
            src={img}
            width={310}
            height={200}
            className="object-cover bg-blur-dark-6 blur-sm  rounded-[10%] w-[310px] h-[200px]"
          />
        )}
      </div>
      <div className="relative p-2 flex flex-col rounded-lg w-[310px] h-[200px] border border-white-3">
        <div className="absolute right-[5%] top-[7%] z-10">
          <ButtonIcon icon={IconEnum.ArrowRightBig} variant="MEDIUM" />
        </div>
        <div className="overflow-hidden rounded-lg">
          {img && (
            <Image
              alt="playground img"
              width={208}
              height={140}
              src={img}
              className="rounded-[5%] w-full h-[140px] object-cover select-none group-hover:scale-110 duration-300"
            />
          )}
        </div>
        <h2 className="font-header text-grey-lightest font-semibold text-sm m-2 select-none">
          {name}
        </h2>
      </div>
    </Link>
  );
}

export default MyPlaygroundCard;
