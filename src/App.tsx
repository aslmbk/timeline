import { CurrentSession } from "@/components/CurrentSession";
import { ActivityList } from "@/components/ActivityList";

export const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Activity Timer</h1>
      <div className="grid gap-6">
        <CurrentSession />
        <ActivityList />
      </div>
    </div>
  );
};
