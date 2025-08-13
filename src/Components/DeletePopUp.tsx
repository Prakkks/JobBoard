import { AnimatePresence, motion } from "framer-motion"
import type { JobApplied, JobPosted } from "../constants/constant"


  interface props
    {
        // setOpenPopUp : React.Dispatch<React.SetStateAction<boolean>>,
        setCurrentActionJob : React.Dispatch<React.SetStateAction<JobPosted | JobApplied | null>>,
        setDeleteJob : React.Dispatch<React.SetStateAction<boolean>>,
        // openPopUp : boolean,
        title: string
        // currentActionJob : JobPosted | JobApplied ;
        
    }

const DeletePopUp = ({   title, setDeleteJob , setCurrentActionJob   }: props) => {
  

  return (
    <div className="w-full flex flex-row justify-center " >
         
         

           <AnimatePresence>
           <motion.div className="p-5 sm:w-[30%] bg-white shadow-md rounded-xl self-center flex flex-col items-center relative  text-center gap-4 "
           initial= {{ y: '-100vh' }}
           exit= {{ y: '-100vh' }}
           animate={{ y: '-25vh' }}
           transition={{ duration: 0.5 }}
           >
                <img onClick={()=> {setCurrentActionJob(null)}} className="absolute right-3 h-5 w-5  cursor-pointer top-3" src="/Icons/close.png" />
                <img className="h-9 w-9" src="/public/Icons/cross-red.png" /> 
               <h1 className="font-bold "> Delete this job </h1>
               <div className="flex flex-col text-center w-full items-center gap-1">
               <p className="text-sm text-gray-500">Are you sure you want to delete <strong> {title}? </strong> </p>
                <p className="text-sm text-gray-500 w-[60%]  ">After deleting this job, all the data will be lost and  it can't be undone ?</p>   
                </div>     
                <div className="flex flex-row gap-3 ">
                    <button className="cursor-pointer p-2 rounded-xl bg-gray-800 text-sm text-white hover:bg-gray-700" onClick={()=> { setDeleteJob(true)}}> Yes, Delete Job </button>
                    <button className="cursor-pointer p-2 rounded-xl border-red-500 text-sm border-2 bg-white   hover:bg-red-500 hover:text-white text-red-500 outline-none" onClick={()=> {setCurrentActionJob(null)}}> No, Cancel </button>
                </div> 
            </motion.div>
            </AnimatePresence>
              
        
  

    </div>
   
  )
}

export default DeletePopUp