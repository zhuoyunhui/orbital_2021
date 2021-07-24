export async function Stockprice(ticker) {
  const stockApi = `https://cloud.iexapis.com/stable/stock/${ticker}/quote/latestPrice?token=pk_4421761e7af0413abdd6cf4cc5a9330a`;

  const fetcher = await fetch(stockApi);
  const response = await fetcher.json();


  return response;
}

