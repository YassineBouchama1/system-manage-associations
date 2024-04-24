// import React, { useState } from "react";

// const MultiFileUploader: React.FC = () => {
//   const [files, setFiles] = useState<{ [key: string]: File }>({});
//   const [isDraggingOver, setIsDraggingOver] = useState(false);

//   const addFile = (file: File) => {
//     const isImage = file.type.match("image.*");
//     const objectURL = URL.createObjectURL(file);

//     setFiles((prevFiles) => ({
//       ...prevFiles,
//       [objectURL]: file,
//     }));
//   };

//   const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
//     ev.preventDefault();
//     setIsDraggingOver(false);

//     for (const file of ev.dataTransfer.files) {
//       addFile(file);
//     }
//   };

//   const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDraggingOver(true);
//   };

//   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDraggingOver(false);
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     if (hasFiles(e)) {
//       e.preventDefault();
//     }
//   };

//   const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       for (const file of e.target.files) {
//         addFile(file);
//       }
//     }
//   };

//   const handleFileDelete = (target: HTMLElement | any) => {
//     const ou = target.dataset.target;
//     if (ou) {
//       delete files[ou];
//       setFiles({ ...files });
//     }
//   };

//   const handleSubmit = () => {
//     alert(`Submitted Files:\n${JSON.stringify(files)}`);
//     console.log(files);
//   };

//   const handleCancel = () => {
//     setFiles({});
//   };

//   const hasFiles = ({
//     dataTransfer: { types = [] },
//   }: React.DragEvent<HTMLDivElement>) => types.indexOf("Files") > -1;

//   return (
//     <div
//       className={`h-screen  sm:px-8 md:px-16 sm:py-8 ${
//         isDraggingOver ? "draggedover" : ""
//       }`}
//       onDrop={handleDrop}
//       onDragOver={handleDragOver}
//       onDragLeave={handleDragLeave}
//       onDragEnter={handleDragEnter}
//     >
//       <main className="container mx-auto max-w-screen-lg h-full">
//         {/* File upload modal */}
//         <article
//           aria-label="File Upload Modal"
//           className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
//         >
//           {/* Overlay */}
//           <div
//             id="overlay"
//             className="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md"
//           >
//             <i>
//               <svg
//                 className="fill-current w-12 h-12 mb-3 text-blue-700"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
//               </svg>
//             </i>
//             <p className="text-lg text-blue-700">Drop files to upload</p>
//           </div>

//           {/* Scroll area */}
//           <section className="h-full overflow-auto p-8 w-full h-full flex flex-col">
//             <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
//               <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
//                 <span>Drag and drop your</span>&nbsp;
//                 <span>files anywhere or</span>
//               </p>
//               <input
//                 id="hidden-input"
//                 type="file"
//                 multiple
//                 className="hidden"
//                 onChange={handleFileInputChange}
//               />
//               <button
//                 id="button"
//                 type="button"
//                 className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
//                 onClick={() => document.getElementById("hidden-input")?.click()}
//               >
//                 Upload a file
//               </button>
//             </header>

//             <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
//               To Upload
//             </h1>

//             <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
//               {Object.entries(files).map(([objectURL, file]) => (
//                 <li
//                   key={objectURL}
//                   id={objectURL}
//                   className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24"
//                 >
//                   <article
//                     tabIndex={0}
//                     className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline relative bg-gray-100 cursor-pointer shadow-sm"
//                   >
//                     {file.type.match("image.*") && (
//                       <img
//                         alt="upload preview"
//                         className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
//                         src={objectURL}
//                       />
//                     )}
//                     <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
//                       <h1 className="flex-1 group-hover:text-blue-800">
//                         {file.name}
//                       </h1>
//                       <div className="flex">
//                         <span className="p-1 text-blue-800">
//                           <i>
//                             <svg
//                               className="fill-current w-4 h-4 ml-auto pt-1"
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="24"
//                               height="24"
//                               viewBox="0 0 24 24"
//                             >
//                               <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
//                             </svg>
//                           </i>
//                         </span>
//                         <p className="p-1 size text-xs">
//                           {file.size > 1024
//                             ? file.size > 1048576
//                               ? Math.round(file.size / 1048576) + "mb"
//                               : Math.round(file.size / 1024) + "kb"
//                             : file.size + "b"}
//                         </p>
//                         <button
//                           type="button"
//                           className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md text-gray-800"
//                           onClick={() =>
//                             handleFileDelete({ dataset: { target: objectURL } })
//                           }
//                         >
//                           <svg
//                             className="pointer-events-none fill-current w-4 h-4 ml-auto"
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="24"
//                             height="24"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               className="pointer-events-none"
//                               d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
//                             />
//                           </svg>
//                         </button>
//                       </div>
//                     </section>
//                   </article>
//                 </li>
//               ))}
//             </ul>
//           </section>

//           {/* Sticky footer */}
//           <footer className="flex justify-end px-8 pb-8 pt-4">
//             <button
//               id="submit"
//               className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
//               onClick={handleSubmit}
//             >
//               Upload now
//             </button>
//             <button
//               id="cancel"
//               className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//           </footer>
//         </article>
//       </main>
//     </div>
//   );
// };

// export default MultiFileUploader;
