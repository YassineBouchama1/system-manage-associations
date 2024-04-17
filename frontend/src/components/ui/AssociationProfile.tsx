"use client";
import { useTranslations } from "next-intl";
import { useRef, useState, type FC } from "react";

import SectionWrapper from "../Wrappers/SectionWrapper";

import { redirect, useParams } from "next/navigation";
import { AssociationType } from "@/types/association";
import Image from "next/image";
import BarChart from "../charts/patients/BarChart";
import BarChartAssociation from "../charts/association/BarChartAssociation";


interface AssociationProfileProps {

  association: AssociationType;
}

const AssociationProfile: FC<AssociationProfileProps> = ({

  association,
}) => {
  const t = useTranslations("ui");


  const param = useParams()
  



  return (
      <div>
        <Image
          className="size-24 rounded-full"
          src={association && association.logo}
          alt="upload img"
          width="200"
          height="200"
        />
        <div className="flex items-start flex-col gap-4 ">
          <div className="flex gap-2 items-center ltr:text-left rtl:text-right">
            <p className="text-lg font-bold ltr:text-left rtl:text-right">
              {t("name")}:
            </p>
            <span className="text-gray-400">
              {association && association.name}
            </span>
          </div>
          <div className="flex gap-2 items-center ltr:text-left rtl:text-right">
            <p className="text-lg font-bold ltr:text-left rtl:text-right">
              {t("address")}:
            </p>
            <span className="text-gray-400">
              {association && association.address}
            </span>
          </div>
          <div className="flex gap-2 items-center ltr:text-left rtl:text-right">
            <p className="text-lg font-bold ltr:text-left rtl:text-right">
              {t("city")}:
            </p>
            <span className="text-gray-400">
              {association && association.city}
            </span>
          </div>
        </div>
      </div>
    
  );
};
export default AssociationProfile;
