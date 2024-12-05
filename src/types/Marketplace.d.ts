/* eslint-disable no-unused-vars */
type MarketplaceDetailsElement = {
  ElementName: string;
  Transfers: {
    From: string;
    To: string;
    BlockNumber: number;
    Quantity: number;
    Timestamp: string;
  }[];
  Bids: {
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
      CollectionId: {
        Chain: {
          IsTestnet: boolean;
          ChainName: string;
        };
        Contract: string;
      };
    };
  }[];
};

type MarketplaceTransactions = {
  MarketplaceDetailsElement: MarketplaceDetailsElement;
};
