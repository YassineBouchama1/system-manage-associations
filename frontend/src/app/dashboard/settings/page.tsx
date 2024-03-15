import { delay } from "@/lib/delay";

export default async function Home() {
  await delay(1000);

  return (
    <div className="h-60 rounded-xl bg-sky-800 p-10 text-white">
      <h1 className="text-3xl font-bold">dashboard Routes</h1>
    </div>
  );
}