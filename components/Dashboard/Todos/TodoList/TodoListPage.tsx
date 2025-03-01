import { ITodo } from "@/models/Todo";
import { BoxTodo } from "../BoxTodo";

const TodoListPage = ({ todos }: { todos: ITodo[] }) => {
  return (
    <div className="h-[500px] overflow-y-auto space-y-4 ">
      {todos.length > 0 ? (
        <ul className="overflow-hidden">
          {todos.map((todo, index) => (
            <BoxTodo todo={todo} key={index} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-xs sm:text-base md:text-lg text-gray-600">
          You have not made any tasks at this date.
        </p>
      )}
    </div>
  );
};

export default TodoListPage;
