"use server";
import fetchServer from "@/lib/fetch-server";
import { ResponseIllnessType } from "@/types/illness";
import { logout } from "../profile";
import { getSession } from "@/lib/getSessions";

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 2;
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

  // if (Object.keys(params).length > 0) {
  //   const queries = Object.keys(params)
  //     .map((key) => `${key}=${params[key]}`)
  //     .join("&");
  //   url += `&${queries}`; // Append additional parameters without overwriting defaults
  // }

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
