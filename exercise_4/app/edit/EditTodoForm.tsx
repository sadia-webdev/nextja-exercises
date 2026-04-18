"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Todo } from "@/app/types/todo";
import { updateTodoAction } from "@/app/actions/update";

export default function EditTodoForm({ todo }: { todo: Todo }) {
  const [state, formAction] = useActionState(updateTodoAction, null);

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>Edit Todo</h1>

      <form action={formAction} className='space-y-4'>
        <input type='hidden' name='id' value={todo._id} />

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Todo Title
          </label>
          <input
            type='text'
            name='title'
            defaultValue={todo.title}
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
          />
          <select
            name='priority'
            id='priority'
            className=' mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          >
            <option value='default'>Default</option>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </div>

        {state?.error && <p className='text-red-500'>{state.error}</p>}

        <div className='flex gap-3'>
          <button
            type='submit'
            className='flex-1 bg-blue-600 text-white py-2 px-4 rounded-md'
          >
            Update Todo
          </button>
          <Link href='/' className='px-4 py-2 border rounded-md'>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
