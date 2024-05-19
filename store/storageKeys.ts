export const keys = {
  selectedFast: "selectedFast",
  fastList: "fastList",
  savedTime: "savedTime",
  name: "name",
};

export const getFastKey = (i: number) => `${keys.fastList}-${i}`;
