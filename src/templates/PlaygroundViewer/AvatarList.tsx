import Button from "@/components/Buttons/Button";

function AvatarList({
  handleAvatarChange,
  avatars,
}: {
  handleAvatarChange: (url: string) => void;
  avatars: Avatar[];
}) {
  if (avatars.length <= 0)
    return (
      <div className="bg-black-lighter-1 p-5 z-20 rounded-xl flex flex-col gap-y-3">
        <p className="font-body text-sm text-grey-lightest">
          You do not own any Interoperable Avatar yet...
        </p>
      </div>
    );

  return (
    <div className="bg-black-lighter-1 p-5 z-20 rounded-xl flex flex-col gap-y-3">
      {avatars.map((avatar) => (
        <Button
          onClick={() => handleAvatarChange(avatar.AvatarElement.AvatarAsset)}
          key={avatar.AvatarElement.AvatarAsset}
          text={avatar.AvatarElement.NFTName}
        />
      ))}
    </div>
  );
}

export default AvatarList;
