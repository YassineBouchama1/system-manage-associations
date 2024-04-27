"use client";
import { useTranslations } from "next-intl";
import { useRef, useState, type FC } from "react";

import FormHeader from "./FormHeader";
import { FormField } from "./FormField";

import FormFieldSelect from "./FormFieldSelect";

import SectionWrapper from "../Wrappers/SectionWrapper";
import UploaderImg from "../ui/UploaderImg";


import {  useParams } from "next/navigation";
import cities from "../../lib/cities.json";

import { PatientType } from "@/types/patients";

import TimeLine from "../ui/TimeLine";
import Modal from "../Modal";

interface PatientsProfileProps {

  patient:PatientType
}

const PatientsProfile: FC<PatientsProfileProps> = ({patient}) => {
  const t = useTranslations("ui");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const param = useParams();



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
      <div className="w-auto flex-col items-start">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            TimeLine
          </button>
        
          {isOpen && (
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <TimeLine  />
            </Modal>
          )}
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
            disabled={true}
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
              disabled
              defaultValue={patient.first_name}
            />
            <FormField
              id="last_name"
              name="last_name"
              type="text"
              placeholder={t("last_name")}
              title={t("last_name")}
              disabled
              defaultValue={patient.last_name}
            />
            <FormField
              id="phone"
              name="phone"
              type="number"
              placeholder={t("phone_Number")}
              title={t("phone_Number")}
              disabled
              defaultValue={patient.phone}
            />
            <FormField
              id="current_address"
              name="current_address"
              type="text"
              placeholder={t("address")}
              title={t("address")}
              disabled
              defaultValue={patient.current_address}
            />

            <FormField
              id="date_of_birth"
              name="date_of_birth"
              type="date"
              placeholder={t("date_of_birth")}
              title={t("date_of_birth")}
              disabled
              defaultValue={patient.date_of_birth}
            />

            <FormFieldSelect
              title={t("city")}
              options={cities}
              name="city"
              disabled
              defaultValue={patient.city}
            />
            <FormFieldSelect
              title={t("status")}
              options={status}
              name="status"
              disabled
              defaultValue={patient.status}
            />
          </div>
          {/* forms PERSONAL INFORMATION  */}
        </div>
      </div>
    </SectionWrapper>
  );
};
export default PatientsProfile;
