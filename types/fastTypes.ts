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


//new

// / Enum for possible fasting durations
enum FastingDuration {
  SIXTEEN_HOURS = 16,
  EIGHTEEN_HOURS = 18,
  TWENTY_HOURS = 20,
  TWENTY_FOUR_HOURS = 24,
  THIRTY_SIX_HOURS = 36,
  FORTY_EIGHT_HOURS = 48,
}
// Enum for the status of the fast
enum FastStatus {
  ACTIVE = "active",
  BROKEN = "broken",
  COMPLETED = "completed",
}

// Base type for a fast
type BaseFast = {
  timeH: FastingDuration;
  label: string;
};

// Extended type with more details
type Fast = BaseFast & {
  fastId: number;
  fastingUserId: number;
  startDate: Date;
  status: FastStatus;
};

// Example of a User type, if needed
type User = {
  userId: number;
  username: string;
  email: string;
};


// Sample data

const fakeFasts: Fast[] = [
  {
    fastId: 1,
    fastingUserId: 101,
    timeH: FastingDuration.SIXTEEN_HOURS,
    label: "16-Hour Fast",
    startDate: new Date("2024-08-20T06:00:00"),
    status: FastStatus.COMPLETED,
  },
  {
    fastId: 2,
    fastingUserId: 101,
    timeH: FastingDuration.TWENTY_HOURS,
    label: "20-Hour Fast",
    startDate: new Date("2024-08-21T08:00:00"),
    status: FastStatus.BROKEN,
  },
  {
    fastId: 3,
    fastingUserId: 102,
    timeH: FastingDuration.TWENTY_FOUR_HOURS,
    label: "24-Hour Fast",
    startDate: new Date("2024-08-22T10:00:00"),
    status: FastStatus.ACTIVE,
  },
  {
    fastId: 4,
    fastingUserId: 103,
    timeH: FastingDuration.FORTY_EIGHT_HOURS,
    label: "48-Hour Fast",
    startDate: new Date("2024-08-19T12:00:00"),
    status: FastStatus.COMPLETED,
  },
  {
    fastId: 5,
    fastingUserId: 104,
    timeH: FastingDuration.SIXTEEN_HOURS,
    label: "16-Hour Fast",
    startDate: new Date("2024-08-21T14:00:00"),
    status: FastStatus.ACTIVE,
  },
];

// Example of a user with their fasts
const fakeUsers: User[] = [
  {
    userId: 101,
    username: "fastingFanatic",
    email: "fastingfanatic@example.com",
  },
  {
    userId: 102,
    username: "healthyLiving",
    email: "healthyliving@example.com",
  },
  {
    userId: 103,
    username: "longFaster",
    email: "longfaster@example.com",
  },
  {
    userId: 104,
    username: "quickFasts",
    email: "quickfasts@example.com",
  },
];
