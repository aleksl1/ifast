export const keys = {
  selectedFast: "selectedFast",
  fastList: "fastList",
  savedTime: "savedTime",
};

export const getFastKey = (i: number) => `${keys.fastList}-${i}`;
