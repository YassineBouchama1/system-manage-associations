import { PatientType } from '@/types/patients';
import Image from 'next/image';
import type { FC } from 'react';

interface PatientPdfProps {
        patient:PatientType
}

const PatientPdf: FC<PatientPdfProps> = ({patient}) => {
        return (
          <main className="py-6">
            <div className="flex justify-center gap-2  py-2">
              <div className="flex flex-col items-center">
                <img 
                src="/logoMorocco.png"
                alt='logo morocc'
                className='w-auto h-20'
                />
                <p className="">نموذج هوية المريض الإلكتروني</p>
                <p className="">Formulaire d'identité Patient Électronique</p>
              </div>
            </div>
            <div className="w-full bg-[#f4f4f4] py-2 flex justify-center gap-3">
              <p>معلومات المريض</p>
              <p>INFORMATIONS PATIENTES</p>
            </div>

            <div>name:{patient && patient.first_name}</div>
          </main>
        );
}
export default PatientPdf;