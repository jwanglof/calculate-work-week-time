import { mapObject } from "./objectUtils";

describe("test mapObject", function() {
  it("should return ", () => {
    const entries = {
      "2018-07-17": [
        {
          start: "now",
          end: "later"
        }
      ]
    };
    let result;
    let datee;
    mapObject(entries, (date, entry) => {
      console.log(date, entry);
      result = entry;
      datee = date;
    });
    expect(result).toHaveLength(1);
    expect(datee).toEqual("2018-07-17");
  });
});
