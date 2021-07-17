import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";

export const TickerForm = ({ onData }) => {
  const [stock, setStock] = useState("");
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  return (
    <Form>
      <Form.Field>
        <Input
          placeholder="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </Form.Field>

      <Form.Group widths='equal'>
        <Form.Field>
          <Input
            placeholder="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            />
        </Form.Field>
        <Form.Field>
          <Input
          placeholder="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Input
            placeholder="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            />
        </Form.Field>
      </Form.Group>

      <Form.Field>
        <Button
          onClick={async () => {
            const ticker = { stock, day, month, year };
            const response = await fetch("/ticker", {
              method: "POST",
              action: "{{ url_for('ticker') }}",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(ticker),
            });

            if (response.ok) {
              console.log("response worked!");
              console.log(ticker)
              onData(ticker);
              setStock("");
              setDay("");
              setMonth("");
              setYear("");
            }
          }}
        >
          submit
        </Button>
      </Form.Field>
    </Form>
  );
};

export default TickerForm;
