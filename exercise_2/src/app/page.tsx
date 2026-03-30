import { Suspense } from "react";
import { Counter } from "./components/Counter";
import Post from "./components/Post";
import SlowComponent from "./components/SlowComponent";




export default function HomePage() {

  const skeleton = (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 m-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 m-2"></div>
    </div>
  );
  

  
  return (
    <main className='p-6'>
      <h1 className='text-3xl font-bold text-indigo-600'>
        time is {new Date().toLocaleTimeString()}
      </h1>
      <Post />
      <Counter />
      <Suspense fallback={skeleton}>
        <SlowComponent />
      </Suspense>
    </main>
  );
}
