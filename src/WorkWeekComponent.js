import React, {Component} from 'react';
import TimeComponent from './TimeComponent';
import {differenceInSeconds} from "date-fns";
import {fancyTimeFormat} from './utils/timeUtils';

class WorkWeekComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalWeekHours: 0
    };
  }

  mapObject(object, callback) {
    return Object.keys(object).map((key) => {
      return callback(key, object[key]);
    });
  }

  //prevProps, prevState
  lol(togglData, hoursInAWeek) {
    // const { togglData, hoursInAWeek } = this.props;
    console.log('Did???', togglData, hoursInAWeek);
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
    const totalTimeInSeconds = this.lol(togglData, hoursInAWeek);

    return (
      <div>
        {this.mapObject(togglData, (key, value) => {
          return <TimeComponent key={key} date={key} timeEntries={value}/>;
        })}
        <div>
          Total time this week: {fancyTimeFormat(totalTimeInSeconds)}
        </div>
      </div>
    );
  }
}

export default WorkWeekComponent;