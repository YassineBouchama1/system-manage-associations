import { pathnames } from './../../config';
"use server";
import { delay } from "@/lib/delay";
import fetchServer from "@/lib/fetch-server";
import { revalidatePath } from "next/cache";
import { usePathname } from 'next/navigation';

export const deleteAction= async (formData: FormData) => {
  const id = formData.get("id");


await delay(1000)
  console.log(id);
  if(!id)return {error:'id required'}

  try {
    const illness = await fetchServer({
      method: "DELETE",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + `/illnesses/${id}`,
    });

    if (!illness.ok) {
      throw illness;
    }

    revalidatePath("/dashboard/illnesses");

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

  revalidatePath('/dashboard')
};
