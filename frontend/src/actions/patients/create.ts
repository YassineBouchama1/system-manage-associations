"use server";
import fetchServer from "@/lib/fetch-server";
import fetchServerFormData from "@/lib/fetch-server-formData";
import { schemaAssociation, schemaPatient } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPatient = async (formData: FormData) => {
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const current_address = formData.get("current_address");
  const phone = formData.get("phone");
  const city = formData.get("city");
  const avatar = formData.get("avatar");
  const date_of_birth = formData.get("date_of_birth");

  if (!avatar || typeof avatar !== "object" || !(avatar instanceof File))
    return { error: "avatar required" };

  //2-validation useing zod
  const validatedFields = schemaPatient.safeParse({
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

  // sending data to api
  try {
    const patient = await fetchServerFormData({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + `/patients`,
      body: formData,
    });

    if (!patient.ok) {
      throw patient;
    }

    //refrech route
    revalidatePath("/dashboard/patients");

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
