import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
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

class HoursInAWeek extends Component {
  SESSION_STORAGE_KEY = "hours-in-a-week";
  DEFAULT_HOURS_IN_A_WEEK = 37.5;

  constructor() {
    super();
    this.state = {
      hoursInAWeek: this.DEFAULT_HOURS_IN_A_WEEK
    };
  }

  componentDidMount() {
    const sessionValue = parseFloat(getSessionItem(this.SESSION_STORAGE_KEY));
    if (sessionValue) {
      this.setState({
        apiToken: sessionValue
      });
      this.props.setHoursInAWeek(sessionValue);
    }
  }

  setHoursInAWeek = () => {
    const { hoursInAWeek } = this.state;
    this.props.setHoursInAWeek(hoursInAWeek);
    setSessionItem(this.SESSION_STORAGE_KEY, hoursInAWeek);
  };

  onChange = event => {
    const { value } = event.target;
    this.setState({
      hoursInAWeek: parseFloat(value)
    });
  };

  changeButtonClick = () => {
    this.props.setHoursInAWeek(null);
    this.setState({
      hoursInAWeek: this.DEFAULT_HOURS_IN_A_WEEK
    });
  };

  render() {
    let { workspaceId, apiToken, hoursInAWeek } = this.props;
    if (!workspaceId && !apiToken) {
      return null;
    }

    if (!hoursInAWeek) {
      return (
        <Form>
          <FormGroup row>
            <Label for="hoursInAWeek" xs={5}>
              Hours in a week
            </Label>
            <Col xs={7}>
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
            <Col xs={8}>Hours in a week: {hoursInAWeek}</Col>
            <Col xs={4} className="float-right">
              <Button color="danger" size="sm" onClick={this.changeButtonClick}>
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
  console.log(state, state.hoursInAWeek);
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
