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
    const illness = await fetchServer({
      method: "PUT",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + `/illnesses/${id}`,
      body: JSON.stringify(validatedFields.data),
    });

    if (!illness.ok) {
      throw illness;
    }

    //refrech route
    revalidatePath("/dashboard/illnesses");

    //after successfully created return msg success
    return { success: "Created" };
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
  // revalidatePath('/dashboard')
};
