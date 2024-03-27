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

interface AssociationsFormProps {}

const AssociationsForm: FC<AssociationsFormProps> = ({}) => {
    const t = useTranslations('ui')
  const [imageUrl, setImageUrl] = useState<string>("/imgUploader.png");



  //onchange logo of assostaion
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      // Check if uploaded file is an image
      if (!uploadedFile.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }
      const newImageUrl = URL.createObjectURL(uploadedFile);
      setImageUrl(newImageUrl);
    }
  };



  // dumy data of cities
const cities: Option[] = [
  { value: "safi", label: "Safi" },
  { value: "marrakech", label: "Marrakech" },
  { value: "casablanca", label: "Casablanca" },
];

        return (
          <section className="bg-white rounded-md w-full min-h-screen px-2 md:px-20 py-6">
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
                <div className="w-full flex flex-wrap flex-col items-center">
                  <label htmlFor="img" className="cursor-pointer text-center">
                    <Image
                      className="size-24 rounded-full"
                      src={imageUrl}
                      alt="upload img"
                      width="200"
                      height="200"
                    />
                    <p className="text-theme-color">{t("upload_ThPhoto")}</p>
                  </label>

                  <input
                    className="hidden"
                    id="img"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  ></input>
                </div>
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
          </section>
        );
}
export default AssociationsForm;