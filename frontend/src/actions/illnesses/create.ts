"use server";
import fetchServer from "@/lib/fetch-server";
import {  schemaIllness } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export const createIllness = async (formData: FormData) => {
  const name = formData.get("name");

  // if(!id)return {error:'id required'}


  //2-validation useing zod
  const validatedFields = schemaIllness.safeParse({
    name,
  });

  //check validation
  if (!validatedFields.success) {
    return {
      errorZod: validatedFields.error.flatten().fieldErrors,
    };
  }

  // sending data to api
  try {
    const illness :Response= await fetchServer({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + `/illnesses`,
      body: JSON.stringify(validatedFields.data),
    });


    //refrech route
    revalidatePath("/dashboard/illnesses");

    //after successfully created return msg success
    return { success: "Created", error: null };
  } catch (error: any) {
      return {
        success: null,
        error: error.message,
      };
  }
};
