"use client";

import fetchClient from "@/lib/fetch-client";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { SubmitButton } from "../ui/SubmitButton";
import { verifyEmail } from "@/actions/auth/verifyEmail";
import { useState } from "react";
import { Verified } from "lucide-react";

export default function VerifyEmailForm() {

  const [isVerified, setIsVerified] = useState(false);
  const searchParams = useSearchParams();


  //send request to api useing server action
  async function onVerifyEmail() {
    const url = searchParams.get("url") || ""; // bring url frontend
    const signature = searchParams.get("signature") || ""; // bring signature to make sure which account verify

    const { errorZod, error, success }: any = await verifyEmail(url,signature);


 if (success) {
   setIsVerified(true);

   toast.success(success);
   redirect("/login");
  
 }


    // handle erros from api
    if (error) {
      toast.error(error);
      return
    }

    //handle zod errors
    else if (errorZod) {
      Object.keys(errorZod).forEach((key: string) => {
        toast.error(`${key} ${errorZod[key]}`);
      });
    } else {
      toast.success("there is a pb in server");
    }
  }

  return (
    <div>
      {isVerified ? (
        <h2 className="text-green-500">Verified!</h2>
      ) : (
        <form action={onVerifyEmail}>
          <SubmitButton
            title="Verify"
            style=" w-full text-white bg-theme-color hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          />
        </form>
      )}

    </div>
  );
}

