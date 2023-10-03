import React, { StrictMode, useState } from "react";
import ReactDOM from "react-dom/client";
import { DatePicker } from "./lib";

const App = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div style={{ width: 640, margin: "15px auto" }}>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
