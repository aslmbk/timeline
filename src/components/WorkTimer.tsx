import { useActivityStore, useWorkActivity } from "@/store/useActivityStore";
import { getTodaySessions } from "@/utils/dateUtils";
import { formatDuration } from "@/utils/formatDuration";
import { useEffect, useMemo, useState } from "react";

export const WorkTimer = () => {
  const workActivity = useWorkActivity();
  const { startSession, stopSession, currentSession, sessions } =
    useActivityStore();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (currentSession?.activityId !== workActivity.id) {
      setElapsed(0);
      return;
    }
    const interval = setInterval(() => {
      const start = new Date(currentSession.startTime).getTime();
      setElapsed(Date.now() - start);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentSession, elapsed, workActivity]);

  const totalWorkTime = useMemo(() => {
    const todaySessions = getTodaySessions(sessions);
    return todaySessions.reduce((acc, session) => {
      if (!session.endTime) return acc;
      return (
        acc +
        (new Date(session.endTime).getTime() -
          new Date(session.startTime).getTime())
      );
    }, 0);
  }, [sessions]);

  return (
    <div className="p-6 rounded-lg border-2 border-primary">
      <h2 className="text-xl font-bold mb-4">Work Timer</h2>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">{workActivity.title}</span>
          <span className="text-2xl font-bold">
            {formatDuration(totalWorkTime + elapsed)}
          </span>
        </div>
        <div className="flex gap-2">
          {!currentSession || currentSession.activityId !== workActivity.id ? (
            <button
              onClick={() => startSession(workActivity.id)}
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Start Work
            </button>
          ) : (
            <button
              onClick={stopSession}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Stop Work
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
