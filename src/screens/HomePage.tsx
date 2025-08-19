import { Link, useNavigate } from "react-router-dom"
import { APICALLHANDLER, ConstantValue, type JobPosted } from "../constants/constant"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";


const HomePage = () => {
   const role = localStorage.getItem('role') || 'Guest';
   const navigate = useNavigate();
   const [jobs, setJobs] = useState<JobPosted[]>([]);
   const [searchedJobTitle , setSearchedJobTitle] = useState('');
   const [searchState , setSearchState] = useState(false);
   console.log(role);

   const fetchjobs = ()=> {
    const response = APICALLHANDLER({ url: '/api/job/getAllJobs' , method: 'get' , params: { title: searchedJobTitle }});
    response.then((res)=> {
       
          if (res?.data.jobs.length > 0 )
         { setJobs(res.data.jobs);
            setSearchedJobTitle('');
            setSearchState(false);
         }
         else 
         {
            setJobs([]);
            setSearchState(true);

         }
         
        
     })

   }

   useEffect(()=> {
    const timer = setTimeout(()=>{
      if (searchedJobTitle == '')
      {
        setSearchState(false);
      }
    },300);
    return ()=> {clearTimeout(timer); }},
   [ searchedJobTitle]);


  return (
   <section className="sections h-[100vh] sm:py-20 flex flex-col  items-center gap-8 w-full ">
            
            <motion.div className="flex flex-row px-2 py-2 items-center md:w-[80%] rounded-xl shadow-md shadow-gray-300 border-2 border-gray-400"
          // animate={{y:0}} initial={{y:'-100vh'}} transition={{type:"tween" }}
          >
  <form className="flex w-full gap-2 items-center" onSubmit={(e)=> {
    e.preventDefault(); fetchjobs()
  }}>
    <input 
      type="search" 
      placeholder="Start Searching your designated job here!!" 
      name="SearchJob" 
      value={searchedJobTitle}
     onChange={(e)=> { e.preventDefault(); setSearchedJobTitle(e.target.value) }}
      className="flex-[0.9] bg-white outline-none p-3 rounded-md"
    />
    <button  
      onClick={fetchjobs}
      type="submit" 
      className="flex-[0.1] text-sm font-semibold bg-gray-700 text-white px-4 py-2 md:py-4 rounded-md hover:bg-gray-900 "
    >
      Submit
    </button>
  </form>
            </motion.div>
        { jobs.length > 0 &&  <div className="flex flex-wrap items-center gap-5 "> 
           {jobs.map((item,index)=> 
          (
             <motion.div key={item._id} onClick={()=> { navigate(`/detail-job/${item._id}`)}} className="p-2 flex cursor-pointer flex-col rounded-xl border-1 border-gray-500 shadow-md "
             initial = {{ opacity:0}}
             animate = {{opacity:1}}
             transition={{ delay: index *0.2}}
             >
              
              <h1 className=" ">{item.title} </h1>
              <h2 className=" text-sm text-gray-500">{item.location} </h2> 
              </motion.div>
          )
          )}
         
          </div>}
           {
            searchState && <p> No search result found.</p>
          }

            <motion.div className="flex flex-col gap-2 items-center mt-5" >    
            <h1 className="lg:text-6xl md:text-4xl text-2xl sm:mt-5 font-semibold text-gray-700"> {ConstantValue.headline} </h1>
            <h1 className="md:text-xl  text-sm sm:mt-5 font-semibold text-gray-500"> {ConstantValue.subheadline} </h1>
            </motion.div >
            
            <img src="/public/jobimage.jpg" alt="job_image" className="  md:w-[50%] h-auto" />
            <motion.div  initial={{x:'-2vw'}} animate={{x:0}} transition={{duration:1}}>
           {role == 'admin' &&   <Link className="px-5  py-3  rounded-lg bg-gray-700 text-white  nav-link   " to={'/post-jobs'}> Post Job ➞ </Link>}
           {(role == 'Guest' || role == "reviewer") &&   <Link className="px-5  py-3  rounded-lg bg-gray-700 text-white  nav-link   " to={'/login'}> Get Started ➞ </Link>}
           {role == 'user' &&   <Link className="px-5  py-3  rounded-lg bg-gray-700 text-white  nav-link   " to={'/job-detail'}>View Jobs ➞ </Link>}
          </motion.div>
          {/* <p> <Link to='/login'   className="underline hover:text-black text-blue font-semibold  " >Post your resume</Link> - It only takes a few seconds </p> */}

   </section>
  )
}

export default HomePage