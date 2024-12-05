import ProfileItem from "./ProfileItem";
import { v4 as uuidv4 } from "uuid";

function ProfileItems({ items }: { items: IAS_NFT[] }) {
  if (items.length === 0) {
    return (
      <p className="text-xl font-body text-grey-normal">No Assets found</p>
    );
  }
  return items.map((item) => <ProfileItem item={item} key={uuidv4()} />);
}

export default ProfileItems;
