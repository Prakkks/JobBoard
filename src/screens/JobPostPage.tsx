import { APICALLHANDLER } from "../constants/constant";
import JobPostFormTemplate from "../Components/JobPostFormTemplate";
import type { JobSchemaType } from "../Validation/validate";


const JobPostPage = () => {
  
  // const { register, formState: {errors, isSubmitting } , reset, handleSubmit  } = useForm({ resolver: zodResolver(jobschema) });
 
 const onSubmit = async (data: JobSchemaType): Promise<boolean> => {
  try {
    const response = await APICALLHANDLER({ url: '/api/job/create', method: 'post', data });
    console.log('response = ', response);
    if (response) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
   
    return false;
  }
};

  return (
    <div className=" text-black w-full flex flex-row  bg-white ">
        <JobPostFormTemplate formHeading="Job Post Form" onSubmit={onSubmit} />
        <div className="flex-1 md:flex hidden bg-white items-center  justify-center"> <img src="/hire1.webp" className="" /> </div>
        </div>
  )
}

export default JobPostPage