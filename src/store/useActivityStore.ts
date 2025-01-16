import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Activity, Session } from "@/types";

interface ActivityState {
  activities: Activity[];
  sessions: Session[];
  currentSession: Session | null;
  // Actions
  startSession: (activityId: string) => void;
  stopSession: () => void;
  addSleepSession: (startTime: string, endTime: string) => void;
}

const defaultActivities: Activity[] = [
  { id: "1", title: "Work", color: "#FF5733", type: "work" },
  { id: "2", title: "Sleep", color: "#33FF57", type: "sleep" },
  { id: "3", title: "Eat", color: "#3357FF", type: "regular" },
  { id: "4", title: "Chores", color: "#FF33F6", type: "regular" },
  { id: "5", title: "Relax", color: "#33FFF6", type: "regular" },
  { id: "6", title: "Other", color: "#FFB533", type: "regular" },
];

export const useActivityStore = create<ActivityState>()(
  persist(
    (set, get) => ({
      activities: defaultActivities,
      sessions: [],
      sleepSessions: [],
      currentSession: null,

      startSession: (activityId: string) => {
        const { currentSession, stopSession } = get();
        if (currentSession) stopSession();

        const newSession: Session = {
          id: crypto.randomUUID(),
          startTime: new Date().toISOString(),
          endTime: null,
          activityId,
        };

        set({ currentSession: newSession });
      },

      stopSession: () => {
        const { currentSession, sessions } = get();
        if (!currentSession) return;

        const completedSession: Session = {
          ...currentSession,
          endTime: new Date().toISOString(),
        };

        set({
          sessions: [...sessions, completedSession],
          currentSession: null,
        });
      },

      addSleepSession: (startTime: string, endTime: string) => {
        const newSleepSession: Session = {
          id: crypto.randomUUID(),
          startTime,
          endTime,
          activityId: "2",
        };

        set((state) => ({
          sessions: [...state.sessions, newSleepSession],
        }));
      },
    }),
    {
      name: "activity-storage",
      partialize: (state) => ({
        sessions: state.sessions,
      }),
    }
  )
);

// Селекторы для удобного доступа к данным
export const useWorkActivity = () => {
  const activities = useActivityStore((state) => state.activities);
  return activities.find((activity) => activity.type === "work")!;
};

export const useRegularActivities = () => {
  const activities = useActivityStore((state) => state.activities);
  return activities.filter((activity) => activity.type === "regular");
};

export const useSleepActivity = () => {
  const activities = useActivityStore((state) => state.activities);
  return activities.find((activity) => activity.type === "sleep")!;
};
