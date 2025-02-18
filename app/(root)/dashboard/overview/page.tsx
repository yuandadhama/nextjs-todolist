import RecentlyFinished from "@/components/Dashboard/Overview/RecentlyFinished";
import UpcomingTodos from "@/components/Dashboard/Overview/UpcomingTodos";

const page = async () => {
  return (
    <main className="md:p-3 md:py-2">
      <UpcomingTodos isEmpty={false} />
      <RecentlyFinished isEmpty={false} />
    </main>
  );
};

export default page;
