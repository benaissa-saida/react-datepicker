import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { DatePicker } from "./lib";

const App = () => (
  <div style={{ width: 640, margin: "15px auto" }}>
    <DatePicker />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
