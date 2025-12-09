import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

AOS.init({
  once: true,
  duration: 1000,
});

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
