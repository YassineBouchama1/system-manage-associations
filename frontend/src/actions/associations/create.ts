"use server";
import fetchServer from "@/lib/fetch-server";
import { schemaAssociation } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export const createAssociation = async (formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const phone = formData.get("phone");
  const city = formData.get("city");
  const illness = formData.get("illness_id");
  const logo = formData.get("logo");

  if (!logo) return { error: "logo required" };

console.log(logo);
  //2-validation useing zod
  const validatedFields = schemaAssociation.safeParse({
    name,
    email,
    password,
    phone,
    city,
    illness
  });


  //check validation
  if (!validatedFields.success) {
    return {
      errorZod: validatedFields.error.flatten().fieldErrors,
    };
  }

  // sending data to api
  try {
    const illness = await fetchServer({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + `/illnesses`,
      body: JSON.stringify(validatedFields.data),
    });

    if (!illness.ok) {
      throw illness;
    }


    //refrech route
    revalidatePath("/dashboard/illnesses");

    //after successfully created return msg success
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
