
import { fetchPatientById } from '@/actions/patients/getById';

import PatientsProfile from '@/components/Forms/PatientsProfile';
import { getSession } from '@/lib/getSessions';
import type { FC } from 'react';



export default async function Associations({
  params,
}: {
  params: { id: string | number };
}) {
const session = await getSession()

  //fetch association by id
  const { success: patientData, error: errorPatient } = await fetchPatientById(
    params.id
  );

  //fetch timelines by id
  // const { success: timeLInesData, error: timeLInesError } =
  //   await fetchTimeLines(params.id);

  // handle errors  if fetching Failed
  if (!patientData || errorPatient) {
    throw new Error(errorPatient.toString());
  }

  return (
    <div className="mt-4">
      <PatientsProfile patient={patientData}  />
    </div>
  );
};
