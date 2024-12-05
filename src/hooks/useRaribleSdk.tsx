"use client";

import { IRaribleSdk, createRaribleSdk } from "@rarible/sdk";
import { useState } from "react";

function useRaribleSdk() {
  const [sdk, setSdk] = useState<IRaribleSdk>();

  const connectRaribleSdk = async (signer: any) => {
    try {
      const raribleSdk = await createRaribleSdk(
        signer,
        `${process.env.NEXT_PUBLIC_ENV === "PROD" ? "prod" : "testnet"}`,
        {
          apiKey: process.env.NEXT_PUBLIC_RARIBLE_KEY,
        }
      );

      setSdk(raribleSdk);
    } catch (error) {
      throw new Error("Could not connect Rarible SDK" + error);
    }
  };

  return { sdk, connectRaribleSdk };
}

export default useRaribleSdk;
