"use server";
import fetchServer from "@/lib/fetch-server";



export const fetchTimeLines = async (id?: string | number) => {
  // build url
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/timeLine?idPatient=${id}`;

  try {
    const timeLInes: Response = await fetchServer({
      url,
    });

    const timeLInesData = await timeLInes.json();

    //after successfully created return msg success
    return { success: timeLInesData, error: null };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }
};
