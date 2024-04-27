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
  const patient_id = formData.append("patient_id", id);

  const file = formData.get("file");


  if (!file){
    formData.delete('file')
  }
    //   //2-validation useing zod
    //   const validatedFields = schemaTimeLine.safeParse({
    //     description,
    //     patient_id,
    //   });

    //   //check validation
    //   if (!validatedFields.success) {
    //     return {
    //       errorZod: validatedFields.error.flatten().fieldErrors,
    //     };
    //   }

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
