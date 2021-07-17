// performance dashboard
import React, { useState, useEffect } from "react";
import { TickerForm } from "../api/Form"
import { Container } from 'semantic-ui-react'
import "./PageBacktest.css";


const PageBacktest = () => {

  const [stocks, setStocks] = useState();
  const [date, setDate] = useState();
  const [sample_size, setSample_size] = useState();
  const [emaused, setEmaused] = useState([]);
  const [batting_Avg, setBatting_Avg] = useState();
  const [gainLossRatio, setGainLossRatio] = useState();
  const [averageGain, setAverageGain] = useState();
  const [averageLoss, setAverageLoss] = useState();
  const [maxReturn, setMaxReturn] = useState();
  const [maxLoss, setMaxLoss] = useState();
  const [totalReturn, setTotalReturn] = useState(0);

  // TickerForm: User input of ticker
  const [ticker, setTicker] = useState();
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  // go to backtest.py and get the result

  useEffect(() => {
    fetch(
      `http://localhost:5000/backtest?ticker=${ticker}&day=${day}&month=${month}&year=${year}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("useEffect");
        setStocks(data.stock);
        setDate(data.date);
        setSample_size(data.sample_size);
        setEmaused(data.EMAs_used);
        setBatting_Avg(data.Batting_Avg);
        setGainLossRatio(data.GainLoss_ratio);
        setAverageGain(data.Average_Gain);
        setAverageLoss(data.Average_Loss);
        setMaxReturn(data.Max_Return);
        setMaxLoss(data.Max_Loss);
        setTotalReturn(data.Total_return);
      });
  }, [ticker, day, month, year]);

  return (
      <>
      <Container>
        <TickerForm
                    onData={(ticker) => {
                    setTicker(ticker["stock"]);
                    setDay(ticker["day"]);
                    setMonth(ticker["month"]);
                    setYear(ticker["year"]);
                    }}
                />
            <div className="App">
                <p>The stock is {stocks}.</p>
                <p>The date is {date}.</p>
                <p>The sample_size is {sample_size}.</p>
                <p>The EMAs used is {emaused}.</p>
                <p>The batting_Avg is {batting_Avg}.</p>
                <p>The gainLossRatio used is {gainLossRatio}.</p>
                <p>The average gain is {averageGain}.</p>
                <p>The averageLoss is {averageLoss}.</p>
                <p>The maxReturn is {maxReturn}.</p>
                <p>The maxLoss is {maxLoss}.</p>
                <p>The totalReturn is {totalReturn}.</p>
            </div>
      </Container>
        
      </>
  );
};

export default PageBacktest;
