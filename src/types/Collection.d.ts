/* eslint-disable no-unused-vars */

type SocialMediaTypes = "discord" | "youtube" | "instagram" | "twitter";

type SocialUrls = {
  [key in SocialMediaTypes]?: string;
};

type Royalty = {
  Account: string;
  Value: string;
};

type Chain = {
  IsTestnet: boolean;
  ChainName: "ethereum" | "polygon" | "sepolia";
};

type Id = {
  Chain: Chain;
  Contract: string;
};

type CollectionElement = {
  ElementName: string;
  Id: Id;
  Type: number;
  Name: string;
  Description: string;
  CurrencySymbol: string;
  NameOverride: string;
  DescriptionOverride: string;
  HeroImageUrl: string;
  PrimaryAssetFileType: string;
  Likes: number;
  SocialUrls: SocialUrls;
  HighlightedNfts: string[];
  Verified: boolean;
  CreatorID: string;
  HeroAsset: string;
  SCABI: string;
  SCAddress: string;
  License: string;
  FloorPrice: string;
  RoyaltyPercentage: string;
  NumberForSale: string;
  NumberOfItems: string;
  NumberOfOwners: string;
  Royalty: Royalty;
};

type Collection_IAS = {
  CollectionElement: CollectionElement;
};
