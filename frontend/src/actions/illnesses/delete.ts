"use server";
import { delay } from "@/lib/delay";
import fetchServer from "@/lib/fetch-server";
import { revalidatePath } from "next/cache";

export const deleteAction= async (formData: FormData) => {
  const id = formData.get("id");

  if (!id) {
    throw new Error("id is required");
  }
  if(!id)return {error:'id required'}

  try {
    const illness :Response = await fetchServer({
      method: "DELETE",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + `/illnesses/${id}`,
    });

    revalidatePath("/dashboard/illnesses");

    //after successfully created return msg success
    return { success: "Deleted", error: null };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }


};
