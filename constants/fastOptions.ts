import { FastDurations, FastLevel } from "@/types/fastTypes";
import { getFastTimeInSeconds } from "@/utils/utils";

export const fastDurations: FastDurations = {
  16: {
    label: "post 16 godzinny",
    value: 16,
    totalTimeSeconds: getFastTimeInSeconds(16),
    level: FastLevel.Beginner,
  },
  18: {
    label: "post 18 godzinny",
    value: 18,
    totalTimeSeconds: getFastTimeInSeconds(18),
    level: FastLevel.Beginner,
  },
  20: {
    label: "post 20 godzinny",
    value: 20,
    totalTimeSeconds: getFastTimeInSeconds(20),
    level: FastLevel.Medium,
  },
  36: {
    label: "post 36 godzinny",
    value: 36,
    totalTimeSeconds: getFastTimeInSeconds(20),
    level: FastLevel.Advanced,
  },
  48: {
    label: "post 48 godzinny",
    value: 48,
    totalTimeSeconds: getFastTimeInSeconds(48),
    level: FastLevel.Advanced,
  },
};
