import React, { Component } from "react";
import { connect } from "react-redux";
import Workspace from "./workspace/Workspace";
import {
  Button,
  Col,
  Nav,
  NavItem,
  NavLink,
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
import WorkWeek from "./work-week/WorkWeek";

class App extends Component {
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
      workspace,
      apiToken,
      hoursInAWeek,
      startDate,
      endDate,
      toggl
    } = this.props;

    return (
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
                "hvr-back-pulse": toggl.payload && this.state.activeTab !== "2",
                active: this.state.activeTab === "2"
              })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Details {hoursInAWeek ? `(${hoursInAWeek}h week)` : ""}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent
          activeTab={this.state.activeTab}
          className="AppApp--tab-content"
        >
          <TabPane tabId="1" className="tab-panel__padding">
            <Col xs="12">
              <ApiToken />
              <Workspace />
              <HoursInAWeek />
              <StartDate />

              {Object.keys(workspace.currentWorkspace).length &&
              apiToken &&
              hoursInAWeek ? (
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
          <TabPane tabId="2" className="tab-panel__padding">
            <Col xs="12">
              {this.state.activeTab === "2" ? <WorkWeek /> : null}
            </Col>
          </TabPane>
        </TabContent>
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
  return {
    workspace: state.workspace,
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
)(App);
