"use server";

import fetchServer from "@/lib/fetch-server";
import { schemaEmail, schemaverifyEmail } from "@/lib/validations";

// this action for verify email

export const verifyEmail = async (url: string, signature: string) => {
  // //2-validation
  const validatedFields = schemaverifyEmail.safeParse({
    url,
    signature,
  });

  //check validation
  if (!validatedFields.success) {
    return {
      errorZod: validatedFields.error.flatten().fieldErrors,
    };
  }

  //build url
  const pathname = `${url}&signature=${signature}`;

  console.log(pathname);

  // return
  // send  dataurl
  try {
    const response: Response = await fetchServer({
      url: pathname,
    });

    const success = await response.json();

    //after successfully
    return {
      success: success.message,
      error: null,
    };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }
};
