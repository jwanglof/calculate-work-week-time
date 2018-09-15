import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Row,
  UncontrolledCollapse
} from "reactstrap";
import {
  fancyTimeFormatFromSeconds,
  getSecondsFromHours
} from "../../utils/timeUtils";
import { mapObject } from "../../utils/objectUtils";
import { SESSION_STORAGE_WEEK_PREFIX } from "../../constants/sessionStorageKeys";
import { getSessionItem } from "../../utils/sessionStorageUtil";
import { differenceInSeconds } from "date-fns";
import { TimeHeader } from "./TimesHeader";
import { TimeFooter } from "./TimeFooter";
import { TimeBody } from "./TimeBody";
import classnames from "classnames";

function WorkWeek({ hoursInAWeek }) {
  let dataExist = false;

  const savedData = {};
  for (let i = 1; i < 53; i++) {
    const key = `${SESSION_STORAGE_WEEK_PREFIX}${i}`;
    const storageValues = getSessionItem(key);
    if (storageValues && Object.keys(storageValues).length) {
      dataExist = true;
      savedData[key] = storageValues;
    }
  }

  if (!dataExist) {
    return (
      <Row>
        <Col xs={12}>No Toggl-data yet</Col>
      </Row>
    );
  }
  const hoursInAWeekSeconds = getSecondsFromHours(hoursInAWeek);
  const elements = [];

  const getTotalSeconds = toggleEntries => {
    let totalSecondsThisWeek = 0;
    mapObject(toggleEntries, (date, arrayWithStartEndTime) => {
      const arrayTotalTimes = arrayWithStartEndTime.map(times =>
        differenceInSeconds(times.end, times.start)
      );
      totalSecondsThisWeek += arrayTotalTimes.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
    });
    return totalSecondsThisWeek;
  };

  const totalDataEntries = Object.keys(savedData).length;
  let currentIteration = 1;

  mapObject(savedData, (sessionKey, toggleEntries) => {
    const keys = Object.keys(toggleEntries);
    const firstDateEntry = keys[keys.length - 1];
    const lastDateEntry = keys[0];

    const totalSecondsThisWeek = getTotalSeconds(toggleEntries);
    const weekNumber = sessionKey.substring(
      SESSION_STORAGE_WEEK_PREFIX.length,
      sessionKey.length
    );

    elements.push(
      <Row
        key={sessionKey}
        className={classnames("week-container", {
          "mb-5": currentIteration !== totalDataEntries
        })}
      >
        <Col xs={5} md={3}>
          <h4>Week {weekNumber}</h4>
          <div className="text-smaller">
            {firstDateEntry} - {lastDateEntry}
          </div>
        </Col>
        <Col xs={7} md={9}>
          <div>Total {fancyTimeFormatFromSeconds(totalSecondsThisWeek)}</div>
          <div>
            Diff{" "}
            {fancyTimeFormatFromSeconds(
              totalSecondsThisWeek - hoursInAWeekSeconds
            )}
          </div>
        </Col>
        <Col xs={12}>
          <Button block outline color="primary" id={sessionKey}>
            Toggle details for week {weekNumber}
          </Button>
        </Col>
        <Col key={sessionKey} xs={12}>
          <UncontrolledCollapse toggler={sessionKey}>
            <CardGroup>
              {mapObject(toggleEntries, (date, dateEntries) => {
                const body = dateEntries.map((entry, i) => (
                  <TimeBody
                    key={i}
                    entry={entry}
                    lastTimeBody={i + 1 !== dateEntries.length}
                  />
                ));

                return (
                  <Card key={date}>
                    <TimeHeader date={date} />
                    <CardBody>{body}</CardBody>
                    <TimeFooter dateEntries={dateEntries} />
                  </Card>
                );
              })}
            </CardGroup>
          </UncontrolledCollapse>
        </Col>
      </Row>
    );

    currentIteration++;
  });

  return <div>{elements.map(e => e)}</div>;
}

function mapStateToProps(state) {
  return {
    hoursInAWeek: state.hoursInAWeek.hoursInAWeek || null
  };
}

export default connect(mapStateToProps)(WorkWeek);
