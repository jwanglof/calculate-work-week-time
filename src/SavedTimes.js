import React, {Component} from 'react';
import {EVENT_NAME, EVENT_TIME_OBJECT_NAME} from './utils/constants';
import {fancyTimeFormatFromSeconds} from './utils/timeUtils';

class SavedTimes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedTimes: []
    };

    // When the Save-button is pressed it will trigger this event
    // Add the data to the state
    window.addEventListener(EVENT_NAME, (e) => {
      const newSavedTimes = this.state.savedTimes;
      newSavedTimes.push(e.detail[EVENT_TIME_OBJECT_NAME]);
      this.setState({
        savedTimes: newSavedTimes
      })
    });
  }

  render() {
    const savedTimes = this.state.savedTimes;
    if (!savedTimes.length) {
      return null;
    }

    let totalTime = 0;
    this.state.savedTimes.map(t => {
      totalTime += t.seconds
    });

    return (
      <div className="row">
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Week</th>
                <th scope="col">Seconds</th>
                <th scope="col">Fancy</th>
              </tr>
            </thead>
            <tbody>
              {savedTimes.map(timeObject => {
                return (<tr>
                  <td>{timeObject.week}</td>
                  <td>{timeObject.seconds}</td>
                  <td>{fancyTimeFormatFromSeconds(timeObject.seconds)}</td>
                </tr>)
              })}
              <tr>
                <td>Totalt:</td>
                <td colSpan="2">{totalTime}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default SavedTimes;