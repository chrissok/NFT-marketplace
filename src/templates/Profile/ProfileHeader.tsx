import { formatAddress } from "@/utils/formatString";
import Image from "next/image";

function ProfileHeader({ address }: { address: string }) {
  return (
    <div className="relative w-full">
      <Image
        width={1380}
        height={382}
        alt="header profile bg"
        src="/profile/profile-header.png"
        className="w-full object-cover opacity-80 rounded-b-[60px] h-[382px] noMinLg:h-[200px]"
      />
      <div className="absolute rounded-tr-[400px] w-1/2 noMinLg:w-full noMinLg:border-transparent noMinLg:bg-transparent rounded-tl-[30px] bottom-0 noMinLg:-bottom-[15%] noMinLg:-left-[1%] left-[5%] border border-white-20 bg-white-3 noMinLg:backdrop-blur-none backdrop-blur-3xl py-16 px-11">
        <div className="flex flex-col font-header text-grey-lightest gap-y-8 font-semibold">
          <h3 className="text-xl noMinLg:text-l">Marketplace Dashboard</h3>
          <h3 className="text-4xl noMinLg:text-xl">{formatAddress(address)}</h3>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
