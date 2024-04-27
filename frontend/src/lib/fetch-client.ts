import { logout } from "@/actions/auth/profile";

interface fetchClientProps {
  method?: string;
  url: string;
  body?: string;
  token?: string;
}

async function fetchClient({ method = "GET", url, body = "", token }: fetchClientProps) {
  try {
    // const session = "await getSession()";
    // const accessToken = token || session;

    const response = await fetch(url.toString(), {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer" + token,
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

export default fetchClient;
