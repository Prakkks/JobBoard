import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
// import { MyContext } from "../ContextProvider/Provider"

interface AllowedRole {
    role : string[],
}
const ProtectedRoute = ({role}:AllowedRole) => {
    // const context = useContext(MyContext);
    // if (!context || !context.user) return <Navigate to="/login" replace={true} />;
    
    // const {user} = context;
    // const currentRole: string = user?.role ?? localStorage.getItem("role") ?? "";
    

    const isAuth = (localStorage.getItem('role')) ?? null;
    if (!isAuth)
    {
        return <Navigate to="/login" replace={true} />;
    }
    else 
    {
        const isAllowed = role.includes(isAuth);
        if (!isAllowed) 
            return <Navigate to="/unauthorized" replace={true} />;
        
    }



  

  return (

    <Outlet />
  )
}

export default ProtectedRoute