import { APICALLHANDLER } from "../constants/constant";
import JobPostFormTemplate from "../Components/JobPostFormTemplate";
import type { JobSchemaType } from "../Validation/validate";
import { useState } from "react";
import { Link } from "react-router-dom";



const JobPostPage = () => {
  // const { register, formState: {errors, isSubmitting } , reset, handleSubmit  } = useForm({ resolver: zodResolver(jobschema) });
  const [postJob, setPostJob] = useState(false);
  const [buttonTitle , setButtonTitle] = useState('Click Here to Post Your Job');

  const onSubmit = async (data: JobSchemaType): Promise<boolean> => {
    try {
      const response = await APICALLHANDLER({
        url: "/api/job/create",
        method: "post",
        data,
      });
      console.log("response = ", response);
      if (response) {
        setPostJob(false);
        setButtonTitle('Post more jobs');
        return true;

      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  return (
    <div className=" text-black w-full flex flex-col sm:flex-row bg-gray-900  ">
      {/* <div className="flex-1/2 flex flex-col gap-5 pl-5 bg-gray-900 sections ">
        <h1 className="font-bold text-4xl tracking-tight text-gray-100  ">
         
          Publish Your Job Opening
        </h1>
        <p className="text-gray-500">
        
          Reach thousands of qualified candidates by <br /> posting your
          opportunity here.
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-2">
          <li>Hire the <strong> right talent</strong> quickly and efficiently.</li>
          <li>Highlight <strong>skills and qualifications</strong> clearly.</li>
          <li>
            Share <strong>perks, benefits, and deadlines</strong> to attract more applicants.
          </li>
          <li>Make your <strong>job post stand out</strong> among competitors.</li>
        </ul>
        <button className="w-fit p-2 rounded-xl bg-violet-500 text-white ">
          Click here now to Post Job
        </button>
      </div> */}
     <div className="flex-1/2 flex flex-col  gap-6 p-8 bg-gray-900 min-h-[105vh] shadow-lg sections">
   <h1 className="font-extrabold  text-4xl sm:text-5xl tracking-tight text-white leading-snug">
    Publish Your Job Opening
  </h1>

  <p className="text-gray-300 text-lg">
    Reach thousands of qualified candidates by posting your opportunity here. 
    Make your job post stand out and attract the best talent!
  </p>

  <div className=" p-4 rounded-xl flex flex-col gap-3 ">
    <h3 className="text-violet-400 text-2xl font-semibold">Why Post With Us?</h3>
    <ul className="list-none flex flex-col gap-2 text-lg">
      <li className="flex items-center gap-2 text-gray-300">
        <img src="/Icons/checkmark.png" alt="check" className="w-5 h-5" /> 
        Hire the right talent quickly.
      </li>
      <li className="flex items-center gap-2 text-gray-300">
        <img src="/Icons/checkmark.png" alt="check" className="w-5 h-5" /> 
        Highlight skills and qualifications.
      </li>
      <li className="flex items-center gap-2 text-gray-300">
        <img src="/Icons/checkmark.png" alt="check" className="w-5 h-5" /> 
        Share perks, benefits, and deadlines.
      </li>
      <li className="flex items-center gap-2 text-gray-300">
        <img src="/Icons/checkmark.png" alt="check" className="w-5 h-5" /> 
        Make your job post stand out.
      </li>
    </ul>
  </div>

  {/* Call-to-Action Button */}
  <div className="flex  flex-col sm:flex-row gap-2 sm:gap-5">
  <button  onClick={()=>{ setPostJob(true);
    const element = document.getElementById("post-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" }); 
    }
  }} className="post-job-button bg-violet-500">
    {buttonTitle}
  </button>
  <Link className=" post-job-button bg-violet-700 " to='/dashboard' > See status of posted job </Link >
  </div>
</div>

        {postJob &&  <div className="flex sm:p-4  " id= 'post-form'>
      <JobPostFormTemplate formHeading="Job Post Form" onSubmit={onSubmit} />
          </div>}
          <div className="w-5"> </div>
      {/* <div className="flex-1 md:flex hidden bg-white items-center  justify-center"> <img src="/hire1.webp" className="" /> </div> */}
    </div>
  );
};

export default JobPostPage;
