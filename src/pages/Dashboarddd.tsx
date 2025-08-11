// import React from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getSortedRowModel,
//   getPaginationRowModel,
//   flexRender,
// } from "@tanstack/react-table";

// import type { ColumnDef, SortingState } from "@tanstack/react-table";

// type JobPosted = {
//   _id: string;
//   title: string;
//   company: string;
//   createdAt: string;
//   time: string;
// };

// const formatDate = (isoString: string) => {
//   const date = new Date(isoString);
//   return date.toISOString().split("T")[0];
// };

// export default function JobTable() {
//   const jobs = React.useMemo<JobPosted[]>(
//     () => [
//       {
//         _id: "68999025a20778998c60f060",
//         title: "Project Manager",
//         company: "Enterprise Solutions",
//         createdAt: "2025-08-11T06:39:33.789Z",
//         time: "2026-09-30T00:00:00.000Z",
//       },
//       {
//         _id: "689991cda20778998c60f063",
//         title: "Graphics Designer",
//         company: "Prakriti Studio",
//         createdAt: "2025-08-11T06:46:37.275Z",
//         time: "2025-08-20T00:00:00.000Z",
//       },
//     ],
//     []
//   );

//   const columns = React.useMemo<ColumnDef<JobPosted, any>[]>(
//     () => [
//       { header: "Company", accessorKey: "company" },
//       { header: "Job Title", accessorKey: "title" },
//       {
//         header: "Created Date",
//         accessorKey: "createdAt",
//         cell: (info) => formatDate(info.getValue() as string),
//       },
//       {
//         header: "Status",
//         cell: ({ row }) => {
//           const expiry = new Date(row.original.time);
//           const today = new Date();
//           const status = expiry >= today ? "Active" : "Expired";
//           return (
//             <span
//               style={{
//                 padding: "4px 8px",
//                 borderRadius: "4px",
//                 color: status === "Active" ? "green" : "red",
//                 backgroundColor: status === "Active" ? "#e6ffed" : "#ffe6e6",
//               }}
//             >
//               {status}
//             </span>
//           );
//         },
//       },
//       {
//         header: "Actions",
//         cell: () => (
//           <div className="flex flex-row gap-2">
//                         <button className=" cursor-pointer ">
//                           <img className="h-5 w-5" src="/Icons/edit.png" />
//                         </button>
//                         <button className="cursor-pointer " >
//                           <img className="h-5 w-5" src="/Icons/delete.png" />
//                         </button>
//                       </div>
//         ),
//       },
//     ],
//     []
//   );

//   const [sorting, setSorting] = React.useState<SortingState>([]);

//   const table = useReactTable({
//     data: jobs,
//     columns,
//     state: { sorting },
//     onSortingChange: setSorting,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   return (
//     <div>
//       <table
//         border={1}
//         cellPadding={5}
//         style={{ borderCollapse: "collapse", width: "100%" }}
//       >
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th
//                   key={header.id}
//                   style={{ cursor: "pointer" }}
//                   onClick={header.column.getToggleSortingHandler()}
//                 >
//                   {flexRender(header.column.columnDef.header, header.getContext())}
//                   {header.column.getIsSorted()
//                     ? {
//                         asc: " 🔼",
//                         desc: " 🔽",
//                       }[header.column.getIsSorted() as "asc" | "desc"]
//                     : null}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>

//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div style={{ marginTop: 10 }}>
//         <button
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           ◀ Prev
//         </button>
//         <button
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           Next ▶
//         </button>

//         <span style={{ marginLeft: 10 }}>
//           Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
//         </span>

//         <select
//           value={table.getState().pagination.pageSize}
//           onChange={(e) => table.setPageSize(Number(e.target.value))}
//           style={{ marginLeft: 10 }}
//         >
//           {[2, 3, 5].map((size) => (
//             <option key={size} value={size}>
//               Show {size}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }


import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import DeletePopUp from "../Components/DeletePopUp";

type JobPosted = {
  _id: string;
  __v: number;
  user: string;
  title: string;
  salary: number;
  location: string;
  description: string;
  createdAt: string;
  company: string;
  time?: string;
};

type JobApplied = {
  _id: string;
  cv: string; // file path
  job: string; // job ID
  phoneNumber: number;
  user: string; // user ID
  userName: string;
  __v: number;
};



const JobApplyPage = () => {
  const [job, setJob] = useState<JobPosted[]>([]);
  const base_url = import.meta.env.VITE_BASE_URL;
  const [appliedjob, setAppliedJob] = useState<JobApplied[]>([]);
  const [deletejob, setDeleteJob] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const role = localStorage.getItem("role") || null;

 

  useEffect(() => {
    const token = localStorage.getItem("token") || null;

    const urlAdmin = 'https://jg4npv8c-4001.inc1.devtunnels.ms'+"/api/job/alljobByAdmin";
    const urlUser = base_url+"/api/job/alljobAppliedByUser";
    if (token && role) {
      axios
        .get(role == "admin" ? urlAdmin : urlUser, {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        })
        .then((response) => {
          if (role == "admin") setJob(response.data.jobs);
          if (role == "user") setAppliedJob(response.data.jobs);
          console.log(response.data.jobs);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(job);
  }, []);

    return (
    <section className="sections ">
      <div className="overflow-x-auto sm:p-10">
        <table className="min-w-full divide-y divide-gray-200 text-left">
          <thead className="bg-gray-100 ">
            <tr className="">
              <th className="px-4 py-5 w-[30%]">Company</th>
              <th className="px-4 py-5 w-[40%]">Job Title</th>
              <th className="px-4 py-5 w-[20%]">Created Date</th>
              <th className="px-4 py-5 w-[20%]">Status</th>
              <th className="px-4 py-5 w-[10%]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y  divide-gray-100">
            {role == "admin" &&
              job.map((items) => {
                const today = new Date();
                const expiredate = items.time ? new Date(items.time) : null;
                const status =
                  expiredate && expiredate < today ? "Expired" : "Active";

                return (
                  <tr key={items._id} className="hover:bg-gray-100">
                    <td className="px-4 py-5">{items.company}</td>
                    <td className="px-4 py-5">{items.title}</td>
                    <td className="px-4 py-5">
                      {items.createdAt.split("T")[0]}
                    </td>
                    <td
                      className={`px-4 py-5 font-semibold ${
                        status == "Active" ? "text-green-600" : "text-gray-400"
                      }  `}
                    >
                      {status}
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex flex-row gap-2">
                        <button className=" cursor-pointer ">
                          <img className="h-5 w-5" src="/Icons/edit.png" />
                        </button>
                        <button className="cursor-pointer " onClick={()=>{setOpenPopUp(true)}}>
                          <img className="h-5 w-5" src="/Icons/delete.png" />
                        </button>
                      </div>
                      
                    </td>
                  </tr>

                  
                );
              })}
            {role == "user" &&
              appliedjob.map((items) => {
                return <tr key={items._id} ><td className="px-4 py-5"> {items.phoneNumber} </td></tr>
              })}
          </tbody>
        </table>
      </div>
      <DeletePopUp
        title={'hi'}
        setOpenPopUp={setOpenPopUp}
        openPopUp={openPopUp}
        setDeleteJob={setDeleteJob}
      />
    </section>
  );
};

export default JobApplyPage;
