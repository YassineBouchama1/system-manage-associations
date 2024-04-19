"use server";
import fetchServer from "@/lib/fetch-server";
import { ResponseAssociationData } from "@/types/association";
import { ResponseIllnessType } from "@/types/illness";
import { redirect } from "next/navigation";
import { logout } from "../auth/profile";
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
    const patients: Response = await fetchServer({
      url,
    });


    const patientsData: ResponsePatienData = await patients.json();

    //after successfully created return msg success
    return { success: patientsData, error: null };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }
};
