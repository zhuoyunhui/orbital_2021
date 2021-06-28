import TradingViewWidget, { Themes } from "react-tradingview-widget";

const TradingView = ({ ticker }) => {
  return (
    <div
      class="wrapper"
      style={{
        justifyContent: "center",
      }}
    >
      <div>
        <TradingViewWidget
          symbol={"NASDAQ:".concat(ticker)}
          // theme={Themes.DARK}
          locale="fr"
          width="980"
          height="610"
        />
      </div>
    </div>
  );
};

export default TradingView;
