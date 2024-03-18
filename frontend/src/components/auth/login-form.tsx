"use client";
import { login } from "@/actions/login";
import { logout } from "@/actions/profile";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useTranslations } from "next-intl";

const initialState: any = {
  message: null,
  errors: null,
};

export default function LoginForm() {

  const t = useTranslations('login')
  const [state, formAction] = useFormState(login, initialState);
console.log(state);
  useEffect(() => {
    if (state?.type === "success") {
      redirect("/dashboard");
    }
  }, [state]);

  return (
    <form className="space-y-4 md:space-y-6" action={formAction}>
      {state?.type === "error" && (
        <p aria-live="polite" className=" text-red-500 ">
          {state.message}
        </p>
      )}
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {t("email")}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@email.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {t("password")}
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-500 dark:ring-offset-gray-800"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="remember"
              className="text-gray-500 dark:text-gray-300"
            >
              {t("RememberMe")}
            </label>
          </div>
        </div>
        <a
          href="#"
          className="text-sm font-medium text-green-500 hover:underline dark:text-primary-500"
        >
          {t("forgetPassword")}
        </a>
      </div>
      <SubmitButton
        title="Sign in"
        style=" w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      />

      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        {t("dontHaveAccount")}{" "}
        <Link
          href="/register"
          className="font-medium text-green-500 hover:underline dark:text-primary-500"
        >
          {t("signUp")}
        </Link>
      </p>
    </form>
  );
}
