"use server";
import fetchServer from "@/lib/fetch-server";
import { ResponseIllnessType } from "@/types/illness";

export const fetchIllnessForSelectors = async () => {
  // type for response
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/illnesses/selectors`;

  try {
    const illnesses: Response = await fetchServer({
      url,
    });

    const illnessesData = await illnesses.json();

    //after successfully created return msg success
    return { success: illnessesData, error: null };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }
};
