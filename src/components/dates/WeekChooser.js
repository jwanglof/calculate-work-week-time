import React from "react";
import { connect } from "react-redux";
import {
  setEndDate,
  setStartDate,
  setWeekNumber,
  weekSetSelectedDays
} from "../../actions/creators/dates";
import { DayPicker, DateUtils } from "react-day-picker";
import { Row } from "reactstrap";
import { addDays, lastDayOfWeek, startOfWeek } from "date-fns";

const WeekChooser = ({ selectedWeekDates, setSelectedWeekDays }) => {
  let disabledDays = {};
  // if (fromDate || toDate) {
  //   disabledDays = {
  //     after: new Date(2010, 1, 1),
  //     before: new Date(2050, 12, 31),
  //   };
  // }

  const getWeekRange = date => ({
    from: startOfWeek(date, { weekStartsOn: 1 }),
    to: lastDayOfWeek(date, { weekStartsOn: 1 })
  });

  const getWeekDays = weekStart => {
    const days = [weekStart];
    for (let i = 1; i < 7; i += 1) {
      days.push(addDays(weekStart, i));
    }
    return days;
  };

  const handleDayChange = date =>
    setSelectedWeekDays(getWeekDays(getWeekRange(date).from));

  const handleWeekClick = (weekNumber, days) => setSelectedWeekDays(days);

  const daysAreSelected = selectedWeekDates.length > 0;

  const modifiers = {
    selectedRange: daysAreSelected && {
      from: selectedWeekDates[0],
      to: selectedWeekDates[6]
    },
    selectedRangeStart: daysAreSelected && selectedWeekDates[0],
    selectedRangeEnd: daysAreSelected && selectedWeekDates[6]
  };

  return (
    <Row>
      <DayPicker
        selectedDays={daysAreSelected ? selectedWeekDates : null}
        showWeekNumbers
        showOutsideDays
        modifiers={modifiers}
        onDayClick={handleDayChange}
        onWeekClick={handleWeekClick}
        firstDayOfWeek={1}
        disabledDays={disabledDays}
      />
    </Row>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedWeekDays: selectedDays =>
      dispatch(weekSetSelectedDays(selectedDays))
  };
};

const mapStateToProps = state => {
  const props = {
    selectedWeekDates: []
  };
  if (state.dates && state.dates.weekSetSelectedDays) {
    props.selectedWeekDates = state.dates.weekSetSelectedDays;
  }
  return props;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekChooser);
