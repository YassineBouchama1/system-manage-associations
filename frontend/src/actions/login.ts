"use server";
import fetchClient from "@/lib/fetch-client";
import { getSession } from "@/lib/getSessions";
import { z } from "zod";
import { redirect } from "next/navigation";
import fetchServer from "@/lib/fetch-server";


export const login = async (prevState: any, formData: FormData) => {
  const session = await getSession();

  //1-create schema
  const schemaLogin = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  //2-validation
  const validatedFields = schemaLogin.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  //check validation
  if (!validatedFields.success) {
    return {
      message: "error in zod",
      errors: validatedFields.error.flatten().fieldErrors,
      type: "error",
    };
  }

  console.log("done");
  console.log(validatedFields.data);

  // fetch data
  try {
    const response = await fetchServer({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/login",
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      throw response;
    }
    const data = await response.json();

    console.log(data);
    console.log("good");

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

    
           return {
             message: "fetching successfully",
             errors: {},
             type: "success",
           };
    
    

  } catch (error) {
    console.log(error);
    if (error instanceof Response) {
    console.log(error);

      if (error.status === 401) {
        return {
          message: `invalid credentials ${error}`,
          errors: {},
          type: "error",
        };
      }
    }
  }
};
