import React from "react";
import classnames from "classnames";
import { fancyTimeFormatFromSeconds } from "../../utils/timeUtils";
import { differenceInSeconds, format, toDate } from "date-fns";
import { TIME_FORMAT } from "../../constants/dates";
const nanoid = require("nanoid");

function buildTimeEntryEl(title, text) {
  return (
    <div key={nanoid()} className="time-box-information">
      <div className="card-date">{title}</div>
      {text}
    </div>
  );
}

export function TimeBody({ entry, lastTimeBody }) {
  const totalSecondsThisEntry = differenceInSeconds(entry.end, entry.start);

  const timeStart = format(toDate(entry.start), TIME_FORMAT);
  const timeEnd = format(toDate(entry.end), TIME_FORMAT);

  const ddd = [
    buildTimeEntryEl("Difference between", timeStart),
    buildTimeEntryEl("and", timeEnd),
    buildTimeEntryEl("is", fancyTimeFormatFromSeconds(totalSecondsThisEntry))
  ];

  return (
    <div
      className={classnames({
        "mb-3": lastTimeBody //(i + 1) !== dateEntries.length
      })}
      key={entry.end}
    >
      {ddd.map(e => e)}
    </div>
  );
}
