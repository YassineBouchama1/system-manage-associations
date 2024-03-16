"use client";
import { login } from "@/actions/login";
import { logout } from "@/actions/profile";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { redirect } from "next/navigation";
import { useEffect } from "react";

import { useFormState } from "react-dom";



const initialState :any= {
  message: null ,
  errors: null,
};


export default function Login() {
  
  const [state, formAction] = useFormState(login, initialState);


  useEffect(() => {
    if (state?.type === "success") {
      redirect("/dashboard");
    }
  }, [state]);



  return (
    <>
      <form action={formAction} className="flex flex-col">
        {state?.type === "error" && (
          <p aria-live="polite" className=" text-red-500 ">
            {state.message}
          </p>
        )}
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" />
        {/* {state?.errors?.email && <span>{state.errors?.email.join(",")}</span>} */}

        <label htmlFor="password">password</label>
        <input type="password" id="password" name="password" />
        {/* {state?.errors?.password && <span>{state.errors.password.join(",")}</span>} */}

        <SubmitButton />
      </form>

    </>
  );
}
