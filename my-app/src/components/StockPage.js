import { useState, useEffect, useContext } from "react";

function DisplayStock() {
    const [ticker, setTicker] = useState("");
    const stockApi = `https://cloud.iexapis.com/stable/stock/${ticker}/quote/latestPrice?token=pk_0705469d87aa4650835b7e7c86e61296`;

    const handleSubmit = (evt) => {
        evt.preventDefault();
    }

    //user friendly 
    function GetForm(prop) {
        const {ticker , stockApi} = prop;
        const [price, setPrice] = useState("");

        console.log(stockApi)

        useEffect(() => {
            fetch(stockApi)
                .then(res => res.json())
                .then(responseJson => {
                    setPrice(responseJson);
                    
            })
            .catch(console.log)
        })
        console.log(price);
        return (
            <p>{price}</p>
        )
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter ticker symbol: 
                </label>
                <input type="text" value={ticker} onChange={e => setTicker(e.target.value)}></input>
                <button type="submit">
                    Submit
                </button>
            </form>
            <div>
                <GetForm ticker={ticker} stockApi={stockApi}/>
            </div>
        </>
    )
}


export default DisplayStock;

