import Login from './pages/Login.tsx';
import HomePage from './pages/HomePage.tsx';
import JobApplyPage from './pages/Dashboarddd.tsx';
import JobDetailPage from './pages/JobDetailPage.tsx';
import DetailedJobPage from './pages/DetailedJobPage.tsx';
import JobPostPage from './pages/JobPostPage.tsx';
import NotFound from './pages/NotFound.tsx';
import RouteWithNav from './Routes/RouteWithNav.tsx';
import { Route, Routes } from 'react-router-dom';
import RouteWithoutNav from './Routes/RouteWithoutNav.tsx';
import ProtectedRoute from './Routes/ProtectedRoute.tsx';
import Unauthorized from './pages/Unauthorized.tsx';
import Dashboard from './pages/Dashboarddd.tsx';

const App = () => {
 
  return (
   <Routes>
         
         <Route element={<RouteWithNav/> }>

              <Route path="/" element={<HomePage />} />
              <Route path='/job-detail' element= {<JobDetailPage />} />
              <Route element= {<ProtectedRoute role={['admin','user']} />}>
                    <Route path="/dashboard" element={<Dashboard/>} />
              </Route>
              <Route element= {<ProtectedRoute role={['user']} />}>
                    <Route path= '/applyjob' element= {<JobApplyPage />} /> 
                    <Route path="/detail-job/:id" element={<DetailedJobPage />} />
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
  )
}

export default App