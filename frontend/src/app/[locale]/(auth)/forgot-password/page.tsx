import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1>Forgot password</h1>

      <ForgotPasswordForm />

      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </>
  );
}
