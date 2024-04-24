'use client'
import { useTranslations } from 'next-intl';
import { useRef, useState, type FC } from 'react';

import FormHeader from './FormHeader';
import { FormField } from './FormField';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import FormFieldSelect from './FormFieldSelect';
import { Option } from '@/types/generale';
import { SubmitButton } from '../ui/SubmitButton';
import SectionWrapper from '../Wrappers/SectionWrapper';
import UploaderImg from '../ui/UploaderImg';
import { IllnessType } from '@/types/illness';
import { createAssociation } from '@/actions/associations/create';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import cities from "../../lib/cities.json";

interface AssociationsFormProps {
  illnesses: IllnessType[]
}

const AssociationsForm: FC<AssociationsFormProps> = ({ illnesses }) => {
  const t = useTranslations("ui");



  // ref linked with from
  const fromRef = useRef<HTMLFormElement>(null);

  //createing card useing server action
  async function onCreate(format: FormData) {
    const result: any = await createAssociation(format);

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
      toast.success("Added New Assosiation Successfully ");
      fromRef.current?.reset(); // reset form
      redirect("/dashboard/associations"); // redirect to list of associations
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
        <FormHeader title={t("admin_Account")} />

        {/* start form  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-6">
          {/*  form item  */}

          <FormField
            id="role"
            name="role"
            type="text"
            placeholder={t("role")}
            title={t("role")}
            disabled
          />

          {/*  form item  */}

          <FormField
            id="email"
            name="email"
            type="email"
            placeholder={t("email")}
            title={t("email")}
          />
          {/*  form item  */}

          <FormField
            id="password"
            name="password"
            type="password"
            placeholder="************"
            title={t("password")}
          />
          {/*  form item  */}
        </div>

        <FormHeader title={t("association_Informations")} />
        <div>
          {/* img upload  */}
          <UploaderImg name="logo" text={t("upload_ThPhoto")} />

          {/* img upload  */}
          {/* forms PERSONAL INFORMATION  */}

          <div className="grid grid-cols-1  md:grid-cols-2 gap-10 mt-10">
            <FormField
              id="name"
              name="name"
              type="text"
              placeholder={t("name")}
              title={t("name")}
            />
            <FormField
              id="phone"
              name="phone"
              type="number"
              placeholder={t("phone_Number")}
              title={t("phone_Number")}
            />
            <FormField
              id="address"
              name="address"
              type="text"
              placeholder={t("address")}
              title={t("address")}
            />

            <FormFieldSelect title={t("city")} options={cities} name="city" />
            <FormFieldSelect
              title={t("illnesses")}
              options={illnesses}
              name="illness_id"
            />
          </div>
          {/* forms PERSONAL INFORMATION  */}
        </div>
        

        {/* end forms  */}
        <div className="w-full my-6 flex justify-center ">
          <SubmitButton
            title={t("create")}
            style="bg-theme-color w-52 px-2 py-3 rounded-md text-white hover:bg-theme-color/80 duration-150"
          />
        </div>
      </form>
    </SectionWrapper>
  );
};
export default AssociationsForm;