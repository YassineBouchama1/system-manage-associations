import { fetchAssociationById } from '@/actions/associations/getById';
import { fetchIllnessForSelectors } from '@/actions/illnesses/fetchIllnessForSelectors';
import { fetchPatientById } from '@/actions/patients/getById';
import AssociationsFormUpdate from '@/components/Forms/AssociationsFormUpdate';
import PatientsFormUpdate from '@/components/Forms/PatientsFormUpdate';
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
  const { success: illnessesData, error: errorIllnesses } =
    await fetchIllnessForSelectors();



  // handle errors  if fetching Failed
  if (errorpatient) {
    throw new Error(errorpatient.toString());
  }
  if (errorIllnesses) {
    throw new Error(errorIllnesses.toString());
  }
  return (
    <div className="mt-4">
      <PatientsFormUpdate
        patient={patientData}
      />
    </div>
  );
};
