import { getTodaySessions } from "@/utils/dateUtils";
import { useActivityStore } from "@/store/useActivityStore";
import { formatDuration } from "@/utils/formatDuration";

export const ActivityList = () => {
  const { activities, sessions, startSession } = useActivityStore();

  const todaySessions = getTodaySessions(sessions);

  // Находим максимальную длительность для масштабирования баров
  const maxDuration = activities.reduce((max, activity) => {
    const activitySessions = todaySessions.filter(
      (session) => session.activityId === activity.id
    );
    const duration = activitySessions.reduce((acc, session) => {
      if (!session.endTime) return acc;
      return (
        acc +
        (new Date(session.endTime).getTime() -
          new Date(session.startTime).getTime())
      );
    }, 0);
    return Math.max(max, duration);
  }, 0);

  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">Activities</h2>
      <div className="space-y-4">
        {activities.map((activity) => {
          const activitySessions = todaySessions.filter(
            (session) => session.activityId === activity.id
          );
          const totalDuration = activitySessions.reduce((acc, session) => {
            if (!session.endTime) return acc;
            return (
              acc +
              (new Date(session.endTime).getTime() -
                new Date(session.startTime).getTime())
            );
          }, 0);

          const barWidth = maxDuration
            ? (totalDuration / maxDuration) * 100
            : 0;

          return (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-4 rounded-lg"
              style={{
                backgroundColor: activity.color + "20",
                borderLeft: `4px solid ${activity.color}`,
              }}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{activity.title}</h3>
                  <span className="text-sm text-muted-foreground">
                    {formatDuration(totalDuration)}
                  </span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: activity.color,
                    }}
                  />
                </div>
              </div>
              <button
                onClick={() => startSession(activity.id)}
                className="shrink-0 px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition"
              >
                Start
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
