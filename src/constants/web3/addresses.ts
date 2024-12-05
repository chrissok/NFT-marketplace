const addresses: any = {
  RARIBLE_ERC20_PROXY: {
    SEPOLIA: "0xB8863180CAC2d0Ab665e5968C0De25298A1D8CEe",
    MAINNET: "0xB8863180CAC2d0Ab665e5968C0De25298A1D8CEe",
  },
  TOKENS: {
    SEPOLIA: {
      USDC: "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238",
      WETH: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
    },
    "Ethereum Mainnet": {
      USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      WETH: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    },
  },
};

export const getAddress = (
  type: string,
  env: string,
  currency?: string
): string => {
  if (currency) {
    return addresses[type]?.[env]?.[currency];
  }
  return addresses[type]?.[env];
};

export default addresses;
