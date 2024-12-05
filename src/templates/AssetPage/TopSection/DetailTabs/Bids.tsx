"use client";
import Spinner from "@/components/Spinner";
import AcceptBidModal from "@/components/TransactionModal/AcceptBidModal";
import { columns, owner_columns } from "@/constants/AssetPage/table";
import { formatAddress, formatStringDecimals } from "@/utils/formatString";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import moment from "moment";
import { Key, useCallback, useEffect, useState } from "react";

function Bids({
  bids,
  nftData,
  thumbnail,
}: {
  bids: Bid[];
  nftData: NftElement;
  thumbnail: Thumbnail;
}) {
  const handleCopy = (text: string, columnKey: Key) => {
    navigator.clipboard.writeText(text);
  };
  const { address } = useWeb3ModalAccount();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure the client-side rendering matches with the server-side after hydration
    setIsClient(true);
  }, []);

  const isOwner = address === nftData.Owner;

  const [showModal, setShowModal] = useState(false);
  const [currentBid, setCurrentBid] = useState<Bid>();

  const handleAcceptBid = (bid: Bid) => {
    setShowModal(true);
    setCurrentBid(bid);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentBid(undefined);
  };

  const renderCell = useCallback((cell: Bid, columnKey: Key) => {
    const cellValue = cell[columnKey as keyof Bid];

    switch (columnKey) {
      case "UsdPrice":
        return <>{formatStringDecimals(cell.Price)} $</>;
      case "Price":
        return (
          <>
            {cellValue} {cell.CurrencySymbol}
          </>
        );
      case "BidId":
        return (
          <button
            onClick={() => handleAcceptBid(cell)}
            className="bg-green-darker text-green-bright cursor-pointer px-2 py-1 flex items-center rounded-md justify-between w-20 hover:bg-[#2B4A52] transition-colors duration-300"
          >
            <p>Accept</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M3.50061 8.5L8.50061 3.5"
                stroke="#2FD4A1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.50061 3.5H8.50061V8.5"
                stroke="#2FD4A1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        );
      case "Bidder":
        return (
          <div
            className="cursor-pointer flex items-center gap-1"
            onClick={() => handleCopy(cell.Bidder.Value, columnKey)}
          >
            <span>{formatAddress(cell.Bidder.Value)}</span>
          </div>
        );
      case "BidExpiry":
        const localExpiryDate = moment.utc(cell.BidExpiry).local();
        return <>{moment(localExpiryDate).format("L LT")}</>;
      case "DateOfBid":
        const localDateOfBid = moment.utc(cell.DateOfBid).local();
        return (
          <div className="flex rounded px-2 py-1 bg-black-lighter-2 text-grey-lightest text-sm xs:text-xs font-body items-center gap-1 justify-between w-28">
            {moment(localDateOfBid).startOf("day").fromNow()}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M3.5 8.5L8.5 3.5"
                stroke="#F1F7FA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.5 3.5H8.5V8.5"
                stroke="#F1F7FA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      default:
        return <>{cellValue}</>;
    }
  }, []);

  return (
    <>
      {currentBid && (
        <AcceptBidModal
          nft={nftData}
          img={thumbnail}
          order={currentBid}
          showModal={showModal}
          onClose={handleCloseModal}
        />
      )}
      {isClient ? (
        <Table
          aria-label="transactions-table"
          classNames={{
            wrapper: ["bg-black-lighter-1", "p-0", "rounded-lg"],
            th: [
              "bg-black-lighter-2",
              "text-grey-lightest",
              "opacity-60",
              "py-4",
              "font-body",
              "text-sm",
              "xs:text-xs",
              "rounded-t-lg",
              "xs:py-1",
            ],
            td: [
              "text-grey-lightest",
              "font-body",
              "text-sm",
              "xs:text-xs",
              "py-3",
              "4xs:max-lg:py-0",
            ],
          }}
        >
          <TableHeader columns={isOwner ? owner_columns : columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={bids}
            emptyContent={
              <div className="p-10 text-grey-lightest opacity-60 text-sm">
                No Bids to display
              </div>
            }
          >
            {(item) => (
              <TableRow key={item.BidId || 0}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
    </>
  );
}

export default Bids;
