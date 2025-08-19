import { jobschema, type JobSchemaType } from '../Validation/validate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import JobPostInputField from './JobPostInputField';
import { useEffect } from 'react';
import type { JobPosted } from '../constants/constant';
// import type { JobPosted } from '../screens/Dashboarddd';


interface Props  {
    formHeading: string,
    onSubmit :  (data: JobSchemaType) => Promise<boolean>
    currentIDData?: JobSchemaType|undefined ,
    setcurrentIDData?: React.Dispatch<React.SetStateAction<JobPosted|undefined>>, 

}

const defaultValues:JobSchemaType = {
        title: '',
        description: '',
        jobType: 0,
        opennings: 0,
        company: '',
        location: '',
        salary: 0,
        time: '',
      };

const JobPostFormTemplate = ({formHeading , onSubmit , currentIDData ,  }:Props) => {
      const { register , formState: { errors , isSubmitting } , handleSubmit , reset } = useForm({resolver: zodResolver(jobschema),defaultValues: defaultValues });
      
      const handleonSubmit = async(data:JobSchemaType)=> {
        const val  = await onSubmit(data);
        console.log(val);
        if (val)
         { reset(); } 

      }
    useEffect(() => {
    if (currentIDData) {
      reset({
        ...defaultValues,
        ...currentIDData,
        time: currentIDData.time.split('T')[0],
        
        });
    }
  }, [currentIDData, reset]);
  

  return (
   <div className=" w-full flex flex-col justify-center flex-1/2 m-2 border-gray-200 border-2 rounded-md px-4  bg-white ">

          <h1 className=" border-b-2 border-b-gray-200">
            <p className="p-5 font-bold text-xl text-center"> {formHeading}</p>
          </h1>
          
          <form className="flex flex-col gap-3 sm:gap-8 p-3 w-full  " onSubmit={handleSubmit(handleonSubmit)} >    
          <JobPostInputField title='Job Title'  name="title"  errors={errors.title} register={register} subtitle="A job title must describe one position only"  placeholder= 'Eg. FrontEnd Developer' />
          <JobPostInputField title='Job Description'   name="description"  errors={errors.description} register={register} subtitle="Summarize the key responsibilities of the role"  placeholder= 'Eg. Design & manage UI' />
          <JobPostInputField title='Employment Type'  name="jobType" type="option" errors={errors.jobType} register={register} subtitle="Choose method of working "  placeholder= 'Eg. 2500' />
          <JobPostInputField title='No. of Opening' type="number"  name="opennings" errors={errors.opennings} register={register} subtitle="Please specify no of employee you want to hire"  placeholder= 'Eg. 5' />
          <JobPostInputField title='Company Name'  name="company" errors={errors.company} register={register} subtitle="Enter the official company or organization name"  placeholder= 'Eg. AECC Global' />
          <JobPostInputField title='Job Location'   name="location"  errors={errors.location} register={register} subtitle="Mention the workplace location"  placeholder= 'Eg. Kathmandu' />
          <JobPostInputField title='Salary Offered' type="number"  name="salary" errors={errors.salary} register={register} subtitle="Monthly salary offered for employers"  placeholder= 'Eg. 2500' />
          <JobPostInputField title='Expiry Date'  type="date" name="time" errors={errors.time} register={register} subtitle="Enter time"  placeholder= ' ' />

                {/* remaining job type part type full type  */}
          <button type='submit' className="border-2 p-2 w-full self-center rounded-md hover:bg-gray-700 bg-gray-800 text-white"  > { isSubmitting ? 'Submitting...' : 'Submit'}</button>
          </form>
        </div>
  )
}

export default JobPostFormTemplate