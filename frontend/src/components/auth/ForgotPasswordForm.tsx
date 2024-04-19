"use client";
import { login } from "@/actions/auth/login";
import { logout } from "@/actions/auth/profile";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { redirect } from "next/navigation";
import { useEffect, useTransition } from "react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { forgotPassword } from "@/actions/auth/forgotPassword";
import { FormFieldAuth } from "./FormFieldAuth";

const initialState: any = {
  message: null,
  errors: null,
};

export default function ForgotPasswordForm() {
  const t = useTranslations("auth");
  const [isPending, startTransition] = useTransition();

  //send request to api useing server action
  async function onResetPassword(formData: FormData) {
    const { errorZod, error, success }: any = await forgotPassword(formData);

    // handle erros from api
    if (error) {
      toast.error(error);
    }

    //handle zod errors
    else if (errorZod) {
      Object.keys(errorZod).forEach((key: string) => {
        toast.error(`${key} ${errorZod[key]}`);
      });
    } else {
      toast.success("We Sent You Email");
    }
  }

  return (
    <form action={onResetPassword} className="space-y-4 md:space-y-6">
      <FormFieldAuth id="email" name="email" type="email" title={t("email")} />

      <SubmitButton
        title={t("send")}
        loadingForm={t("send") + "..."}
        style=" w-full text-white bg-theme-color hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      />

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
