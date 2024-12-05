"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import { ReactNode } from "react";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "b1ee0b6bb9a9319f8ae0f639db36dc21";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const sepolia = {
  chainId: 11155111,
  name: "Sepolia test network",
  currency: "SepoliaETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: `${process.env.NEXT_PUBLIC_SEPOLIA_NODE_RPC}`,
};

// 3. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "http://localhost:3000/", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet, sepolia],
  projectId,
});

export function Web3Modal({ children }: { children: ReactNode }) {
  return children;
}
