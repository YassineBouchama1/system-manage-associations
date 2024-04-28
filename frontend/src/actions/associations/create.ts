"use server";
import fetchServer from "@/lib/fetch-server";
import fetchServerFormData from "@/lib/fetch-server-formData";
import { schemaAssociation } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cities from "../../lib/cities.json";

export const createAssociation = async (formData: FormData) => {
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


  // just for this time  insert region depand of city
const region = cities.find(item => item.id == city);
formData.append("region", region?.region as string);



  // sending data to api
  try {
    const association: Response = await fetchServerFormData({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + `/associations`,
      body: formData,
    });

    //refrech route
    revalidatePath("/dashboard/associations");

    //after successfully created return msg success
    return { success: "Created", error: null };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }
};
