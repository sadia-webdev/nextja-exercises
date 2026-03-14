import React from "react";

type Props = {
  params: { slug: string[] };
};

export default async function BlogPage({ params }: Props) {

  const { slug } = params;
  const pathString = slug ? slug.join("/") : "";

  return (
    <div>
      <h1>Blog Route</h1>
      <p>
        You visited: <strong>/{pathString}</strong>
      </p>
    </div>
  );
}
