"use client";
import Image from "next/image";
import Profile from "../Icons/standard/Profile";
import { useState } from "react";

export interface AvatarWithNameProps {
  avatarImg?: string;
  profileName: string;
  label: string;
}

export default function ProfileLabel({
  avatarImg,
  profileName,
  label,
}: AvatarWithNameProps) {
  const [copied, setCopied] = useState(false);

  const isLongAddress = profileName.length > 20;

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center group/profile gap-3">
      <div className="cursor-pointer">
        {avatarImg ? (
          <Image
            width={36}
            height={36}
            src={avatarImg}
            alt="profile thumbnail"
          />
        ) : (
          <Profile />
        )}
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="text-xs text-grey-lightest opacity-65">{label}</div>
        <div
          className="text-sm font-medium text-grey-lightest group-hover/profile:text-blue-light ease-in-out duration-300 cursor-pointer flex items-center relative"
          onClick={isLongAddress ? copyToClipboard : undefined}
        >
          {isLongAddress ? truncateAddress(profileName) : profileName}
          {copied && <span className="ml-2 text-xs">Copied!</span>}
        </div>
      </div>
    </div>
  );
}
