import { illnessAction } from "@/actions/illnesses";
import IllnessTable from "@/components/Table/IllnessTable";
import { ResponseIllnessType } from "@/types/illness";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
 
  // const query = "?q&page=1&per_page=1";

    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;


  const { success, error }: { success?: ResponseIllnessType; error?: string } =
    await illnessAction(currentPage.toString());

  console.log(error);

  if (error) {
    throw Error(error);
  }

  return <IllnessTable data={success} />;
}
  