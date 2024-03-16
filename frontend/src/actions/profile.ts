
  "use server";
import { getSession } from "@/lib/getSessions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//call it after change it in backend
export const changeName = async (formData: FormData) => {
  const session = await getSession();

  const newname = formData.get("name") as string;

  session.name = newname;
  await session.save();
  revalidatePath("/profile");
};

export const getSessionClient = async () => {
  const session = await getSession();

return session;
};

export const changeRole = async () => {
  const session = await getSession();

  session.role = "user";
  await session.save();
  revalidatePath("/profile");
};


export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};
