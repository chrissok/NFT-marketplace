export async function convertFromUSD<T extends string>(
  chain: T,
  amount: string
): Promise<number> {
  const res = await fetch(
    `https://api.coinconvert.net/convert/usd/${"eth"}?amount=${amount}`,
    { next: { revalidate: 40 } }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();
  // to do use chain var when IAS returns currency correctly
  return data["ETH"];
}

export async function convertToUSD<T extends string>(
  chain: T,
  amount: string
): Promise<number> {
  const res = await fetch(
    `https://api.coinconvert.net/convert/eth/usd?amount=${amount}`,
    { next: { revalidate: 40 } }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();
  // to do use chain var when IAS returns currency correctly
  return data["USD"];
}
