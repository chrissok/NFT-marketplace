/* eslint-disable no-unused-vars */

type Asset = {
  MediaType: {
    Type: string;
    Element: string;
  };
  AssetLocation: string;
};

type ContentElement = {
  PrimaryAsset: number;
  ElementName: string;
  Assets: Asset[];
};

type NftCmsContent = {
  ElementName: string;
  Content: {
    id: string;
    likes: number;
    liked_wallets: string[];
  };
};

type ChainInfo = {
  IsTestnet: boolean;
  ChainName: "polygon" | "ethereum" | "sepolia";
};

type Attribute = {
  Key: string;
  Value: string;
  Rarity: string;
  Floor: string;
};

type Transfer = {
  From: string;
  To: string;
  BlockNumber: number;
  Quantity: number;
  Timestamp: string;
};

type SellOrder = {
  OrderId: string;
  CurrencySymbol: string;
  Price: string;
  UsdPrice: string;
  Seller: {
    Value: string;
  };
  DateOfOrder: Date;
  OrderExpiry: Date;
  NftId: {
    IdString: string;
  };
};

type Bid = {
  BidId: string;
  CurrencySymbol: string;
  Price: string;
  UsdPrice: string;
  Bidder: {
    Value: string;
  };
  DateOfBid: string;
  BidExpiry: string;
  NftId: {
    IdString: string;
  };
};

type MarketplaceListingElement = {
  ElementName: string;
  Transfers: Transfer[];
  Bids: Bid[];
  SellOrders: SellOrder[];
};

type Thumbnail = {
  id: string;
  url: string;
  width: number;
  height: number;
  cropStyle: number;
  fileFormat: string;
};

type Royalty = {
  Account: string;
  Value: string;
};

type NftElement = {
  Address: string;
  NFTName: string;
  Description: string;
  Attributes: Attribute[];
  Chain: ChainInfo;
  TokenNumber: string;
  TokenType: number;
  CollectionName: string;
  PrimaryAsset: number;
  ElementName: string;
  Creator: string;
  Owner: string;
  Assets: Asset[];
};

type IAS_NFT = {
  ThumbnailElement: {
    SmallThumbnail: Thumbnail;
    LargeThumbnail: Thumbnail;
    OtherThumbnails: Thumbnail[];
    ElementName: string;
  };
  MarketplaceInfoElement: MarketplaceInfoElement;
  NftElement: NftElement;
  ByNftCollectionMetadataElement?: NftCollectionMetadata;
};

type NftCollectionMetadata = {
  ElementName: string;
  FloorPrice: number;
  Royalty: Royalty;
  Volume: number;
  ListedForSale: boolean;
};

type MarketplaceInfoElement = {
  ElementName: string;
  LikeCount: number;
  SellOrders: SellOrder | null;
};

type SellOrder = {
  CurrencySymbol: string;
  DateOfOrder: string; // ISO date string
  NftId: {
    IdString: string;
    CollectionId: {
      // Define the structure of CollectionId here if you have it
    };
  };
  OrderExpiry: string; // ISO date string
  OrderId: string;
  Price: string; // Assuming string representation of the price
  Seller: {
    Value: string;
  };
  UsdPrice: string; // Assuming string representation of the price in USD
};

type CollectionId = {
  Chain: Chain;
  Contract: string;
};

type Creator = {
  Value: string;
};

type ProfileAvatarData = {
  image: string;
  name: string;
  type: string;
  description: string;
  price: number;
  volume: number;
  unit: string;
  blockchain: string;
  token_standard: string;
  creator: string;
};

type ProofResponse = {
  _id: string;
  walletAddress: string;
  proof: string[];
  phase: number;
  contractAddress: string;
  network: string;
};
