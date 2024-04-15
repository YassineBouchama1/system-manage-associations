import { fetchIllness } from "@/actions/illnesses";
import IllnessTable from "@/components/Table/IllnessTable";
import PaginationControls from "@/components/Table/PaginationControls";

// default value for  query
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 6;

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {


  // fetching illness  & passing query {page,per_page}
  const combinedParams = {
    ...searchParams,
    page: searchParams.page?.toString() || DEFAULT_PAGE.toString(),
    per_page: searchParams.per_page?.toString() || DEFAULT_PER_PAGE.toString(),
  };

  const { success, error } = await fetchIllness(combinedParams);

  if (error) {
    throw new Error(error.toString());
  }

  return (
    <>
      <IllnessTable data={success} />
      <PaginationControls
        hasNextPage={success.current_page < success.total_pages}
        hasPrevPage={success.current_page > 1}
        totalPages={success.total_pages}
        currentPage={success.current_page}
      />

    </>
  );
}
