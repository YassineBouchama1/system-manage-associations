"use server";
import fetchClient from "@/lib/fetch-client";
import { getSession } from "@/lib/getSessions";
import { z } from "zod";
import { redirect } from "next/navigation";
import fetchServer from "@/lib/fetch-server";
import { schemaLogin } from "@/lib/validations";


export const login = async (formData: FormData) => {
  const session = await getSession();

  //2-validation
  const validatedFields = schemaLogin.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  //check validation
  if (!validatedFields.success) {
    return {
      errorZod: validatedFields.error.flatten().fieldErrors,
    };
  }

  // fetch data
  try {
    const response = await fetchServer({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/login",
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      throw response;
    }

    const data = await response.json();

    //assign data user to session
    session.userId = "1";
    session.name = data.user.name;
    session.email = data.user.email;
    session.role = "admin";
    session.isLoggedIn = true;
    session.permissions = ["create", "delete"];
    session.token = data?.access_token;
    await session.save();

    //after successfully
    return { success: "Created" };
  } catch (error: any) {
    // Error caught during execution
    if (error.status) {
      const responseBody = await error.text();
      const errorObject: any = JSON.parse(responseBody);
      return {
        error: errorObject.message,
      };
    } else {
      return {
        error: "pb in server",
      };
    }
  }
};

