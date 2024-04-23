"use server";

import fetchServer from "@/lib/fetch-server";
import { schemaEmail, schemaverifyEmail } from "@/lib/validations";
import { changeVerifyEmail } from "./profile";
import { getSession } from "@/lib/getSessions";

// this action for verify email

export const verifyEmail = async (url: string, signature: string) => {

  const session = await getSession()
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



  // return
  // send  dataurl
  try {
    const response: Response = await fetchServer({
      url: pathname,
    });

    const success = await response.json();
console.log(success)
    // changeVerifyEmail(true);
session.email_verified_at = success.verified_at;
await session.save()

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
