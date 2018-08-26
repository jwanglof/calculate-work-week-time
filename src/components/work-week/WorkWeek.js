import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, CardGroup, Col, Row } from "reactstrap";
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

function WorkWeek({ hoursInAWeek }) {
  let dataExist = false;

  const savedData = {};
  for (let i = 1; i < 53; i++) {
    const key = `${SESSION_STORAGE_WEEK_PREFIX}${i}`;
    const storageValues = getSessionItem(key);
    if (storageValues && Object.keys(storageValues).length) {
      console.log(key, "exist in session-storage!");
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

  mapObject(savedData, (sessionKey, toggleEntries) => {
    const totalSecondsThisWeek = getTotalSeconds(toggleEntries);

    elements.push(
      <div key={sessionKey} className="week-container mb-5">
        <Col key={sessionKey} xs={12}>
          <h4>{sessionKey}</h4>
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
        </Col>
        <Col xs={6}>
          Total time: {fancyTimeFormatFromSeconds(totalSecondsThisWeek)}
        </Col>
        <Col xs={6}>
          Diff:{" "}
          {fancyTimeFormatFromSeconds(
            totalSecondsThisWeek - hoursInAWeekSeconds
          )}
        </Col>
      </div>
    );
  });

  return <div>{elements.map(e => e)}</div>;
}

function mapStateToProps(state) {
  return {
    hoursInAWeek: state.hoursInAWeek.hoursInAWeek || null
  };
}

export default connect(mapStateToProps)(WorkWeek);
