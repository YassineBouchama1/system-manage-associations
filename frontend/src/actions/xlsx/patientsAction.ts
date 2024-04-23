"use server";
import fetchServer from "@/lib/fetch-server";
import { ResponseAssociationData } from "@/types/association";
import { ResponseIllnessType } from "@/types/illness";
import { redirect } from "next/navigation";
import { logout } from "../auth/profile";
import { PatientType, ResponsePatientData } from "@/types/patients";
import * as XLSX from "xlsx";


const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;
interface PatientsQueryParams {
  page?: string;
  per_page?: string;
  deleted?: string;
}

export const fetchPatientsForXlsx = async (formData: FormData) => {
  // build url
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/xlsx/patients`;
  url += `?page=1&per_page=${formData.get("per_page") || DEFAULT_PER_PAGE}`;

  // if they want data deleted
  if (formData?.get("deleted")) {
    url += `&deleted=true`;
  }

  //start date
  if (formData?.get("startDate")) {
    url += `&startDate=${formData?.get("startDate")}`;
  }

  //start date
  if (formData?.get("endDate")) {
    url += `&endDate=${formData?.get("endDate")}`;
  }

  if (formData?.get("columns")) {
    url += `&columns=${formData?.get("columns")}`;
  }

  console.log(url);
  try {
    const patients: Response = await fetchServer({
      url,
    });

    const patientsData: any = await patients.json();

    //after successfully created return msg success
    return { success: patientsData?.data, error: null };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }
};
