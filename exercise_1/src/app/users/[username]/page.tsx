import React from "react";

interface userProps {
  params: {
    username: string;
  };
}

const page = ({ params }: userProps) => {
  return <div>Welcome, {params.username}!</div>;
};

export default page;
