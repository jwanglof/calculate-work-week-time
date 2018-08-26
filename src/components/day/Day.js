import React from "react";
import PropTypes from "prop-types";

export default function Day({ dayDate }) {
  return <div key={dayDate}>{dayDate}</div>;
}

Day.propTypes = {
  dayDate: PropTypes.string.isRequired
};
