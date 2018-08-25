import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import Workspace from "./workspace/Workspace";
import {
  Button,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap";
import ApiToken from "./api-token/ApiToken";
import HoursInAWeek from "./hours-in-a-week/HoursInAWeek";
import StartDate from "./dates/Dates";
import { fetchTimes } from "../services/toggleApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import WorkWeek from "./work-week/WorkWeekRedux";

class AppApp extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: "1"
    };
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    let {
      fetchTimes,
      workspaceId,
      apiToken,
      hoursInAWeek,
      startDate,
      endDate,
      toggl
    } = this.props;

    return (
      <div>
        <Row>
          <Col xs={12}>
            <h1 className="display-4">Summarize time from Toggl</h1>
          </Col>
        </Row>

        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "1" })}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                Configuration
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  "hvr-back-pulse":
                    toggl.payload && this.state.activeTab !== "2",
                  active: this.state.activeTab === "2"
                })}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                Fetched times
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent
            activeTab={this.state.activeTab}
            className="AppApp--tab-content"
          >
            <TabPane tabId="1" className="AppApp--tab-panel__padding">
              <Col xs="12">
                <Workspace />
                <ApiToken />
                <HoursInAWeek />
                <StartDate />

                {workspaceId &&
                apiToken &&
                hoursInAWeek &&
                startDate &&
                endDate ? (
                  <Button
                    color="success"
                    block
                    onClick={fetchTimes}
                    type="submit"
                  >
                    {toggl.isLoading ? (
                      <FontAwesomeIcon icon={faCog} spin />
                    ) : (
                      "Fetch Times!"
                    )}
                  </Button>
                ) : null}
              </Col>
            </TabPane>
            <TabPane tabId="2" className="AppApp--tab-panel__padding">
              <Col xs="12">
                <WorkWeek />
              </Col>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTimes: () => dispatch(fetchTimes())
  };
}

function mapStateToProps(state) {
  console.log("State:", state);
  return {
    workspaceId: state.workspace.workspaceId || null,
    apiToken: state.apiToken.apiToken || null,
    hoursInAWeek: state.hoursInAWeek.hoursInAWeek || null,
    startDate: state.dates.startDate || null,
    endDate: state.dates.endDate || null,
    toggl: state.toggl
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppApp);
