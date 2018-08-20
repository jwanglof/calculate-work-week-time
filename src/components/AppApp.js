import React from "react";
import "./App.css";
import { connect } from "react-redux";
import WorkWeek from "./work-week/WorkWeekRedux";
import Workspace from "./workspace/Workspace";
import { Col, Row } from "reactstrap";
import ApiToken from "./api-token/ApiToken";
import HoursInAWeek from "./hours-in-a-week/HoursInAWeek";
import StartDate from "./dates/Dates";

function AppApp() {
  return (
    <div>
      <Row>
        <Col xs={12}>
          <h1 className="display-4">Summarize time from Toggl</h1>
        </Col>
      </Row>

      <Workspace />
      <ApiToken />
      <HoursInAWeek />
      <StartDate />

      <WorkWeek />
    </div>
  );
}

function mapStateToProps(state) {
  console.log("State:", state);
  return {};
}

export default connect(mapStateToProps)(AppApp);
