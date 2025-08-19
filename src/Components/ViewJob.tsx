// import { useEffect, useState } from "react";
// import {  APICALLHANDLER, type JobPostType, type JobPostTypeWColor } from "../constants/constant";
// import JobDescriptionProp from "./JobDescriptionProp";
// import { JOBTYPE } from "../constants/enums";
// import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

// const colors = [
//     "bg-red-50", "bg-purple-50", "bg-blue-50", "bg-yellow-50",
//     "bg-pink-50", "bg-green-50", "bg-amber-50",
//   ];
  
//   function getRandomColor(index:number) {
//     console.log(Math.ceil((colors.length-1) / index))
//     return colors[Math.floor((colors.length-1) / index) ];
//   }

//   interface FetchDataProps {
//     pageno? : number,
//     }
// const ViewJob = () => {
//     const [ evenlistedJob , setEvenListedJob ] = useState<JobPostTypeWColor[]| null>(null);    
//     const [ oddlistedJob , setOddListedJob ] = useState<JobPostTypeWColor[]| null>(null);  
//     const [currentPage, setCurrentPage] = useState(1);
//     const [pageIndex,  setPageIndex] = useState<number[]>([1,2,3,4]);
//     const [totalPage , setTotalPage] = useState(1);
//     const [fullarray , setFullArray] = useState <number[]>([1,2,3,4,5,6,7,8,9]);
   
    
//     const fetchalljobs = async ({ pageno = 1 }: FetchDataProps = {}) => {
//       const response = await APICALLHANDLER({
//         method: 'get',
//         url: '/api/job/getAllJobs',
//         params: { page: pageno },
//         token: false
//       });
    
//       if (response) {
//         console.log(response);
//         const updatedJob :JobPostTypeWColor[]  = response.data.jobs.map((item: any, index: number) => ({
//           ...item,
//           color: getRandomColor(index + 1)
//         }));
    
//         setEvenListedJob(updatedJob.filter((_, index) => index % 2 === 0));
//         setOddListedJob(updatedJob.filter((_, index) => index % 2 !== 0));
//         setTotalPage(response.data.totalpage);
//         setFullArray( [...Array(totalPage).keys()].map((_, i) => i + 1));
//       }
//     };
    

//     useEffect(()=> {
//       fetchalljobs();    
//     },[]);

 
 

//   const handlePagination = (n:number) => {
//     setCurrentPage(n);

//     let start_index = 1;
   
//    if (totalPage == 3)
//    {
//     start_index = 0;
//    }
//    else 
//    {

   

//     if ((n -1) < 1) 
//     {
//       start_index = 0 
//     }
//     else if  ((n-1+3) >= totalPage)
//     {
      
//       const vacantspace = totalPage - (n - 1);
//       const reqiredspace = 4 - vacantspace ;
//       start_index = (n ) - reqiredspace -1  ;
      
      
//     }
//     else
//     {
//       start_index = n-2
//     }
//   }
//     console.log(fullarray.slice(start_index, start_index+ 4));
//     setPageIndex(fullarray.slice(start_index, start_index + 4));
//     fetchalljobs({pageno: n});

//   }

//   return (
//     <section className="sections bg-gray-100 flex flex-col gap-8 "> 
//         <h1 className="sm:text-2xl text-xl font-bold mt-5 " id="top"> Listed Job</h1>
//         <div className="grid  sm:grid-cols-2 grid-cols-1 xl:grid-cols-4 gap-y-5 gap-x-4 ">
//         {
//             evenlistedJob && evenlistedJob.map((job) => {
//                     const date = new Date(job.time);
//                     const now = new Date();
//                     const diffTime = now > date ? 'Expired' : `${Math.ceil((date.getTime() - now.getTime())/ (1000 * 60 * 60 * 24 ))} days left`;
                    
