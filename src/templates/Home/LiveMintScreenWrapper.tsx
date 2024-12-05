"use client";

import useScreenWidth from "@/hooks/useScreenSize";
import LiveMint from "./LiveMint";
import LiveMintMobile from "./LiveMintMobile";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

function LiveMintScreenWrapper({ mintData }: { mintData: MintCollectionData }) {
  const screenWidth = useScreenWidth();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    // Prevent rendering until client-side rendering is ready
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (screenWidth < 580) return <LiveMintMobile mintData={mintData} />;

  return <LiveMint mintData={mintData} />;
}

export default LiveMintScreenWrapper;
