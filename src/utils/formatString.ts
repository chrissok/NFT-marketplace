export const formatAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export function formatStringDecimals(value: string): string {
  const num = parseFloat(value);
  return num.toFixed(3);
}
