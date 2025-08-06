import { Link, useLocation } from "react-router-dom"
import Button from "./Button"
import { ConstantValue } from "../constants/constant"
import { useState } from "react"


const NavBar = () => {
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
        <Link to={'/'} className={` nav-link ${currentpath =='/'?  'active-link' : '' } `}> Home </Link>
        <Link to={'/applyjob'} className={` nav-link ${currentpath == '/applyjob' ? 'active-link' : '' } `}> Dashboard </Link>
        <Link to={'/job-detail'} className={` nav-link ${currentpath == '/job-detail' ? 'active-link' : '' } `}> View Jobs </Link>
      </ul> 
      <div className="flex flex-row items-center gap-3">
       <Button content="Post Job" url="/post-jobs" />
        <div className="rounded-full cursor-pointer bg-white md:h-14 md:w-14  h-10 w-10 text-xl md:text-2xl flex items-center font-bold   text-black  justify-center" onClick={()=>{}}>
            H
        </div>



      </div>
       <div className="sm:hidden" onClick={handleMenuClick} > <img src="/Icons/menu-fries.png " alt="menu" className="w-8 h-8 sm:w-full sm:h-full text-black" /></div>
        

    </nav>

    <div className=" absolute sm:right-10 right-2 p-2 md:p-3 mt-2 bg-red-100">
         <ul className="   flex flex-col  w-full ">
        
        <div    > Home </div>
        <div   > JobBoard </div>
        <div   > View Jobs </div>
        <Link onClick={handleMenuClick} to={'/post-jobs'} > Logout </Link>

        
      </ul> 
    </div>

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

    
    </>
  )
}

export default NavBar