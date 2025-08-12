import { useEffect, useState } from "react"
import { APICALLHANDLER, type JobListValues } from "../constants/constant";
import ListedJobCard from "../Components/ListedJobCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { JobFilterSchema, type JobFilterSchemaType } from "../Validation/validate";





const JobDetailPage = () => {
  
  const [job, setJob] = useState<JobListValues[]>([]);
  const [reloadJobShow , setReloadJobShow] = useState<JobFilterSchemaType>({'jobType':'' ,'location':'' });
  const baseURL = import.meta.env.VITE_BASE_URL
  
  const {register , formState: {errors}, handleSubmit} = useForm( {resolver: zodResolver(JobFilterSchema)} );
    const onSubmit = (data:JobFilterSchemaType)=> {
        console.log(data);
        setReloadJobShow(data);
    }

  useEffect(

    ()=> {

      // let url = baseURL+'/api/job/getAllJobs';
      
      // console.log('url = ', url);
      // axios.get(url, {params: {jobType : reloadJobShow.jobType , location : reloadJobShow.location}})
      // .then((response)=> {
      //     setJob(response.data.jobs);
      //     const arr = response.data.jobs;
      //    setJob(arr);
            
      // })
      // .catch((error)=> {
      //   console.log('error:',error);
      // })

      const responses = APICALLHANDLER({method:'get', params: {jobType : reloadJobShow.jobType , location : reloadJobShow.location}, url:'https://jg4npv8c-4001.inc1.devtunnels.ms/api/job/getAllJobs'} );
      responses.then((response)=> {
          // console.log(response?.jobs);
          setJob(response?.jobs);        
      });

     
    },
    [reloadJobShow]);





  return (
    
    
    <section className="sections flex flex-col gap-4  ">
        
       
       <div className="flex flex-row  sm:pb-5  p-2 shadow-sm shadow-gray-100   ">
        <form onSubmit={handleSubmit(onSubmit)} className="flex  flex-col gap-2 sm:gap-0 sm:flex-row sm:items-center  justify-around w-full " > 
           
           <label className="flex flex-col sm:flex-1/4 bg-white "> <p className="text-sm">TYPE</p>  
           <select {...register('jobType')} className="border-none  bg-[#f6f3f4] sm:w-1/2 rounded-md px-4 py-2  outline-none" >
                <option className="" value={''}> Select </option>
                <option value={'Contract'}> Contract </option>
                <option value={'Part-time'}> Part Time</option>
                <option value={'Full-time'}> Full Time</option>
                <option value={'Internship'}> Internship</option>
            </select>
            {errors.jobType && <div>{errors.jobType.message}</div>}
            </label>
            <label className="flex flex-col sm:flex-1/4 "><p className="text-sm" > CATEGORY</p> <input placeholder="Eg. Kathmandu"  type="text" {...register('location')} className=" border-[#f6f3f4]  bg-[#f6f3f4] sm:w-1/2 rounded-md px-4 py-2 " />
            {errors.location && <div>{errors.location.message}</div>}
            </label>
            <span className="sm:flex-1/4  flex-row  justify-center w-full "> <button className=" cursor-pointer  rounded-md sm:w-1/2 justify-center border-2 hover:bg-[#f6f3f4] border-[#f6f3f4] px-4 py-2 flex flex-row gap-2 items-center font-semibold text-black"> <img src="/Icons/search.png" className="w-5 h-5" /> Search</button></span>
 
        </form>

    </div>



       <div  className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-7 justify-evenly w-full">
    
       {job.length === 0 ? (
        <p>No result found..</p>
      ) : (
        
        job.map((job,index) => {
         
          const dates = job.createdAt.split('T')[0];
          const firstletter = job.title[0].toUpperCase();
          return (
            <ListedJobCard key={index} letter = {firstletter} keyed={index} id={job._id} title= {job.title} company={job.company} salary={job.salary} location={job.location} jobType={job.jobType} createdAt={dates} />

          )
          
            })
      )}
         </div>
               

                

         


    </section>
   
    
  )
}

export default JobDetailPage