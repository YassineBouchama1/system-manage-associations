import { delay } from "@/lib/delay";
import { setTimeout } from "timers";

export default async function Home() {
  await delay(2000);

  return (
    <div className="h-96 flex-1 rounded-2xl bg-purple-800 p-10 text-white">
      <h2 className="text-xl font-semibold">illnesses</h2>
    </div>
  );
}
