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
    const association = await fetchServer({
      method: "DELETE",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + `/associations/${id}`,
    });

    if (!association.ok) {
      throw association;
    }

    revalidatePath("/dashboard/associations");

    return { success: "deleted" };
  } catch (error: any) {
    // Error caught during execution
    if (error.status) {
      const responseBody = await error.text();
      const errorObject: any = JSON.parse(responseBody);
      return {
        error: errorObject.message,
      };
    } else {
      return {
        error: "pb in server",
      };
    }
  }

};
