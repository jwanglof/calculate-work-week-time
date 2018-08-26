import React, { Component } from "react";
import {
  setWorkspaceId,
  setWorkspacesFromToggl
} from "../../actions/creators/workspace";
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
import { getSessionItem, setSessionItem } from "../../utils/sessionStorageUtil";
import { connect } from "react-redux";
import { SESSION_STORAGE_WORKSPACES } from "../../constants/sessionStorageKeys";

class Workspace extends Component {
  SESSION_STORAGE_KEY = "workspace-id";

  constructor() {
    super();
    this.state = {
      workspaceId: "",
      workspacesFromToggl: [],
      showForm: true
    };
  }

  componentDidMount() {
    const sessionValue = getSessionItem(this.SESSION_STORAGE_KEY);
    const workspacesFromToggl = getSessionItem(SESSION_STORAGE_WORKSPACES);

    if (sessionValue) {
      this.setState({
        workspaceId: sessionValue,
        showForm: false
      });
      this.props.setWorkspaceId(sessionValue);
    }

    if (workspacesFromToggl.length) {
      this.setState({
        workspacesFromToggl,
        showForm: false
      });
      this.props.setWorkspacesFromToggl(workspacesFromToggl);
    }
  }

  setWorkspaceId = () => {
    const { workspaceId } = this.state;
    this.props.setWorkspaceId(workspaceId);
    setSessionItem(this.SESSION_STORAGE_KEY, workspaceId);
    this.setState({
      showForm: false
    });
  };

  onChange = event => {
    const { value } = event.target;
    this.setState({
      workspaceId: value
    });
  };

  changeButtonClick = () => {
    this.setState({
      showForm: true
    });
  };

  render() {
    let { workspaceId, apiToken } = this.props;

    if (!apiToken) {
      return null;
    }

    const { showForm } = this.state;

    if (showForm) {
      return (
        <Form>
          <FormGroup row>
            <Label for="workspaceId" className="pt-0 pb-0" md={5} xs={12}>
              Workspace ID
              <small id="workspaceIdBlock" className="form-text text-muted m-0">
                Choose the workspace you want to fetch times from.
              </small>
            </Label>
            <Col md={7} xs={12}>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                autoFocus
                onChange={this.onChange}
                value={this.state.workspaceId}
              >
                {this.state.workspacesFromToggl.map(w => (
                  <option key={w.id} value={w.id}>
                    {w.name} (ID: {w.id})
                  </option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          <Button
            color="primary"
            block
            onClick={this.setWorkspaceId}
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
            <Col xs={12}>Workspace ID: {workspaceId}</Col>
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
    setWorkspaceId: id => dispatch(setWorkspaceId(id)),
    setWorkspacesFromToggl: workspaces =>
      dispatch(setWorkspacesFromToggl(workspaces))
  };
}

function mapStateToProps(state) {
  return {
    workspaceId: state.workspace.workspaceId || null,
    apiToken: state.apiToken.apiToken || null
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workspace);
