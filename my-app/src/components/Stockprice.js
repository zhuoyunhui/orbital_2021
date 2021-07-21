export async function Stockprice(ticker) {
  const stockApi = `https://cloud.iexapis.com/stable/stock/${ticker}/quote/latestPrice?token=pk_0705469d87aa4650835b7e7c86e61296`;

  const fetcher = await fetch(stockApi);
  const response = await fetcher.json();


  return response;
}

