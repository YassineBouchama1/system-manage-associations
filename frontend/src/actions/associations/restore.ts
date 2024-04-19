"use server";
import { delay } from "@/lib/delay";
import fetchServer from "@/lib/fetch-server";
import { revalidatePath } from "next/cache";

export const restoreAction = async (id: number) => {

  await delay(1000);
  console.log(id);
  if (!id) return { error: "id required" };

  try {
    const illness = await fetchServer({
      method: "PATCH",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + `/associations/${id}`,
    });

    revalidatePath("/dashboard/associations");

    return {
      success: "restored",
      error: null,
    };
  } catch (error: any) {
    return {
      success: null,

      error: error.message,
    };
  }
};
