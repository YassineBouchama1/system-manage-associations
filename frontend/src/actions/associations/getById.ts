"use server";
import fetchServer from "@/lib/fetch-server";
import { AssociationType, ResponseAssociationData } from "@/types/association";

interface AssociationsQueryParams {
  id: number | string;
}

export const fetchAssociationById = async (id?: string | number) => {
  // build url
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/associations/${id}`;

  try {
    const associations: Response = await fetchServer({
      url,
    });

    const associationsData: AssociationType = await associations.json();

    return {
      success: associationsData,
      error: null,
    };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }
};
