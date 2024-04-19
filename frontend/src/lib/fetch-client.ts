import { logout } from "@/actions/auth/profile";

interface fetchClientProps {
  method?: string;
  url: string;
  body?: string;
  token?: string;
}

async function fetchClient({ method = "GET", url, body = "", token }: fetchClientProps) {
  try {
    const session = 'await getSession()';
    const accessToken = token || session;

    const response = await fetch(url.toString(), {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer" + accessToken,
      },
      body: body || undefined,
    });

    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (error) {
    if (error instanceof Response) {
      if (error.status === 401) {
       logout();
      }
 
      if (error.status === 409) {
        window.location.href = "/request-email-verification";
      }

      throw error;
    }

    throw new Error("Failed to fetch data", { cause: error });
  }
}

export default fetchClient;
