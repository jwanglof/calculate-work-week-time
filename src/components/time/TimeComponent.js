import React from "react";
import { differenceInSeconds } from "date-fns";
import { fancyTimeFormatFromSeconds } from "../../utils/timeUtils";
import { connect } from "react-redux";

function Time({ date, timeEntries }) {
  let hours = [];
  let totaltHours = 0;
  timeEntries.map(t => {
    console.log("Diff in secs:", differenceInSeconds(t.end, t.start));
    const hour = differenceInSeconds(t.end, t.start);
    hours.push(hour);
    totaltHours += hour;
  });

  return (
    <div key={date}>
      {hours.map((v, k) => (
        <div key={k}>{fancyTimeFormatFromSeconds(v)}</div>
      ))}
      Totalt: {fancyTimeFormatFromSeconds(totaltHours)}
    </div>
  );
}

export default connect()(Time);
