
import { useEffect,  useState } from "react";
import DeletePopUp from "../Components/DeletePopUp";
import { APICALLHANDLER, type JobApplied, type JobPosted } from "../constants/constant";
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type SortingState ,  } from "@tanstack/react-table";
import { User, Building2, CalendarCheck, PencilIcon,  Workflow } from 'lucide-react';
import UpdateJobPostForm from "../Components/UpdateJobPostForm";
import { JOBTYPE, STATUS } from "../constants/enums";
import RejectJobPostForm from "../Components/RejectedJobPopUp";



const JobApplyPage = () => {
  const [job, setJob] = useState<JobPosted[]>([]);
  const [appliedjob, setAppliedJob] = useState<JobApplied[]>([]);
  const [deletejob, setDeleteJob] = useState(false);
  const [title , setTitle] = useState<string> ('job');
  const [currentJobId , setCurrentJobId] = useState('');
  const [updateRow , setUpdateRow] = useState<JobPosted | null>(null);
  const [rejectedRow , setRejectedRow] = useState<JobPosted | null>(null);
  const [currentActionJob , setCurrentActionJob] = useState<JobPosted | JobApplied | null>(null);
  const role = localStorage.getItem("role") || null;

  const [sorting , setSorting] = useState<SortingState>([])

  const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 3,
});

  useEffect(()=> {
    if (currentJobId)
   {
     const responses =  APICALLHANDLER({ url: `/api/job/deleteJob/${currentJobId}`, method: 'delete',});
     console.log('response = ', responses);
     responses.then(()=> {

       setCurrentJobId('');
       setTitle('job');
       fetchjobs();
       setDeleteJob(false);
       setCurrentActionJob(null);
      })

    }

  } , [deletejob]);

  const fetchjobs =async ()=> {
 const role = localStorage.getItem("role") || null;
    
    if (role && role =='admin')
    {
      const responses = APICALLHANDLER({ url: '/api/job/alljobByAdmin' , method: 'get' });
      responses.then((response)=> {
        if (response)
         { setJob([...response.data]);}
        else 
        {
          setJob([]);
        }
      })
    }
    if (role && role =='user')
    {
      const responses = APICALLHANDLER({ url: '/api/job/alljobAppliedByUser' , method: 'get' });
      responses.then((response)=> {
        console.log("From Dashboard" ,response);
        if (response)
        setAppliedJob([...response.data]);
      else 
        setAppliedJob([]);
      })
    }

  
  }

    useEffect(() => {
   
      fetchjobs();
  }, []);

  
  const adminColumnHelper =  createColumnHelper<JobPosted>();
  const userColumnHelper = createColumnHelper<JobApplied>();

  const adminColumns = [

    adminColumnHelper.accessor('company', {
      cell: info => info.getValue(),
      header: ()=> (
        <span className="dashboard-table-title">
          <Building2 className='mr-2' size={16}   /> Company
        </span>
    )
    }),

    adminColumnHelper.accessor('title', {
      cell: info => info.getValue(),
      header: ()=> (
         <span className="dashboard-table-title">
          <User className='mr-2' size={16}   /> Job Title
        </span>
    )
    }),
    adminColumnHelper.accessor('createdAt', {
      cell: info => {
        const date = String(info.getValue())?.split("T")[0];
       return  date
      },
       header: ()=> (
         <span className="dashboard-table-title">
          <CalendarCheck className='mr-2' size={16}   /> Created Date
        </span>
       )
    }),
    adminColumnHelper.accessor('time', {
      cell: info => {
        const date = new Date(info.getValue());
        const rowdata = info.row.original;
        const now = new Date();
        return <span className={` ${   rowdata.status ==  STATUS['PENDING'] ?  'text-blue-400' : rowdata.status == STATUS['REJECTED'] ? 'text-red-500'  :  date < now ? 'text-gray-400' : 'text-green-500'} font-semibold `}> {  rowdata.status == STATUS['PENDING'] ?  'PENDING' : rowdata.status == STATUS['REJECTED'] ? 'REJECTED'  :  date < now ? 'EXPIRED' : 'ACTIVE'  } </span>;
      },
       header: () => (
    <span className="dashboard-table-title">
      <Workflow className="mr-2" size={16} /> STATUS
    </span>
      ),
    enableSorting: false,
    }),

    adminColumnHelper.display({
      id: 'action',
      header : ()=> {
        return <span className="dashboard-table-title">
          <PencilIcon className='mr-2' size={16}   /> Actions
        </span>
      },
      cell: (info) => {
        const rowdata = info.row.original;
       
           return (
          <div className="flex flex-row gap-2">
                       <button className={`relative group ${updateRow != null || currentActionJob != null ? "cursor-not-allowed opacity-50": "cursor-pointer" }`} disabled= {updateRow != null || currentActionJob !=null }   onClick={()=> {   setUpdateRow(rowdata);  }}  >  {/*  for update */} 
                           <img className="h-5 w-5" src="/Icons/edit.png" />
                         <p className="tooltip">Edit</p>

                         </button>
                         { 
                         rowdata.status == STATUS['REJECTED']  &&  <><button className={`relative group  ${updateRow != null || currentActionJob != null ? "cursor-not-allowed opacity-50": "cursor-pointer" }`} disabled= {updateRow != null || currentActionJob !=null }   onClick={()=> {   setRejectedRow(rowdata);  }}  >  {/*  for update */} 
                           <img className="h-5 w-5" src="/Icons/expand.png" />
                         <p className="tooltip">View Reason</p>
                         </button>

                         </> }
                        
 

                         <button className={` relative group ${updateRow != null || currentActionJob != null ? "cursor-not-allowed opacity-50": "cursor-pointer" }`} disabled= {updateRow != null || currentActionJob !=null } onClick={()=>{setCurrentActionJob(rowdata); setTitle(rowdata.title); setCurrentJobId(rowdata._id); }}>
                           <img className="h-5 w-5" src="/Icons/delete.png" />
                         <p className="tooltip">Delete</p>

                         </button>
                       </div>
        )
      }
    }),




  ];

  const userColumns = [
    userColumnHelper.accessor('job.company', {
      cell: info => info.getValue(),
      header: ()=> (
        <span className="dashboard-table-title">
          <Building2 className='mr-2' size={16}   /> Company
        </span>
    )
    }),
     userColumnHelper.accessor('job.title', {
      cell: info => info.getValue(),
      header: ()=> (
        <span className="dashboard-table-title">
          <User className='mr-2' size={16}   /> Designation
        </span>
    )
    }),
     userColumnHelper.accessor('job.jobType', {
      cell: info => JOBTYPE[info.getValue() as number ?? 0] ,
      header: ()=> (
        <span className="dashboard-table-title">
          <Building2 className='mr-2' size={16}   /> Job Type
        </span>
    )
    }),
     userColumnHelper.accessor('job.location', {
      cell: info => info.getValue(),
      header: ()=> (
        <span className="dashboard-table-title">
          <Building2 className='mr-2' size={16}   /> Location 
        </span>
    )
    }),
    //  userColumnHelper.accessor('job.time', {
    //   cell: info => {
    //     const date = new Date(info.getValue());
    //     const now = new Date();
    //     return <span className={`  ${ date < now ? 'text-gray-400' : 'text-green-500'} font-semibold `}> {date < now ? 'Expired' : 'Active' } </span>;
    //   },
    //    header: () => (
    // <span className="dashboard-table-title">
    //   <Workflow className="mr-2" size={16} /> STATUS
    // </span>
    //   ),
    // }),

    //  userColumnHelper.display({
    //   id: 'action',
    //   header : ()=> {
    //     return <span className="dashboard-table-title">
    //       <PencilIcon className='mr-2' size={16}   /> Actions
    //     </span>
    //   },
    //   cell: (info) => {
    //     const rowdata = info.row.original;
    //     console.log('rowdata = ',rowdata); 
    //        return (
    //       <div className="flex flex-row gap-2">
    //                     <button className=" cursor-pointer ">
    //                        <img className="h-5 w-5" src="/Icons/edit.png" />
    //                      </button>
    //                      {/* <button className="cursor-pointer " onClick={()=>{setCurrentActionJob(rowdata)}}> */}
    //                      <button className="cursor-pointer " >
    //                        <img className="h-5 w-5" src="/Icons/delete.png" />
    //                      </button>
    //                    </div>
    //     )
    //   }
    // }),

  ]
  
