export async function Closingprice(ticker, yString) {
    const closingApi = `https://cloud.iexapis.com/stable/stock/${ticker}/chart/date/${yString}?token=pk_0705469d87aa4650835b7e7c86e61296`;

    const fetcher = await fetch(closingApi);
    const response = await fetcher.json();

    return response[response.length - 1].marketClose;


}