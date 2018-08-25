import React from "react";
import { connect } from "react-redux";
import { differenceInSeconds } from "date-fns";
import { Button, Col, Row } from "reactstrap";
import {
  fancyTimeFormatFromSeconds,
  getSecondsFromHours
} from "../../utils/timeUtils";
import { mapObject } from "../../utils/objectUtils";
import TimeComponent from "../time/TimeComponent";

function WorkWeek({ hoursInAWeek, toggl }) {
  if (toggl && !toggl.payload) {
    return (
      <Row>
        <Col xs={12}>No Toggl-data yet</Col>
      </Row>
    );
  }

  const countTotalHours = togglData => {
    let totalHours = 0;

    mapObject(togglData, (key, timeEntries) => {
      timeEntries.map(t => {
        totalHours += differenceInSeconds(t.end, t.start);
      });
    });

    return totalHours;
  };

  const totalTimeInSeconds = countTotalHours(toggl.payload);
  console.log(11122, totalTimeInSeconds);
  const amountOfOverTimeInSeconds =
    getSecondsFromHours(hoursInAWeek) - totalTimeInSeconds;
  console.log(amountOfOverTimeInSeconds);

  return (
    <Row>
      <Col xs={12}>
        {mapObject(toggl.payload, (key, value) => {
          return <TimeComponent key={key} date={key} timeEntries={value} />;
        })}
      </Col>
      <Col xs={12}>
        <div>
          Total time this week: {fancyTimeFormatFromSeconds(totalTimeInSeconds)}
        </div>
        <div>
          Diff against work-time:{" "}
          {fancyTimeFormatFromSeconds(Math.abs(amountOfOverTimeInSeconds))} (
          {Math.abs(amountOfOverTimeInSeconds)} seconds)
        </div>
        <div>
          <Button>Save!</Button>
        </div>
      </Col>
    </Row>
  );
}

function mapStateToProps(state) {
  return {
    hoursInAWeek: state.hoursInAWeek.hoursInAWeek || null,
    toggl: state.toggl
  };
}

export default connect(mapStateToProps)(WorkWeek);
