"use server";
import fetchServer from "@/lib/fetch-server";
import { ResponseIllnessType } from "@/types/illness";
import { logout } from "../auth/profile";
import { getSession } from "@/lib/getSessions";

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 6;
interface IllnessQueryParams {
  page?: string;
  per_page?: string;
}

export const fetchIllness = async (params: any) => {
  // type for response
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/illnesses`;
  url += `?page=${params.page || DEFAULT_PAGE}&per_page=${
    params.per_page || DEFAULT_PER_PAGE
  }`;

  try {
    const illnesses: Response = await fetchServer({
      url,
    });

    const illnessesData: ResponseIllnessType = await illnesses.json();
    //after successfully created return msg success
    return { success: illnessesData, error: null };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }
};
