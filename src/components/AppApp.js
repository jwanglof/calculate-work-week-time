import React from "react";
import "./App.css";
import { connect } from "react-redux";
import WorkWeek from "./work-week/WorkWeekRedux";
import Workspace from "./workspace/Workspace";
import { Col, Row } from "reactstrap";
import ApiToken from "./api-token/ApiToken";

function AppApp() {
  return (
    <div>
      <Row>
        <Col xs={12}>
          <h1 className="display-4">Calculate your work-time</h1>
        </Col>
      </Row>

      <Workspace />
      <ApiToken />
      <WorkWeek />
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(AppApp);
