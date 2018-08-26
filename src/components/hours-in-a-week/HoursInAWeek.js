import React, { Component } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import { setHoursInAWeek } from "../../actions/creators/hoursInAWeek";
import { getSessionItem, setSessionItem } from "../../utils/sessionStorageUtil";
import { connect } from "react-redux";

class HoursInAWeek extends Component {
  SESSION_STORAGE_KEY = "hours-in-a-week";
  DEFAULT_HOURS_IN_A_WEEK = 37.5;

  constructor() {
    super();
    this.state = {
      hoursInAWeek: this.DEFAULT_HOURS_IN_A_WEEK,
      showForm: true
    };
  }

  componentDidMount() {
    const sessionValue = parseFloat(getSessionItem(this.SESSION_STORAGE_KEY));
    if (sessionValue) {
      this.setState({
        apiToken: sessionValue,
        showForm: false
      });
      this.props.setHoursInAWeek(sessionValue);
    }
  }

  setHoursInAWeek = () => {
    const { hoursInAWeek } = this.state;
    this.props.setHoursInAWeek(hoursInAWeek);
    setSessionItem(this.SESSION_STORAGE_KEY, hoursInAWeek);
    this.setState({
      showForm: false
    });
  };

  onChange = event => {
    const { value } = event.target;
    this.setState({
      hoursInAWeek: parseFloat(value)
    });
  };

  changeButtonClick = () => {
    this.setState({
      showForm: true
    });
  };

  render() {
    let { workspaceId, apiToken, hoursInAWeek } = this.props;
    if (!workspaceId || !apiToken) {
      return null;
    }

    if (this.state.showForm) {
      return (
        <Form>
          <FormGroup row>
            <Label for="hoursInAWeek" className="pt-0 pb-0" md={7} xs={12}>
              Hours in a week
              <small id="workspaceIdBlock" className="form-text text-muted m-0">
                Set how many hours your work week have (i.e. 37.5 if you have 37
                hours and 30 minutes work weeks).
              </small>
            </Label>
            <Col md={5} xs={12}>
              <Input
                type="number"
                name="hoursInAWeek"
                id="hoursInAWeek"
                placeholder="Hours in a week"
                value={this.state.hoursInAWeek}
                onChange={this.onChange}
                autoFocus
              />
            </Col>
          </FormGroup>
          <Button
            color="primary"
            block
            onClick={this.setHoursInAWeek}
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
            <Col xs={12}>Hours in a week: {hoursInAWeek}</Col>
            <Col xs={12}>
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
    setHoursInAWeek: hoursInAWeek => dispatch(setHoursInAWeek(hoursInAWeek))
  };
}

function mapStateToProps(state) {
  return {
    workspaceId: state.workspace.workspaceId || null,
    apiToken: state.apiToken.apiToken || null,
    hoursInAWeek: state.hoursInAWeek.hoursInAWeek || null
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HoursInAWeek);
