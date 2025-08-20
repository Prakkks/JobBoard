import { useEffect, useState } from "react"
import { APICALLHANDLER, type JobPostType } from "../constants/constant";
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { JOBTYPE } from "../constants/enums";
import { ChevronLeft,  User } from "lucide-react";
import PaginationComponent from "../Components/ReviewerComponent/Pagination";
import DetailJobView from "../Components/DetailJobView";
import { useForm } from "react-hook-form";

interface overalldataProps 
{ 'title': string , 'count' : number | undefined  }

interface RejectFormProp
{
  reaso : string,
}



const ReviwerScreen = () => {
    const [pendingjob , setPendingJob] = useState<JobPostType[]>([]);
    const [approvedjob , setApprovedJob] = useState<JobPostType[]>([]);
    const [rejectedjob , setRejectedJob] = useState<JobPostType[]>([]);
    const [pagination, setPagination] = useState({pageIndex: 0,pageSize: 3,});
    const [DetailJobCurrentIndex, SetDetailJobCurrentIndex] = useState<JobPostType|null>(null);
    const [hideColumn , setHideColumn] = useState(true);
    const [isSubmittings , setIsSubmittings] = useState(false);
    const [rejectedClicked , setRejectedClicked] = useState(false);
    const { register , formState : {errors  , isSubmitting} , reset , handleSubmit  } = useForm<RejectFormProp>();
    const [overalldata , setOveralldata] = useState<overalldataProps[]>([
        { 'title': 'Total Job', 'count': undefined },
        { 'title': 'Approved Job', 'count': undefined },
        { 'title': 'Pending Job', 'count': undefined },
        { 'title': 'Rejected Job', 'count': undefined },
    ]);

    

    useEffect((
        
    )=> {
        setOveralldata([
            { 'title': 'Total Job', 'count': (approvedjob?.length + pendingjob?.length + rejectedjob?.length || 0) },
            { 'title': 'Approved Job', 'count': approvedjob?.length || 0 },
            { 'title': 'Pending Job', 'count': pendingjob?.length || 0 },
            { 'title': 'Rejected Job', 'count': rejectedjob?.length || 0 },
        ]);
    },[approvedjob,rejectedjob,pendingjob]);

    useEffect(()=> { 
    fetchPendingJobs();
    fetchApprovedJob();
    fetchRejectedJob();
    setOveralldata([
        { 'title': 'Total Job', 'count': (approvedjob?.length + pendingjob?.length + rejectedjob?.length || 0) },
        { 'title': 'Approved Job', 'count': approvedjob?.length || 0 },
        { 'title': 'Pending Job', 'count': pendingjob?.length || 0 },
        { 'title': 'Rejected Job', 'count': rejectedjob?.length || 0 },
    ])


},[]);

 const handleApproveJob = async(id: string)=> {
    setIsSubmittings(true);
    const responses = APICALLHANDLER({ method: 'put' , url: `/api/job/acceptJob/${id}`})
    responses.then((response)=> {
        if(response)
        {
            fetchPendingJobs();
            SetDetailJobCurrentIndex(null);
            setHideColumn(true);
            fetchApprovedJob();
           
          
        }
    })
    setIsSubmittings(false);
 };

  const handleRejectJob = async(id: string , reaso: string)=> {
    setIsSubmittings(true);
    const responses = APICALLHANDLER({ method: 'put' , url: `/api/job/rejectJob/${id}` , data: {'reaso': reaso }});
    responses.then((response)=> {
        if(response)
        {
            fetchPendingJobs();
            SetDetailJobCurrentIndex(null);
            setHideColumn(true);
            fetchRejectedJob();
            reset();
          
        }
    })
    setIsSubmittings(false);
 };

 const fetchPendingJobs= () => {
const pendingjobrequests = APICALLHANDLER({ method:'get', url: '/api/job/getPendingJobPost'  });
    pendingjobrequests.then((response)=> { 
        if (response)
        {
            setPendingJob(response.data);
            
           
            
        }
    });
 }

 const fetchApprovedJob=() => {
   const approvedjobrequests = APICALLHANDLER({ method:'get', url: '/api/job/approvedJobsPost'  });
    approvedjobrequests.then((response)=> { 
        if (response)
        {
            setApprovedJob(response.data);  
            setOveralldata([
                { 'title': 'Total Job', 'count': (approvedjob?.length + pendingjob?.length + rejectedjob?.length || 0) },
                { 'title': 'Approved Job', 'count': approvedjob?.length || 0 },
                { 'title': 'Pending Job', 'count': pendingjob?.length || 0 },
                { 'title': 'Rejected Job', 'count': rejectedjob?.length || 0 },
            ])       
        }
    }); 
 }

 const fetchRejectedJob=() => {
const rejectedjobrequests = APICALLHANDLER({ method:'get', url: '/api/job/rejectedJobsPost'  });
    rejectedjobrequests.then((response)=> { 
        if (response)
        {
            setRejectedJob(response.data);  
             
        }
    }); 
 }


 const jobpendingtableHelper = createColumnHelper<JobPostType>();


const jobPendingColumns = [
       jobpendingtableHelper.accessor('title' , {
        header: ()=> {
            return(
                <div className=" flex item-center flex-row "> 
                    <User size={16}  />
                    <span className="ml-2">Job Title </span>
                </div>
            )
        },
        cell : info => {
            return(
                <div className=" ">
                   {info.getValue()}
                </div>
            )
        }
    }),
     jobpendingtableHelper.accessor('company' , {
        header: ()=> {
            return(
                <div className=" flex item-center flex-row  "> 
                    <span className="ml-2">Company Name </span>
                </div>
            )
        },
        cell : info => {
            return(
                <div className=" ">
                    {info.getValue()}
                </div>
            )
        }
    }),
     jobpendingtableHelper.accessor('jobType' , {
        header: ()=> {
            return(
                <div className=" flex item-center flex-row  "> 
                    <span className="ml-2">Job Type </span>
                </div>
            )
        },
        cell : info => {
            return(
                <div className=" ">
                    {JOBTYPE[info.getValue()]}
                </div>
            )
        }
    }),
      jobpendingtableHelper.accessor('opennings' , {
        header: ()=> {
            return(
                <div className=" flex item-center flex-row  "> 
                    <span className="ml-2">Openings No. </span>
                </div>
            )
        },
        cell : info => {
            return(
                <div className=" ">
                   {info.getValue()}
                </div>
            )
        }
    }),
      jobpendingtableHelper.accessor('updatedAt' , {
        header: ()=> {
            return(
                <div className=" flex item-center flex-row  "> 
                    <span className="ml-2">Requested Date </span>
                </div>
            )
        },
        cell : info => {
            return(
                <div className=" ">
                   {info.getValue().split('T')[0]}
                </div>
            )
        }
    }),
 
  hideColumn &&
    jobpendingtableHelper.display({
      id: 'actions',
      header: () => <span className="ml-2">Actions</span>,
      cell: (info) => {
        const rowdata = info.row.original;
        return (
          <div className="flex flex-row gap-2">
            <button
              onClick={() => handleApproveJob(rowdata._id)}
              className="p-1 text-green-500 font-semibold rounded-xl text-sm hover:underline cursor-pointer"
            >
              { isSubmittings ? 'Approving' : 'Approve Job'}
            </button>
            <button
            onClick={()=> {setRejectedClicked(true); SetDetailJobCurrentIndex(rowdata);}}
            className="p-1 text-red-600 font-semibold rounded-xl text-sm hover:underline cursor-pointer">
              { isSubmitting ? 'Rejecting' : 'Reject'}
            </button>
          </div>
        );
      },
    }),

       jobpendingtableHelper.display( 
            {
                id: 'viewmore',
                header: () => (
                 <div className=" flex item-center flex-row  "> 
                    <span className="ml-2">More </span>
                </div>
                ),
                cell: (info)=>  {
                    const rowdata = info.row.original;
                       
                           return (
                            
                          <div onClick={()=> {SetDetailJobCurrentIndex(rowdata); setHideColumn(false); }} className=" p-1 border-1 text-center hover:bg-gray-900 hover:text-white cursor-pointer ">
                      View Details
                        </div>
                            
                        )
            }
        }
      ),


].filter(Boolean) as ColumnDef<JobPostType>[];; 

const pendingjobTable =  useReactTable(
    {
        data: pendingjob, 
        columns: jobPendingColumns,
        getCoreRowModel : getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            pagination: pagination
        },
        onPaginationChange: setPagination,
        
        
    }
);