//                 return(
//                 <div className="rounded-xl p-1 group bg-white transition-all duration-300" key={job._id}> 
//                     <div className={` flex flex-col  ${job.color} rounded-xl p-3 gap-2 `}>
//                         <div className="flex flex-row items-center text-center  justify-between pr-4">
//                         <div className="flex-col text-xs  flex ">
//                         <p>Created at: </p>
//                         <p className=" text-xs mb-4 sm:text-sm p-1 w-fit bg-white rounded-xl">{job.createdAt.split('T')[0]} </p>
//                         </div>
//                         <p className={`font-semibold ${diffTime == 'Expired' ?'text-gray-400' : 'text-red-500' }`}> {diffTime}  </p>
//                         </div>
//                         <p className="  text-xs leading-0"> {job.company} </p>
//                         <div className="flex flex-row justify-between items-center w-full pr-4 gap-4 ">
//                         <p className="  text-xl font-semibold max-w-[70%]  scale-y-140 "> {job.title} </p>
//                         <p className="  text-xl px-3 py-2 rounded-full text-center items-center text-white bg-gray-900  "> {job.title[0].toUpperCase()} </p>
//                         </div>
                       
//                     </div>
//                     <div className="flex flex-wrap gap-2 pl-1 py-2  pr-4"> 
//                             <JobDescriptionProp icon="/Icons/location.png" value={job.location} />
//                             <JobDescriptionProp icon="/Icons/worktype.png" value={JOBTYPE[job.jobType]} />
//                             <JobDescriptionProp icon="/Icons/people.png" value={` Opening: ${job.opennings}`} />
//                             <JobDescriptionProp icon="/Icons/location.png" value={job.salary} />
//                         </div>
//                     <div className="flex flex-row p-2 my-3 pr-4 items-center justify-between">
//                         <div className="flex flex-col">
//                         <p className=" font-bold"> Rs. {job.salary}/month </p>
//                         <p className="font-thin text-gray-900"> {job.location}</p>

//                         </div>
//                         <button className="px-4 py-2 rounded-2xl   text-white font-semibold bg-gray-900 hover:bg-amber-950 cursor-pointer group-hover:bg-amber-800 " > Details </button>
//                     </div>
//                 </div>

//             )})
//         }
//         </div>

//         <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:grid-cols-4 gap-y-5 gap-x-4 ">
//         {
//             oddlistedJob && oddlistedJob.map((job) => {
//                     const date = new Date(job.time);
//                     const now = new Date();
//                     const diffTime = now > date ? 'Expired' : `${Math.ceil((date.getTime() - now.getTime())/ (1000 * 60 * 60 * 24 ))} days left`;
                    
//                 return(
//                 <div className="rounded-xl p-1 group bg-white transition-all duration-300" key={job._id}> 
//                     <div className={` flex flex-col  ${job.color} rounded-xl p-3 gap-2 `}>
//                         <div className="flex flex-row items-center text-center  justify-between pr-4">
//                         <div className="flex-col text-xs flex ">
//                         <p>Created at:</p>
//                         <p className=" text-xs mb-4 sm:text-sm p-1 w-fit bg-white rounded-xl">{job.createdAt.split('T')[0]} </p>
//                         </div>
//                         <p className={`font-semibold ${diffTime == 'Expired' ?'text-gray-400' : 'text-red-500' }`}> {diffTime}  </p>
//                         </div>
//                         <p className="  text-xs leading-0"> {job.company} </p>
//                         <div className="flex flex-row justify-between items-center w-full pr-4 gap-4 ">
//                         <p className="  text-xl font-semibold max-w-[70%]  scale-y-140 "> {job.title} </p>
//                         <p className="  text-xl px-3 py-2 rounded-full text-center items-center text-white bg-gray-900  "> {job.title[0].toUpperCase()} </p>
//                         </div>
                       
//                     </div>
//                     <div className="flex flex-row p-2 my-3 pr-4 items-center justify-between">
//                         <div className="flex flex-col">
//                         <p className=" font-bold"> Rs. {job.salary}/month </p>
//                         <p className="font-thin text-gray-900"> {job.location}</p>

//                         </div>
//                         <button className="px-4 py-2 rounded-2xl   text-white font-semibold bg-gray-900 hover:bg-amber-950 cursor-pointer group-hover:bg-amber-800 " > Details </button>
//                     </div>
//                 </div>

