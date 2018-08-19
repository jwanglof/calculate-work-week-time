import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import "react-day-picker/lib/style.css";
import { EVENT_NAME } from "./utils/constants";

window[EVENT_NAME] = new Event(EVENT_NAME);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
