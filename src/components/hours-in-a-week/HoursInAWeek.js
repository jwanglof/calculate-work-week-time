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
import { setApiToken } from "../../actions/creators/apiToken";

class HoursInAWeek extends Component {
  constructor() {
    super();
    this.state = {
      apiToken: ""
    };
  }

  setApiToken = () => {
    const { apiToken } = this.state;
    this.props.setApiToken(apiToken);
  };

  onChange = event => {
    const { value } = event.target;
    this.setState({
      apiToken: value
    });
  };

  changeButtonClick = () => {
    this.props.setWorkspaceId("");
    this.setState({
      workspaceId: ""
    });
  };

  render() {
    let { workspaceId, apiToken, hoursInAWeek } = this.props;
    console.log(111, workspaceId, apiToken);
    if (!workspaceId && !apiToken) {
      return null;
    }

    if (!hoursInAWeek) {
      return (
        <Form>
          <FormGroup row>
            <Label for="apiToken" xs={5}>
              API token
              {/*https://toggl.com/app/profile*/}
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
          >
            Next step
          </Button>
        </Form>
      );
    } else {
      return (
        <Alert>
          <Row>
            <Col xs={8}>
              API token: {apiToken.substring(0, 7)}
              ...
            </Col>
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
    setApiToken: apiToken => dispatch(setApiToken(apiToken))
  };
}

function mapStateToProps(state) {
  console.log(state);
  return {
    workspaceId: state.workspace.workspaceId || null,
    apiToken: state.apiToken.apiToken || null
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HoursInAWeek);
