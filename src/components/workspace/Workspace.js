import React, { Component } from "react";
import { setWorkspaceId } from "../../actions/creators/workspace";
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

class Workspace extends Component {
  SESSION_STORAGE_KEY = "workspace-id";

  constructor() {
    super();
    this.state = {
      workspaceId: ""
    };
  }

  componentDidMount() {
    const sessionValue = getSessionItem(this.SESSION_STORAGE_KEY);
    if (sessionValue) {
      this.setState({
        workspaceId: sessionValue
      });
      this.props.setWorkspaceId(sessionValue);
    }
  }

  setWorkspaceId = () => {
    const { workspaceId } = this.state;
    this.props.setWorkspaceId(workspaceId);
    setSessionItem(this.SESSION_STORAGE_KEY, workspaceId);
  };

  onChange = event => {
    const { value } = event.target;
    this.setState({
      workspaceId: value
    });
  };

  changeButtonClick = () => {
    this.props.setWorkspaceId("");
    this.setState({
      workspaceId: ""
    });
  };

  render() {
    let { workspaceId } = this.props;
    if (!workspaceId) {
      return (
        <Form>
          <FormGroup row>
            <Label for="workspaceId" xs={5}>
              Workspace ID
            </Label>
            <Col xs={7}>
              <Input
                type="text"
                name="workspaceId"
                id="workspaceId"
                placeholder="Workspace ID"
                value={this.state.workspaceId}
                onChange={this.onChange}
                autoFocus
              />
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
    setWorkspaceId: id => dispatch(setWorkspaceId(id))
  };
}

function mapStateToProps(state) {
  return {
    workspaceId: state.workspace.workspaceId || null
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workspace);
