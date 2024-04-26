"use server";
import fetchServer from "@/lib/fetch-server";

export const fetchSelectors = async () => {
  // type for response
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/selectors`;

  try {
    const selectors: Response = await fetchServer({
      url,
    });

    const selectorsData = await selectors.json();

    //after successfully created return msg success
    return { success: selectorsData, error: null };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }
};
