import { notFound } from "next/navigation";
import { fetchTodoById } from "@/app/lib/todo";
import EditTodoForm from "../EditTodoForm";

export default async function EditTodoPage({params,}: {params: { id: string }}) {
  
  const todo = await fetchTodoById(params.id);

  if (!todo) {
    notFound();
  }

  return (
    <main className='max-w-2xl mx-auto mt-10 p-6'>
      <EditTodoForm todo={todo} />
    </main>
  );
}
