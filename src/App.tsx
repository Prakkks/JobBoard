import { Link, Route, Routes, useLocation } from "react-router-dom"
import Button from "./Components/Button"
import HomePage from "./pages/HomePage"
import JobApplyPage from "./pages/JobApplyPage"
import JobDetailPage from "./pages/JobDetailPage"
import NotFound from "./pages/NotFound"
import JobPostPage from "./pages/JobPostPage"
import { useState } from "react"
import { ConstantValue } from "./constants/constant"

const App = () => {
  const path = useLocation()
  const currentpath = path.pathname;
  const [showMenu , setShowMenu] = useState(false);

  const handleMenuClick = ()=> {
    setShowMenu((prev)=> !prev);
  }

  return (

      <>
    <nav className=" flex flex-row gap-5 justify-between section-nav bg-gray-900 text-white  items-center   ">
        <Link to={'/'}> <h1 className="font-bold outline-none"> {ConstantValue.title} </h1></Link>
      <ul className=" hidden sm:flex flex-row gap-10 ">
        <Link to={'/'} className={` nav-link ${currentpath == '/' ? 'active-link' : '' } `}> Home </Link>
        <Link to={'/applyjob'} className={` nav-link ${currentpath == '/applyjob' ? 'active-link' : '' } `}> JobBoard </Link>
        <Link to={'/job-detail'} className={` nav-link ${currentpath == '/job-detail' ? 'active-link' : '' } `}> View Jobs </Link>
      </ul> 
       <Button content="Post Job" url="/post-jobs" />
       <div className="sm:hidden" onClick={handleMenuClick} > <img src="/Icons/menu-fries.png " alt="menu" className="w-8 h-8 sm:w-full sm:h-full text-black" /></div>
      
    
    </nav>
      {
        showMenu && (

        
         <ul className="  sm:hidden  flex flex-col  absolute z-10 w-full ">
        <Link  onClick={handleMenuClick} to={'/'} className={`  nav-link-sm  ${currentpath == '/' ? 'text-green-500' : '' }  ` }> Home </Link>
        <Link onClick={handleMenuClick} to={'/applyjob'} className={`  nav-link-sm  ${currentpath == '/applyjob' ? 'text-green-500' : '' }   `}> JobBoard </Link>
        <Link onClick={handleMenuClick} to={'/job-detail'} className={`  nav-link-sm  ${currentpath == '/job-detail' ? 'text-green-500' : '' }  `}> View Jobs </Link>
        <Link onClick={handleMenuClick} to={'/post-jobs'} className={`  nav-link-sm   ${currentpath == '/post-jobs' ? 'text-green-500' : '' }  `}> View Jobs </Link>
      
        
      </ul> 
     )
      }
    

    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path= '/applyjob' element= {<JobApplyPage />} /> 
        <Route path='/job-detail' element= {<JobDetailPage />} />
        <Route path="*" element= { <NotFound/>} />
        <Route path="/post-jobs" element={<JobPostPage />} />

    </Routes>
    </>

  )
}

export default App