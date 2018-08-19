import React from "react";
import connect from "react-redux/es/connect/connect";

function WorkWeek() {
  return <div>WorkWeek</div>;
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(WorkWeek);
