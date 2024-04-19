"use server";
import fetchServer from "@/lib/fetch-server";

const timeFrame = "last30days";
interface ChartsParams {
  timeFrame?: string;
  id?: string | number;
}

export const patientsCharts = async (params: ChartsParams) => {
  // build url
  let url = `${
    process.env.NEXT_PUBLIC_BACKEND_API_URL
  }/charts/patients`;

  url += `?timeframe=${params.timeFrame || timeFrame}`;

// if id passed display it
  if (params?.id) {
  url += `?association_id=${params.id}`;
  } 

  try {
    const charts: Response = await fetchServer({
      url,
    });



    const chartsData: any = await charts.json();
    return {
      success: chartsData,
      error: null,
    };
  } catch (error: any) {
   return {
     success: null,
     error: error.message,
   };
  }
};
