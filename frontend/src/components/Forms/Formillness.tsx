'use client'
import { useState, type FC, useRef } from 'react';
import { useTranslations } from 'next-intl';
import UploaderImg from '../ui/UploaderImg';
import { FormField } from './FormField';
import { SubmitButton } from '../ui/SubmitButton';
import Modal from '../Modal';
import { createIllness } from '@/actions/illnesses/create';
import toast from 'react-hot-toast';

interface FormillnessProps {}

const Formillness: FC<FormillnessProps> = ({}) => {
  const t = useTranslations("ui");

  // ref linked with from
  const fromRef = useRef<HTMLFormElement>(null);

  //createing card useing server action
  async function onCreate(format: FormData) {
    const result: any = await createIllness(format);

    // handle erros from api
    if (result?.error) {
      toast.error(result?.error);
    }

    //handle zod errors
    else if (result?.errorZod) {
      Object.keys(result.errorZod).forEach((key: string) => {
        toast.error(`${key} ${result.errorZod[key]}`);
      });
    } else {
      toast.success("Added New Illness Successfully ");
      fromRef.current?.reset(); // reset form
    }
  }

  return (
    <form
      action={onCreate}
      className="flex w-auto  flex-col   gap-2  items-center  "
    >


      <FormField
        id="name"
        name="name"
        type="text"
        placeholder={t("name")}
        title={t("name")}
      />
      <div className="w-full my-6 flex justify-center">
        <SubmitButton
          title={t("create")}
          style='bg-theme-color w-52 px-2 py-3 rounded-md text-white '
        />
      </div>
    </form>
  );
}
export default Formillness;