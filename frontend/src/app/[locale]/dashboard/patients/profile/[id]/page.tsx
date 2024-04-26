import { fetchAssociationById } from '@/actions/associations/getById';
import { fetchIllnessForSelectors } from '@/actions/illnesses/fetchIllnessForSelectors';
import { fetchPatientById } from '@/actions/patients/getById';
import AssociationsFormUpdate from '@/components/Forms/AssociationsFormUpdate';
import PatientsFormUpdate from '@/components/Forms/PatientsFormUpdate';
import PatientsProfile from '@/components/Forms/PatientsProfile';
import type { FC } from 'react';



export default async function Associations({
  params,
}: {
  params: { id: string | number };
}) {


  //fetch association by id
  const { success: patientData, error: errorpatient } = await fetchPatientById(
    params.id
  );

  //fetch list of illnesses
  // const { success: illnessesData, error: errorIllnesses } =
  //   await fetchIllnessForSelectors();


    // handle errors  if fetching Failed
 if (!patientData || errorpatient) {
   throw new Error(errorpatient.toString());
 }



  return (
    <div className="mt-4">
      <PatientsProfile patient={patientData} />
    </div>
  );
};
