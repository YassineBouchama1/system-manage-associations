"use server";
import fetchServer from "@/lib/fetch-server";
import { ResponseIllnessType } from "@/types/illness";


export const fetchIllnessForSelectors = async () => {
  // type for response
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/illnesses/selectors`;


  try {
    const illnesses: ResponseIllnessType | any = await fetchServer({
      url,
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

      return {
        error: errorObject.message,
      };
      // if there is no error comes from server
    } else {
      return {
        error: "Error on server.",
      };
    }
  }
};
