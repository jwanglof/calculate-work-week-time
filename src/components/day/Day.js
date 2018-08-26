import React from "react";
import { differenceInSeconds, format, toDate } from "date-fns";
import { TIME_FORMAT } from "../../constants/dates";
import classnames from "classnames";
import { fancyTimeFormatFromSeconds } from "../../utils/timeUtils";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";

export default function Day({
  date,
  dateEntries,
  totalSecondsThisWeekCallback
}) {
  let totalSecondsThisDay = 0;
  let currentEntryIteration = 0;
  const totalEntries = dateEntries.length;

  return (
    <Card>
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
          // totalSecondsThisWeek += totalSecondsThisEntry;
          totalSecondsThisWeekCallback(totalSecondsThisEntry);

          const timeStart = format(toDate(entry.start), TIME_FORMAT);
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
}

// Day.propTypes = {
//   dayDate: PropTypes.string.isRequired
// };
