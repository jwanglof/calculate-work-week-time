import React, {Component} from 'react';
import {differenceInSeconds} from 'date-fns';
import {fancyTimeFormatFromSeconds} from './utils/timeUtils';

class TimeComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const date = this.props.date;
    const timeEntries = this.props.timeEntries;

    let hours = [];
    let totaltHours = 0;
    timeEntries.map(t => {
      console.log('Diff in secs:', differenceInSeconds(t.end, t.start));
      const hour = differenceInSeconds(t.end, t.start);
      hours.push(hour);
      totaltHours += hour;
    });

    return (
      <div key={date}>
        {hours.map((v, k) => (<div key={k}>{fancyTimeFormatFromSeconds(v)}</div>))}
        Totalt: {fancyTimeFormatFromSeconds(totaltHours)}
      </div>
    );
  }
}

export default TimeComponent;