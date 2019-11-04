import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./i18next";
import Spinner from './components/layout/Spinner'

ReactDOM.render(
  <Suspense fallback={<Spinner />}>
    <App />
  </Suspense>,
  document.getElementById("root")
);
