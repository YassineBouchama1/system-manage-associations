// "use server";
// import fetchServer from "@/lib/fetch-server";
// import { schemaCard, schemaCardUpdate } from "@/lib/validations";
// import { error } from "console";
// import { revalidatePath } from "next/cache";

// export const updateCard = async (formData: FormData) => {
//   const name = formData.get("name");
//   const company = formData.get("company");
//   const title = formData.get("title");
//   const contact = formData.get("contact");
//   const id = formData.get("id");

//   console.log(id);
//   if (!id) {
//     return {
//       error: "no id",
//     };
//   }
//   //2-validation
//   const validatedFields = schemaCardUpdate.safeParse({
//     name,
//     company,
//     title,
//     contact,
//   });

//   //check validation
//   if (!validatedFields.success) {
//     return {
//       error: "zod pb",
//     };
//   }

//   try {
//     const cards = await fetchServer({
//       method: "PUT",
//       url: process.env.NEXT_PUBLIC_BACKEND_API_URL + `/cards/${id}`,
//       body: JSON.stringify({
//         name: name ? name : null,
//         company: company ? company : null,
//         title: title ? title : null,
//         contact: contact ? contact : null,
//       }),
//     });

//     if (!cards.ok) {
//       throw cards;
//     }

//     revalidatePath("/dashboard");

//     return { success: "deleted" };
//   } catch (error: any) {
//     // Error caught during execution
//     if (error.status) {
//       const responseBody = await error.text();
//       const errorObject: any = JSON.parse(responseBody);
//       return {
//         error: errorObject.message,
//       };

//       // if there is no error comes from server
//     } else {
//       return {
//         error: "pb in server",
//       };
//     }
//   }

//   // revalidatePath('/dashboard')
// };
