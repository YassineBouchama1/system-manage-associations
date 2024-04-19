"use server";

import fetchServer from "@/lib/fetch-server";
import { schemaEmail, schemaResetPassword } from "@/lib/validations";

export const resetPassword = async (formData: FormData) => {
  //2-validation
  const validatedFields = schemaResetPassword.safeParse({
    email: formData.get("email"),
    token: formData.get("token"),
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
  if (
    validatedFields.data.password_confirmation != validatedFields.data.password
  ) {
    return {
      error: "password dosnt match password confirme",
    };
  }

  // send  data
  try {
    const response: Response = await fetchServer({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/reset-password",
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
