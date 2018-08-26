import React from "react";
import { connect } from "react-redux";
import { differenceInSeconds, format, toDate } from "date-fns";
import {
  Card,
  CardBody,
  CardFooter,
  CardGroup,
  CardHeader,
  Col,
  Row
} from "reactstrap";
import {
  fancyTimeFormatFromSeconds,
  getSecondsFromHours
} from "../../utils/timeUtils";
import { mapObject } from "../../utils/objectUtils";
import { SESSION_STORAGE_WEEK_PREFIX } from "../../constants/sessionStorageKeys";
import { getSessionItem } from "../../utils/sessionStorageUtil";
import { TIME_FORMAT } from "../../constants/dates";
import classnames from "classnames";

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

  mapObject(savedData, (sessionKey, toggleEntries) => {
    console.log(sessionKey, toggleEntries);
    let totalSecondsThisWeek = 0;
    elements.push(
      <div key={sessionKey} className="week-container mb-5">
        <Col key={sessionKey} xs={12}>
          <h4>
            {sessionKey} - {totalSecondsThisWeek}
          </h4>
          <CardGroup>
            {mapObject(toggleEntries, (date, dateEntries) => {
              console.log(date, dateEntries);
              let totalSecondsThisDay = 0;
              let currentEntryIteration = 0;
              const totalEntries = dateEntries.length;

              return (
                <Card key={date}>
                  <CardHeader className="p-1">
                    <blockquote className="blockquote text-center mb-0">
                      <kbd>Date</kbd>
                      <p className="mb-0 text-muted">{date}</p>
                    </blockquote>
                  </CardHeader>

                  <CardBody>
                    {dateEntries.map(entry => {
                      currentEntryIteration += 1;

                      const totalSecondsThisEntry = differenceInSeconds(
                        entry.end,
                        entry.start
                      );
                      totalSecondsThisDay += totalSecondsThisEntry;
                      totalSecondsThisWeek += totalSecondsThisEntry;

                      const timeStart = format(
                        toDate(entry.start),
                        TIME_FORMAT
                      );
                      const timeEnd = format(toDate(entry.end), TIME_FORMAT);

                      return (
                        <div
                          className={classnames({
                            "mb-3": currentEntryIteration !== totalEntries
                          })}
                          key={entry.end}
                        >
                          <div className="time-box-information">
                            <div className="card-date">Difference between</div>
                            {timeStart}
                          </div>
                          <div className="time-box-information">
                            <div className="card-date">and</div>
                            {timeEnd}
                          </div>
                          <div className="time-box-information">
                            <div className="card-date">is</div>
                            {fancyTimeFormatFromSeconds(totalSecondsThisEntry)}
                          </div>
                        </div>
                      );
                    })}
                  </CardBody>

                  <CardFooter className="p-1">
                    <blockquote className="blockquote text-center mb-0">
                      <p className="mb-0 text-muted">
                        {fancyTimeFormatFromSeconds(totalSecondsThisDay)}
                      </p>
                      <kbd>Total time</kbd>
                    </blockquote>
                  </CardFooter>
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
  return (
    <div>
      {/*Hej*/}
      {elements.map(e => e)}
    </div>
  );

  // const countTotalHours = togglData => {
  //   let totalHours = 0;
  //
  //   mapObject(togglData, (key, timeEntries) => {
  //     timeEntries.map(t => {
  //       totalHours += differenceInSeconds(t.end, t.start);
  //     });
  //   });
  //
  //   return totalHours;
  // };
  //
  // const totalTimeInSeconds = countTotalHours(savedData);
  // console.log(11122, totalTimeInSeconds);
  // const amountOfOverTimeInSeconds =
  //   getSecondsFromHours(hoursInAWeek) - totalTimeInSeconds;
  // console.log(amountOfOverTimeInSeconds);

  // return (
  //   <Row>
  //     <Col xs={12}>
  //       {mapObject(savedData, (key, value) => {
  //         return <TimeComponent key={key} date={key} timeEntries={value} />;
  //       })}
  //     </Col>
  //     <Col xs={12}>
  //       <div>
  //         Total time this week: {fancyTimeFormatFromSeconds(totalTimeInSeconds)}
  //       </div>
  //       <div>
  //         Diff against work-time:{" "}
  //         {fancyTimeFormatFromSeconds(Math.abs(amountOfOverTimeInSeconds))} (
  //         {Math.abs(amountOfOverTimeInSeconds)} seconds)
  //       </div>
  //       <div>
  //         <Button>Save!</Button>
  //       </div>
  //     </Col>
  //   </Row>
  // );
}

function mapStateToProps(state) {
  return {
    hoursInAWeek: state.hoursInAWeek.hoursInAWeek || null
  };
}

export default connect(mapStateToProps)(WorkWeek);
