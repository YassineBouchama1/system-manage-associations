"use server";
import fetchServer from "@/lib/fetch-server";

const timeFrame = "last30days";
interface ChartsParams {
  timeFrame?: string;

}

export const patientsRegion = async (params: ChartsParams) => {
  // build url
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/charts/patientsRegion`;

  url += `?timeFrame=${params.timeFrame || timeFrame}`;



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
