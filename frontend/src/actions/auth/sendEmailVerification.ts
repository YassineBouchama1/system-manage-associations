"use server";

import fetchServer from "@/lib/fetch-server";
import { getSession } from "@/lib/getSessions";


export const sendEmailVerification = async (

) => {


  const session = await getSession()

if (!session?.token){
  return { error: "u most be log to do that" };
}
  // send  request to 
  try {
    const response :Response = await fetchServer({
      method: "POST",
      url:
        process.env.NEXT_PUBLIC_BACKEND_API_URL +
        `/email/verification-notification`,
    });

    const success = await response.json();
    //after successfully
    return { success: success.message, error: null };

  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }
};
