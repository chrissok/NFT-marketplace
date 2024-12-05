import ItemTabs from "@/components/Tabs/ItemTabsSSR";
import { DETAIL_TABS } from "@/constants/AssetPage/detailsTabs";
import InGameStats from "./DetailTabs/InGameStats";
import CreatorInfo from "./DetailTabs/CreatorInfo";
import BlockchainData from "./DetailTabs/BlockchainData";
import Bids from "./DetailTabs/Bids";
import Traits from "./DetailTabs/Traits";
import { getNftBidsTransfers, getNFTDataByID } from "@/actions/IAS/marketplace";
import { getCollectionDataByID } from "@/actions/IAS/collection";

async function Details({ activeTab, id }: { activeTab: string; id: string }) {
  const nft = await getNFTDataByID(id);
  const collection = await getCollectionDataByID(id);
  let transactions: MarketplaceTransactions;
  let transactionsError = false;

  try {
    transactions = await getNftBidsTransfers(id);
  } catch (error) {
    transactionsError = true;
  }

  const renderTabs = (tab: string) => {
    switch (tab) {
      case "0":
        return <Traits traits={nft.NftElement.Attributes} />;
      case "1":
        return <InGameStats nft={nft} collection={collection} />;
      case "2":
        return <CreatorInfo nft={nft} collection={collection} />;
      case "3":
        return (
          <BlockchainData
            tokenStandard={nft.NftElement.TokenType}
            chainName={nft.NftElement.Chain.ChainName}
            contractAddress={nft.NftElement.Address}
          />
        );
      case "4":
        return (
          <>
            {transactionsError ? (
              <div className="bg-white-6 border border-white-3 rounded-lg p-5 text-center">
                <p className="text-red-main font-body text-sm">No bids found</p>
              </div>
            ) : (
              <Bids
                bids={transactions.MarketplaceDetailsElement.Bids || []}
                nftData={nft.NftElement}
                thumbnail={nft.ThumbnailElement?.LargeThumbnail}
              />
            )}
          </>
        );
    }
  };

  return (
    <div className="py-16 px-8 xs:px-1 xs:py-6">
      <ItemTabs tabs={DETAIL_TABS} activeTab={activeTab} variant="SMALL" />
      <div className="mt-10">{renderTabs(activeTab)}</div>
    </div>
  );
}

export default Details;
