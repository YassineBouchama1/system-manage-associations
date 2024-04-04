"use server";
import fetchServer from "@/lib/fetch-server";
import { ResponseIllnessType } from "@/types/illness";
import { logout } from "../profile";

export const illnessAction = async (currentPage: string) => {
  // type for response

  console.log(currentPage);

  try {
    const illnesses: ResponseIllnessType | any = await fetchServer({
      url:
        process.env.NEXT_PUBLIC_BACKEND_API_URL +
        `/illnesses?q&page=1&per_page=1`,
    });

    if (!illnesses.ok) {
      throw illnesses;
    }

    const illnessesData = await illnesses.json();

    return {
      success: illnessesData,
    };
  } catch (error: any) {
    // Error caught during execution
   
    if (error?.status === 401) {
      logout();
      // return redirect("/login");
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
