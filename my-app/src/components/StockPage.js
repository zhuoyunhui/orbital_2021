import { useState, useEffect, useContext } from "react";

function DisplayStock() {
  const [ticker, setTicker] = useState("");
  const [price, setPrice] = useState(0);
  const stockApi = `https://cloud.iexapis.com/stable/stock/${ticker}/quote/latestPrice?token=pk_0705469d87aa4650835b7e7c86e61296`;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch(stockApi)
      .then(res => res.json())
      .then(responseJson => {
        setPrice(responseJson);            
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


export default DisplayStock;

