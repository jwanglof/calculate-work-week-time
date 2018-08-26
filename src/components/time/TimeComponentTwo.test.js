// import React from "react";
// import { Time } from "./TimeComponentTwo";
//
// describe("Time component", () => {
//   it("test with empty time-entries", () => {
//     const wrapper = shallow(<Time date="foo" timeEntries={{}}/>);
//     expect(wrapper.first().props().children).toMatch("Invalid");
//   });
//
//   it("eje", () => {
//     const timeEntriesTest = {
//       "2018-08-24": [
//         {"start":"2018-08-24T11:05:27.000Z","end":"2018-08-24T15:05:29.000Z"},
//         {"start":"2018-08-24T05:05:29.000Z","end":"2018-08-24T10:16:43.000Z"}],
//       "2018-08-23": [
//         {"start":"2018-08-23T10:22:23.000Z","end":"2018-08-23T15:24:28.000Z"},
//         {"start":"2018-08-23T05:55:14.000Z","end":"2018-08-23T09:58:09.000Z"}],
//       "2018-08-22": [
//         {"start":"2018-08-22T10:50:14.000Z","end":"2018-08-22T16:18:46.000Z"},
//         {"start":"2018-08-22T10:20:37.000Z","end":"2018-08-22T10:20:39.000Z"},
//         {"start":"2018-08-22T05:08:20.000Z","end":"2018-08-22T10:17:25.000Z"},
//         {"start":"2018-08-22T05:00:06.000Z","end":"2018-08-22T05:08:15.000Z"}],
//       "2018-08-21": [
//         {"start":"2018-08-21T10:20:00.000Z","end":"2018-08-21T15:09:00.000Z"},
//         {"start":"2018-08-21T05:09:00.000Z","end":"2018-08-21T09:52:00.000Z"}],
//       "2018-08-20": [
//         {"start":"2018-08-20T10:50:00.000Z","end":"2018-08-20T15:23:00.000Z"},
//         {"start":"2018-08-20T05:04:00.000Z","end":"2018-08-20T10:05:00.000Z"}]
//     };
//
//     const timeComponent = shallow(<Time date="foo" timeEntries={timeEntriesTest}/>);
//     expect(true).toBe(false);
//   })
// });
