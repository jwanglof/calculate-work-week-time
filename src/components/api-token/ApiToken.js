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
import { fetchWorkspaces } from "../../services/toggleApi";

class ApiToken extends Component {
  SESSION_STORAGE_KEY = "api-token";

  constructor() {
    super();
    this.state = {
      apiToken: "",
      showForm: true
    };
  }

  componentDidMount() {
    const sessionValue = getSessionItem(this.SESSION_STORAGE_KEY);
    if (sessionValue) {
      this.setState({
        apiToken: sessionValue,
        showForm: false
      });
      this.props.setApiToken(sessionValue);
    }
  }

  setApiToken = event => {
    event.preventDefault();

    const { apiToken } = this.state;
    const propsApiToken = this.props.apiToken;
    if (apiToken !== propsApiToken) {
      this.props.setApiToken(apiToken);
      this.props.fetchWorkspaces();
      setSessionItem(this.SESSION_STORAGE_KEY, apiToken);
    }
    this.setState({
      showForm: false
    });
  };

  onChange = event => {
    const { value } = event.target;
    this.setState({
      apiToken: value
    });
  };

  changeButtonClick = () => {
    this.setState({
      showForm: true
    });
  };

  render() {
    let { apiToken } = this.props;

    if (this.state.showForm) {
      return (
        <Form>
          <FormGroup row>
            <Label for="workspaceId" className="pt-0 pb-0" md={5} xs={12}>
              API token
              <small id="apiTokenBlock" className="form-text text-muted m-0">
                Enter your private API token from Toggl. Copy it{" "}
                <a href="https://toggl.com/app/profile" target="_blank">
                  here
                </a>{" "}
                (find "API token"), and paste it into the input.
              </small>
            </Label>
            <Col md={7} xs={12}>
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
    setApiToken: apiToken => dispatch(setApiToken(apiToken)),
    fetchWorkspaces: () => dispatch(fetchWorkspaces())
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
