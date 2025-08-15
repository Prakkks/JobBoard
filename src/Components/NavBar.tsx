import { Link,  useLocation,  } from "react-router-dom"
import Button from "./Button"
import { ConstantValue } from "../constants/constant"
import { useContext,  useState } from "react"
import { MyContext } from "../ContextProvider/Provider"
import { toast } from "react-toastify"


const NavBar = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("Error");
  }

  const { user, setUser , showUserTitle, setShowUserTitle } = context;
  const role = user?.role || "Guest";

    const path = useLocation();
    
    const currentpath = path.pathname;
    const [showMenu , setShowMenu] = useState(false);
    const [isClicked , setIsClicked] = useState(false);
    console.log(showUserTitle);

  const handleMenuClick = ()=> {
    setShowMenu((prev)=> !prev);
    setIsClicked(false);
  }
  const handleisClicked = ()=> {
    setIsClicked((prev)=> !prev);
    setShowMenu(false);
  }
  const handleLogout = ()=> {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setIsClicked(false);
    setUser(null);
    setShowUserTitle(false);
    toast.success('User Logout Successfully!');
   
  }
  return (
    <>
     <nav className=" flex flex-row gap-5 justify-between section-nav bg-gray-900 text-white  items-center   ">
        <Link to={'/'}> <h1 className="font-bold outline-none"> {ConstantValue.title} </h1></Link>
      <ul className=" hidden sm:flex flex-row gap-10 ">
        <Link to={'/'} className={` nav-link ${currentpath =='/'?  'active-link' : '' } `}> Home </Link>
         {role !='Guest'  && role != 'reviewer'
        &&<Link to={'/dashboard'} className={` nav-link ${currentpath == '/dashboard' ? 'active-link' : '' } `}> Dashboard </Link>
         }
        <Link to={'/job-detail'} className={` nav-link ${currentpath == '/job-detail' ? 'active-link' : '' } `}> View Jobs </Link>
       { role == 'admin'  && 
        <Link to={'/post-jobs'} className={` nav-link ${currentpath == '/post-jobs' ? 'active-link' : '' } `}> Post Jobs </Link>
       }
        { role == 'reviewer'  && 
        <Link  to={'/reviewer-screen'} className={` nav-link ${currentpath == '/reviewer-screen' ? 'active-link' : '' } `}> Reviewer  </Link>
       }
      </ul> 
      <div className="flex flex-row items-center gap-3">
      
     {role =='Guest' &&
       <Button content="Post Job" url="/post-jobs" />}
       {showUserTitle && 
       <div className={`rounded-full  cursor-pointer bg-white md:h-14 md:w-14  h-10 w-10 text-xl md:text-2xl flex items-center font-bold hover:bg-gray-100  text-black  justify-center`} onClick={handleisClicked}>
            {user?.name[0]?.toUpperCase()}
        </div>


       }
        



       <div className="sm:hidden" onClick={handleMenuClick} > <img src="/Icons/menu-fries.png " alt="menu" className="w-8 h-8 sm:w-full sm:h-full text-black" /></div>
      </div>
        

    </nav>

    {isClicked && 
    <div className=" z-50 absolute sm:right-10 right-2  md:p-3 mt-2 rounded-xl shadow-md shadow-gray-700  bg-gray-900 text-white ">
         <ul className=" flex flex-col  w-full p-2  gap-2  ">
        
        <div className="flex flex-row gap-3 items-center   p-2 "> 
         <div className="rounded-full  bg-white md:h-12 md:w-12  h-8 w-8 text-lg md:text-xl flex items-center font-bold   text-black  justify-center" >
            {user?.name[0].toUpperCase()}
        </div>
        <div className="flex flex-col gap-0">
         <p className="font-semibold">  {user?.name }  </p>
         <p className="text-sm"> {user?.email}</p>
        </div>
        </div>
        
        <p className="text-center w-full  rounded-xl bg-gray-100 p-2 text-black">Role: {user?.role}  </p>
        <Link onClick={handleLogout} to={'/login'} className="flex w-full  rounded-xl bg-gray-100 flex-row gap-2 p-2 items-center justify-center text-[#AA1212] hover:bg-gray-200" > <img src="/Icons/logout.png" className="h-5 w-5"  /> Logout </Link>

        
      </ul> 
    </div>
    }


    {
        showMenu && (

        
        <ul className="  sm:hidden  flex flex-col  absolute z-10 w-full ">
        <Link  onClick={handleMenuClick} to={'/'} className={`  nav-link-sm  ${currentpath == '/' ? 'text-green-500' : '' }  ` }> Home </Link>
         {role !='Guest'  && role!= 'reviewer' 
        &&<Link  onClick={handleMenuClick}  to={'/dashboard'} className={` nav-link-sm ${currentpath == '/dashboard' ? 'text-green-500' : '' } `}> Dashboard </Link>
         }
         <Link  onClick={handleMenuClick} to={'/job-detail'} className={` nav-link-sm ${currentpath == '/job-detail' ? 'text-green-500' : '' } `}> View Jobs </Link>
       { role == 'admin'  && 
        <Link  onClick={handleMenuClick} to={'/post-jobs'} className={` nav-link-sm ${currentpath == '/post-jobs' ? 'text-green-500' : '' } `}> Post Jobs </Link>
       }
        { role == 'reviewer'  && 
        <Link  onClick={handleMenuClick} to={'/reviewer-screen'} className={` nav-link-sm ${currentpath == '/reviewer-screen' ? 'text-green-500' : '' } `}> Reviewer Portal </Link>
       }
        
      </ul> 
     )
      }

    
    </>
  )
}

export default NavBar