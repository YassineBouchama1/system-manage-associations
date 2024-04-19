"use server";
import { delay } from "@/lib/delay";
import fetchServer from "@/lib/fetch-server";
import { revalidatePath } from "next/cache";

export const restoreAction = async (id: number) => {

  console.log(id);
  if (!id) return { error: "id required" };

  try {
    const patients: Response = await fetchServer({
      method: "PATCH",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + `/patients/${id}`,
    });

    revalidatePath("/dashboard/patients");
    //after successfully Restored return msg success
    return { success: "Restored", error: null };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }

};
