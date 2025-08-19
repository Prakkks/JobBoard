import Login from './screens/Login.tsx';
import HomePage from './screens/HomePage.tsx';
import JobApplyPage from './screens/Dashboarddd.tsx';
import DetailedJobPage from './screens/DetailedJobPage.tsx';
import JobPostPage from './screens/JobPostPage.tsx';
import NotFound from './screens/NotFound.tsx';
import RouteWithNav from './Routes/RouteWithNav.tsx';
import { Route, Routes } from 'react-router-dom';
import RouteWithoutNav from './Routes/RouteWithoutNav.tsx';
import ProtectedRoute from './Routes/ProtectedRoute.tsx';
import Unauthorized from './screens/Unauthorized.tsx';
import Dashboard from './screens/Dashboarddd.tsx';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReviwerScreen from './screens/ReviwerScreen.tsx';
import ViewJob from './Components/ViewJob.tsx';

const App = () => {
 
  return (
      <>
   <Routes>
         
         <Route element={<RouteWithNav/> }>

              <Route path="/" element={<HomePage />} />
              <Route path='/job-detail' element= {<ViewJob />} />
              <Route path="/detail-job/:id" element={<DetailedJobPage />} />



              <Route element= {<ProtectedRoute role={['reviewer']} />}>
                  <Route path='/reviewer-screen' element= {<ReviwerScreen />} />
              </Route>
              <Route element= {<ProtectedRoute role={['admin','user']} />}>
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path= '/applyjob' element= {<JobApplyPage />} /> 
              </Route>
              <Route element= {<ProtectedRoute role={['user']} />}>
                    {/* <Route path="/detail-job/:id" element={<DetailedJobPage />} /> */}
              </Route>
              <Route element= {<ProtectedRoute role={['admin']} />}>
                    <Route path="/post-jobs" element={<JobPostPage />} />
               </Route>
              <Route path='/unauthorized' element = { <Unauthorized/>} />
         </Route>

         <Route element={<RouteWithoutNav/>} >
              <Route path="/login" element={<Login type='SignIn' />} />
              <Route path='/signup' element = { <Login type='SignUp' />} />
              <Route path="*" element= { <NotFound/>} />

         </Route>
    </Routes>
    < ToastContainer  />
      </>
  )
}

export default App