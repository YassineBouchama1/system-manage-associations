import { FormField } from "@/components/Forms/FormField";
import FormHeader from "@/components/Forms/FormHeader";
import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import { delay } from "@/lib/delay";

export default async function Home() {
  await delay(5000);

  return (
    <section>
      <h4 className="uppercase text-lg  pb-2 font-bold opacity-75">
        change Password
      </h4>
      <hr className="py-4" />
      <ChangePasswordForm />
    </section>
  );
}
