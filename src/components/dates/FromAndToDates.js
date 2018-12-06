import React from "react";
import { connect } from "react-redux";
import { setFromDate, setToDate } from "../../actions/creators/dates";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../constants/dates";
import dateFnsParse from "date-fns/parse";
import { DateUtils } from "react-day-picker";
import dateFnsFormat from "date-fns/format";

import { Col, Row } from "reactstrap";

const FromAndToDates = ({ setFromDate, setToDate }) => {
  const FORMAT = "YYYY-MM-dd";

  const handleBetweenFromChange = day => setFromDate(format(day, DATE_FORMAT));
  const handleBetweenToChange = day => setToDate(format(day, DATE_FORMAT));
  const formatDate = (date, format, locale) =>
    dateFnsFormat(date, format, { locale });

  const parseDate = (str, format, locale) => {
    const parsed = dateFnsParse(str, format, { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  };

  return (
    <Row>
      <Col xs={2}>From:</Col>
      <Col xs={10}>
        <DayPickerInput
          format={FORMAT}
          formatDate={formatDate}
          parseDate={parseDate}
          onDayChange={handleBetweenFromChange}
          placeholder="From"
        />
      </Col>
      <Col xs={2}>To:</Col>
      <Col xs={10}>
        <DayPickerInput
          format={FORMAT}
          formatDate={formatDate}
          parseDate={parseDate}
          onDayChange={handleBetweenToChange}
          placeholder="To"
        />
      </Col>
    </Row>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setFromDate: fromDate => dispatch(setFromDate(fromDate)),
    setToDate: toDate => dispatch(setToDate(toDate))
  };
};

// const mapStateToProps = state => {
//   return state;
// };

export default connect(
  null,
  mapDispatchToProps
)(FromAndToDates);
