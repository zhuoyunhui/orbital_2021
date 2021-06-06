import { useState, useEffect, useContext } from "react";

function DisplayStock() {
    const [ticker, setTicker] = useState("");
    const stockApi = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=1min&apikey=S4R0MZJWIQJ6N0BB`;

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
                    // console.log(ticker)
                    // console.log({price})
                    // console.log(responseJson['Time Series (1min)'][responseJson['Meta Data']['3. Last Refreshed']]['4. close'])
                    setPrice(responseJson['Time Series (1min)'][responseJson['Meta Data']['3. Last Refreshed']]['4. close']);
                    
                    // const time = responseJson['Meta Data']['3. Last Refreshed']
                    // setPrice(responseJson['Time Series (1min)'][time]['4. close'])
                    
                    // const lastRefreshed = responseJson['Meta Data']['3. Last Refreshed'];
                    // console.log(responseJson['Time Series (1min)'][lastRefreshed]['4. close'])
                //     setnewTicker({
                //         stockPrice: responseJson['Time Series (1min)'][lastRefreshed]['4. close']
                //     }, function(){
                // });
            })
            .catch(console.log)
        })
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

// searchFetch = () => {
//     fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.inputValue}&apikey=${this.state.APIKey}`)
//     .then(res => res.json())
//     .then(searchdata =>
//     this.setState({ searchData: searchdata[“bestMatches”] }, () => console.log(this.state.searchData))
//     )
//     }

export default DisplayStock;
