import React from "react";

const Post = async () => {
  const res = await fetch("https://dummyjson.com/products");

  const data = await res.json();

  console.log(data.products);

  return <div>
    {data.products.slice(0,5).map(product => (
      <li key={product.id}>{product.title}</li>
    ))}
  </div>;
};

export default Post;

