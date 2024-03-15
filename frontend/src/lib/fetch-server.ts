
import { redirect } from "next/navigation";
import "server-only";
import { getSession } from "@/lib/getSessions";
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
      if (error.status === 401) {
        return redirect("/login");
      }

      if (error.status === 409) {
        return redirect("/request-email-verification");
      }
    }

    throw new Error("Failed to fetch data from the server", { cause: error });
  }
}

export default fetchServer;
