"use server";

import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SessionData, defaultSession, sessionOptions } from "./sessions";
import { z } from "zod";


let name = "yass";
let role = 'admin';
let isBlocked = false;

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  // CHECK THE USER IN THE DB
  session.isBlocked = isBlocked;
  session.role = role;

  return session;
};

export const login = async (
  prevState:  any,
  formData: FormData
) => {
  const session = await getSession();

  const formEmail = formData.get("name") as string;
  const formPassword = formData.get("password") as string;

  //1-create schema
  const schemaLogin = z.object({
    // email: ,
    password: z.string().min(6),
  });

  //2-validation
  const validatedFields = schemaLogin.safeParse({
    email: formEmail,
    password: formPassword,
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please enter a valid inputs",
    };
  }

  //3- CHECK USER IN THE DB

  //assign data user to session
  session.userId = "1";
  session.name = "yassine";
  session.email = formEmail;
  session.role = role;
  session.isLoggedIn = true;
  session.permissions = ["create", "delete"];

  await session.save();

    redirect("/");
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};

export const changeRole = async () => {
  const session = await getSession();

  
  session.role = 'admin';
  await session.save();
  revalidatePath("/profile");
};


//call it after change it in backend
export const changeName = async (formData: FormData) => {
  const session = await getSession();

  const newname = formData.get("name") as string;

  name = newname;

  session.name = name;
  await session.save();
  revalidatePath("/profile");
};