import TradingViewWidget, { Themes } from "react-tradingview-widget";

const TradingView = ({ticker}) => {
    return (
      <div class = "wrapper" style={{
            justifyContent: "center",
          }}>
        <div class="widget">
          <TradingViewWidget
            symbol={"NASDAQ:".concat(ticker)}
            locale="fr"
            width="980"
            height="610"
          />
        </div>
      </div>
    );
  };
  
  export default TradingView;