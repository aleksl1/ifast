export enum FastLevel {
  Beginner = 0,
  Medium = 1,
  Advanced = 2,
  Difficult = 3,
  Extreme = 4,
}

export type FastDetails = {
  label: string;
  value: number;
  totalTimeSeconds: number;
  startTimestamp?: number;
  timesCompleted?: number;
  level: FastLevel;
};

export enum FastDurationsEnum {
  SixteenHours = 16,
  EighteenHours = 18,
  TwentyHours = 20,
  ThirtySixHours = 36,
  FortyEightHours = 48,
}

export type FastDurations = {
  [key: number]: FastDetails;
};
