import { illnessAction } from "@/actions/illnesses";
import HeaderTable from "@/components/Table/HeaderTable";
import ReusableTable from "@/components/Table/ReusableTable";
import SectionWrapper from "@/components/Wrappers/SectionWrapper";
import { delay } from "@/lib/delay";
import { ResponseIllnessType } from "@/types/illness";
import { setTimeout } from "timers";

export default async function Home() {
    // await delay(4000);

  const { success, error }: { success?: ResponseIllnessType ,error?: string } =
    await illnessAction();

  // if(error)return Error(error)
  if (error) {
    throw new Error(error);
  }

const columns: string[] = [
  "id",
  "name",
  "associations",
  "deleted_at",
  "created_at",
  "updated_at",
];




  return <ReusableTable columns={columns} data={success?.data} />;
}
  