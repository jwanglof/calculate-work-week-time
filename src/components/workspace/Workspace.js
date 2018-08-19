import React from "react";
import connect from "react-redux/es/connect/connect";
import { setWorkspaceId } from "../../actions/creators/workspace";

const Workspace = ({ workspace }) => {
  console.log(workspace);
  return <div>Workspace</div>;
};

function mapDispatchToProps(dispatch) {
  return {
    setWorkspaceId: id => dispatch(setWorkspaceId(id))
  };
}

function mapStateToProps(state) {
  return {
    workspace: state.workspace
  };
}

export default connect(mapStateToProps)(Workspace);
