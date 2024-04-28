"use server";
import fetchServer from "@/lib/fetch-server";
import fetchServerFormData from "@/lib/fetch-server-formData";
import { schemaAssociation, schemaAssociationUpdate } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import cities from "../../lib/cities.json";

export const updateAssociation = async (
  formData: FormData,
  id: string,
  oldData: any
) => {
  if (!id) {
    return {
      error: "no id",
    };
  }

  const name = formData.get("name");
  const address = formData.get("address");
  const city = formData.get("city");
  const illness = formData.get("illness_id");

  const logo: any = formData.get("logo");
  console.log(logo?.name === "undefined");

  // if user dosnt pass a new logo remove it from formdata
  if (logo?.name === "undefined") formData.delete("logo");

  //2-validation useing zod
  const validatedFields = schemaAssociationUpdate.safeParse({
    name,
    city,
    illness,
    address,
  });



const region = cities.find((item) => item.id == city);

formData.append("region", region?.region as string);

  //check validation
  if (!validatedFields.success) {
    return {
      errorZod: validatedFields.error.flatten().fieldErrors,
    };
  }

  // passing method put  becouse laravel dosnt accept it with normal way
  formData.append("_method", "PUT");
  // sending data to api
  try {
    const association = await fetchServerFormData({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + `/associations/${id}`,
      body: formData,
    });

    const response = await association.json();

    //refrech route
    revalidatePath("/dashboard/associations");

    //after successfully created return msg success
    return {
      success: "Updated",
      error: null,
    };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }
};
