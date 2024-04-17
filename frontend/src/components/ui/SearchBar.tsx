"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page: string = searchParams.get("page") ?? "1";
  const [checkedDeleted, setCheckedDeleted] = useState<string>(
    searchParams.get("deleted") ?? ""
  );
  const per_page: string = searchParams.get("per_page") ?? "10";
  const query: string = searchParams.get("query") ?? "";

  // function to update URL and trigger navigation without refreshing
  const updateURL = () => {
    router.push(
      `${pathname}?page=${Number(
        page
      )}&per_page=${per_page}&query=${query}&deleted=${checkedDeleted}`
    );
  };

  // Function to handle checkbox change
  const onDeletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked ? "true" : "";
    setCheckedDeleted(newValue);
    updateURL();
  };

  // Function to handle search input change
  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    router.push(
      `${pathname}?page=${Number(
        page
      )}&per_page=${per_page}&query=${newQuery}&deleted=${checkedDeleted}`
    );
  };

  return (
    <div className="flex flex-row gap-3">
      <input
        onChange={onSearchInputChange}
        name="query"
        id="query"
        type="text"
        value={query}
        className="bg-theme-bodyInputs py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
      />
      <label htmlFor="Deleted">
        Deleted
        <input
          id="Deleted"
          type="checkbox"
          onChange={onDeletedChange}
          checked={!!checkedDeleted} 
        />
      </label>
    </div>
  );
}
