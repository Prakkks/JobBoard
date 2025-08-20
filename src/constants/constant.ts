import axios from "axios";
import { toast } from "react-toastify";

export const  ConstantValue: ConstantValueProps=
{
 title: 'JobBoard',
 headline: 'Find Your Dream Job Today',
 subheadline : 'Browse 1,000+ verified listings from top companies',
 startingline : ' Personalize your experience — sign in or register to get started.', 
 loginWord : 'Welcome back! Sign in to continue your job search.',
 signUpWord : 'Looking for your next opportunity? Let’s build your career profile.'
}

interface ConstantValueProps 
{
    title: string;
    headline: string;
    subheadline: string,
    startingline:string,
    loginWord: string,
    signUpWord: string,
}

export interface JobListValues 
{
    '_id' : string,
    'title' : string,
    'description' : string,
    'company' : string,
    'location' : string,
    'salary' : number,
    'jobType' : number,
    'createdAt' : string,
    'time' : string,
    "__v" : number,
}


export type JobPosted = {
  _id: string;
  __v: number;
  user: string;
  title: string;
  salary: number;
  location: string;
  jobType: number;
  description: string;
  opennings : number;
  status : number;
  createdAt: string;
  company: string;
  updatedAt : string;
  time: string;
  rejectionReason?: string | null;
};

export type JobPostType = {
  _id: string;
  __v: number;
  user: string;
  title: string;
  salary: number;
  location: string;
  jobType: number;
  description: string;
  opennings : number;
  status : number;
  createdAt: string;
  company: string;
  updatedAt : string;
  time: string;
};

export type JobPostTypeWColor = {
  _id: string;
  __v: number;
  user: string;
  title: string;
  salary: number;
  location: string;
  jobType: number;
  description: string;
  opennings : number;
  status : number;
  createdAt: string;
  company: string;
  updatedAt : string;
  time: string;
  color : string;
};




export interface UserAppliedJob {
 company : string ,
 jobType : string ,
 location : string,
 salary : number,
 time : string ,
 title :  string,
 _id : string ,
}
export interface UserDetail {
  email : string,
  name : string ,
  _id : string ,
}

export type JobApplied = {
  createdAt : string,
  cv: string,
  job : UserAppliedJob[],
  user : UserDetail[],
  _v : number,
  _id : string ,
};


export interface JwtPayload {
  exp: number;       
  iat?: number;      
  role?: number;     
  email: string;
  name: string;
  id : string;

}

type apiCallProps = {
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any,
    header?:any,
    params?:any
    token?: boolean ;
}


export async function APICALLHANDLER ({method ,data ,header , url, params ,token= true}: apiCallProps) 
{
    const base_url = import.meta.env.VITE_BASE_URL;
    try {
    if (token) {
      const authToken = localStorage.getItem("token"); 

      if (authToken) {
        header = {
          ...header,
          Authorization: `Bearer ${JSON.parse(authToken)}`,
        };
      }
    }
        const response =  (method == 'get' || method == 'delete') ?    
        await axios[method](`${base_url}${url}` , {params ,headers: header, timeout:3000 })
        : 
        await axios[method](`${base_url}${url}` ,data, {params ,headers: header, timeout:3000 });
        if (method !== 'get')
        toast.success(response.data.message);
        return response.data;

       }
    catch (error:any) {
      if (method !== 'get')
         toast.error(error.response?.data?.message || 'Something went wrong');
         return null;
       }

    






}