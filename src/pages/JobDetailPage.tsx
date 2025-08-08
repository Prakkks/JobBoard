import axios from "axios";
import { useEffect, useState } from "react"
import type { JobListValues } from "../constants/constant";
import ListedJobCard from "../Components/ListedJobCard";
import FilterJob from "../Components/FilterJob";


const JobDetailPage = () => {
  
  const [job, setJob] = useState<JobListValues[]>([]);
  const baseURL = import.meta.env.VITE_BASE_URL
  


  useEffect(

    ()=> {
      
      axios.get(baseURL+'/api/job/getAllJobs')
      .then((response)=> {
          setJob(response.data.jobs);
          const arr = response.data.jobs;
         setJob(arr);
          
          
      })
      .catch((error)=> {
        console.log('error:',error);
      })
     

      

    },
    []);





  return (
    
    <section className="sections flex flex-col gap-4  ">
        
      <FilterJob />  
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