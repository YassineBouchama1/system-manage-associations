"use server";
import fetchServer from "@/lib/fetch-server";
import { ResponseAssociationData } from "@/types/association";
import { ResponseIllnessType } from "@/types/illness";
import { redirect } from "next/navigation";
import { logout } from "../profile";
import { ResponsePatienData } from "@/types/patiens";


const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;
interface PatientsQueryParams {
  page?: string;
  per_page?: string;
}

export const fetchPatients = async (params: PatientsQueryParams) => {
  // build url
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/patients`;
  url += `?page=${params.page || DEFAULT_PAGE}&per_page=${
    params.per_page || DEFAULT_PER_PAGE
  }`;

  try {
    const patients: ResponsePatienData | any = await fetchServer({
      url,
    });

    if (!patients.ok) {
      throw patients;
    }

    const patientsData: ResponsePatienData | any = await patients.json();

    return {
      success: patientsData,
    };
  } catch (error: any) {
    // Error caught during execution
 if (true) {
   logout();
   // redirect('/login')
 }
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
