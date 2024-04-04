"use client";

import fetchClient from "@/lib/fetch-client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const url = searchParams.get("url");
      const signature = searchParams.get("signature");
      const pathname = `/verify-email/${url}&signature=${signature}`;
      const response = await fetchClient({
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + pathname,
      });

      if (!response.ok) {
        throw response;
      }

      //after verified susccessfully
      toast.success("Verifed Successfully ");

      router.push("/dashboard");
    } catch (error) {
      throw new Error("Could not verify email", { cause: error });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Verify</button>
    </form>
  );
}
