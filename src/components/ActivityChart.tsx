import { useMemo } from "react";
import { useActivityStore } from "@/store/useActivityStore";
import { getTodaySessions } from "@/utils/dateUtils";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { differenceInSeconds } from "date-fns";

export const ActivityChart = () => {
  const { activities, sessions } = useActivityStore();
  const todaySessions = getTodaySessions(sessions);

  const data = useMemo(
    () =>
      activities.map((activity) => {
        const activitySessions = todaySessions.filter(
          (session) => session.activityId === activity.id
        );
        const duration = activitySessions.reduce((acc, session) => {
          if (!session.endTime) return acc;
          return acc + differenceInSeconds(session.endTime, session.startTime);
        }, 0);

        return {
          name: activity.title,
          duration,
          color: activity.color,
        };
      }),
    [activities, todaySessions]
  );

  return (
    <div className="p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-6">Activity Distribution</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data} barSize={20}>
            <XAxis
              dataKey="duration"
              type="number"
              label={{ value: "Minutes", position: "bottom" }}
              tickFormatter={(value) =>
                value % 60 === 0 ? String(value / 60) : ""
              }
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              width={100}
              tickFormatter={(value) => value.padEnd(10)}
            />
            <Bar dataKey="duration" radius={[4, 4, 4, 4]} fill="currentColor" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
