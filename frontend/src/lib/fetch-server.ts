
import "server-only";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSessions";
import { logout } from "@/actions/profile";
interface fetchServerProps {
  method?: string;
  url: string;
  body?: string;
}

async function fetchServer({ method = "GET", url, body = "" }: fetchServerProps) {
  try {
    const session = await getSession();

    const response = await fetch(url.toString(), {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer" + session?.token,
      },
      body: body || undefined,
    });

    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (error) {
    //get instant from Response to error
    if (error instanceof Response) {
      //if  unauth logout user
    //   console.log('from fetch main')
    //  if (error.status === 401) {
    //    return redirect("/login");
    //  }

    //  if (error.status === 409) {
    //    return redirect("/request-email-verification");
    //  }

      //if  not email verefied

      if (error.status === 409) {
        return redirect("/request-email-verification");
      }
      return error;
    }

    throw new Error("Failed to fetch data from the server", { cause: error });
  }
}

export default fetchServer;
