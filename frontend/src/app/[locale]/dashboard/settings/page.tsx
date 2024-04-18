import { delay } from "@/lib/delay";

export default async function Home() {
  await delay(1000);

  return (
   
      <h1 className="text-3xl font-bold">dashboard Routes</h1>
    
  );
}