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
import { setApiToken } from "../../actions/creators/apiToken";
import { getSessionItem, setSessionItem } from "../../utils/sessionStorageUtil";
import { connect } from "react-redux";

class ApiToken extends Component {
  SESSION_STORAGE_KEY = "api-token";

  constructor() {
    super();
    this.state = {
      apiToken: ""
    };
  }

  componentDidMount() {
    const sessionValue = getSessionItem(this.SESSION_STORAGE_KEY);
    if (sessionValue) {
      this.setState({
        apiToken: sessionValue
      });
      this.props.setApiToken(sessionValue);
    }
  }

  setApiToken = () => {
    const { apiToken } = this.state;
    this.props.setApiToken(apiToken);
    setSessionItem(this.SESSION_STORAGE_KEY, apiToken);
  };

  onChange = event => {
    const { value } = event.target;
    this.setState({
      apiToken: value
    });
  };

  changeButtonClick = () => {
    this.props.setApiToken("");
    this.setState({
      apiToken: ""
    });
  };

  render() {
    let { apiToken } = this.props;

    if (!apiToken) {
      return (
        <Form>
          <FormGroup row>
            <Label for="apiToken" xs={5}>
              API token
              <small id="apiTokenBlock" className="form-text text-muted">
                Enter your private API token from Toggl. Get it{" "}
                <a href="https://toggl.com/app/profile" target="_blank">
                  here
                </a>{" "}
                (find "API token"), and paste it into the input.
              </small>
            </Label>
            <Col xs={7}>
              <Input
                type="text"
                name="apiToken"
                id="apiToken"
                placeholder="API token"
                value={this.state.apiToken}
                onChange={this.onChange}
                autoFocus
              />
            </Col>
          </FormGroup>
          <Button
            color="primary"
            block
            onClick={this.setApiToken}
            type="submit"
            disabled={!this.state.apiToken.length}
          >
            Next step
          </Button>
        </Form>
      );
    } else {
      return (
        <Alert>
          <Row>
            <Col xs={12} className="text-truncate">
              API token: {apiToken}
            </Col>
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
    setApiToken: apiToken => dispatch(setApiToken(apiToken))
  };
}

function mapStateToProps(state) {
  return {
    apiToken: state.apiToken.apiToken || null
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiToken);