//             )})
//         }
//         </div>

//         <div className="py-3 flex flex-row items-center justify-center gap-2">
//   <ChevronsLeft onClick={()=> {handlePagination(1); }} size={16} className="cursor-pointer" />
// <button  onClick={()=> handlePagination(currentPage-1 )} disabled={ (currentPage - 1) <= 0  } className="cursor-pointer disabled:cursor-not-allowed "  >   <ChevronLeft     size={16} className="" /> </button>
//  { pageIndex && pageIndex.map((value)=>{ return(
//     <button key={value} onClick={()=>{ handlePagination(value);}} className={` ${ value === currentPage ? 'bg-gray-900 text-white' : 'text-gray-900 ' } cursor-pointer  rounded-full px-3 py-2 hover:bg-amber`}>
//         <p className="text-sm">{value}</p>
//     </button>
//  )})}
//  <button onClick={()=> handlePagination(currentPage+1 )} disabled={ (currentPage + 1) >totalPage  } className="cursor-pointer disabled:cursor-not-allowed "  > <ChevronRight size={16}  /> </button>
//   <ChevronsRight onClick={()=>{handlePagination(totalPage)}} size={16} className="cursor-pointer" />
// </div>
      
//     </section>
//   )
// }

// export default ViewJob

import { useEffect, useState } from "react";
import { APICALLHANDLER, type JobPostType, type JobPostTypeWColor } from "../constants/constant";
import JobDescriptionProp from "./JobDescriptionProp";
import { JOBTYPE } from "../constants/enums";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoveLeftIcon } from "lucide-react";
import { Link,  useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const colors = [
  "bg-red-50", "bg-purple-50", "bg-blue-50", "bg-yellow-50",
  "bg-pink-50", "bg-green-50", "bg-amber-50",
];

function getRandomColor(index:number) {
  return colors[Math.floor((colors.length-1) / index)];
}

interface FetchDataProps {
  pageno?: number,
  location?: string,
  jobType?: 1|2|3|4,
  title? : string, 
}

const ViewJob = () => {
  const [evenListedJob, setEvenListedJob] = useState<JobPostTypeWColor[] | null>(null);    
  const [oddListedJob, setOddListedJob] = useState<JobPostTypeWColor[] | null>(null);  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageIndex, setPageIndex] = useState<number[]>([1,2,3,4]);
  const [totalPage, setTotalPage] = useState(1);
  const [fullArray, setFullArray] = useState<number[]>([]);
  const [ searchLocation , setSearchLocation  ] = useState<string>('');
  const [ searchTitle , setSearchTitle  ] = useState<string>('');
  const [ jobType , setJobType  ] = useState<1|2|3|4>();
  const [loading,setLoading] = useState(true);
  const [viewdetailJob , setViewDetailedJob] = useState(false);
  const [DetailJob , SetDetailJob] = useState<JobPostType|null>(null);
  const navigate = useNavigate();


  const fetchalljobs = async ({ pageno = 1 , location = '', jobType , title = ''   }: FetchDataProps = {}) => {
    const response = await APICALLHANDLER({
      method: 'get',
      url: '/api/job/getAllJobs',
      params: { page: pageno , location: location , jobType: jobType , title : title },
      token: false
    });

    if (response) {
      setLoading(false);
      const updatedJob: JobPostTypeWColor[] = response.data.jobs.map((item: any, index: number) => ({
        ...item,
        color: getRandomColor(index + 1)
      }));

      setEvenListedJob(updatedJob.filter((_, index) => index % 2 === 0));
      setOddListedJob(updatedJob.filter((_, index) => index % 2 !== 0));

      const totalPages = response.data.totalpage;
      setTotalPage(totalPages);
      setFullArray([...Array(totalPages).keys()].map((_, i) => i + 1));
    }
  };

  const handlePagination = (n: number) => {
    if (n < 1 || n > totalPage) return;
    setCurrentPage(n);
    fetchalljobs({ pageno: n });

    
    let startIndex = Math.max(0, Math.min(n - 2, totalPage - 4));
    setPageIndex(fullArray.slice(startIndex, startIndex + 4));
  };

  useEffect(()=> {
     const timer = setTimeout(() => {},300);
     fetchalljobs({location: searchLocation , title: searchTitle   });
     if (jobType != undefined)
     {
     fetchalljobs({location: searchLocation , jobType:jobType , title: searchTitle   });

     }
         
     return () => clearTimeout(timer);
  },[searchLocation, jobType, searchTitle]);

  useEffect(() => {
    fetchalljobs();
  }, []);


  useEffect(() => {
    let startIndex = Math.max(0, Math.min(currentPage - 2, totalPage - 4));
    setPageIndex(fullArray.slice(startIndex, startIndex + 4));
  }, [fullArray, totalPage]);

 const fetchDetailedJob = (id:string) => {
   const role = localStorage.getItem('role');
   if (!role)
   { setViewDetailedJob(true);
        const response = APICALLHANDLER({ method:'get', url: `/api/job/getJob/${id}` });
        response.then((response)=>{
          if (response)
          {
            console.log(response);
            SetDetailJob(response.data);
          }
        })

    }

    else 
    {
      navigate(`/detail-job/${id}`)
    }

 }



  return (
    <div className="sections bg-gray-100 min-h-[110vh] max-h-[110vh] flex flex-col md:flex-row w-full">
    <section className={` flex flex-col gap-8 sm:flex-1/2 overflow-y-auto scrollbar-hide  `}>
      <h1 className="sm:text-2xl text-xl font-bold mt-5 " id="top">Listed Job</h1>

      <div className="flex flex-col gap-2 sm:flex-row pr-3 sm:items-center  sm:justify-between">
        <input className=" bg-white outline-none p-2  w-full sm:w-1/3 rounded-xl" type="Search" placeholder="Search job based on Location E.g. Kathmandu " value={searchLocation} onChange={(e)=> { e.preventDefault(); setSearchLocation(e.target.value) }} />
        <input className=" bg-white outline-none p-2  w-full sm:w-1/3 rounded-xl" type="Search" placeholder="Search job by Name E.g. Data Analyst " value={searchTitle} onChange={(e)=> { e.preventDefault(); setSearchTitle(e.target.value) }} />
        <select className="outline-none w-fit "  onChange={(e) => {e.preventDefault(); const value = Number(e.target.value); if ([1, 2, 3, 4].includes(value)) { setJobType(value as 1 | 2 | 3 | 4); }else { setJobType(undefined); }}}>
          <option value="undefined">All</option>
          {[1,2,3,4].map((item)=> (
            <option key={item} className="sm:text-base text-sm" value={item}>{JOBTYPE[item]}</option>
          ))}
        </select>
      </div>

      {/* Even Jobs */}
      <div className={`grid ${ viewdetailJob ? 'grid-cols-1' : 'sm:grid-cols-2 grid-cols-1 xl:grid-cols-4 '} gap-y-5 gap-x-4 `}>
        {evenListedJob && evenListedJob.map((job, index) => {
          const date = new Date(job.time);
          const now = new Date();
          const timeleft = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          const diffTime = now > date ? 'Expired' : timeleft < 1 ? 'Today' : timeleft < 20  ? `${timeleft} days left` : `${Math.ceil(timeleft / 30)} months left`;
         return (
            <motion.div className="rounded-xl p-1 group bg-white transition-all duration-300" key={job._id}
            initial = { {opacity: 0 , y: 0 }}
            animate = {{ opacity:1 , y:0}}
            transition={ { delay: index * 0.2 , }}
            >
              <div className={`flex flex-col ${job.color} rounded-xl p-3 gap-2`}>
                <div className="flex flex-row items-center text-center justify-between pr-4">
                  <div className="flex-col text-xs flex">
                    <p>Created at:</p>
                    <p className="text-xs mb-4 sm:text-sm p-1 w-fit bg-white rounded-xl">{job.createdAt.split('T')[0]}</p>
                  </div>
                  <p className={`font-semibold ${diffTime === 'Expired' ? 'text-gray-400' : timeleft <= 10 ? 'text-red-500' : 'text-green-500'}`}>{diffTime}</p>
                </div>
                <p className="text-xs leading-0">{job.company}</p>
                <div className="flex flex-row justify-between items-center w-full pr-4 gap-4">
                  <p className="text-xl font-semibold max-w-[70%] ">{job.title}</p>
                  <p className="text-xl px-3 py-2 rounded-full text-center items-center text-white bg-gray-900">{job.title[0].toUpperCase()}</p>
                </div>
              <div className="flex flex-wrap gap-2 pl-1 py-2 pr-4">
                <JobDescriptionProp icon="/Icons/location.png" value={job.location} />
                <JobDescriptionProp icon="/Icons/worktype.png" value={JOBTYPE[job.jobType]} />
                <JobDescriptionProp icon="/Icons/people.png" value={`Opening: ${job.opennings}`} />
                <JobDescriptionProp icon="/Icons/star.png" value={`Stipend: ${job.salary}`} />
              </div>
              </div>
              <div className="flex flex-row p-2 my-3 pr-4 items-center justify-between">
                <div className="flex flex-col">
                  <p className="font-bold">Rs. {job.salary}/month</p>
                  <p className="font-thin text-gray-900">{job.location}</p>
                </div>
                <button className="px-4 py-2 rounded-2xl text-white font-semibold bg-gray-900 hover:bg-amber-950 cursor-pointer group-hover:bg-amber-800" onClick={()=> { fetchDetailedJob(job._id);  }}>View Details</button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Odd Jobs */}
      <div className={`grid ${ viewdetailJob ? 'grid-cols-1' : 'sm:grid-cols-2 grid-cols-1 xl:grid-cols-4 '} gap-y-5 gap-x-4 `}>

        {oddListedJob && oddListedJob.map((job,index) => {
          const date = new Date(job.time);
          const now = new Date();
          const timeleft = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          const diffTime = now > date ? 'Expired' : timeleft < 1 ? 'Today' : timeleft < 20  ? `${timeleft} days left` : `${Math.ceil(timeleft / 30)} months left`;
          return (
            <motion.div className="rounded-xl p-1 group bg-white transition-all duration-300" key={job._id}
             initial = { {opacity: 0 , y: 0 }}
            animate = {{ opacity:1 , y:0}}
            transition={ { delay: index * 0.2 , }}>
              <div className={`flex flex-col ${job.color} rounded-xl p-3 gap-2`}>
                <div className="flex flex-row items-center text-center justify-between pr-4">
                  <div className="flex-col text-xs flex">
                    <p>Created at:</p>
                    <p className="text-xs mb-4 sm:text-sm p-1 w-fit bg-white rounded-xl">{job.createdAt.split('T')[0]}</p>
                  </div>
                  <p className={`font-semibold ${diffTime === 'Expired' ? 'text-gray-400' : timeleft <= 10 ? 'text-red-500' : 'text-green-500'}`}>{diffTime}</p>
                </div>
                <p className="text-xs leading-0">{job.company}</p>
                <div className="flex flex-row justify-between items-center w-full pr-4 gap-4">
                  <p className="text-xl font-semibold max-w-[70%]  ">{job.title}</p>
                  <p className="text-xl px-3 py-2 rounded-full text-center items-center text-white bg-gray-900">{job.title[0].toUpperCase()}</p>
                </div>
              </div>
              <div className="flex flex-row p-2 my-3 pr-4 items-center justify-between">
                <div className="flex flex-col">
                  <p className="font-bold">Rs. {job.salary}/month</p>
                  <p className="font-thin text-gray-900">{job.location}</p>
                </div>
                <button  onClick={()=> { fetchDetailedJob(job._id);  }}  className="px-4 py-2 rounded-2xl text-white font-semibold bg-gray-900 hover:bg-amber-950 cursor-pointer group-hover:bg-amber-800">Details</button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
     {
      !loading  &&
      <div className="py-3 flex flex-row items-center justify-center gap-2">
        <ChevronsLeft onClick={() => handlePagination(1)} size={16} className="cursor-pointer" />
        <button onClick={() => handlePagination(currentPage - 1)} disabled={currentPage <= 1} className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
          <ChevronLeft size={16} />
        </button>

        {pageIndex.map((value) => (
          <button key={value} onClick={() => handlePagination(value)} className={`cursor-pointer rounded-full px-3 py-2 ${value === currentPage ? 'bg-gray-900 text-white' : 'text-gray-900'} hover:bg-amber`}>
            <p className="text-sm">{value}</p>
          </button>
        ))}

        <button onClick={() => handlePagination(currentPage + 1)} disabled={currentPage >= totalPage} className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
          <ChevronRight size={16} />
        </button>
        <ChevronsRight onClick={() => handlePagination(totalPage)} size={16} className="cursor-pointer" />
      </div>}

      {loading && 
      <div className="text-center"> Job Not Found!!</div>}
    </section>





    { viewdetailJob && <div className="min-w-[60%]  p-5 mt-20">
    <div className="flex flex-col rounded-md shadow-md relative  p-3 gap-3 bg-white sm:p-5 drop-shadow-gray-300">
      <div onClick={()=> {setViewDetailedJob(false) }} className="p-2 shadow-md flex items-center justify-center absolute -left-3 rounded-full z-50 bg-white top-1/2"> <MoveLeftIcon size={18} /> </div> 
         
          <div className="flex flex-row items-center">
            <div className="rounded-4xl w-13 h-13 lg:w-20 lg:h-20 sm:w-15 sm:h-15 p-2 items-center font-bold text-3xl justify-center flex bg-gray-200 ">
             
              {DetailJob?.title[0].toUpperCase()}{" "}
            </div>
            <div className="flex flex-col p-3">
              <h2 className=" text-lg  md:text-xl lg:text-2xl font-semibold text-black">
                {DetailJob?.title}
              </h2>
              <p className="text-sm sm:text-lg text-gray-500">{DetailJob?.company}</p>
            </div>
          </div>

          <div className="flex flex-row px-3 items-center">
            <div className="flex flex-wrap gap-3  items-center ">
              <span className="flex flex-row items-center text-sm  sm:text-[15px] rounded-3xl py-1 px-2 bg-amber-50 gap-1">
                <img className="h-4 w-4 " src="/Icons/location.png" />
                <p> {DetailJob?.location} </p>
              </span>
              <span className="flex flex-row text-sm sm:text-[15px] items-center rounded-3xl py-1 px-2 bg-green-50 gap-1">
                <img className="h-4 w-4 " src="/Icons/worktype.png" />
                <p> { DetailJob ?   JOBTYPE[DetailJob.jobType] : ''}</p>
              </span>
              <span className="flex flex-row text-sm sm:text-[15px] items-center rounded-3xl py-1 px-2 bg-red-50 gap-1">
                <img className="h-5 w-5 " src="/Icons/money.png" />
                <p className="text-gray-700  ">Salary:</p>
                <p> {DetailJob?.salary}</p>
              </span>
              <span className="flex flex-row text-sm sm:text-[15px] items-center rounded-3xl py-1 px-2 bg-red-50 gap-1">
                <img className="h-5 w-5 " src="/Icons/money.png" />
                <p className="text-gray-700  ">Opening No:</p>
                <p> {DetailJob?.opennings}</p>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-0">
            <p className=" px-3 pt-3 text-gray-800 font-semibold">
              {" "}
              Job Description:
            </p>
            <p className="text-gray-600 text-sm sm:text-base px-3">
              {DetailJob?.description}
            </p>
          </div>

         
          <Link   to="/login"
          state={{ redirectToJobId: DetailJob?._id }}  className=" px-3 outline-red-100 w-fit rounded-xl font-semibold hover:bg-gray-800 hover:text-white  text-gray-900 p-2">Login and Apply Now  ￫</Link>
          {/* <Link to={` /login?redirect=/detail-job/${DetailJob?._id}`}  className=" px-3 outline-red-100 w-fit rounded-xl font-semibold hover:bg-gray-800 hover:text-white  text-gray-900 p-2">Login and Apply Now  ￫</Link> */}

        </div>
    
    </div>}
    </div>
  );
};

export default ViewJob;
