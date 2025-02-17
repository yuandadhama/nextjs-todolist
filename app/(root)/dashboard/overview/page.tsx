import RecentlyFinished from "@/components/Dashboard/Overview/RecentlyFinished";
import UpcomingTodos from "@/components/Dashboard/Overview/UpcomingTodos";

const page = async () => {
  return (
    <main className="md:p-2">
      <UpcomingTodos isEmpty={true} />
      <RecentlyFinished isEmpty={true} />
    </main>
  );
};

export default page;
