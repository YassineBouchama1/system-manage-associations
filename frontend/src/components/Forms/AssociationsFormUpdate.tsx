"use client";
import { useTranslations } from "next-intl";
import { useRef, useState, type FC } from "react";

import FormHeader from "./FormHeader";
import { FormField } from "./FormField";
import Image from "next/image";
import { cn } from "@/lib/utils";
import FormFieldSelect from "./FormFieldSelect";
import { Option } from "@/types/generale";
import { SubmitButton } from "../ui/SubmitButton";
import SectionWrapper from "../Wrappers/SectionWrapper";
import UploaderImg from "../ui/UploaderImg";
import { IllnessType } from "@/types/illness";
import { createAssociation } from "@/actions/associations/create";
import toast from "react-hot-toast";
import { redirect, useParams } from "next/navigation";
import { AssociationType } from "@/types/association";
import cities from "../../lib/cities.json";
import { updateAssociation } from "@/actions/associations/update";

interface AssociationsFormUpdateProps {
  illnesses: IllnessType[];
  association: AssociationType;
}

const AssociationsFormUpdate: FC<AssociationsFormUpdateProps> = ({
  illnesses,
  association,
}) => {
  const t = useTranslations("ui");


  const param = useParams()
  // console.log(param);
  // ref linked with from

  //createing card useing server action
  async function onUpdate(format: FormData) {
    const result: any = await updateAssociation(
      format,
      param?.id as string,
      association
    );

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
      toast.success(t("update_association"));
    }
  }

const status = [
  { id: "active", name: "active" },
  { id: "inactive", name: "inactive" },
  { id: "suspended", name: "suspended" },
  { id: "deleted", name: "deleted" }
];



const colorStatus = (status:string) => {

  switch (status) {
    case "active":
      return "bg-green-500";
    case "inactive":
      return "bg-red-500";

    case "suspended":
      return "bg-blue-500";

    case "deleted":
      return "bg-black";
    default:
      break;
  }
};


  return (
    <SectionWrapper styles="md:px-20">
      <form
        action={onUpdate}
        className="w-auto flex-col items-start"
        encType="multipart/form-data"
      >
        <div className="flex justify-end">
          <p
            className={`${colorStatus(
              association.status
            )} text-white px-4 py-2 rounded-lg`}
          >
            {association && association.status}
          </p>
        </div>
        <FormHeader title={t("admin_Account")} />

        {/* start form  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-6">
          {/*  form item  */}

          {/*  form item  */}

          <FormField
            id="email"
            name="email"
            type="email"
            placeholder={t("email")}
            title={t("email")}
            disabled
            defaultValue={association.email}
          />
          {/*  form item  */}

          {/*  form item  */}
        </div>

        <FormHeader title={t("association_Informations")} />
        <div>
          {/* img upload  */}
          <UploaderImg
            name="logo"
            text={t("upload_ThPhoto")}
            defaultImg={association.logo}
          />

          {/* img upload  */}
          {/* forms PERSONAL INFORMATION  */}

          <div className="grid grid-cols-1  md:grid-cols-2 gap-10 mt-10">
            <FormField
              id="name"
              name="name"
              type="text"
              placeholder={t("name")}
              title={t("name")}
              defaultValue={association.name}
            />

            <FormField
              id="address"
              name="address"
              type="text"
              placeholder={t("address")}
              title={t("address")}
              defaultValue={association.address}
            />

            <FormFieldSelect
              title={t("city")}
              options={cities}
              name="city"
              defaultValue={association.city}
            />
            <FormFieldSelect
              title={t("illnesses")}
              options={illnesses}
              name="illness_id"
              defaultValue={association.illness_id}
            />
            <FormFieldSelect
              title={t("status")}
              options={status}
              name="status"
              defaultValue={association.status}
            />
          </div>
          {/* forms PERSONAL INFORMATION  */}
        </div>
        {/* end forms  */}
        <div className="w-full my-6 flex justify-center">
          <SubmitButton
            title={t("update")}
            style='bg-theme-color w-52 px-2 py-3 rounded-md text-white text-end"'
          />
        </div>
      </form>
    </SectionWrapper>
  );
};
export default AssociationsFormUpdate;
