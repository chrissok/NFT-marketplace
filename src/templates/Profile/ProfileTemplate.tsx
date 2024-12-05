import ItemTabs from "@/components/Tabs/ItemTabsSSR";
import ProfileHeader from "./ProfileHeader";
import { PROFILE_TABS } from "@/constants/Profile/profileTabs";
import ProfileItems from "./ProfileItems";
import {
  GetNftsBidsByOwner,
  getNftsByOwnerAndCollection,
} from "@/actions/IAS/marketplace";

async function ProfileTemplate({
  activeTab,
  address,
  isTestChain,
}: {
  activeTab: string;
  address: string;
  isTestChain: boolean;
}) {
  const nfts = await getNftsByOwnerAndCollection(address);
  const nftBids = await GetNftsBidsByOwner(address, isTestChain);

  return (
    <div className="px-8">
      <div className="mb-10">
        <ProfileHeader address={address} />
      </div>
      <div className="mx-auto w-fit">
        <ItemTabs tabs={PROFILE_TABS} activeTab={activeTab} variant="PRIMARY" />
      </div>
      <div className="grid grid-cols-3 2xl:grid-cols-2 noMinLg:grid-cols-1 mt-20 noMinLg:mt-10 gap-2 max-w-[1440px] mx-auto">
        {activeTab === "0" && <ProfileItems items={nfts} />}
        {activeTab === "1" && <ProfileItems items={nftBids} />}
      </div>
    </div>
  );
}

export default ProfileTemplate;
