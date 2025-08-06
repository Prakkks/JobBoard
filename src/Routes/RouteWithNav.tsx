import NavBar from '../Components/NavBar'
import { Outlet } from 'react-router-dom'

const RouteWithNav = () => {
  return (
    <>
    <NavBar />
    <Outlet />
    </>
  )
}

export default RouteWithNav