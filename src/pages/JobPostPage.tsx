import { useForm } from "react-hook-form"
import { jobschema, type JobSchemaType } from "../Validation/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import JobPostInputField from "../Components/JobPostInputField";

// const JobPostPage = () => {
//   const {register , handleSubmit , reset , formState: {errors,  isSubmitting,} } = useForm<JobSchemaType>({ resolver: zodResolver(jobschema) });
//   const onSubmit = async (data: JobSchemaType) => {
//       console.log(data);
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       reset();
//   }
//   return (
//     <div className=" text-black ">
//       <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2" >
//           <label > Job Title</label>
//           <input  {...register("title")}   />
//           {errors.title && <p className="text-red-400">{errors.title.message?.toString()}</p>}

//           <label> Job Description </label>
//           <input type="text" {...register('description')} />
//           {errors.description && <p className="text-red-400">{errors.description.message?.toString()}</p>}
//           <button type="submit" className="bg-blue-500 text-white px-4 py-2">
//           {isSubmitting ? 'Submitting...' : 'Submit'}
//           </button>
//       </form>
//     </div>
//   )
// }

const JobPostPage = () => {
  const [issubmitting, setIsSubmitting] = useState(false);
  const { register, formState: {errors,  } , reset, handleSubmit  } = useForm({ resolver: zodResolver(jobschema) });
 
  const onSubmit = async(data: JobSchemaType) => {
      setIsSubmitting(true);
    const tokens = localStorage.getItem('token');
    if (tokens)
    {
    const token = JSON.parse(tokens)
    console.log(data);
    axios.post('https://jg4npv8c-4001.inc1.devtunnels.ms/api/job/create',data, {headers: { 'Authorization': `Bearer ${token}` }})
    .then((response)=>{console.log(response?.data?.message);})
    .catch((error)=>{console.log(error.response?.data?.message);});
    setIsSubmitting(false);
    }
    else {
      alert(' Please refresh and try again. ');
      setIsSubmitting(false);
    }
    
    reset();
  }

  return (
    <div className=" text-black w-full flex flex-row  bg-white ">
        <div className=" w-full flex flex-col justify-center m-2 border-gray-200 border-2 rounded-md px-4 sm:w-[80%] bg-white flex-1">

          <h1 className=" border-b-2 border-b-gray-200">
            <p className="p-5 font-bold text-xl text-center"> Job Post Form</p>
          </h1>
          
          <form className="flex flex-col gap-3 sm:gap-8 p-3 w-full  " onSubmit={handleSubmit(onSubmit)} >    
          <JobPostInputField title='Job Title'  name="title"  errors={errors.title} register={register} subtitle="A job title must describe one position only"  placeholder= 'Eg. FrontEnd Developer' />
          <JobPostInputField title='Job Description'   name="description"  errors={errors.description} register={register} subtitle="Summarize the key responsibilities of the role"  placeholder= 'Eg. Design & manage UI' />
          <JobPostInputField title='Employment Type'  name="jobType" type="option" errors={errors.jobType} register={register} subtitle="Choose method of working "  placeholder= 'Eg. 2500' />
          <JobPostInputField title='No. of Opening' type="number"  name="opennings" errors={errors.opennings} register={register} subtitle="Please specify no of employee you want to hire"  placeholder= 'Eg. 5' />
          <JobPostInputField title='Company Name'  name="company" errors={errors.company} register={register} subtitle="Enter the official company or organization name"  placeholder= 'Eg. AECC Global' />
          <JobPostInputField title='Job Location'   name="location"  errors={errors.location} register={register} subtitle="Mention the workplace location"  placeholder= 'Eg. Kathmandu' />
          <JobPostInputField title='Salary Offered' type="number"  name="salary" errors={errors.salary} register={register} subtitle="Monthly salary offered for employers"  placeholder= 'Eg. 2500' />
          <JobPostInputField title='Expiry Date'  type="date" name="time" errors={errors.time} register={register} subtitle="Enter time"  placeholder= ' ' />

                {/* remaining job type part type full type  */}
          <button type='submit' className="border-2 p-2 w-full self-center rounded-md hover:bg-gray-700 bg-gray-800 text-white"  > {issubmitting ? 'Submitting...' : 'Submit'}</button>
          </form>
        </div>
        <div className="flex-1 md:flex hidden bg-white items-center  justify-center"> <img src="/hire1.webp" className="" /> </div>
        </div>
  )
}

export default JobPostPage