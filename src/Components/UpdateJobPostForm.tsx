import { type JobSchemaType } from "../Validation/validate";
import JobPostFormTemplate from "./JobPostFormTemplate";
import { useEffect, useState } from "react";
import { APICALLHANDLER, type JobPosted } from "../constants/constant";
import { motion } from "framer-motion";

interface Props
{
    job_id : string,
    setUpdateRow : React.Dispatch<React.SetStateAction<JobPosted | null>>,
    updaterow : JobPosted | null,
    fetchjobs:  () => Promise<void>,
}



const UpdateJobPostForm = ({job_id, setUpdateRow, updaterow, fetchjobs}: Props) => {
    const [currentIdData , setcurrentIDData] = useState<JobPosted>();
     
    const onSubmit = async(data: JobSchemaType)=> {
           
            console.log(data, job_id);
            
            try {

                const response = await APICALLHANDLER({url : `/api/job/updateJob/${job_id}`, method:'put' ,  data:data});
                if(response)
                   {
                    console.log(response);
                    setUpdateRow(null);
                    await fetchjobs();
                    return true;
                    
                   }
                else
                    return false;
            }
            catch(e)
            {
                return false;
            }
            

    }

    useEffect(()=> {
        console.log(' data from row = ');
            
        console.log( updaterow?._id , updaterow?.company , updaterow?.description , updaterow?.title);
        if (updaterow)
        setcurrentIDData(updaterow);
        // const responses = APICALLHANDLER({ method: 'get' , url : `/api/job/getJob/${job_id}` });
        // responses.then((response)=> {
        //     console.log(response);
        //     setcurrentIDData(response.job);
        // });
        return ()=> {};
    },[]);


  return (
    <>
        <motion.div className=" absolute top-40 sm:translate-x-5  overflow-x-auto  w-[70%] flex flex-col items-center  "  initial= {{y: '-200vh'}} animate= {{y: 0}} transition={{ duration:1.5 , }  } > 
        <button onClick={()=> {setUpdateRow(null);  }}> <img src="/Icons/close.png" className="absolute right-0 sm:right-[11%] top-5" />  </button>
        <JobPostFormTemplate  formHeading="Update Form" onSubmit = {onSubmit} currentIDData = {currentIdData} setcurrentIDData = {setcurrentIDData} /> 
        </motion.div>
    </>
  )
}

export default UpdateJobPostForm