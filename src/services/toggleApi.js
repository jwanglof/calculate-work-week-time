import axios from "axios";
import { format, isSameDay, toDate } from "date-fns";

function getUrl(workspaceId, page = 1) {
  // const workspaceId = this.state.workspaceId;
  const since = format(this.state.startDate, this.DATE_FORMAT, new Date());
  const until = format(this.state.endDate, this.DATE_FORMAT, new Date());
  return `https://toggl.com/reports/api/v2/details?workspace_id=${workspaceId}&since=${since}&until=${until}&user_agent=calculate-work-time&page=${page}`;
}

export function fetchTimes(username, workspaceId) {
  // const username = this.state.username;
  const password = "api_token";
  const togglData = [];

  axios
    .get(getUrl(workspaceId), { auth: { username, password } })
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

      // this.setState({
      //   parsedTogglData
      // });
      return parsedTogglData;
    })
    .catch(err => {
      console.error(44444, err);
    });
}
