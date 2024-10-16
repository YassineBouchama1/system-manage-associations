"use server";
import fetchServer from "@/lib/fetch-server";
import { ResponseAssociationData } from "@/types/association";
import { ResponseIllnessType } from "@/types/illness";
import { redirect } from "next/navigation";
import { logout } from "../auth/profile";
import { ResponsePatientData } from "@/types/patients";


const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;
interface PatientsQueryParams {
  page?: string;
  per_page?: string;
  query?: string;
  deleted?: string;
  association?: string;
}

export const fetchPatients = async (params: PatientsQueryParams) => {
  // build url
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/patients`;
  url += `?page=${params.page || DEFAULT_PAGE}&per_page=${
    params.per_page || DEFAULT_PER_PAGE
  }`;

  if (params.query) {
    url += `&q=${params?.query}`;
  }
  if (params.deleted) {
    url += `&deleted=${params?.deleted}`;
  }

  if (params.association) {
    params?.association === "All"
      ? (url += `&association=`)
      : (url += `&association=${params?.association}`);
  }

  try {
    const patients: Response = await fetchServer({
      url,
    });

    const patientsData: ResponsePatientData = await patients.json();

    //after successfully created return msg success
    return { success: patientsData, error: null };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }
};
