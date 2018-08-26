import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import "react-day-picker/lib/style.css";
import { EVENT_NAME } from "./utils/constants";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import "bootstrap/dist/css/bootstrap.min.css";
import thunk from "redux-thunk";
import "./index.css";

window[EVENT_NAME] = new Event(EVENT_NAME);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk];
const store = createStore(
  rootReducer,
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
