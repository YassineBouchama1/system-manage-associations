"use server";
import fetchServer from "@/lib/fetch-server";
import { ResponseAssociationData } from "@/types/association";
import { ResponseIllnessType } from "@/types/illness";


const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 2;
interface AssociationsQueryParams {
  page?: string;
  per_page?: string;
}

export const fetchAssociations = async (params: AssociationsQueryParams) => {
  // build url
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/associations`;
  url += `?page=${params.page || DEFAULT_PAGE}&per_page=${
    params.per_page || DEFAULT_PER_PAGE
  }`;



  try {
    const associations: ResponseIllnessType | any = await fetchServer({
      url,
    });

    if (!associations.ok) {
      throw associations;
    }

    const associationsData : ResponseAssociationData | any = await associations.json();

    return {
      success: associationsData,
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
