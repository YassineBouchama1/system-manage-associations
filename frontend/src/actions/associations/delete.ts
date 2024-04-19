"use server";
import { delay } from "@/lib/delay";
import fetchServer from "@/lib/fetch-server";
import { revalidatePath } from "next/cache";

export const deleteAction= async (formData: FormData) => {
  const id = formData.get("id");


await delay(1000)
  console.log(id);
  if(!id)return {error:'id required'}

  try {
    const association: Response = await fetchServer({
      method: "DELETE",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + `/associations/${id}`,
    });

    revalidatePath("/dashboard/associations");

    //after successfully created return msg success
    return { success: "Created", error: null };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }

};
