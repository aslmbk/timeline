export interface Activity {
  id: string;
  title: string;
  color: string;
  type: "work" | "regular" | "sleep";
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
