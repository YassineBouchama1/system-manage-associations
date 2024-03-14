
  "use server";
import { getSession } from "@/lib/getSessions";
import { revalidatePath } from "next/cache";

//call it after change it in backend
export const changeName = async (formData: FormData) => {
  const session = await getSession();

  const newname = formData.get("name") as string;

  session.name = newname;
  await session.save();
  revalidatePath("/profile");
};



export const changeRole = async () => {
  const session = await getSession();

  session.role = "user";
  await session.save();
  revalidatePath("/profile");
};
