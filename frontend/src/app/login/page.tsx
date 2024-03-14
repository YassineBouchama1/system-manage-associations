"use client";
import { login } from "@/actions/auth/login";
import { SubmitButton } from "@/components/ui/SubmitButton";

import { useFormState } from "react-dom";

const initialState = {
  message: null,
  errors: {},
};

export default function Signup() {
  const [state, formAction] = useFormState(login, initialState);
  console.log(state);
  return (
    <form action={formAction} className="flex flex-col">
      {/* {state?.type === "error" && (
        <p aria-live="polite" className="sr-only">
          {state.message}
        </p>
      )} */}
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email"  />
      {/* {state?.errors?.email && <span>{state.errors.email.join(",")}</span>} */}

      <label htmlFor="password">password</label>
      <input type="text" id="password" name="email"  />
      {/* {state?.errors?.password && <span>{state.errors.password.join(",")}</span>} */}

      <SubmitButton />
    </form>
  );
}
