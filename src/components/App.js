import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { DateUtils } from "react-day-picker";
import {
  format,
  isSameDay,
  lastDayOfWeek,
  parse,
  startOfWeek,
  endOfISOWeek,
  toDate,
  getISOWeek
} from "date-fns";
import WorkWeekComponent from "./WorkWeekComponent";
import SavedTimes from "./SavedTimes";

class App extends Component {
  DATE_FORMAT = "yyyy-MM-dd";

  constructor() {
    super();

    this.state = {
      workspaceId: "1674001",
      username: "536ec56a65c5c6636c1a1ea700f367df",
      parsedTogglData: {},
      startDate: startOfWeek(new Date(), { weekStartsOn: 1 }),
      endDate: lastDayOfWeek(new Date(), { weekStartsOn: 1 }),
      hoursInAWeek: 37.5,
      weekendDates: ["2018-06-22"] // TODO Add support for weekends so they are automatically calculated
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.getUrl = this.getUrl.bind(this);
    this.handleStartDayChange = this.handleStartDayChange.bind(this);
    this.handleEndDayChange = this.handleEndDayChange.bind(this);
    this.fetchTimes = this.fetchTimes.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = this.inputName;
    const value = target.value;

    console.log(name, value);

    this.setState({
      [name]: value
    });
  }

  static parseDate(str, format, locale) {
    const parsed = parse(str, format, { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  }

  static formatDate(date, formatt, locale) {
    return format(date, formatt, { locale });
  }

  getUrl(page = 1) {
    const workspaceId = this.state.workspaceId;
    const since = format(this.state.startDate, this.DATE_FORMAT, new Date());
    const until = format(this.state.endDate, this.DATE_FORMAT, new Date());
    return `https://toggl.com/reports/api/v2/details?workspace_id=${workspaceId}&since=${since}&until=${until}&user_agent=calculate-work-time&page=${page}`;
  }

  fetchTimes() {
    const username = this.state.username;
    const password = "api_token";
    const togglData = [];

    axios
      .get(this.getUrl(), { auth: { username, password } })
      .then(res => {
        // Get the amount of pages of time-entries so we know how many promises we need
        const amountOfPages = Math.ceil(res.data.total_count / 50);
        togglData.push(...res.data.data);

        const promises = [];
        if (amountOfPages > 1) {
          for (let i = 2; i <= amountOfPages; i++) {
            promises.push(
              axios.get(this.getUrl(i), { auth: { username, password } })
            );
          }
        }
        return Promise.all(promises);
      })
      .then(res => {
        for (let i = 0; i < res.length; i++) {
          togglData.push(...res[i].data.data);
        }

        console.log(333444, res);

        const parsedTogglData = {};
        for (let i = 0; i < togglData.length; i++) {
          const currentDayTimes = {};

          const currentData = togglData[i];
          const currentDataStart = toDate(currentData.start);

          const key = format(currentDataStart, this.DATE_FORMAT);
          if (!parsedTogglData[key]) {
            parsedTogglData[key] = [];
            parsedTogglData[key].push({
              start: currentDataStart,
              end: toDate(currentData.end)
            });

            togglData.map(data => {
              if (data.id !== currentData.id) {
                // Check if they are on the same date
                const dataDateStart = toDate(data.start);
                if (isSameDay(currentDataStart, dataDateStart)) {
                  parsedTogglData[key].push({
                    start: dataDateStart,
                    end: toDate(data.end)
                  });
                }
              }
            });
          }
        }
        console.log(444444, parsedTogglData);

        this.setState({
          parsedTogglData
        });
      })
      .catch(err => {
        console.error(44444, err);
      });
  }

  handleStartDayChange(day) {
    this.setState({
      startDate: day,
      endDate: endOfISOWeek(day)
    });
  }

  handleEndDayChange(day) {
    // this.setState({ endDate: day });
    console.log("Disable this, lulz");
  }

  mapObject(object, callback) {
    return Object.keys(object).map(key => {
      return callback(key, object[key]);
    });
  }

  render() {
    const daypickerClasses = { className: "form-control" };
    return (
      <div className="App container">
        <div className="row">
          <div className="col-8">
            <div className="row form-group">
              <label
                htmlFor="workspaceId"
                className="col-sm-3 col-form-label text-right"
              >
                Workspace ID
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="workspaceId"
                  name="workspaceId"
                  value={this.state["workspaceId"]}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="row form-group">
              <label
                htmlFor="username"
                className="col-sm-3 col-form-label text-right"
              >
                Username
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="usernam"
                  name="username"
                  value={this.state["username"]}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="row form-group">
              <label
                htmlFor="hoursInAWeek"
                className="col-sm-3 col-form-label text-right"
              >
                Amount of hours in a week?
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="hoursInAWeek"
                  name="hoursInAWeek"
                  value={this.state.hoursInAWeek}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="row form-group">
              <label
                htmlFor="weekendDates"
                className="col-sm-3 col-form-label text-right"
              >
                Weekend dates
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="weekendDates"
                  name="weekendDates"
                  value={this.state.weekendDates}
                />
              </div>
            </div>

            <div className="row form-group">
              <label
                htmlFor="startDate"
                className="col-sm-3 col-form-label text-right"
              >
                Start date
              </label>
              <div className="col-sm-9">
                {/* TODO Replace with http://react-day-picker.js.org/examples/selected-week instead! */}
                <DayPickerInput
                  inputProps={daypickerClasses}
                  formatDate={App.formatDate}
                  format={this.DATE_FORMAT}
                  parseDate={App.parseDate}
                  placeholder={`${format(
                    this.state.startDate,
                    this.DATE_FORMAT
                  )}`}
                  onDayChange={this.handleStartDayChange}
                />
              </div>
            </div>

            <div className="row form-group">
              <label
                htmlFor="endDate"
                className="col-sm-3 col-form-label text-right"
              >
                End date
              </label>
              <div className="col-sm-9">
                {/* TODO Replace with http://react-day-picker.js.org/examples/selected-week instead! */}
                <DayPickerInput
                  inputProps={daypickerClasses}
                  formatDate={App.formatDate}
                  format={this.DATE_FORMAT}
                  parseDate={App.parseDate}
                  placeholder={`${format(
                    this.state.endDate,
                    this.DATE_FORMAT
                  )}`}
                  onDayChange={this.handleEndDayChange}
                />
              </div>
            </div>

            <div className="row form-group text-center">
              <div className="col-6 offset-6">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={this.fetchTimes}
                >
                  Fetch!
                </button>
              </div>
            </div>

            <WorkWeekComponent
              hoursInAWeek={this.state.hoursInAWeek}
              togglData={this.state.parsedTogglData}
              currentWeek={getISOWeek(this.state.startDate)}
            />
          </div>

          <div className="col-4">
            <SavedTimes />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
