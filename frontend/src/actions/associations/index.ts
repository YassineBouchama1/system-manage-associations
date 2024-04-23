"use server";
import fetchServer from "@/lib/fetch-server";
import { ResponseAssociationData } from "@/types/association";
import { ResponseIllnessType } from "@/types/illness";
import { error } from "console";


const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;
interface AssociationsQueryParams {
  page?: string;
  per_page?: string;
  query?: string;
  deleted?: string;
}

export const fetchAssociations = async (params: AssociationsQueryParams) => {
  // build url
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/associations`;
  url += `?page=${params.page || DEFAULT_PAGE}&per_page=${
    params.per_page || DEFAULT_PER_PAGE
  }`;
  
if(params.query){
    url += `&q=${params?.query}`;
}
if (params.deleted) {
  url += `&deleted=${params?.deleted}`;
}


  try {
    const associations:  Response = await fetchServer({
      url,
    });

    const associationsData : ResponseAssociationData  = await associations.json();


    console.log(associationsData);
    return {
      success: associationsData,
      error:null
    };
  } catch (error: any) {
          return {
            success:null,
            error: error.message,
          };
  }
};
