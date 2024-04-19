import "server-only";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSessions";
import { logout } from "@/actions/auth/profile";
interface fetchServerProps {
  method?: string;
  url: string;
  body?: string | FormData;
}


async function fetchServerFormData({
  method = "GET",
  url,
  body = "",
}: fetchServerProps) {
  try {
    const session = await getSession();

    const response = await fetch(url.toString(), {
      method: method,
      headers: {
        Accept: "application/json",

        Authorization: "Bearer" + session?.token,
      },
      body: body || undefined,
    });

    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (error: any) {
    const responseBody = await error.text();
    const errorObject: any = JSON.parse(responseBody);
    console.log(typeof error);
    console.log(errorObject);
    throw new Error(errorObject?.message || error.message);
  }
}

export default fetchServerFormData;
