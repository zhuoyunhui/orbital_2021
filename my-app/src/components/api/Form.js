import React, { useState } from "react";
import { Form, Input, Button, Grid, Container } from "semantic-ui-react";

export const TickerForm = () => {
  const [stock, setStock] = useState("");
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const [stocks, setStocks] = useState("");
  // const [date, setDate] = useState();
  const [sample_size, setSample_size] = useState("");
  // const [emaused, setEmaused] = useState([]);
  const [batting_Avg, setBatting_Avg] = useState("");
  const [gainLossRatio, setGainLossRatio] = useState("");
  const [averageGain, setAverageGain] = useState("");
  const [averageLoss, setAverageLoss] = useState("");
  const [maxReturn, setMaxReturn] = useState("");
  const [maxLoss, setMaxLoss] = useState("");
  const [totalReturn, setTotalReturn] = useState("");
  const [command, setCommand] = useState([]);

  return (
    <>
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <Input
              placeholder="stock (eg. AAPL)"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Input
              placeholder="day (numeric)"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Input
              placeholder="month (numeric)"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Input
              placeholder="year (numeric)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Button
              onClick={async () => {
                const ticker = { stock, day, month, year };
                // const response =
                fetch("https://pypr-backtest.herokuapp.com/ticker", {
                  method: "POST",
                  action: "{{ url_for('ticker') }}",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(ticker),
                })
                  .then((resp) => resp.json())
                  .then((json) => {
                    console.log("response worked!");
                    console.log(ticker);
                    // onData(ticker);
                    setStock("");
                    setDay("");
                    setMonth("");
                    setYear("");

                    setStocks(json.stock);
                    // setDate(data.date);
                    setSample_size(json.sample_size);
                    // setEmaused(data.EMAs_used);
                    setBatting_Avg(json.Batting_Avg);
                    setGainLossRatio(json.GainLoss_ratio);
                    setAverageGain(json.Average_Gain);
                    setAverageLoss(json.Average_Loss);
                    setMaxReturn(json.Max_Return);
                    setMaxLoss(json.Max_Loss);
                    setTotalReturn(json.Total_return);
                    setCommand(json.Command);
                  });
                // const response = await fetch("/backtest?ticker=F", {
                //   method: "GET",
                // });

                // if (response.ok) {
                //   console.log("response worked!");
                //   console.log(ticker);

                // }
              }}
            >
              Backtest
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
      <Container style={{ marginTop: 40 }}>
        <Grid
          divided="vertically"
          style={{ marginTop: 20, fontFamily: "Quantico" }}
        >
          <Grid.Row columns={2} style={{ marginTop: 15 }}>
            <Grid.Column>
              <div className="command">
                <p>
                  {command.map((cmd) => (
                    <p>{cmd}, </p>
                  ))}
                </p>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="analysis">
                <p>The stock to backtest: {stocks}.</p>
                {/* <p>The date is {date}.</p> */}
                <p>The sample size: {sample_size}.</p>
                {/* <p>The EMAs used is {emaused}. </p> */}
                <p>Your Batting Average: {batting_Avg}.</p>
                <p>Your Gain-Loss Ratio: {gainLossRatio}.</p>
                <p>Your Average Gain: {averageGain}.</p>
                <p>Your Average Loss: {averageLoss}.</p>
                <p>The Maximum Return: {maxReturn}.</p>
                <p>Your Maximum Loss: {maxLoss}.</p>
                <p>Your Total Return: {totalReturn}.</p>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
};

export default TickerForm;
