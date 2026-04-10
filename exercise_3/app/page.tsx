"use client";

import { handleFormSubmit } from "./form/action";
import { useActionState } from "react";

const initialMessage = {
  message: "",
  error: "",
};

export default function Home() {
  const [state, formAction] = useActionState(handleFormSubmit, initialMessage);

  return (
    <div className='flex flex-col items-center h-screen justify-center'>
      <form className='flex w-md flex-col gap-4' action={formAction}>
        <input
          className='border border-gray-300  outline-none rounded-md p-2'
          type='text'
          name='firstname'
          placeholder='firstname'
        />
        <input
          className='border border-gray-300  outline-none rounded-md p-2'
          type='text'
          name='lastname'
          placeholder='lastname'
        />
        <input
          className='border border-gray-300  outline-none rounded-md p-2'
          type='email'
          name='email'
          placeholder='Enter Email'
        />
        <input
          className='border border-gray-300  outline-none rounded-md p-2'
          type='password'
          name='password'
          placeholder='******'
        />
        <button className='px-4 py-2 ml-2 bg-blue-500 rounded-lg' type='submit'>
          Submit
        </button>
      </form>
      {state.message && <p className='text-gray-800 mt-5'>{state.message}</p>}
      {state.error && <p className='text-red-400 mt-5'>{state.error}</p>}
    </div>
  );
}
