'use client'
import { useTranslations } from 'next-intl';
import { useRef, type FC } from 'react';

import FormHeader from './FormHeader';
import { FormField } from './FormField';

import FormFieldSelect from './FormFieldSelect';
import { SubmitButton } from '../ui/SubmitButton';
import SectionWrapper from '../Wrappers/SectionWrapper';
import UploaderImg from '../ui/UploaderImg';

import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import cities from "../../lib/cities.json";
import { createPatient } from '@/actions/patients/create';

interface PatientFormsProps {
  associationsList?: any[]
}

const PatientForms: FC<PatientFormsProps> = () => {
  const t = useTranslations("ui");


  // ref linked with from
  const fromRef = useRef<HTMLFormElement>(null);

  //createing card useing server action
  async function onCreate(format: FormData) {
    const result: any = await createPatient(format);

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
      toast.success("Added New Patient Successfully ");
      fromRef.current?.reset(); // reset form
      redirect("/dashboard/patients"); // redirect to list of associations
    }
  }

  return (
    <SectionWrapper styles="md:px-20">
      <form
        ref={fromRef}
        action={onCreate}
        className="w-auto flex-col items-start"
        encType="multipart/form-data"
      >
        <FormHeader title={t("patient_Informations")} />
        <div>
          {/* img upload  */}
          <UploaderImg name="avatar" text={t("upload_ThPhoto")} />

          {/* img upload  */}
          {/* forms PERSONAL INFORMATION  */}

          <div className="grid grid-cols-1  md:grid-cols-2 gap-10 mt-10">
            <FormField
              id="first_name"
              name="first_name"
              type="text"
              placeholder={t("first_name")}
              title={t("first_name")}
            />
            <FormField
              id="last_name"
              name="last_name"
              type="text"
              placeholder={t("last_name")}
              title={t("last_name")}
            />
            <FormField
              id="phone"
              name="phone"
              type="number"
              placeholder={t("phone_Number")}
              title={t("phone_Number")}
            />
            <FormField
              id="current_address"
              name="current_address"
              type="text"
              placeholder={t("address")}
              title={t("address")}
            />

            <FormField
              id="date_of_birth"
              name="date_of_birth"
              type="date"
              placeholder={t("date_of_birth")}
              title={t("date_of_birth")}
            />
    
            <FormFieldSelect title={t("city")} options={cities} name="city" />
          </div>
          {/* forms PERSONAL INFORMATION  */}
        </div>
        {/* end forms  */}
        <div className="w-full my-6 flex justify-center">
          <SubmitButton
            title={t("create")}
            style='bg-theme-color w-52 px-2 py-3 rounded-md text-white text-end"'
          />
        </div>
      </form>
    </SectionWrapper>
  );
};
export default PatientForms;