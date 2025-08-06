import Login from './pages/Login.tsx';
import HomePage from './pages/HomePage.tsx';
import JobApplyPage from './pages/Dashboard.tsx';
import JobDetailPage from './pages/JobDetailPage.tsx';
import DetailedJobPage from './pages/DetailedJobPage.tsx';
import JobPostPage from './pages/JobPostPage.tsx';
import NotFound from './pages/NotFound.tsx';
import RouteWithNav from './Routes/RouteWithNav.tsx';
import RouteWithoutNav from './Routes/ROuteWithoutNav.tsx';
import { Route, Routes } from 'react-router-dom';

const App = () => {
 
  return (
   <Routes>
         
         <Route element={<RouteWithNav/> }>
              <Route path="/dashboard" element={<JobApplyPage />} />
              <Route path='/job-detail' element= {<JobDetailPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/post-jobs" element={<JobPostPage />} />
              <Route path="/detail-job/:id" element={<DetailedJobPage />} />
              <Route path= '/applyjob' element= {<JobApplyPage />} /> 
              <Route path='/job-detail' element= {<JobDetailPage />} />
   
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