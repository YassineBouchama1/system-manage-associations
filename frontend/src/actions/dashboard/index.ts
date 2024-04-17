"use server";
import fetchServer from "@/lib/fetch-server";





export const fetchStatistics = async (associationId?: string | number) => {
  // build url
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/statistics`;

  // if id passed display it
  if (associationId) {
    url += `?association_id=${associationId}`;
  }

  try {
    const statistics: any = await fetchServer({
      url,
    });

    if (!statistics.ok) {
      throw statistics;
    }

    const statisticsData: any = await statistics.json();

    return {
      success: statisticsData,
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
