// import axios from "axios";
// import { useEffect, useMemo, useState } from "react";
// import DeletePopUp from "../Components/DeletePopUp";
// import { APICALLHANDLER } from "../constants/constant";

// type JobPosted = {
//   _id: string;
//   __v: number;
//   user: string;
//   title: string;
//   salary: number;
//   location: string;
//   description: string;
//   createdAt: string;
//   company: string;
//   time?: string;
// };

// type JobApplied = {
//   _id: string;
//   cv: string; // file path
//   job: string; // job ID
//   phoneNumber: number;
//   user: string; // user ID
//   userName: string;
//   __v: number;
// };



// const JobApplyPage = () => {
//   const [job, setJob] = useState<JobPosted[]>([]);
//   const base_url = import.meta.env.VITE_BASE_URL;
//   const [appliedjob, setAppliedJob] = useState<JobApplied[]>([]);
//   const [deletejob, setDeleteJob] = useState(false);
//   const [openPopUp, setOpenPopUp] = useState(false);
//   const role = localStorage.getItem("role") || null;

//   const [data,SetData] = useState();


 

//   useEffect(() => {
//     const role = localStorage.getItem("role") || null;

//     if (role && role =='admin')
//     {
//       const responses = APICALLHANDLER({ url: '/api/job/alljobByAdmin' , method: 'get' });
//       responses.then((response)=> {
//         console.log("From Dashboard = ",response);
//         setJob(response.jobs);
//       })
//     }
//     if (role && role =='user')
//     {
//       const responses = APICALLHANDLER({ url: '/api/job/alljobAppliedByUser' , method: 'get' });
//       responses.then((response)=> {
//         console.log("From Dashboard" ,response);
//         setAppliedJob(response.jobs);
//       })
//     }

//   }, []);

//     return (
//     <section className="sections ">
//       <div className="overflow-x-auto sm:p-10">
//         <table className="min-w-full divide-y divide-gray-200 text-left">
//           <thead className="bg-gray-100 ">
//             <tr className="">
//               <th className="px-4 py-5 w-[30%]">Company</th>
//               <th className="px-4 py-5 w-[40%]">Job Title</th>
//               <th className="px-4 py-5 w-[20%]">Created Date</th>
//               <th className="px-4 py-5 w-[20%]">Status</th>
//               <th className="px-4 py-5 w-[10%]">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y  divide-gray-100">
//             {role == "admin" &&
//               job.map((items) => {
//                 const today = new Date();
//                 const expiredate = items.time ? new Date(items.time) : null;
//                 const status =
//                   expiredate && expiredate < today ? "Expired" : "Active";

//                 return (
//                   <tr key={items._id} className="hover:bg-gray-100">
//                     <td className="px-4 py-5">{items.company}</td>
//                     <td className="px-4 py-5">{items.title}</td>
//                     <td className="px-4 py-5">
//                       {items.createdAt.split("T")[0]}
//                     </td>
//                     <td
//                       className={`px-4 py-5 font-semibold ${
//                         status == "Active" ? "text-green-600" : "text-gray-400"
//                       }  `}
//                     >
//                       {status}
//                     </td>
//                     <td className="px-4 py-5">
//                       <div className="flex flex-row gap-2">
//                         <button className=" cursor-pointer ">
//                           <img className="h-5 w-5" src="/Icons/edit.png" />
//                         </button>
//                         <button className="cursor-pointer " onClick={()=>{setOpenPopUp(true)}}>
//                           <img className="h-5 w-5" src="/Icons/delete.png" />
//                         </button>
//                       </div>
                      
//                     </td>
//                   </tr>

                  
//                 );
//               })}
//             {role == "user" &&
//               appliedjob.map((items) => {
//                 return <tr key={items._id} ><td className="px-4 py-5"> {items.phoneNumber} </td></tr>
//               })}
//           </tbody>
//         </table>
//       </div>
//       <DeletePopUp
//         title={'hi'}
//         setOpenPopUp={setOpenPopUp}
//         openPopUp={openPopUp}
//         setDeleteJob={setDeleteJob}
//       />
//     </section>
//   );
// };

// export default JobApplyPage;




import { useEffect, useMemo, useState } from "react";
import DeletePopUp from "../Components/DeletePopUp";
import { APICALLHANDLER } from "../constants/constant";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Camera, User, Building2, CalendarCheck, PersonStanding } from 'lucide-react';

type JobPosted = {
  _id: string;
  __v: number;
  user: string;
  title: string;
  salary: number;
  location: string;
  jobType: string;
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
  const [appliedjob, setAppliedJob] = useState<JobApplied[]>([]);
  const [deletejob, setDeleteJob] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const role = localStorage.getItem("role") || null;
 const [data, _setData] = useState(() => [...job])
  // const [data,SetData] = useState();
  
  const adminColumnHelper =  createColumnHelper<JobPosted>();

  const adminColumns = [

    adminColumnHelper.accessor('company', {
      cell: info => info.getValue(),
      header: ()=> { 
        <span className="flex-row items-center font-semibold">
          <Building2 className='mr-2' size={16}   /> COMPANY
        </span>
      }
    }),

    adminColumnHelper.accessor('title', {
      cell: info => info.getValue(),
      header: ()=> {
         <span className="flex-row items-center font-semibold">
          <User className='mr-2' size={16}   /> JOB TITLE
        </span>
      }
    }),
    adminColumnHelper.accessor('createdAt', {
      cell: info => {
        const date = String(info.getValue())?.split("T")[0];
       return  {date}
      },
       header: ()=> {
         <span className="flex-row items-center font-semibold">
          <CalendarCheck className='mr-2' size={16}   /> CREATED DATE
        </span>
      }
    }),
    // adminColumnHelper.accessor('time', {
    //   cell: info => {
    //     const date = new Date(info.getValue());
    //     const now = new Date();
    //     return <span className={`  ${ date < now ? 'text-red-500' : 'text-gray-400'} font-semibold `}> {date < now ? 'Expired' : 'Active' } </span>;
    //   },
    //   header: ()=> {
    //      <span className="flex-row items-center font-semibold">
    //       <PersonStanding className='mr-2' size={16}   /> STATUS
    //     </span>
    //   }
    // }),




  ];
  
  // const companyTable = useReactTable( {job , adminColumn  } );
 const admintable = useReactTable({
    data,
    columns: adminColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    const role = localStorage.getItem("role") || null;

    if (role && role =='admin')
    {
      const responses = APICALLHANDLER({ url: '/api/job/alljobByAdmin' , method: 'get' });
      responses.then((response)=> {
        console.log("From Dashboard = ",response);
        setJob(response.jobs);
      })
    }
    if (role && role =='user')
    {
      const responses = APICALLHANDLER({ url: '/api/job/alljobAppliedByUser' , method: 'get' });
      responses.then((response)=> {
        console.log("From Dashboard" ,response);
        setAppliedJob(response.jobs);
      })
    }

  }, []);

    return (
    <section className="sections ">
      <div className="overflow-x-auto sm:p-10">
        <table className="min-w-full divide-y divide-gray-200 text-left">
          <thead className="bg-gray-100 ">
            {admintable.getHeaderGroups().map((headerGroup)=>(
                <tr key={headerGroup.id}> 
                {
                  headerGroup.headers.map((column)=>(
                    <td key={column.id}>
                       {column.isPlaceholder
                    ? null
                    : flexRender(
                        column.column.columnDef.header,
                        column.getContext()
                      )}

                    </td>
                  ))
                }
                
                 </tr>)
          )}
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

