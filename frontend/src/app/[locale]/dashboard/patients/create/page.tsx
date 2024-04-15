import { fetchIllnessForSelectors } from '@/actions/illnesses/fetchIllnessForSelectors';
import AssociationsForm from '@/components/Forms/AssociationsForm';
import PatientForms from '@/components/Forms/PatientForms';
import { getSession } from '@/lib/getSessions';


export default async function Page() {
  const session = await getSession();


  return (
    <div className="mt-4">
      <PatientForms  />
    </div>
  );
}
