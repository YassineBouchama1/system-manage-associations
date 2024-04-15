"use server";
import fetchServer from "@/lib/fetch-server";
import { AssociationType, ResponseAssociationData } from "@/types/association";

interface AssociationsQueryParams {
  id: number | string;

}

export const fetchPatientById = async (id: string | number) => {
  // build url
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/patients/${id}`;

  try {
    const patients: AssociationType | any = await fetchServer({
      url,
    });

    if (!patients.ok) {
      throw patients;
    }

    const patientsData: AssociationType | any = await patients.json();

    return {
      success: patientsData,
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
