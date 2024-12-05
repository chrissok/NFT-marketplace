/* eslint-disable no-unused-vars */
type MintPhase = {
  name: string;
  per_wallet_minting_limit: number;
  price: number;
  active_from: number;
  active_to: number;
  phase_max_mint_supply: number;
  phase_Id: number;
  requires_whitelist: boolean;
};

type MintCollectionElement = {
  ActiveMintPhase: MintPhase;
  CollectionSize: number;
  TotalSupply: number;
  OwnerCount: number;
  ElementName: string;
  CollectionID: string;
  MintPhases: MintPhase[];
};

type ChainInfo = {
  IsTestnet: boolean;
  ChainName: string;
};

type CollectionElement = {
  ElementName: string;
  Id: {
    Chain: ChainInfo;
    Contract: string;
  };
  Type: number;
  Name: string;
  Description: string;
  CurrencySymbol: string;
  NameOverride: string;
  DescriptionOverride: string;
  HeroImageUrl: string;
  PrimaryAssetFileType: string;
  Likes: number;
  SocialUrls: {
    youtube: string;
    twitter: string;
    discord: string;
  };
  HighlightedNfts: string[];
  Verified: boolean;
  CreatorID: string;
  HeroAsset: string;
  SCABI: string;
  SCAddress: string;
  License: string;
  FloorPrice: string;
  RoyaltyPercentage: string;
  NumberOfOwners: string;
  NumberOfItems: string;
  NumberForSale: string;
};

type MintCollectionData = {
  MintCollectionElement: MintCollectionElement;
  CollectionElement: CollectionElement;
  IsMintingCollection: boolean;
};
