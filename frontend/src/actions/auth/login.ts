import { getSession } from "@/lib/getSessions";
import { redirect } from "next/navigation";
import { z } from "zod";

let name = "yass";
let role = "admin";
let isBlocked = false;

export const login = async (prevState: any, formData: FormData) => {
  const session = await getSession();

  const formEmail = formData.get("name") as string;
  const formPassword = formData.get("password") as string;

  //1-create schema
  const schemaLogin = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  //2-validation
  const validatedFields = schemaLogin.safeParse({
    email: formEmail,
    password: formPassword,
  });

  console.log(validatedFields);
  // Return early if the form data is invalid
  //   if (!validatedFields.success) {
  //     return {
  //       type: "error",
  //       errors: validatedFields.error.flatten().fieldErrors,
  //       message: "Please enter a valid inputs",
  //     };
  //   }

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
