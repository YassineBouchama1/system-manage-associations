"use client";

import fetchClient from "@/lib/fetch-client";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { SubmitButton } from "../ui/SubmitButton";
import { useTranslations } from "next-intl";
import { FormFieldAuth } from "./FormFieldAuth";
import toast from "react-hot-toast";
import { useRef } from "react";
import { resetPassword } from "@/actions/auth/resetPassword";
import Link from "next/link";

export default function PasswordResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("auth");

  // ref linked with from
  const fromRef = useRef<HTMLFormElement>(null);

  // change password useing server action
  async function onResetPassword(format: FormData) {
//append token to send it  to api
  format.set("token", searchParams.get("token") || "");

    const response: any = await resetPassword(format);

    // handle erros from api
    if (response?.error) {
      toast.error(response?.error);
    }

    //handle zod errors
    else if (response?.errorZod) {
      Object.keys(response.errorZod).forEach((key: string) => {
        toast.error(`${key} ${response.errorZod[key]}`);
      });
    } else {
      toast.success("Password Chanaged Successfully ");
      fromRef.current?.reset(); // reset form
      redirect('/login')
    }
  }

  return (
    <form action={onResetPassword} className="space-y-4 md:space-y-6">
      <FormFieldAuth
        id="email"
        name="email"
        type="email"
        title={t("password")}
        defaultValue={searchParams.get("email") || ""}
      />

      <FormFieldAuth
        id="password"
        name="password"
        type="password"
        title={t("password")}
      />

      <FormFieldAuth
        id="password_confirmation"
        name="password_confirmation"
        type="password"
        title="password confirmation"
      />
      <div className="w-full my-6 flex justify-center">
        <SubmitButton
          title={t("reset_Password")}
          style=" w-full text-white bg-theme-color hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        />
      </div>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        {t("remamberedPassword")}{" "}
        <Link
          href="/login"
          className="font-medium text-green-500 hover:underline dark:text-primary-500"
        >
          {t("SignIn")}
        </Link>
      </p>
    </form>
  );
}
