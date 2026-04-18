import { fetchTodos } from "./lib/todo";
import { toggleTodo } from "./actions/toggle";
import { deleteTodo } from "./actions/delete";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; status?: string }>;
}) {
  const params = await searchParams;

  const todos = await fetchTodos(params.query, params.status);
  const time = new Date().toLocaleTimeString();

  // sort by priority
  todos.sort((a, b) => {
    const priorityMap: Record<string, number> = {
      high: 3,
      medium: 2,
      low: 1,
    };
    return priorityMap[b.priority] - priorityMap[a.priority];
  });

  return (
    <main className='max-w-4xl mx-auto mt-10 p-6'>
      <div className='bg-white rounded-lg shadow-md p-6'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>📝 Todo App</h1>
        <p className='text-sm text-gray-500 mb-4'>Last updated: {time}</p>

        <div className='mb-6'>
          <Link
            href='/new'
            className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
          >
            ➕ Add New Todo
          </Link>
        </div>

        <form action='/' method='GET' className='flex items-center gap-2 my-5'>
          <input
            type='search'
            name='query'
            defaultValue={params.query}
            className='w-[300px] outline-0 px-3 py-2 border border-gray-300 rounded-md'
            placeholder='Search tasks...'
          />

          <select
            name='status'
            defaultValue={params.status || "all"}
            className='outline-0 px-3 py-2 border border-gray-300 rounded-md'
          >
            <option value='all'>All</option>
            <option value='completed'>Completed</option>
            <option value='incomplete'>Incomplete</option>
          </select>

          <button
            type='submit'
            className='bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700 transition-colors'
          >
            Search
          </button>
        </form>

        {todos.length === 0 ? (
          <div className='text-center py-8'>
            <p className='text-gray-500 text-lg'>No todos yet!</p>
            <p className='text-gray-400 text-sm mt-2'>
              Create your first todo to get started.
            </p>
          </div>
        ) : (
          <div className='space-y-3'>
            {todos.map((todo) => (
              <div
                key={todo._id}
                className='flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4'
              >
                <div className='flex items-center space-x-3'>
                  <form action={toggleTodo.bind(null, todo._id)}>
                    <button
                      type='submit'
                      className='text-2xl hover:scale-110 transition-transform'
                      title={
                        todo.completed
                          ? "Mark as incomplete"
                          : "Mark as complete"
                      }
                    >
                      {todo.completed ? "✅" : "⬜"}
                    </button>
                  </form>

                  <span
                    className={`flex-1 text-lg ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}
                  >
                    {todo.title}
                  </span>

                  <span>{new Date(todo.createdAt).toLocaleDateString()}</span>
                </div>

                <div className='flex items-center space-x-2'>
                  <span
                    className={
                      todo.priority === "high"
                        ? "bg-red-100  text-red-500 px-3 rounded-lg "
                        : todo.priority === "medium"
                          ? "text-yellow-500 bg-yellow-100 px-3 rounded-lg "
                          : "text-green-500 bg-green-100 px-3 rounded-lg"
                    }
                  >
                    {todo.priority}
                  </span>

                  <Link
                    href={`/edit/${todo._id}`}
                    className='p-2  text-blue-600 hover:bg-blue-100 rounded-md transition-colors'
                    title='Edit todo'
                  >
                    ✏️
                  </Link>

                  <form action={deleteTodo.bind(null, todo._id)}>
                    <button
                      type='submit'
                      className='p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors'
                      title='Delete todo'
                    >
                      🗑️
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
