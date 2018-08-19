import React from "react";
import "./App.css";
import { connect } from "react-redux";
import WorkWeek from "./work-week/WorkWeekRedux";
import Workspace from "./workspace/Workspace";

function AppApp() {
  return (
    <div>
      Hej!
      <Workspace />
      <WorkWeek />
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(AppApp);
