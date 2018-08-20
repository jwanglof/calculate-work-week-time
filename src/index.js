import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/AppApp";
import registerServiceWorker from "./registerServiceWorker";
import "react-day-picker/lib/style.css";
import { EVENT_NAME } from "./utils/constants";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import "bootstrap/dist/css/bootstrap.min.css";

window[EVENT_NAME] = new Event(EVENT_NAME);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// TODO Add thunk/saga so it's possible to make async-calls!
const middlewares = [];
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

ReactDOM.render(
  <div className="container">
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById("root")
);
registerServiceWorker();
