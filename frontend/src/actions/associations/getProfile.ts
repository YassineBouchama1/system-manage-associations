"use server";
import fetchServer from "@/lib/fetch-server";
import { AssociationType, ResponseAssociationData } from "@/types/association";

interface AssociationsQueryParams {
  id: number | string;

}

export const fetchAssociationById = async (id: string | number) => {
  // build url
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/associations/profile/${id}`;


  try {
    const association: AssociationType | any = await fetchServer({
      url,
    });

    if (!association.ok) {
      throw association;
    }

    const associationData: AssociationType | any = await association.json();

    return {
      success: associationData,
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
