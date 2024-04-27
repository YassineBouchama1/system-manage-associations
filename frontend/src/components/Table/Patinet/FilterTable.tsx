"use client";
import { ChevronDown, Filter, MoveUp, Plus, Search } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Modal from "@/components/Modal";
import ExporterXlsx from "./ExporterXlsx";
import FormFieldSelectSearch from "@/components/Forms/FormFieldSelectSearch";
import { SelectorType } from "@/types/generale";

interface FilterTableProps {
  associations: SelectorType[];
}

const FilterTable: FC<FilterTableProps> = ({ associations }) => {

  const t = useTranslations("ui");

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [toggleFilter, setToggleFilter] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedAssociationValue, setSelectedAssociationValue] = useState<
    string | null
  >(searchParams.get("association") ?? null); // for handle value select of asscociation



  const page: string = searchParams.get("page") ?? "1";
  const [checkedDeleted, setCheckedDeleted] = useState<string>(
    searchParams.get("deleted") ?? ""
  );
  const per_page: string = searchParams.get("per_page") ?? "10";

  const [query, setQuery] = useState(searchParams.get("query") ?? "");

  // Function to handle checkbox change
  const onDeletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked ? "true" : "";
    setCheckedDeleted(newValue);
  };

  // Function to handle search input change
  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
      router.push(
        `${pathname}?page=1&per_page=${per_page}&query=${newQuery}&deleted=${checkedDeleted}&association=${
          selectedAssociationValue ? selectedAssociationValue : ""
        }`
      );
    setQuery(newQuery);
  };

  // function for change value of City selector
  const handleSelectAssociationChange = (value: string | null) => {
    setSelectedAssociationValue(value);
  };

  const handleClickBtnFilter = () => {
    router.push(
      `${pathname}?page=${Number(
        page
      )}&per_page=${per_page}&query=${query}&deleted=${checkedDeleted}&association=${
        selectedAssociationValue ? selectedAssociationValue : ""
      }`
    );
   
  };


  return (
    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
      <div className="w-full md:w-1/2">
        <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              onChange={onSearchInputChange}
              name="query"
              id="query"
              type="text"
              value={query}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div>
        </form>
      </div>
      <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
        <Link
          href="/dashboard/patients/create"
          className="flex items-center justify-center text-white bg-theme-color hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <Plus className="h-3.5 w-3.5 mr-2" />
          {t("create")}
        </Link>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <MoveUp className="w-4 h-4 mr-2" />
            Export
          </button>
          {isOpen && (
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <ExporterXlsx />
            </Modal>
          )}
          <button
            className={` relative w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
            type="button"
            onClick={() => setToggleFilter(!toggleFilter)}
          >
            <Filter className="h-4 w-4 mr-2 text-gray-400" />
            Filter
            <ChevronDown className="h-4 w-4 mr-2 text-gray-400" />
          </button>
          <div
            id="filterDropdown"
            className={`${
              toggleFilter && "hidden"
            } scale-y-100 z-10 absolute top-14 w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700`}
          >
            <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
              Choose Filters
            </h6>
            <ul
              className="space-y-2 text-sm"
              aria-labelledby="filterDropdownButton"
            >
              <li className="flex items-center">
                <input
                  id="deleted"
                  type="checkbox"
                  value="true"
                  checked={!!checkedDeleted}
                  onChange={onDeletedChange}
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="apple"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Deleted
                </label>
              </li>
            </ul>
            {/* Selector City  */}
            <FormFieldSelectSearch
              defaultSelectedId={selectedAssociationValue}
              dataList={associations}
              nameInput="Associations"
              onSelectChange={handleSelectAssociationChange}
            />

            {/* Selector Illness  */}
            {/* <FormFieldSelectSearch
              defaultSelectedId={selectedIllness}
              dataList={illnesses}
              nameInput="illness"
              onSelectChange={handleSelectIllnessChange}
            /> */}

            <div className="w-full flex justify-center my-6">
              <button
                onClick={() => handleClickBtnFilter()}
                className="bg-theme-color w-auto px-2 rounded-md text-white"
              >
                filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilterTable;
