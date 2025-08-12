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
    'jobType' : string,
    'createdAt' : string,
    'time' : string,
    "__v" : number,
}


type apiCallProps = {
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any,
    header?:any,
    params?:any
}


export async function APICALLHANDLER ({method ,data ,header , url, params}: apiCallProps) 
{
    
    try {
        const response =  (method == 'get' || method == 'delete') ?    
        await axios[method](url , {params ,headers: header, timeout:30000 })
        : 
        await axios[method](url ,data, {params ,headers: header, timeout:30000 });
        
        toast.success(response.data.message);
        // console.log('from here =', response.data);
        return response.data;

       }
    catch (error:any) {
         toast.error(error.response?.data?.message || 'Something went wrong');
         return null;
       }

    






}