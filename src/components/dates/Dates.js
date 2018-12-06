import React, { Component } from "react";
import { Alert, Button, Col, Form, FormGroup, Label, Row } from "reactstrap";
import { DateUtils, DayPicker } from "react-day-picker";
import { connect } from "react-redux";
import FromAndToDates from "./FromAndToDates";
import WeekChooser from "./WeekChooser";
import { setShowDateView } from "../../actions/creators/views";

class Dates extends Component {
  // SESSION_STORAGE_KEY_START = "start-time-yyyy-MM-dd";
  // SESSION_STORAGE_KEY_END = "end-time-yyyy-MM-dd";
  // SESSION_STORAGE_WEEK_NUMBER = "week-number";
  // SESSION_STORAGE_KEY_FROM_DATE = "from-date-yyyy-MM-dd";
  // SESSION_STORAGE_KEY_TO_DATE = "to-date-yyyy-MM-dd";

  setDates = event => {
    event.preventDefault();
    this.props.setShowDateView(false);
  };

  changeButtonClick = () => this.props.setShowDateView(true);

  render() {
    let { workspace, apiToken, hoursInAWeek, dates, showDateView } = this.props;
    if (
      !Object.keys(workspace.currentWorkspace).length ||
      !apiToken ||
      !hoursInAWeek
    ) {
      return null;
    }

    if (showDateView) {
      return (
        <Form>
          <FormGroup>
            <Row>
              <Label for="startDate" md={4} xs={12}>
                Between dates
              </Label>
              <Label for="" md={4} xs={12}>
                From and to dates
              </Label>
            </Row>
            <Row>
              <Col md={4} xs={12}>
                <WeekChooser />
              </Col>
              <Col md={4} xs={12}>
                <FromAndToDates />
              </Col>
            </Row>
          </FormGroup>
          <Button
            color="primary"
            block
            onClick={this.setDates}
            // disabled={!selectedDays.length}
            type="button"
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

function mapStateToProps(state) {
  return {
    workspace: state.workspace,
    apiToken: state.apiToken.apiToken || null,
    hoursInAWeek: state.hoursInAWeek.hoursInAWeek || null,
    dates: state.dates,
    showDateView: state.views && state.views.showDateView
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setShowDateView: showView => dispatch(setShowDateView(showView))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dates);
