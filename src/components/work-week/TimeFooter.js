import { differenceInSeconds } from "date-fns";
import { CardFooter } from "reactstrap";
import { fancyTimeFormatFromSeconds } from "../../utils/timeUtils";
import React from "react";

export function TimeFooter({ dateEntries }) {
  const totalSecondsThisDayy = dateEntries
    .map(entry => differenceInSeconds(entry.end, entry.start))
    .reduce((max, cur) => max + cur);

  return (
    <CardFooter className="p-1">
      <blockquote className="blockquote text-center mb-0">
        <p className="mb-0 text-muted">
          {fancyTimeFormatFromSeconds(totalSecondsThisDayy)}
        </p>
        <kbd>Total time</kbd>
      </blockquote>
    </CardFooter>
  );
}
