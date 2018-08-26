import axios from "axios";
import { format, isSameDay, toDate } from "date-fns";
import {
  fetchTimesFailed,
  fetchTimesStarted,
  fetTimesSuccess
} from "../actions/creators/toggl";
import { getSessionItem, setSessionItem } from "../utils/sessionStorageUtil";
import { SESSION_STORAGE_WEEK_PREFIX } from "../constants/sessionStorageKeys";
import { DATE_FORMAT } from "../constants/dates";

function getUrl(workspaceId, since, until, page = 1) {
  return `https://toggl.com/reports/api/v2/details?workspace_id=${workspaceId}&since=${since}&until=${until}&user_agent=calculate-work-time&page=${page}`;
}

export function fetchTimes() {
  return function(dispatch, getState) {
    dispatch(fetchTimesStarted());

    const { dates } = getState();
    const sessionStorageKey = `${SESSION_STORAGE_WEEK_PREFIX}${
      dates.weekNumber
    }`;
    const storageValues = getSessionItem(sessionStorageKey);

    // Check if fetched data exist in session storage
    if (storageValues && Object.keys(storageValues).length) {
      dispatch(fetTimesSuccess(storageValues));
    } else {
      const togglData = [];
      const { apiToken, workspace } = getState();

      // https://github.com/toggl/toggl_api_docs/blob/master/chapters/authentication.md#http-basic-auth-with-api-token
      const auth = { username: apiToken.apiToken, password: "api_token" };
      const workspaceId = workspace.workspaceId;
      const since = dates.startDate;
      const until = dates.endDate;

      axios
        .get(getUrl(workspaceId, since, until), { auth })
        .then(res => {
          // Get the amount of pages of time-entries so we know how many promises we need
          const amountOfPages = Math.ceil(res.data.total_count / 50);
          togglData.push(...res.data.data);

          const promises = [];
          if (amountOfPages > 1) {
            for (let i = 2; i <= amountOfPages; i++) {
              promises.push(
                axios.get(this.getUrl(workspaceId, since, until, i), { auth })
              );
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

              togglData.forEach(data => {
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

          // Set fetched data in session storage as a 'cache'
          setSessionItem(sessionStorageKey, parsedTogglData);

          return dispatch(fetTimesSuccess(parsedTogglData));
        })
        .catch(err => dispatch(fetchTimesFailed(err)));
    }
  };
}
