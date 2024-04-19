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
    const association: Response  = await fetchServer({
      url,
    });


    const associationData: AssociationType  = await association.json();

    return {
      success: associationData,
      error: null,
    };
  } catch (error: any) {
          return {
            success:null,
            error: error.message,
          };
  }
};
