import { Session } from "../types";
import { startOfDay, addDays, isWithinInterval } from "date-fns";

export const getTodaySessions = (sessions: Session[]): Session[] => {
  const todaySessions: Session[] = [];
  const today = startOfDay(new Date());
  const tomorrow = addDays(today, 1);

  sessions.forEach((session) => {
    if (
      !isWithinInterval(session.startTime, { start: today, end: tomorrow }) &&
      !isWithinInterval(session.endTime ?? 0, { start: today, end: tomorrow })
    ) {
      return;
    }
    const newSession = { ...session };
    if (
      !isWithinInterval(session.endTime ?? 0, { start: today, end: tomorrow })
    ) {
      newSession.endTime = tomorrow.toISOString();
    }
    if (!isWithinInterval(session.startTime, { start: today, end: tomorrow })) {
      newSession.startTime = today.toISOString();
    }

    todaySessions.push(newSession);
  });

  return todaySessions;
};
