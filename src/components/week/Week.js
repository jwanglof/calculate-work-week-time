import React from "react";
import PropTypes from "prop-types";
import { mapObject } from "../../utils/objectUtils";
import { Col, Row } from "reactstrap";

export default function Week({ weekNumber, dateEntries }) {
  return (
    <div>
      <h1>Week-number: {weekNumber}</h1>
      {mapObject(dateEntries, (date, entries) => {
        return (
          <Row>
            <Col xs={12}>Date: {date}</Col>
            {entries.map(dateEntry => {
              return <Col xs={6}>{dateEntry.start}</Col>;
            })}
          </Row>
        );
      })}
    </div>
  );
}

Week.propTypes = {
  weekNumber: PropTypes.number.isRequired,
  dateEntries: PropTypes.object
};
