import React, { Component } from "react";
import { Alert, Button, Col, Form, FormGroup, Label, Row } from "reactstrap";
import { getSessionItem, setSessionItem } from "../../utils/sessionStorageUtil";
import {
  addDays,
  format,
  lastDayOfWeek,
  parse,
  startOfWeek,
  getISOWeek
} from "date-fns";
import {
  setEndDate,
  setStartDate,
  setWeekNumber
} from "../../actions/creators/dates";
import { DateUtils, DayPicker } from "react-day-picker";
import { connect } from "react-redux";

class Dates extends Component {
  SESSION_STORAGE_KEY_START = "start-time-yyyy-MM-dd";
  SESSION_STORAGE_KEY_END = "end-time-yyyy-MM-dd";
  SESSION_STORAGE_WEEK_NUMBER = "week-number";
  DATE_FORMAT = "yyyy-MM-dd";
  state = {
    hoverRange: undefined,
    selectedDays: [],
    weekNumber: 0
  };

  componentDidMount() {
    const startSessionValue = getSessionItem(this.SESSION_STORAGE_KEY_START);
    if (startSessionValue) {
      const endSessionValue = getSessionItem(this.SESSION_STORAGE_KEY_END);
      const weekNumberValue = getSessionItem(this.SESSION_STORAGE_WEEK_NUMBER);

      const startDate = parse(startSessionValue, this.DATE_FORMAT, new Date());

      this.props.setStartDate(startSessionValue);
      this.props.setEndDate(endSessionValue);
      this.props.setWeekNumber(weekNumberValue);
      this.setState({
        selectedDays: this.getWeekDays(startDate),
        weekNumber: weekNumberValue
      });
    }
  }

  setDates = event => {
    event.preventDefault();
    const { selectedDays } = this.state;
    const startDate = format(selectedDays[0], this.DATE_FORMAT);
    const endDate = format(
      selectedDays[selectedDays.length - 1],
      this.DATE_FORMAT
    );
    const weekNumber = getISOWeek(selectedDays[0]);
    console.log(444, selectedDays);
    console.log(5555, weekNumber);

    setSessionItem(this.SESSION_STORAGE_KEY_START, startDate);
    setSessionItem(this.SESSION_STORAGE_KEY_END, endDate);
    setSessionItem(this.SESSION_STORAGE_WEEK_NUMBER, weekNumber);

    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
    this.props.setWeekNumber(weekNumber);
  };

  changeButtonClick = () => {
    this.props.setStartDate(null);
    this.props.setEndDate(null);
    this.props.setWeekNumber(null);
  };

  getWeekDays = weekStart => {
    const days = [weekStart];
    for (let i = 1; i < 7; i += 1) {
      days.push(addDays(weekStart, i));
    }
    return days;
  };

  getWeekRange = date => {
    const from = startOfWeek(date, { weekStartsOn: 1 });
    const to = lastDayOfWeek(date, { weekStartsOn: 1 });
    return { from, to };
  };

  handleDayChange = date => {
    this.setState({
      selectedDays: this.getWeekDays(this.getWeekRange(date).from)
    });
  };

  handleDayEnter = date => {
    this.setState({
      hoverRange: this.getWeekRange(date)
    });
  };

  handleWeekClick = (weekNumber, days) => {
    this.setState({
      selectedDays: days
    });
  };

  handleDayLeave = () => {
    this.setState({
      hoverRange: undefined
    });
  };

  render() {
    let { workspaceId, apiToken, hoursInAWeek, dates } = this.props;
    if (!workspaceId || !apiToken || !hoursInAWeek) {
      return null;
    }

    const { hoverRange, selectedDays } = this.state;
    const daysAreSelected = selectedDays.length > 0;

    const modifiers = {
      hoverRange,
      selectedRange: daysAreSelected && {
        from: selectedDays[0],
        to: selectedDays[6]
      },
      hoverRangeStart: hoverRange && hoverRange.from,
      hoverRangeEnd: hoverRange && hoverRange.to,
      selectedRangeStart: daysAreSelected && selectedDays[0],
      selectedRangeEnd: daysAreSelected && selectedDays[6]
    };

    if (!dates.startDate && !dates.endDate) {
      return (
        <Form>
          <FormGroup row>
            <Label for="startDate" xs={12}>
              Between dates
            </Label>
            <Col xs={12}>
              <DayPicker
                selectedDays={selectedDays}
                showWeekNumbers
                showOutsideDays
                modifiers={modifiers}
                onDayClick={this.handleDayChange}
                onDayMouseEnter={this.handleDayEnter}
                onDayMouseLeave={this.handleDayLeave}
                onWeekClick={this.handleWeekClick}
                firstDayOfWeek={1}
              />
            </Col>
          </FormGroup>
          <Button
            color="primary"
            block
            onClick={this.setDates}
            disabled={!selectedDays.length}
            type="submit"
          >
            Next step
          </Button>
        </Form>
      );
    } else {
      return (
        <Alert>
          <Row>
            <Col xs={12}>
              Between {dates.startDate} and {dates.endDate} (week:{" "}
              {dates.weekNumber})
            </Col>
            <Col xs={12} className="float-right">
              <Button
                color="danger"
                size="sm"
                block
                onClick={this.changeButtonClick}
              >
                Change
              </Button>
            </Col>
          </Row>
        </Alert>
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setStartDate: startDate => dispatch(setStartDate(startDate)),
    setEndDate: endDate => dispatch(setEndDate(endDate)),
    setWeekNumber: weekNumber => dispatch(setWeekNumber(weekNumber))
  };
}

function mapStateToProps(state) {
  return {
    workspaceId: state.workspace.workspaceId || null,
    apiToken: state.apiToken.apiToken || null,
    hoursInAWeek: state.hoursInAWeek.hoursInAWeek || null,
    dates: state.dates
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dates);
