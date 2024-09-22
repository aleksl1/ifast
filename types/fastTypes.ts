export type FastOptionsDocument = {
  value: number;
  label: string;
  description: string;
};

export enum UserFastStatus {
  ONGOING = "ONGOING",
}

export type UserFastType = {
  userId: string;
  fastOptionId: string;
  startTime?: string;
  endTime?: string | null;
  status?: UserFastStatus;
  notes?: string;
};
