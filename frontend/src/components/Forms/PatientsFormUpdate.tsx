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

import toast from "react-hot-toast";
import { redirect, useParams } from "next/navigation";
import cities from "../../lib/cities.json";
import { updateAssociation } from "@/actions/associations/update";
import { updatePatient } from "@/actions/patients/update";
import { PatientType } from "@/types/patients";
import { getFormattedDateNow } from "@/lib/getFormattedDateNow";

interface PatientFormsProps {
  associationsList?: any[];
  patient:PatientType
}

const PatientsFormUpdate: FC<PatientFormsProps> = ({patient}) => {
  const t = useTranslations("ui");

  const param = useParams();
  // console.log(param);
  // ref linked with from

  //createing card useing server action
  async function onUpdate(format: FormData) {
    const result: any = await updatePatient(format, param?.id as string);

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
      toast.success(t("update_pateint"));
    }
  }

const status = [
  { id: "active", name: "active" },
  { id: "inactive", name: "inactive" },
  { id: "dead", name: "dead" },
  { id: "deleted", name: "deleted" },
];

const colorStatus = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500";
    case "inactive":
      return "bg-red-500";

    case "dead":
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
              patient.status
            )} text-white px-4 py-2 rounded-lg`}
          >
            {patient && patient.status}
          </p>
        </div>
        <FormHeader title={t("patient_Informations")} />
        <div>
          {/* img upload  */}
          <UploaderImg
            name="avatar"
            text={t("upload_ThPhoto")}
            defaultImg={patient.avatar}
          />

          {/* img upload  */}
          {/* forms PERSONAL INFORMATION  */}

          <div className="grid grid-cols-1  md:grid-cols-2 gap-10 mt-10">
            <FormField
              id="first_name"
              name="first_name"
              type="text"
              placeholder={t("first_name")}
              title={t("first_name")}
              defaultValue={patient.first_name}
            />
            <FormField
              id="last_name"
              name="last_name"
              type="text"
              placeholder={t("last_name")}
              title={t("last_name")}
              defaultValue={patient.last_name}
            />
            <FormField
              id="phone"
              name="phone"
              type="number"
              placeholder={t("phone_Number")}
              title={t("phone_Number")}
              defaultValue={patient.phone}
            />
            <FormField
              id="current_address"
              name="current_address"
              type="text"
              placeholder={t("address")}
              title={t("address")}
              defaultValue={patient.current_address}
            />

            <FormField
              id="date_of_birth"
              name="date_of_birth"
              type="date"
              placeholder={t("date_of_birth")}
              title={t("date_of_birth")}
              max={getFormattedDateNow()}
              defaultValue={patient.date_of_birth}
            />

            <FormFieldSelect
              title={t("city")}
              options={cities}
              name="city"
              defaultValue={patient.city}
            />
            <FormFieldSelect
              title={t("status")}
              options={status}
              name="status"
              defaultValue={patient.status}
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
export default PatientsFormUpdate;
