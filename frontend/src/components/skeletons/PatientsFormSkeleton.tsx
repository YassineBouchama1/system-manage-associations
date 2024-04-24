import SectionWrapper from "../Wrappers/SectionWrapper";

export function PatientsFormSkeleton() {
  return (
    <SectionWrapper styles="md:px-20">
      <div className="w-auto flex-col items-start">
        <hr className="py-1 mb-6 bg-gray-300 animate-pulse" />{" "}
        {/* start form  */}
        <div>
          {/* img upload  */}
          <div className="mb-6 flex flex-col items-center justify-center">
              <svg
                className="size-16 mb-3 text-gray-200 dark:text-gray-700 me-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            <div className="font-semibold bg-gray-300 w-7 h-3"> </div>
          </div>

          {/* img upload  */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-6">
            {/*  form item  */}

            <div className="bg-gray-300 min-w-24 animate-pulse py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "></div>

            {/*  form item  */}

            <div className="bg-gray-300 min-w-24 animate-pulse py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "></div>
            {/*  form item  */}

            <div className="bg-gray-300 min-w-24 animate-pulse py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "></div>
            {/*  form item  */}
          </div>
          {/* forms PERSONAL INFORMATION  */}

          <div className="grid grid-cols-1  md:grid-cols-2 gap-10 mt-10">
            <div className="bg-gray-300 min-w-24 animate-pulse py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "></div>
            <div className="bg-gray-300 min-w-24 animate-pulse py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "></div>
            <div className=" bg-gray-300 min-w-24 animate-pulse py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "></div>
          </div>
          {/* forms PERSONAL INFORMATION  */}
        </div>
        {/* end forms  */}
        <div className="w-full my-6 flex justify-center">
          <div className=" bg-gray-300 min-w-24 animate-pulse px-2 py-3 rounded-md text-gray-300 text-end">
            Create{" "}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
