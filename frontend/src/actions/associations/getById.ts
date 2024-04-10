"use server";
import fetchServer from "@/lib/fetch-server";
import { AssociationType, ResponseAssociationData } from "@/types/association";

interface AssociationsQueryParams {
  id: number | string;

}

export const fetchAssociationById = async (id: string | number) => {
  // build url
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/associations/${id}`;


  try {
    const associations: AssociationType | any = await fetchServer({
      url,
    });

    if (!associations.ok) {
      throw associations;
    }

    const associationsData: AssociationType | any = await associations.json();

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
