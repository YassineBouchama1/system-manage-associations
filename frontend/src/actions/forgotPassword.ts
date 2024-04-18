"use server";

import fetchServer from "@/lib/fetch-server";
import { schemaEmail } from "@/lib/validations";

export const forgotPassword = async (formData: FormData) => {

  //2-validation
  const validatedFields = schemaEmail.safeParse({
    email: formData.get("email"),
  });

  //check validation
  if (!validatedFields.success) {
    return {
      errorZod: validatedFields.error.flatten().fieldErrors,
    };
  }

  // fetch data
  try {
    const response = await fetchServer({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/forgot-password",
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
