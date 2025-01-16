import { useState } from "react";
import { useSleepActivity, useActivityStore } from "@/store/useActivityStore";

export const SleepTracker = () => {
  const sleepActivity = useSleepActivity();
  const { addSleepSession } = useActivityStore();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startTime && endTime) {
      addSleepSession(startTime, endTime);
      setStartTime("");
      setEndTime("");
    }
  };

  return (
    <div
      className="p-6 rounded-lg"
      style={{
        backgroundColor: sleepActivity.color + "20",
        borderLeft: `4px solid ${sleepActivity.color}`,
      }}
    >
      <h2 className="text-xl font-bold mb-4">Sleep Tracker</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Start Time</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-2 rounded border"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">End Time</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-2 rounded border"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Add Sleep Session
        </button>
      </form>
    </div>
  );
};
