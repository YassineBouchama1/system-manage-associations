import VerifyEmailForm from "@/components/auth/VerifyEmailForm";
import HeaderHome from "@/components/ui/HeaderHome";
import { getSession } from "@/lib/getSessions";
import { redirect } from "next/navigation";

export default async function Page() {

  const session =  await getSession()
    if (session?.email_verified_at) {
      redirect("/dashboard");
    }
  return (
    <>
      <HeaderHome />
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
        <div className="max-w-xl px-5 text-center">
          <h2 className="mb-2 text-[42px] font-bold text-zinc-800">
            Verify email{" "}
          </h2>
          <div className="mt-3 inline-block w-96  ">
            <VerifyEmailForm />
          </div>
        </div>
      </div>
    </>
  );
}
