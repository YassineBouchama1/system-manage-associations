"use server";

import fetchServer from "@/lib/fetch-server";
import { schemaChangePassword, schemaEmail } from "@/lib/validations";

export const changePassword = async (formData: FormData) => {

  //2-validation
  const validatedFields = schemaChangePassword.safeParse({
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  });



  //check validation
  if (!validatedFields.success) {
    return {
      errorZod: validatedFields.error.flatten().fieldErrors,
    };
  }

  //check if passowrd equal passowrd confirm
  if (validatedFields.data.password_confirmation != validatedFields.data.password){
       return {
         error: 'password dosnt match password confirme',
       };
  }
    // fetch data
    try {
      const response = await fetchServer({
        method: "PATCH",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/user/change-password",
        body: JSON.stringify(validatedFields.data),
      });

      if (!response.ok) {
        throw response;
      }

      //after successfully
      return { success: "Sent" };
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