const admintable = useReactTable({
  data: job,
  columns: adminColumns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  state: { pagination , sorting },
  onSortingChange: setSorting,
  onPaginationChange: setPagination,
});


  const usertable = useReactTable({
    data: appliedjob ,
    columns : userColumns , 
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel : getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
     state: { pagination , sorting },
     onSortingChange: setSorting,
  onPaginationChange: setPagination,
  });


    return (
    <section className="sections  ">
      <div className="overflow-x-auto sm:p-10">
        <p className="text-gray-600 mb-4">
{ role=='user' && ' This table lists the jobs that you have applied to.'}
{ role=='admin' && '  This table lists all the jobs you have posted.'}
        </p>
        <table className="min-w-full divide-y divide-gray-200 text-left border-gray-300 border-1">
          <thead className="bg-gray-100  ">
            { role == 'admin' &&   admintable.getHeaderGroups().map((headerGroup)=>(
                <tr key={headerGroup.id} className="px-2 py-3"> 
                {
                  headerGroup.headers.map((column)=>(
                    <th
                      key={column.id}
                      onClick={column.column.getToggleSortingHandler()}
                      className="cursor-pointer "
                    >
                      <div className="flex  text-center  items-center ">
                      {flexRender(column.column.columnDef.header, column.getContext())}
                      {{
                        asc: "↑",
                        desc: "↓",
                      }[column.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))
                }
                
                 </tr>)
          )}
          { role == 'user' &&   usertable.getHeaderGroups().map((headerGroup)=>(
                <tr key={headerGroup.id} className="px-2 py-3"> 
                {
                  headerGroup.headers.map((column)=>(
                      <th
                      key={column.id}
                      onClick={column.column.getToggleSortingHandler()}
                      className="cursor-pointer "
                    >
                      <div className="flex  text-center  items-center ">
                      {flexRender(column.column.columnDef.header, column.getContext())}
                      {{
                        asc: "↑",
                        desc: "↓",
                      }[column.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))
                }
                
                 </tr>)
          )}
          </thead>
          {role == "admin" && job.length > 0 &&
            (
               <tbody className="divide-y  divide-gray-300 ">
                {
                  admintable.getRowModel().rows.map(row => (
                    <tr key={row.id} className=" hover:bg-gray-100">
                       {
                        row.getVisibleCells().map((cell )=> (
                          <td key={cell.id} className="px-4 py-5 "  >
                                                                 
                            {flexRender(cell.column.columnDef.cell , cell.getContext())}
                          </td>
                        ))
                       }
                    </tr>
                  ))
                }
               
            </tbody>
          )}
           

            {role == "user" && appliedjob.length > 0 &&
              (
               <tbody className="divide-y  divide-gray-300 ">
                {
                  usertable.getRowModel().rows.map(row => (
                    <tr key={row.id} className=" hover:bg-gray-100">
                       {
                        row.getVisibleCells().map((cell )=> (
                          <td key={cell.id} className="px-4 py-5 "  >
                                                                 
                            {flexRender(cell.column.columnDef.cell , cell.getContext())}
                          </td>
                        ))
                       }
                    </tr>
                  ))
                }
            </tbody>
          )
            }
            
              
       
        </table>
        

       { role == 'admin' && job.length === 0 && (
         <div className="text-center py-10 text-gray-500">
               No jobs found.
                </div>
        )}
         { role == 'user' && appliedjob.length === 0 && (
         <div className="text-center py-10 text-gray-500">
               No jobs found.
                </div>
        )}

     
      { role == 'admin' && 
       <div className="flex flex-row justify-between mt-5"> 
 
    <div className="flex flex-row gap-3 items-center"> 
    <p className="font-semibold">Entries per page:</p>  
    <select className="border-2"
      value={admintable.getState().pagination.pageSize}
      onChange={(e) => {
        admintable.setPageSize(Number(e.target.value));
      }}
    >
      {[3, 5, 7].map(size => (
        <option key={size} value={size}>
          Show {size}
        </option>
      ))}
    </select>
  </div>

 
  <div className="flex flex-row items-center gap-2">
    <button
      onClick={() => admintable.previousPage()}
      disabled={!admintable.getCanPreviousPage()}
      className={`border px-2 py-1 ${!admintable.getCanPreviousPage() ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      Previous
    </button>

    <p>
      <span className="font-semibold">Page:</span>{" "}
      {admintable.getState().pagination.pageIndex + 1} of{" "}
      {admintable.getPageCount()}
    </p>

    <button
      onClick={() => admintable.nextPage()}
      disabled={!admintable.getCanNextPage()}
      className={`border px-2 py-1 ${!admintable.getCanNextPage() ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      Next
    </button>
  </div>
</div>}

 { role == 'user' &&  <div className="flex flex-row justify-between"> 
 
    <div className="flex flex-row gap-3 items-center"> 
    <p className="font-semibold">Entries per page:</p>  
    <select className="border-2"
      value={usertable.getState().pagination.pageSize}
      onChange={(e) => {
        usertable.setPageSize(Number(e.target.value));
      }}
    >
      {[3, 5, 7].map(size => (
        <option key={size} value={size}>
          Show {size}
        </option>
      ))}
    </select>
  </div>

 
  <div className="flex flex-row items-center gap-2">
    <button
      onClick={() => usertable.previousPage()}
      disabled={!usertable.getCanPreviousPage()}
      className={`border px-2 py-1 ${!usertable.getCanPreviousPage() ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      Previous
    </button>

    <p>
      <span className="font-semibold">Page:</span>{" "}
      {usertable.getState().pagination.pageIndex + 1} of{" "}
      {usertable.getPageCount()}
    </p>

    <button
      onClick={() => usertable.nextPage()}
      disabled={!usertable.getCanNextPage()}
      className={`border px-2 py-1 ${!usertable.getCanNextPage() ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      Next
    </button>
  </div>
</div>}


        </div>
      
     { currentActionJob &&
     
     <DeletePopUp
        setCurrentActionJob={setCurrentActionJob}
        title={title}
        setDeleteJob={setDeleteJob}
      />}

      {
        updateRow && <UpdateJobPostForm job_id={updateRow._id} setUpdateRow={setUpdateRow} fetchjobs={fetchjobs}  updaterow={updateRow} />
      }
      {
        rejectedRow && <RejectJobPostForm  setRejectedRow={setRejectedRow}   rejectrow={rejectedRow} />

      }
   
    </section>
  );
};

export default JobApplyPage;

