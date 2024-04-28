'use client'
import { PatientType } from '@/types/patients';
import Image from 'next/image';
import type { FC } from 'react';
import QRCode from "react-qr-code";
interface PatientPdfProps {
        patient:PatientType
}

const PatientPdf: FC<PatientPdfProps> = ({patient}) => {


        return (
          <main className="p-6 ">
            <div className="flex justify-between gap-2 items-start  py-2">
              <div className="">
                <QRCode
                  value={patient.id.toString()}
                  style={{ height: "auto", width: "60px" }}
                />

                {/* <p className="font-semibold text-sm">{patient && patient.id}</p> */}
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/logoMorocco.png"
                  alt="logo morocc"
                  className="w-20 h-auto"
                />
                <p className="">نموذج هوية المريض الإلكتروني</p>
                <p className="">Formulaire d identité Patient Électronique</p>
              </div>
              <div>
                <img
                  src={patient && patient.avatar}
                  alt="logo morocc"
                  className="w-20 h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
            <div className="w-full bg-[#f4f4f4] py-2 flex justify-center gap-3 my-2">
              <p>معلومات المريض</p>
              <p>INFORMATIONS PATIENTES</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-start gap-x-6 mt-3">
                <p className="font-light text-sm">Nom:</p>
                <span className=" text-base">
                  {patient && patient.first_name}
                </span>
              </div>
              <div className="flex justify-start gap-x-6 mt-3">
                <p className="font-light text-sm">Prenom:</p>
                <span className=" text-base">
                  {patient && patient.last_name}
                </span>
              </div>

              <div className="flex justify-start gap-x-6 mt-3">
                <p className="font-light text-sm">Date de naissance:</p>
                <span className=" text-base">
                  {patient && patient.date_of_birth}
                </span>
              </div>
            </div>
          </main>
        );
}
export default PatientPdf;