"use server";
import fetchServer from "@/lib/fetch-server";

const timeFrame = "last30days";
interface ChartsParams {
  timeFrame?: string;
 
}

export const patientsCharts = async (params: ChartsParams) => {
  // build url
  let url = `${
    process.env.NEXT_PUBLIC_BACKEND_API_URL
  }/charts/patients?timeframe=${params.timeFrame || timeFrame}`;


  
  try {
    const charts: any = await fetchServer({
      url,
    });

    if (!charts.ok) {
      throw charts;
    }

    const chartsData: any = await charts.json();
console.log(chartsData);
    return {
      success: chartsData,
    };
  } catch (error: any) {
    // Error caught during execution

    if (error.status) {
      const responseBody = await error.text();
      const errorObject: any = JSON.parse(responseBody);
console.log(errorObject.message);
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
