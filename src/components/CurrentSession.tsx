import { useEffect, useMemo, useState } from "react";
import { useActivityStore } from "@/store/useActivityStore";
import { formatDuration } from "@/utils/formatDuration";

export const CurrentSession = () => {
  const { activities, currentSession, stopSession } = useActivityStore();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!currentSession) return;

    const interval = setInterval(() => {
      const start = new Date(currentSession.startTime).getTime();
      setElapsed(Date.now() - start);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentSession]);

  const activity = useMemo(
    () =>
      currentSession
        ? activities.find((a) => a.id === currentSession.activityId)
        : null,
    [activities, currentSession]
  );

  if (!currentSession || !activity) return null;

  return (
    <div
      className="p-6 rounded-lg"
      style={{
        backgroundColor: activity.color + "20",
        borderLeft: `4px solid ${activity.color}`,
      }}
    >
      <h2 className="text-xl font-semibold mb-4">Current Session</h2>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">{activity.title}</span>
          <span className="text-2xl font-bold">{formatDuration(elapsed)}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={stopSession}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};
