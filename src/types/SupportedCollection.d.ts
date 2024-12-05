/* eslint-disable no-unused-vars */
type SupportedCollection = {
  CollectionId: string;
  Chain: {
    IsTestnet: boolean;
    ChainName: string;
  };
  ContractAddress: {
    Value: string;
  };
};
