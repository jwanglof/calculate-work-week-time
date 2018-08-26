import React from "react";
import { differenceInSeconds } from "date-fns";
import { fancyTimeFormatFromSeconds } from "../../utils/timeUtils";
import { connect } from "react-redux";
import { mapObject } from "../../utils/objectUtils";

export function Time({ date, timeEntries }) {
  console.log(date);
  console.log(timeEntries);
  const timeKeys = Object.keys(timeEntries) || [];
  if (!timeKeys.length) {
    return <div>Invalid time-entries!</div>;
  }

  let totalSeconds = 0;

  mapObject(timeEntries, (key, value) => {
    console.log(key, value);
    value.map(time => {
      totalSeconds += differenceInSeconds(time.end, time.start);
    });
  });
  console.log("Totalt:", totalSeconds);
  console.log("Totalt:", fancyTimeFormatFromSeconds(totalSeconds));

  return <div key={date} />;
  // let hours = [];
  // let totaltHours = 0;
  // timeEntries.map(t => {
  //   console.log("Diff in secs:", differenceInSeconds(t.end, t.start));
  //   const hour = differenceInSeconds(t.end, t.start);
  //   hours.push(hour);
  //   totaltHours += hour;
  // });
  //
  // return (
  //   <div key={date}>
  //     {hours.map((v, k) => (
  //       <div key={k}>{fancyTimeFormatFromSeconds(v)}</div>
  //     ))}
  //     Totalt: {fancyTimeFormatFromSeconds(totaltHours)}
  //   </div>
  // );
}

export default connect()(Time);
