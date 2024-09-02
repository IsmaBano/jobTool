import { useState } from 'react'
import './App.css'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import Jobdescription from './components/Jobdescription'
import Companies from './components/Admin/Companies'
import CreateCompany from './components/Admin/CreateCompany'
import CompanySetUp from './components/Admin/CompanySetUp'
import AdminJobs from './components/Admin/AdminJobs'
import PostJob from './components/Admin/PostJob'
import Applicants from './components/Admin/Applicants'
import ProtectedRoute from './components/Admin/ProtectedRoute'
import UpdateJob from './components/Admin/UpdateJob'
import SavedJobs from './components/SavedJobs'
import EditProfilePhoto from './components/EditProfilePhoto'

const appRouter= createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/profilephoto',
    element:<EditProfilePhoto/>
  },
  {
    path:'/profile/savedjobs',
    element:<SavedJobs/>
  },
  {
    path:'/description/:id',
    element:<Jobdescription/>
  },
  {
    path:'/admin/companies',
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:'/admin/companies/create',
    element:<CreateCompany/>
  },
  {
    path:'/admin/companies/:id',
    element:<CompanySetUp/>
  },
  {
    path:'/admin/jobs',
    element:<AdminJobs/>
  },
  {
    path:'/admin/jobs/create',
    element:<PostJob/>
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<Applicants/>
  },
  {
    path:'/admin/jobs/update/:id',
    element:<UpdateJob/>
  },
]);

function App() {
  return (
    <>
   <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
