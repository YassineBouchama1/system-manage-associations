
import "server-only";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSessions";
import { logout } from "@/actions/auth/profile";
interface fetchServerProps {
  method?: string;
  url: string;
  body?: string | FormData;
}
function isFormData(body: any): body is FormData {
  return body && typeof body.append === "function"; 
}
      
async function fetchServer({ method = "GET", url, body = ""  }: fetchServerProps) {
  try {
    const session = await getSession();
  
                const contentType =
                  typeof body === "string"
                    ? "application/json"
                    : isFormData(body)
                    ? "multipart/form-data"
                    : "";


    const response = await fetch(url.toString(), {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": contentType,
        Authorization: "Bearer" + session?.token,
      },
      body: body || undefined,
    });

    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (error:any) {
  const responseBody = await error.text();
  const errorObject: any = JSON.parse(responseBody);
  console.log(typeof error);
  console.log(errorObject);
     throw new Error(errorObject?.message || error.message);
     

  }
}

export default fetchServer;
