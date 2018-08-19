import React, { Component } from "react";
import "./App.css";
import { DateUtils } from "react-day-picker";
import { connect } from "react-redux";

class AppApp extends Component {
  DATE_FORMAT = "yyyy-MM-dd";

  constructor() {
    super();
  }

  render() {
    return <div>Hej!</div>;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(AppApp);
