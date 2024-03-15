import { delay } from "@/lib/delay";
import React from "react";

const Transaction =async () => {
    await delay(1000);

  return (
    <div className="h-60 flex-1  rounded-xl bg-red-800 p-10 text-white">
      Transaction
    </div>
  );
};

export default Transaction;
