import { CurrentSession } from "@/components/CurrentSession";
import { ActivityList } from "@/components/ActivityList";
import { WorkTimer } from "@/components/WorkTimer";
import { SleepTracker } from "@/components/SleepTracker";
import { ActivityChart } from "@/components/ActivityChart";

export const App = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WorkTimer />
          <SleepTracker />
        </div>
        <CurrentSession />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActivityList />
          <ActivityChart />
        </div>
      </div>
    </div>
  );
};
