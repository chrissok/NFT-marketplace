import Profile from "../Icons/standard/Profile";

export interface AvatarWithNameProps {
  avatarImg?: string;
  avatarName: string;
}

export default function AvatarWithName({
  avatarImg,
  avatarName,
}: AvatarWithNameProps) {
  return (
    <div className="flex mb-2 group/profile items-center">
      <div className="h-7 w-7 cursor-pointer">
        <Profile />
      </div>
      <div>
        <div className="text-sm xl:text-xs font-medium text-grey-lightest underline opacity-80 pb-2 group-hover/profile:text-blue-light ease-in-out duration-300 cursor-pointer">
          {avatarName}
        </div>
      </div>
    </div>
  );
}
