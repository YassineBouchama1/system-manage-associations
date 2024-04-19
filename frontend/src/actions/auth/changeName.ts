"use server";

import fetchServer from "@/lib/fetch-server";
import { schemaChangePassword, schemaEmail } from "@/lib/validations";

export const changeName = async (formData: FormData) => {

  //2-validation
  const validatedFields = schemaChangePassword.safeParse({
    name: formData.get("name"),
  });



  //check validation
  if (!validatedFields.success) {
    return {
      errorZod: validatedFields.error.flatten().fieldErrors,
    };
  }


    // fetch data
    try {
      const response: Response= await fetchServer({
        method: "PATCH",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/user/change-password",
        body: JSON.stringify(validatedFields.data),
      });


      //after successfully
      return {
        success: "Sent",
        error: null,
      };
    } catch (error: any) {
                return {
                  success: null,
                  error: error.message,
                };
    }
};
