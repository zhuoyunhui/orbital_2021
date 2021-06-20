import { useState, useEffect, useContext } from "react";

function DisplayStock() {
  const [ticker, setTicker] = useState("");
  const [price, setPrice] = useState(0);
  const stockApi = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=1min&apikey=S4R0MZJWIQJ6N0BB`;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch(stockApi)
      .then((res) => res.json())
      .then((responseJson) => {
        setPrice(
          responseJson["Time Series (1min)"][
            responseJson["Meta Data"]["3. Last Refreshed"]
          ]["4. close"]
        );
      })
      .catch(console.log);
  };

  //user friendly
  function GetForm(prop) {
    const { price } = prop;
    return <p>{price}</p>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Enter ticker symbol:</label>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
      <div>
        <GetForm price={price} />
      </div>
    </>
  );
}

// searchFetch = () => {
//     fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.inputValue}&apikey=${this.state.APIKey}`)
//     .then(res => res.json())
//     .then(searchdata =>
//     this.setState({ searchData: searchdata[“bestMatches”] }, () => console.log(this.state.searchData))
//     )
//     }

export default DisplayStock;
