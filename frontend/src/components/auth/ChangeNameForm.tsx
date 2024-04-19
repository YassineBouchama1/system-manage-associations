// "use client";
// import { useState, type FC, useRef } from "react";
// import { useTranslations } from "next-intl";
// import UploaderImg from "../ui/UploaderImg";
// import { SubmitButton } from "../ui/SubmitButton";
// import Modal from "../Modal";
// import { createIllness } from "@/actions/illnesses/create";
// import toast from "react-hot-toast";
// import { FormField } from "../Forms/FormField";
// import { changePassword } from "@/actions/auth/changePassword";
// import { FormFieldAuth } from "./FormFieldAuth";

// interface ChangeNameFormProps {}

// const ChangeNameForm: FC<ChangeNameFormProps> = ({}) => {
//   const t = useTranslations("ui");

//   // ref linked with from
//   const fromRef = useRef<HTMLFormElement>(null);

//   // change password useing server action
//   async function onChangeName(format: FormData) {
//     const result: any = await changeName(format);

//     // handle erros from api
//     if (result?.error) {
//       toast.error(result?.error);
//     }

//     //handle zod errors
//     else if (result?.errorZod) {
//       Object.keys(result.errorZod).forEach((key: string) => {
//         toast.error(`${key} ${result.errorZod[key]}`);
//       });
//     } else {
//       toast.success("Password Chanaged Successfully ");
//       fromRef.current?.reset(); // reset form
//     }
//   }

//   return (
//     <form
//       action={onChangeName}
//       ref={fromRef}
//       className="space-y-4 md:space-y-6"
//     >
//       <FormFieldAuth
//         id="name"
//         name="name"
//         type="name"
//         placeholder={"new name"}
//         title={"new name"}
//       />
     
//       <div className="w-full my-6 flex justify-center">
//         <SubmitButton
//           title={t("update")}
//           style=" w-full text-white bg-theme-color hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//         />
//       </div>
//     </form>
//   );
// };
// export default ChangeNameForm;
