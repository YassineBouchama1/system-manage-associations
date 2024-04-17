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
            <div className="size-24 rounded-full mb-3 bg-gray-300"></div>
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
