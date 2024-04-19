"use server";
import fetchServer from "@/lib/fetch-server";
import { schemaIllness, schemaIllnessUpdate } from "@/lib/validations";
import { error } from "console";
import { revalidatePath } from "next/cache";

export const updateIllness = async (formData: FormData) => {
  const name = formData.get("name");
  const id = formData.get("id");

  console.log(id);
  if (!id) {
    return {
      error: "no id",
    };
  }
  //2-validation
  const validatedFields = schemaIllnessUpdate.safeParse({
    name,
  });

  //check validation
  if (!validatedFields.success) {
    return {
      error: "zod pb",
    };
  }

  // sending data to api
  try {
    const illness :Response = await fetchServer({
      method: "PUT",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + `/illnesses/${id}`,
      body: JSON.stringify(validatedFields.data),
    });

    //refrech route
    revalidatePath("/dashboard/illnesses");

    //after successfully created return msg success
    return { success: 'Updated', error: null };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }
  // revalidatePath('/dashboard')
};
