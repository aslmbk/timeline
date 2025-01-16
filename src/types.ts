export interface Activity {
  id: string;
  title: string;
  color: string;
}

export interface Session {
  id: string;
  startTime: string;
  endTime: string | null;
  activityId: string;
}

export type ActivityType =
  | "work"
  | "sleep"
  | "eat"
  | "chores"
  | "relax"
  | "other";
