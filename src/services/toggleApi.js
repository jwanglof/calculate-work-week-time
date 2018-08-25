import axios from "axios";
import { format, isSameDay, toDate } from "date-fns";
import {
  fetchTimesFailed,
  fetchTimesStarted,
  fetTimesSuccess
} from "../actions/creators/toggl";

function getUrl(workspaceId, page = 1) {
  // const workspaceId = this.state.workspaceId;
  const since = format(this.state.startDate, this.DATE_FORMAT, new Date());
  const until = format(this.state.endDate, this.DATE_FORMAT, new Date());
  return `https://toggl.com/reports/api/v2/details?workspace_id=${workspaceId}&since=${since}&until=${until}&user_agent=calculate-work-time&page=${page}`;
}

export function fetchTimes(page = 1) {
  const DATE_FORMAT = "yyyy-MM-dd";
  return function(dispatch, getState) {
    dispatch(fetchTimesStarted());

    const togglData = [];

    const { apiToken, workspace, dates } = getState();

    // https://github.com/toggl/toggl_api_docs/blob/master/chapters/authentication.md#http-basic-auth-with-api-token
    const auth = { username: apiToken.apiToken, password: "api_token" };
    const workspaceId = workspace.workspaceId;
    const since = dates.startDate;
    const until = dates.endDate;
    const togglUrl = `https://toggl.com/reports/api/v2/details?workspace_id=${workspaceId}&since=${since}&until=${until}&user_agent=calculate-work-time&page=${page}`;

    axios
      .get(togglUrl, { auth })
      .then(res => {
        // Get the amount of pages of time-entries so we know how many promises we need
        const amountOfPages = Math.ceil(res.data.total_count / 50);
        togglData.push(...res.data.data);

        const promises = [];
        if (amountOfPages > 1) {
          for (let i = 2; i <= amountOfPages; i++) {
            promises.push(axios.get(this.getUrl(i), { auth }));
          }
        }
        return Promise.all(promises);
      })
      .then(res => {
        if (res.length) {
          for (let i = 0; i < res.length; i++) {
            togglData.push(...res[i].data.data);
          }
        }

        const parsedTogglData = {};
        for (let i = 0; i < togglData.length; i++) {
          const currentData = togglData[i];
          const currentDataStart = toDate(currentData.start);

          const key = format(currentDataStart, DATE_FORMAT);
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

        dispatch(fetTimesSuccess(parsedTogglData));
      })
      .catch(err => dispatch(fetchTimesFailed(err)));
  };
  // // const username = this.state.username;
  // const password = "api_token";
  //
  // axios
  //   .get(getUrl(workspaceId), { auth: { username, password } })
  //   .then(res => {
  //     // Get the amount of pages of time-entries so we know how many promises we need
  //     const amountOfPages = Math.ceil(res.data.total_count / 50);
  //     togglData.push(...res.data.data);
  //
  //     const promises = [];
  //     if (amountOfPages > 1) {
  //       for (let i = 2; i <= amountOfPages; i++) {
  //         promises.push(
  //           axios.get(this.getUrl(i), { auth: { username, password } })
  //         );
  //       }
  //     }
  //     return Promise.all(promises);
  //   })
  //   .then(res => {
  //     for (let i = 0; i < res.length; i++) {
  //       togglData.push(...res[i].data.data);
  //     }
  //
  //     console.log(333444, res);
  //
  //     const parsedTogglData = {};
  //     for (let i = 0; i < togglData.length; i++) {
  //       const currentDayTimes = {};
  //
  //       const currentData = togglData[i];
  //       const currentDataStart = toDate(currentData.start);
  //
  //       const key = format(currentDataStart, this.DATE_FORMAT);
  //       if (!parsedTogglData[key]) {
  //         parsedTogglData[key] = [];
  //         parsedTogglData[key].push({
  //           start: currentDataStart,
  //           end: toDate(currentData.end)
  //         });
  //
  //         togglData.map(data => {
  //           if (data.id !== currentData.id) {
  //             // Check if they are on the same date
  //             const dataDateStart = toDate(data.start);
  //             if (isSameDay(currentDataStart, dataDateStart)) {
  //               parsedTogglData[key].push({
  //                 start: dataDateStart,
  //                 end: toDate(data.end)
  //               });
  //             }
  //           }
  //         });
  //       }
  //     }
  //     console.log(444444, parsedTogglData);
  //
  //     // this.setState({
  //     //   parsedTogglData
  //     // });
  //     return parsedTogglData;
  //   })
  //   .catch(err => {
  //     console.error(44444, err);
  //   });
}
