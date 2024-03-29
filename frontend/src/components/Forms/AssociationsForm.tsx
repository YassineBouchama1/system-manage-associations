'use client'
import { useTranslations } from 'next-intl';
import { useState, type FC } from 'react';

import FormHeader from './FormHeader';
import { FormField } from './FormField';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import FormFieldSelect from './FormFieldSelect';
import { Option } from '@/types/generale';
import { SubmitButton } from '../ui/SubmitButton';
import SectionWrapper from '../Wrappers/SectionWrapper';
import UploaderImg from '../ui/UploaderImg';

interface AssociationsFormProps {}

const AssociationsForm: FC<AssociationsFormProps> = ({}) => {
    const t = useTranslations('ui')



  // dumy data of cities
const cities: Option[] = [
  { value: "safi", label: "Safi" },
  { value: "marrakech", label: "Marrakech" },
  { value: "casablanca", label: "Casablanca" },
];

        return (
          <SectionWrapper styles="md:px-20">
            <form className="w-auto flex-col items-start    ">
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

                  <FormFieldSelect title={t("city")} options={cities} />
                  <FormFieldSelect title={t("illnesses")} options={cities} />
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
}
export default AssociationsForm;