const submitRejectForm = (data: RejectFormProp) => {
            console.log(data.reaso  ,"= data");
            if (DetailJobCurrentIndex)
            handleRejectJob(DetailJobCurrentIndex._id , data.reaso);
            setRejectedClicked(false);
    }

  return (
    <section className="sections flex flex-col  bg-gray-100 gap-5 sm:gap-7 relative ">
        <h1 className=" text-xl sm:text-2xl  font-bold text-black " > Reviwer DashBoard </h1>
        <div className=" flex flex-col sm:flex-row max-h-[60vh]  gap-3  ">
       <div className="flex-col flex gap-5 sm:gap-7  flex-1/2  "> 
        <div className=" flex flex-wrap gap-2 sm:gap-5 ">
            { overalldata.map((value , index)=> { 
                return (
                    <div key={index} className={` rounded-xl text-sm sm:text-base p-3 flex flex-row items-center bg-blue-100 justify-evenly `}  > 
                      <p className="font-semibold"> {value.title}-  </p>
                      <p> {value.count }</p>
                    </div>
                ) 
                })   }
        </div>
<div className="mt-3">
  <h1 className="text-lg sm:text-xl font-bold text-gray-800">Pending Job Requests</h1>
  <p className="text-gray-500 text-xs sm:text-sm">Click Accept or Reject to update the status.</p>
</div>
   
    <div className={`flex flex-col  max-h-[40vh]  justify-between overflow-y-auto  bg-white rounded-xl`}  >
        <div className="overflow-x-auto scrollbar-hide">
         <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50 ">
               {
                pendingjobTable.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className="text-sm font-bold   text-black">
                        {
                            headerGroup.headers.map(column => (
                                <td key={column.id} className="px-5 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                     {column.isPlaceholder
                                                  ? null
                                                  : flexRender(
                                                      column.column.columnDef.header,
                                                      column.getContext()
                                                    )}
                              
                                                  </td>
                            ))
                        }
                    </tr>
                ))
               }
            </thead>

              <tbody className="bg-white divide-y divide-gray-200 text-[14px] ">
                {
                  pendingjobTable.getRowModel().rows.map((row)=>(
                    <tr key={row.id} className="hover:bg-gray-50" >
                        {row.getVisibleCells().map((cell)=> (
                            <td key={cell.id} className="px-6 py-3 whitespace-nowrap ">   
                             {flexRender(cell.column.columnDef.cell , cell.getContext())}
                            </td>
                        ))}
                    </tr>
                  ))
                }
               
            </tbody>
        </table>  
            { pendingjob.length < 1 && <div className=" text-center p-2"> No job found ...</div>}
            </div>        
               
    </div>
   { pendingjob.length > 0 && <PaginationComponent pagination={pagination} setPagination={setPagination}  pendingjob={pendingjob}  pendingjobTable={pendingjobTable}  />}
    
    </div>

  {DetailJobCurrentIndex  &&
  
    <div className="flex flex-col gap-3 rounded-xl bg-white  relative p-2 px-9 flex-1/2">
        <div onClick={()=> { SetDetailJobCurrentIndex(null); setHideColumn(true)}} className="absolute  cursor-pointer shadow-lg -left-2 top-1/2 bg-white flex items-center rounded-full p-1 ">
        <ChevronLeft size={16} />
        </div>
                 <div className="mt-3 border-b-1  border-b-gray-200">
  <h1 className="text-xl font-bold text-gray-800">Detail Job:</h1>
  <div className="flex flex-col justify-between pb-3">
  <p className="text-gray-500 text-sm ">Analyze Carefully Before Approval or Rejection</p>
   <p className="text-gray-500 text-sm "> Job Created Date: {DetailJobCurrentIndex.createdAt.split('T')[0]}</p>
  </div>
    </div>  
    
              
            <DetailJobView DetailJobCurrentIndex={DetailJobCurrentIndex}  />
           
            <div className="flex flex-row gap-5 my-3  ">
                <button onClick={()=> {handleApproveJob(DetailJobCurrentIndex._id)}} className="p-2 cursor-pointer   hover:bg-green-700 bg-green-600 text-white rounded-sm font-semibold">{ isSubmittings ? 'Approving' : 'Approve Job'}</button>
                <button onClick={()=> {setRejectedClicked(true);}} className="p-2 cursor-pointer   hover:bg-red-700 bg-red-600 text-white rounded-sm font-semibold"> { isSubmitting ?'Rejecting' :'Reject Job'}</button>
            </div>
           
    </div>
}
</div>
    <div>

     <div className="mt-3">
  <h1 className="text-xl font-bold text-gray-800">Existing Job Summary</h1>
  <p className="text-gray-500 text-sm">Explore Accepted and Rejected job.</p>
    </div>  

    </div>

    {/* for accepted and rejected job  */}
    <div className="flex  flex-col sm:flex-row h-[30vh] gap-3 ">
        {/* approved Job */}
        <div className="rounded-xl bg-white flex-1/2 overflow-y-auto   "> 
        <h1 className="w-full p-3 items-center text-center bg-gray-600 text-white rounded-t-xl "> Approved Job</h1>
        {
            approvedjob.map((value,index)=> (
                <div key={index} className={`flex flex-row items-center justify-between gap-1 px-4 py-2 hover:bg-gray-50 ${ index % 2 === 0 ? 'bg-gray-100 ': 'bg-gray-200' }  `}>
                    <div className="flex flex-col">
                    <p className="text-sm  text-gray-600"> Job Title:</p>
                    <p className="text-sm text-black"> {value.title}</p>
                    </div>
                     <div className="flex flex-col">
                    <p className="text-sm  text-gray-600"> Company Name:</p>
                    <p className="text-sm text-black"> {value.company}</p>
                    </div>
                    
                    
                    <div className="flex flex-col">
                    <p className="text-sm  text-gray-600"> Created At:</p>
                    <p className="text-sm text-black"> {value.createdAt.split('T')[0]}</p>
                    </div>
                </div>
            ))
        }
        { approvedjob.length < 1 && 
        <div className="text-black items-center text-center p-3"> No job Found!! </div>
        }
        </div>
        
        <div className="rounded-xl bg-white flex-1/2 overflow-y-auto  "> 
        <h1 className="w-full p-3 items-center text-center bg-gray-400 text-white rounded-t-xl "> Rejected Job</h1>
         {
            rejectedjob.map((value,index)=> (
                <div key={index} className={`flex flex-row items-center justify-between gap-1 px-4 py-2 hover:bg-gray-50 ${ index % 2 !== 0 ? 'bg-gray-100 ': 'bg-gray-200' }  `}>
                    <div className="flex flex-col">
                    <p className="text-sm  text-gray-600"> Job Title:</p>
                    <p className="text-sm text-black"> {value.title}</p>
                    </div>
                     <div className="flex flex-col">
                    <p className="text-sm  text-gray-600"> Company Name:</p>
                    <p className="text-sm text-black"> {value.company}</p>
                    </div>
                    
                    
                    <div className="flex flex-col">
                    <p className="text-sm  text-gray-600"> Created At:</p>
                    <p className="text-sm text-black"> {value.createdAt.split('T')[0]}</p>
                    </div>
                </div>
            ))
        }
          { rejectedjob.length < 1 && 
        <div className="text-black items-center text-center p-3"> No job Found!! </div>
        }
        </div>
    </div>
        
       {rejectedClicked && (
  <>
   
    <div
      className="fixed inset-0 bg-white/50 z-40"
      onClick={() => setRejectedClicked(false)}
    ></div>

  
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-fit bg-white shadow-md p-5 rounded-xl">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(submitRejectForm)}>
          <h1 className="font-semibold">Enter Reason for Rejection:</h1>
          <textarea
            minLength={2}
            {...register('reaso',{ required: "Reason is required", minLength: { value: 2, message: "Reason must be at least 2 characters" }})}

            placeholder="Describe reason for the rejection.."
            className="sm:w-[25vw] h-[20vh] resize-none border p-3 focus:outline-none focus:ring-1 overflow-y-auto"
          />
             {errors.reaso && <p className="text-red-500">{errors.reaso.message}</p>}
          <div className="flex flex-row items-center w-full gap-2">
            <button
              type="submit"
              
              className="w-full p-2 bg-green-600 rounded-xl text-white hover:bg-white hover:text-green-500 hover:border transition font-semibold"
            >
              {!isSubmitting ? 'Reject Job ' : 'Rejecting..'}
            </button>
            <div
              onClick={() => setRejectedClicked(false)}
              className="w-full p-2 text-center rounded-xl bg-red-500 text-white hover:border hover:text-red-400 hover:bg-white transition cursor-pointer font-semibold"
            >
              Cancel
            </div>
          </div> 
        </form>
      </div>
    </div>
  </>
)}


    </section>
  )
}

export default ReviwerScreen

