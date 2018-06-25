import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as nanoid from 'nanoid';
import axios from 'axios';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {DateUtils} from 'react-day-picker';
import {format, isSameDay, parse, toDate, subDays} from 'date-fns'
import WorkWeekComponent from './WorkWeekComponent';

class App extends Component {
  firstInputName = nanoid();
  DATE_FORMAT = 'yyyy-MM-dd';

  constructor() {
    super();

    this.state = {
      // totalTime: 0.0,
      workspaceId: '1674001',
      username: '536ec56a65c5c6636c1a1ea700f367df',
      parsedTogglData: {},
      startDate: subDays(new Date(), 7),
      endDate: subDays(new Date(), 3),
      hoursInAWeek: 37.5
    };

    // this.changeInputComponent = this.changeInputComponent.bind(this);
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

  // changeInputComponent(inputName, value) {
  //   console.log(parseFloat(value));
  //
  //   const floatValue = parseFloat(value);
  //   const result = this.state.totalTime + floatValue;
  //
  //   const conversionInMinutes = hour => Math.floor(hour) * 60 + (hour - (Math.floor(hour))) * 100;
  //   var conversionInHours = min => Math.floor( min/60 ) + min % 60 / 100;
  //   console.log('In minutes:', conversionInMinutes(result), conversionInHours(conversionInMinutes(result)));
  //   // console.log(result.toFixed(2))
  //   // console.log(4444, inputName, value, parseFloat(this.state.totalTime), this.state.totalTime + value);
  //
  //   /*
  //   var Total_hour = '9.30',
  //   Paid_hour = '8.00',
  //   Extra_hour = '0.40';
  //
  //   var conversionInMinutes = hour => Math.floor(hour) * 60 + (hour - (Math.floor(hour))) * 100;
  //   var conversionInHours = min => Math.floor( min/60 ) + min % 60 / 100;
  //   var Remaining_hour = conversionInMinutes(Total_hour) - conversionInMinutes(Paid_hour) - conversionInMinutes(Extra_hour);
  //
  //   console.log(conversionInHours(Remaining_hour).toFixed(2));
  //   */
  //
  //   if (!isNaN(parseFloat(value))) {
  //     this.setState({
  //       totalTime: result
  //     });
  //   }
  //
  // }

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

  getUrl(page=1) {
    const workspaceId = this.state.workspaceId;
    const since = format(this.state.startDate, this.DATE_FORMAT, new Date());
    const until = format(this.state.endDate, this.DATE_FORMAT, new Date());
    return `https://toggl.com/reports/api/v2/details?workspace_id=${workspaceId}&since=${since}&until=${until}&user_agent=calculate-work-time&page=${page}`;
  }

  fetchTimes() {
    const username = this.state.username;
    const password = 'api_token';
    const togglData = [];

    axios.get(this.getUrl(), {auth: {username, password}})
      .then(res => {
        const amountOfPages = Math.ceil(res.data.total_count / 50);
        togglData.push(...res.data.data);
        console.log(1111, amountOfPages, res);
        const promises = [];
        if (amountOfPages > 1) {
          for (let i = 2; i <= amountOfPages; i++) {
            promises.push(axios.get(this.getUrl(i), {auth: {username, password}}));
          }
        }
        return Promise.all(promises);
      })
      .then(res => {
        console.log(555555, res, togglData);
        for (let i = 0; i < res.length; i++) {
          togglData.push(...res[i].data.data);
        }

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
        })
      })
      .catch(err => {
        console.error(44444, err);
      });
  }

  handleStartDayChange(day) {
    this.setState({ startDate: day });
  }

  handleEndDayChange(day) {
    this.setState({ endDate: day });
  }

  mapObject(object, callback) {
    return Object.keys(object).map((key) => {
      return callback(key, object[key]);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/*<h1>Calculate how much you've worked!</h1>*/}
        {/*<h2>Total time: {this.state.totalTime}</h2>*/}
        {/*<div className="App-intro">*/}
        {/*<WeekComponent name={this.firstInputName} actionOnChange={this.changeInputComponent}></WeekComponent>*/}
        {/*</div>*/}
        <div>
          <label>Workspace ID</label>
          <input type="text" name="workspaceId" value={this.state['workspaceId']} onChange={this.handleInputChange}/>
        </div>
        <div>
          <label>Username</label>
          <input type="text" name="username" value={this.state['username']} onChange={this.handleInputChange}/>
        </div>
        <div>
          <label>Amount of hours in a week?</label>
          <input type="text" name="username" value={this.state.hoursInAWeek} onChange={this.handleInputChange}/>
        </div>
        <div>
          <label>Start date</label>
          <DayPickerInput formatDate={App.formatDate} format={this.DATE_FORMAT} parseDate={App.parseDate} placeholder={`${format(this.state.startDate, this.DATE_FORMAT)}`} onDayChange={this.handleStartDayChange}/>
        </div>
        <div>
          <label>End date</label>
          <DayPickerInput formatDate={App.formatDate} format={this.DATE_FORMAT} parseDate={App.parseDate} placeholder={`${format(this.state.endDate, this.DATE_FORMAT)}`} onDayChange={this.handleEndDayChange}/>
        </div>
        <div>
          <button type="button" onClick={this.fetchTimes}>Fetch!</button>
        </div>
        {/*{this.mapObject(this.state.parsedTogglData, function (key, value) {
          return <TimeComponent key={key} date={key} timeEntries={value}/>;
        })}*/}
        <WorkWeekComponent hoursInAWeek={this.state.hoursInAWeek} togglData={this.state.parsedTogglData}/>
      </div>
    );
  }
}

export default App;
