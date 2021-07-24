export async function Closingprice(ticker, yString) {

    const closingApi = `https://cloud.iexapis.com/stable/stock/${ticker}/chart/date/${yString}?token=pk_4421761e7af0413abdd6cf4cc5a9330a`;

    const fetcher = await fetch(closingApi);
    const response = await fetcher.json();

    return response[response.length - 1].marketClose;

}