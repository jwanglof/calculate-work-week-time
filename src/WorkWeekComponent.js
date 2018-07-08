import React, {Component} from 'react';
import TimeComponent from './TimeComponent';
import {differenceInSeconds} from "date-fns";
import {fancyTimeFormat, getSecondsFromHours} from './utils/timeUtils';

class WorkWeekComponent extends Component {
  constructor(props) {
    super(props);
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
          Total time this week: {fancyTimeFormat(totalTimeInSeconds)}
          <br/>
          Diff against work-time: {fancyTimeFormat(Math.abs(amountOfOverTimeInSeconds))}
        </div>
      </div>
    );
  }
}

export default WorkWeekComponent;