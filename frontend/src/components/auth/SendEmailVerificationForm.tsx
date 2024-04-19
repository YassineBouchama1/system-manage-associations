"use client";

import fetchClient from "@/lib/fetch-client";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { SubmitButton } from "../ui/SubmitButton";
import { useState } from "react";
import { sendEmailVerification } from "@/actions/auth/sendEmailVerification";

export default function SendEmailVerificationForm() {
  const [isVerified, setIsVerified] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60);
  const [canResendEmail, setCanResendEmail] = useState<boolean>(false); // Flag for resend button

  //send request to api useing server action
  async function onSendEmailVerification() {
    const { errorZod, error, success }: any = await sendEmailVerification();


    if (success){
      setIsVerified(true);
        toast.success(success);
        // if email already verified  send user to dashboard
     if (success.includes("already"))    redirect("/dashboard");
       return;
    }

      if (error) {
        // handle erros from api
        toast.error(error);
         setCanResendEmail(true);
          setIsVerified(true);
          
          return;
      }

      //handle zod errors
      else if (errorZod) {
        Object.keys(errorZod).forEach((key: string) => {
          toast.error(`${key} ${errorZod[key]}`);
        });
      } else {
        
        toast.success("there is a problem try again");
       
      }
  }

  return (
    <div>
      {canResendEmail ? (
        <p className="text-green-500">
          Verification link sent. Please check your email and come back in{" "}
          {secondsRemaining} seconds.
        </p>
      ) : (
        <form action={onSendEmailVerification}>
          <SubmitButton
            title="Resend verification email "
            loadingForm={"sending"}
            style=" w-full text-white bg-theme-color hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          />
        </form>
      )}
    </div>
  );
}

