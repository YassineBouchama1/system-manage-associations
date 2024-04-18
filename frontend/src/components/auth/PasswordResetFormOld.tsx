"use client";

import fetchClient from "@/lib/fetch-client";
import { useRouter, useSearchParams } from "next/navigation";
import { FormField } from "../Forms/FormField";

export default function PasswordResetFormOld() {
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      formData.set("token", searchParams.get("token") || "");

      const response = await fetchClient({
        method: "POST",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/reset-password",
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw response;
      }

      router.push("/login");
    } catch (error) {
      if (error instanceof Response) {
        const response = await error.json();

        if (!response.errors) {
          throw error;
        }

        return Object.keys(response.errors).map((errorKey) => {
          const input = document.querySelector(
            `[name="${errorKey}"]`
          ) as HTMLInputElement;
          input.setCustomValidity(response.errors[errorKey]);
          input.reportValidity();
        });
      }

      throw new Error("An error has occurred during password reset request");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <FormField
        id="email"
        name="email"
        type="email"
        title="email"
        defaultValue={searchParams.get("email") || ""}
      />

      <label htmlFor="password">Password</label>
      <FormField
        id="password"
        name="password"
        type="password"
        title="password"
        defaultValue="password"
      />

      <label htmlFor="password_confirmation">Password confirmation</label>
      <FormField
        id="password_confirmation"
        name="password_confirmation"
        type="password"
        title="password confirmation"
        defaultValue="password"
      />

      <button type="submit">Reset password</button>
    </form>
  );
}
