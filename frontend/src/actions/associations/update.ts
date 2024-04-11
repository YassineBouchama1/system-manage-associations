"use server";
import fetchServer from "@/lib/fetch-server";
import fetchServerFormData from "@/lib/fetch-server-formData";
import { schemaAssociation } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateAssociation = async (formData: FormData) => {

  if (!id) {
    return {
      error: "no id",
    };
  }


  const name = formData.get("name");
  const address = formData.get("address");
  const email = formData.get("email");
  const password = formData.get("password");
  const phone = formData.get("phone");
  const city = formData.get("city");
  const illness = formData.get("illness_id");
  const logo = formData.get("logo");

  formData.append("nameAdmin", `admin ${formData.get("name")}`);
  formData.append("role_id", "2");


  if (!logo || typeof logo !== "object" || !(logo instanceof File))
    return { error: "logo required" };

  //2-validation useing zod
  const validatedFields = schemaAssociation.safeParse({
    name,
    email,
    password,
    phone,
    city,
    illness,
    address,
    logo,
  });

  //check validation
  if (!validatedFields.success) {
    return {
      errorZod: validatedFields.error.flatten().fieldErrors,
    };
  }

  // sending data to api
  try {
    const association = await fetchServerFormData({
      method: "PUT",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + `/associations/${id}`,
      body: formData,
    });

    if (!association.ok) {
      throw association;
    }

    //refrech route
    revalidatePath("/dashboard/associations");

    //after successfully created return msg success
    return { success: "Created" };
  } catch (error: any) {
    // Error caught during execution
    if (error.status) {
      const responseBody = await error.text();
      const errorObject: any = JSON.parse(responseBody);

      console.log(errorObject);
      return {
        error: errorObject.message,
      };
    } else {
      return { error: "pb in server" };
    }
  }
};
