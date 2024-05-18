import { formatSeconds } from "./utils";

describe("formatSeconds", () => {
  it("formats seconds less than an hour correctly", () => {
    expect(formatSeconds(65)).toBe("00:01:05");
  });

  it("formats seconds less than a day correctly", () => {
    expect(formatSeconds(3600)).toBe("01:00:00");
  });

  it("formats seconds greater than a day correctly", () => {
    expect(formatSeconds(93784)).toBe("26:03:04");
  });

  it("formats seconds with single-digit hours/minutes/seconds correctly", () => {
    expect(formatSeconds(9)).toBe("00:00:09");
  });

  it("formats seconds with double-digit hours/minutes/seconds correctly", () => {
    expect(formatSeconds(3609)).toBe("01:00:09");
  });
});
