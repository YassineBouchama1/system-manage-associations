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
import { getFormattedDateNow } from '@/lib/getFormattedDateNow';

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
      toast.success(t("new_pateint"));
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
              max={getFormattedDateNow()}
              placeholder={t("date_of_birth")}
              title={t("date_of_birth")}
            />

            <FormFieldSelect title={t("city")} options={cities} name="city" />
          </div>
          {/* forms PERSONAL INFORMATION  */}
        </div>

        <FormHeader title={"files Related"} />

        <div className="flex  gap-10 mt-10 flex-wrap justify-start ">
          <div className="font-[sans-serif]  mx-auto">
            <label className="text-base text-gray-500 font-semibold mb-2 block">
              Upload file
            </label>
            <input
              type="file"
              className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
            />
            <p className="text-xs text-gray-400 mt-2">
              PNG, JPG SVG, WEBP, and GIF are Allowed.
            </p>
          </div>
          <div className="font-[sans-serif]  mx-auto">
            <label className="text-base text-gray-500 font-semibold mb-2 block">
              Upload file
            </label>
            <input
              type="file"
              className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
            />
            <p className="text-xs text-gray-400 mt-2">
              PNG, JPG SVG, WEBP, and GIF are Allowed.
            </p>
          </div>
        </div>
        {/* end forms  */}
        <div className="w-full my-6 flex justify-center">
          <SubmitButton
            title={t("create")}
            style="bg-theme-color text-white w-52 px-2 py-3 rounded-md"
          />
        </div>
      </form>
    </SectionWrapper>
  );
};
export default PatientForms;