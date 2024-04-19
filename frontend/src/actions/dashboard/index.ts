"use server";
import fetchServer from "@/lib/fetch-server";
import { error } from "console";

export const fetchStatistics = async (associationId?: string | number) => {
  // build url
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/statistics`;

  // if id passed display it
  if (associationId) {
    url += `?association_id=${associationId}`;
  }

  try {
    const statistics: Response = await fetchServer({
      url,
    });

    const statisticsData = await statistics.json();

    return {
      success: statisticsData,
      error: null,
    };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }
};
