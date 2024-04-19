"use server";
import fetchServer from "@/lib/fetch-server";
import fetchServerFormData from "@/lib/fetch-server-formData";
import { schemaAssociation, schemaAssociationUpdate, schemaPatientUpdate } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { string } from "zod";



export const updatePatient = async (formData: FormData, id: string) => {
  if (!id) {
    return {
      error: "no id",
    };
  }

  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const current_address = formData.get("current_address");
  const phone = formData.get("phone");
  const city = formData.get("city");
  const date_of_birth = formData.get("date_of_birth");

  const avatar: any = formData.get("avatar");
  console.log(avatar?.name === "undefined");

  // if user dosnt pass a new avatar remove it from formdata
  if (avatar?.name === "undefined") formData.delete("avatar");

  //2-validation useing zod
  const validatedFields = schemaPatientUpdate.safeParse({
    first_name,
    last_name,
    current_address,
    date_of_birth,
    phone,
    city,
  });

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
    const association: Response = await fetchServerFormData({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + `/patients/${id}`,
      body: formData,
    });


    //refrech route
    revalidatePath("/dashboard/patients");

    //after successfully Updated return msg success
    return { success: "Updated", error: null };
  } catch (error: any) {
    return {
      success: null,
      error: error.message,
    };
  }
};



