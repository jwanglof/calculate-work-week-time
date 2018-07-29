import React, {Component} from 'react';
import TimeComponent from './TimeComponent';
import {differenceInSeconds} from "date-fns";
import {fancyTimeFormatFromSeconds, getSecondsFromHours} from './utils/timeUtils';
import {EVENT_NAME, EVENT_TIME_OBJECT_NAME} from './utils/constants';

class WorkWeekComponent extends Component {
  constructor(props) {
    super(props);

    this.saveWorkDiff = this.saveWorkDiff.bind(this);
  }

  mapObject(object, callback) {
    return Object.keys(object).map((key) => {
      return callback(key, object[key]);
    });
  }

  countTotalHours(togglData, hoursInAWeek) {
    let totalHours = 0;

    this.mapObject(togglData, (key, timeEntries) => {
      timeEntries.map(t => {
        totalHours += differenceInSeconds(t.end, t.start);
      });
    });

    return totalHours;
  }

  saveWorkDiff() {
    console.log(11122, this.props);
    const { currentWeek, togglData, hoursInAWeek } = this.props;
    const totalTimeInSeconds = this.countTotalHours(togglData, hoursInAWeek);
    const amountOfOverTimeInSeconds = getSecondsFromHours(hoursInAWeek) - totalTimeInSeconds;
    const eventObject = {
      [EVENT_TIME_OBJECT_NAME]: {
        week: currentWeek,
        seconds: Math.abs(amountOfOverTimeInSeconds)
      }
    };
    const event = new CustomEvent(EVENT_NAME, {detail: eventObject});
    window.dispatchEvent(event);
  }

  render() {
    const { togglData, hoursInAWeek } = this.props;
    const totalTimeInSeconds = this.countTotalHours(togglData, hoursInAWeek);
    const amountOfOverTimeInSeconds = getSecondsFromHours(hoursInAWeek) - totalTimeInSeconds;
    return (
      <div>
        {this.mapObject(togglData, (key, value) => {
          return <TimeComponent key={key} date={key} timeEntries={value}/>;
        })}
        <div>
          Total time this week: {fancyTimeFormatFromSeconds(totalTimeInSeconds)}
        </div>
        <div>
          Diff against work-time: {fancyTimeFormatFromSeconds(Math.abs(amountOfOverTimeInSeconds))} ({Math.abs(amountOfOverTimeInSeconds)} seconds)
        </div>
        <div><button onClick={this.saveWorkDiff}>Save!</button></div>
      </div>
    );
  }
}

export default WorkWeekComponent;