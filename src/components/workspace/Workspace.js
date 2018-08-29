import React, { Component } from "react";
import {
  setCurrentWorkspace,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";

class Workspace extends Component {
  SESSION_STORAGE_KEY = "current-workspace";

  constructor() {
    super();
    this.state = {
      workspaceIndex: 0,
      workspacesFromToggl: [],
      showForm: true
    };
  }

  componentDidMount() {
    const sessionValue = getSessionItem(this.SESSION_STORAGE_KEY);
    const workspacesFromToggl = getSessionItem(SESSION_STORAGE_WORKSPACES);

    if (sessionValue) {
      let workspaceIndex = 0;
      if (workspacesFromToggl.length) {
        workspaceIndex = workspacesFromToggl.findIndex(
          e => e.id === sessionValue.id
        );
      }
      this.setState({
        showForm: false,
        workspaceIndex
      });
      this.props.setCurrentWorkspace(sessionValue);
    }

    if (workspacesFromToggl && workspacesFromToggl.length) {
      this.setState({
        workspacesFromToggl
      });
      this.props.setWorkspacesFromToggl(workspacesFromToggl);
    }
  }

  setWorkspace = () => {
    const { workspaceIndex } = this.state;
    const { workspace } = this.props;

    this.props.setCurrentWorkspace(
      workspace.workspacesFromToggl[workspaceIndex]
    );
    setSessionItem(
      this.SESSION_STORAGE_KEY,
      workspace.workspacesFromToggl[workspaceIndex]
    );
    this.setState({
      showForm: false
    });
  };

  onChange = event => {
    // value is which index that is chosen from the workspaces-list
    const { value } = event.target;
    console.log(value, this.props.workspace.workspacesFromToggl[value]);
    this.setState({
      workspaceIndex: value
    });
  };

  changeButtonClick = () => {
    this.setState({
      showForm: true
    });
  };

  render() {
    let { apiToken, workspace } = this.props;
    console.log(11222, workspace);

    if (!apiToken) {
      return null;
    }

    const { showForm } = this.state;
    //
    // if (!this.state.workspaceIndex && workspace.workspacesFromToggl.length) {
    //   this.setState({
    //     workspaceIndex: 0
    //   });
    // }

    if (showForm) {
      return (
        <Form>
          <FormGroup row>
            <Label for="workspaceId" className="pt-0 pb-0" md={7} xs={12}>
              Workspace
              <small id="workspaceIdBlock" className="form-text text-muted m-0">
                Choose the workspace you want to fetch times from.
              </small>
            </Label>
            <Col
              md={5}
              xs={12}
              className={classnames({ "text-center": workspace.isLoading })}
            >
              {workspace.isLoading ? (
                <FontAwesomeIcon icon={faCog} size="2x" spin />
              ) : (
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  autoFocus
                  onChange={this.onChange}
                  value={this.state.workspaceIndex}
                >
                  {workspace.workspacesFromToggl.map((w, index) => (
                    <option key={index} value={index}>
                      {w.name} (ID: {w.id})
                    </option>
                  ))}
                </Input>
              )}
            </Col>
          </FormGroup>
          <Button
            color="primary"
            block
            onClick={this.setWorkspace}
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
              Workspace: {workspace.currentWorkspace.name} (ID:{" "}
              {workspace.currentWorkspace.id})
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
    setWorkspacesFromToggl: workspaces =>
      dispatch(setWorkspacesFromToggl(workspaces)),
    setCurrentWorkspace: workspaceData =>
      dispatch(setCurrentWorkspace(workspaceData))
  };
}

function mapStateToProps(state) {
  return {
    workspace: state.workspace,
    apiToken: state.apiToken.apiToken || null
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workspace);
