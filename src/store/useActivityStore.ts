import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Activity, Session } from "@/types";

interface ActivityState {
  activities: Activity[];
  sessions: Session[];
  currentSession: Session | null;
  startSession: (activityId: string) => void;
  stopSession: () => void;
}

const defaultActivities: Activity[] = [
  { id: "1", title: "Work", color: "#FF5733" },
  { id: "2", title: "Chores", color: "#FF33F6" },
  { id: "3", title: "Eat", color: "#3357FF" },
  { id: "4", title: "Relax", color: "#33FFF6" },
  { id: "5", title: "Sleep", color: "#33FF57" },
  { id: "6", title: "Other", color: "#FFB533" },
];

export const useActivityStore = create<ActivityState>()(
  persist(
    (set, get) => ({
      activities: defaultActivities,
      sessions: [],
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
    }),
    {
      name: "activity-storage",
      partialize: (state) => ({
        sessions: state.sessions,
      }),
    }
  )
);
