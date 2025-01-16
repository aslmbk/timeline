import { Session } from "../types";

export const getTodaySessions = (sessions: Session[]): Session[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return sessions.filter((session) => {
    const sessionStart = new Date(session.startTime);
    return sessionStart >= today;
  });
};
