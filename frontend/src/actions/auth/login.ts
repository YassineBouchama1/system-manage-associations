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
    const response :Response = await fetchServer({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/login",
      body: JSON.stringify(validatedFields.data),
    });

    const data = await response.json();


    // if user in active block them 
    if (data.user.status != "active") {
      return {
        error: "You Are Blocked",
      };
    }
    //assign data user to session
    session.userId = data.user.id;
    session.name = data.user.name;
    session.email = data.user.email;
    session.role = data.user.role_id;
    session.roleName = data.user.role;
    session.email_verified_at = data.user.email_verified_at;
    session.isLoggedIn = true;
    session.permissions = ["create", "delete"];
    session.token = data?.access_token;
    await session.save();

    //if user dosnt verify block him
    if (!data.user.email_verified_at) {
      return { success: "email" };
    }
    //after successfully
    return {
      success: "login",
      error: null,
    };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }
};
