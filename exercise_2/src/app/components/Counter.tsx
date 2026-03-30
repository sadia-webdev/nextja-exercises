'use client';
import React, { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <h1>Counter {count}</h1>

      <button className="bg-blue-300 px-2 rounded" onClick={() => setCount(count + 1)}>increment</button>
    </div>
  );
};
