import fetchServer from "@/lib/fetch-server";
import { IllnessType, ResponseIllnessType } from "@/types/illness";

export const illnessAction = async () => {
  // type for response
 
  interface ErrorResponse {
    message: string;
  }

  try {
    const illnesses: ResponseIllnessType | any = await fetchServer({
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/illnesses",
    });

    if (!illnesses.ok) {
      throw illnesses;
    }

    const illnessesData = await illnesses.json();
    return {
      success: illnessesData,
    };


  } catch (error: any) {
    // Error caught during execution
    if (error.status) {
      const responseBody = await error.text();
      const errorObject: any = JSON.parse(responseBody);
      console.log(errorObject);
      return {
        error: errorObject,
      };
      // if there is no error comes from server
    } else {
      return {
        error: "Error on server.",
      };
    }
  }
};
