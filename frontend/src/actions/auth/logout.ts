;
import { getSession } from "@/lib/sessionsOptions";
import { redirect } from "next/navigation";

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};
