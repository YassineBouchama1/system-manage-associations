import { logout } from "@/actions/auth/profile";
import SendEmailVerificationForm from "@/components/auth/SendEmailVerificationForm";
import VerifyEmailForm from "@/components/auth/VerifyEmailForm";
import { getSession } from "@/lib/getSessions";
import { redirect } from "next/navigation";

export default async function Page() {

  const session = await getSession()

// if already verefied redirect to dashboard
  if (session?.email_verified_at) {
    redirect("/dashboard");
  }

  //chekc if user auth or not
if(!session?.token){
  logout()
}

  return (
    <>
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
        <div className="max-w-xl px-5 text-center">
          <h2 className="mb-2 text-[42px] font-bold text-zinc-800">
            Check your inbox
          </h2>
          <p className="mb-2 text-lg text-zinc-500">
            We are glad, that you’re with us ? We’ve sent you a verification
            link to the email address{" "}
            <span className="font-medium text-indigo-500">{session && session.email}
            </span>
            .
          </p>
            <SendEmailVerificationForm />
        </div>
      </div>
    </>
  );
}
