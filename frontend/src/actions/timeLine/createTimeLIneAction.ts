"use server";
import fetchServerFormData from "@/lib/fetch-server-formData";
import {  schemaTimeLine } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export const createTimeLIneAction = async (formData: FormData, id:  string) => {
  const description = formData.get("description");
  if (!id) {
    return {
      error: "no id",
    };
  }


  // append patient_id for send it to api
  formData.append("patient_id", id);

  const file : any = formData.get("file");
 

  // if user dosnt pass a new file remove it from formdata
  if (file?.name === "undefined") formData.delete("file");

  //   //2-validation useing zod
  const validatedFields = schemaTimeLine.safeParse({
    description,
    "patient_id":id,
  });

  //check validation
  if (!validatedFields.success) {
    return {
      errorZod: validatedFields.error.flatten().fieldErrors,
    };
  }

  // sending data to api
  try {
    const timeLine: Response = await fetchServerFormData({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + `/timeLine`,
      body: formData,
    });

    //after successfully created return msg success
    return { success: "created", error: null };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }
};
