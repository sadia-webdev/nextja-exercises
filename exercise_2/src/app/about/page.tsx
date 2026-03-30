export const dynamic = "force-static"; 

export default function AboutPage() {

  return (
    <div>
        <p>time is {new Date().toLocaleTimeString()}</p>
      <h1>This page is statically generated.</h1>
    </div>
  );
}
