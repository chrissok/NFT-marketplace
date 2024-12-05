import { IconEnum } from "@/constants/iconEnum";
import React from "react";
import ButtonIcon from "../ButtonIcon";
import Link from "next/link";

type SocialMediaTypes = "discord" | "youtube" | "instagram" | "twitter";

function SocialMediaButton({
  socialMedia,
  url,
}: {
  socialMedia: SocialMediaTypes;
  url: string;
}) {
  const styles: Record<SocialMediaTypes, string> = {
    discord: "!bg-[#5865F2] hover:!bg-[#7882FF]",
    twitter: "!bg-grey-lightest hover:!bg-[#C2D3D9]",
    youtube: "!bg-grey-lightest hover:!bg-[#C2D3D9]",
    instagram: "!bg-grey-lightest hover:!bg-[#C2D3D9]",
  };

  return (
    <Link href={url}>
      <ButtonIcon
        icon={IconEnum[socialMedia]}
        variant="MEDIUM"
        styles={styles[socialMedia]}
      />
    </Link>
  );
}

export default SocialMediaButton;
