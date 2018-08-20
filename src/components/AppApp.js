import React from "react";
import "./App.css";
import { connect } from "react-redux";
import WorkWeek from "./work-week/WorkWeekRedux";
import Workspace from "./workspace/Workspace";
import { Col, Row } from "reactstrap";
import ApiToken from "./api-token/ApiToken";
import HoursInAWeek from "./hours-in-a-week/HoursInAWeek";
import StartDate from "./dates/Dates";
import { setEndDate, setStartDate } from "../actions/creators/dates";
import { fetchTimes } from "../services/toggleApi";
import { Button } from "reactstrap";

function AppApp({
  fetchTimes,
  workspaceId,
  apiToken,
  hoursInAWeek,
  startDate,
  endDate,
  toggle
}) {
  console.log(1111, toggle);
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

      {workspaceId && apiToken && hoursInAWeek && startDate && endDate ? (
        <Button color="success" block onClick={fetchTimes} type="submit">
          Fetch Times!
        </Button>
      ) : null}
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTimes: () => dispatch(fetchTimes())
  };
}

function mapStateToProps(state) {
  console.log("State:", state);
  return {
    workspaceId: state.workspace.workspaceId || null,
    apiToken: state.apiToken.apiToken || null,
    hoursInAWeek: state.hoursInAWeek.hoursInAWeek || null,
    startDate: state.dates.startDate || null,
    endDate: state.dates.endDate || null,
    toggle: state.toggle
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppApp);
