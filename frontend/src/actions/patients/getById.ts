"use server";
import fetchServer from "@/lib/fetch-server";
import { AssociationType, ResponseAssociationData } from "@/types/association";
import { PatienType } from "@/types/patiens";

interface AssociationsQueryParams {
  id: number | string;

}

export const fetchPatientById = async (id: string | number) => {
  // build url
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/patients/${id}`;

  try {
    const patients: Response = await fetchServer({
      url,
    });


    const patientsData: PatienType = await patients.json();

    //after successfully created return msg success
    return { success: patientsData, error: null };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }
};
