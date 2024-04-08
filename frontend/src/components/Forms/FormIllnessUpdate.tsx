'use client'
import {  type FC, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { FormField } from './FormField';
import { SubmitButton } from '../ui/SubmitButton';
import toast from 'react-hot-toast';
import { updateIllness } from '@/actions/illnesses/update';

interface FormIllnessUpdateProps {
  id: number;
  name: string;
  onClose: () => void; // after update remove model
}

const FormIllnessUpdate: FC<FormIllnessUpdateProps> = ({id,name}) => {
  const t = useTranslations("ui");

  // ref linked with from
  const fromRef = useRef<HTMLFormElement>(null);

  //createing card useing server action
  async function onUpdate(format: FormData) {
    const result: any = await updateIllness(format);

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
      toast.success(" Illness Updated Successfully ");
      onClose()
     
    }
  }

  return (
    <form
      action={onUpdate}
      className="flex w-auto  flex-col   gap-2  items-center  "
    >
      <FormField
        id="name"
        name="name"
        type="text"
        placeholder={t("name")}
        title={t("name")}
        defaultValue={name}
      />
      <input hidden value={id} name="id"></input>
      <div className="w-full my-6 flex justify-center">
        <SubmitButton
          title={t("update")}
          style='bg-theme-color w-52 px-2 py-3 rounded-md text-white text-end"'
        />
      </div>
    </form>
  );
}
export default FormIllnessUpdate;