import { Link } from "react-router-dom"
import { ConstantValue } from "../constants/constant"

const HomePage = () => {
  return (
   <section className="sections h-[100vh] sm:py-20 flex flex-col  items-center gap-8 w-full ">
            
            <div className="flex flex-row px-2 py-2 items-center md:w-[80%] rounded-xl shadow-md shadow-gray-300 border-2 border-gray-400">
  <form className="flex w-full gap-2 items-center">
    <input 
      type="text" 
      placeholder="Start Searching your designated job here!!" 
      name="SearchJob" 
      className="flex-[0.9] bg-white outline-none p-3 rounded-md"
    />
    <button 
      type="submit" 
      className="flex-[0.1] text-sm font-semibold bg-gray-700 text-white px-4 py-2 md:py-4 rounded-md hover:bg-gray-900 "
    >
      Submit
    </button>
  </form>
            </div>
            <div className="flex flex-col gap-2 items-center mt-5">    
            <h1 className="lg:text-6xl md:text-4xl text-2xl sm:mt-5 font-semibold text-gray-700"> {ConstantValue.headline} </h1>
            <h1 className="md:text-xl  text-sm sm:mt-5 font-semibold text-gray-500"> {ConstantValue.subheadline} </h1>
            </div >
            
            <img src="/public/jobimage.jpg" alt="job_image" className="  md:w-[50%] h-auto" />
            
            <Link className="px-5  py-3  rounded-lg bg-gray-700 text-white  nav-link   " to={'/login'}> Get Started ➞ </Link>
            <p> <Link to='/login' className="underline hover:text-black text-blue font-semibold  " >Post your resume</Link> - It only takes a few seconds </p>

   </section>
  )
}

export default HomePage