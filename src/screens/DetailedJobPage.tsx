import { useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { APICALLHANDLER, type JobListValues } from "../constants/constant";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IndividualJobApplySchema, type IndividualJobApplySchemaType } from "../Validation/validate";

const DetailedJobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState<JobListValues | null>(null);
  const [PreviewFile , setPreviewFile ] = useState(false);
  const [Apply, setApply] = useState(false);
  const baseurl = import.meta.env.VITE_BASE_URL;


  const { register ,  formState: { errors ,isSubmitting }, handleSubmit , setValue  } = useForm({ resolver : zodResolver(IndividualJobApplySchema)} );

  // Required for react-pdf worker
  useEffect(() => {
  
      const responses = APICALLHANDLER({url: `${baseurl}/api/job/getJob/${id}`, method:'get' })
      responses.then((response)=> {
        setJob(response?.job);
      });
  }, []);

 

  // ------------------------------------------------------
  const title: string = job?.title || "";
  const name: string = localStorage.getItem("name") || "";
  const email: string = localStorage.getItem("email") || "";

 
  const [selectedfile, setSelectedFile] = useState<File | null>(null);

  const onsubmit = (data: IndividualJobApplySchemaType)=> {
    const formData = new FormData();
    formData.append('file', data.cv[0] );
    console.log("Data = ",data);

  };


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList  && fileList.length > 0) {
      setSelectedFile(fileList[0]);
      setValue('cv', fileList, { shouldValidate: true });
     
    }
  };


  return (
    <div className="relative" key={id}>
      <section className="sections flex flex-col gap-5">
        <h1 className="sm:text-2xl text-xl font-bold"> Job Details</h1>
        <div className="flex flex-row gap-2 sm:text-base text-sm  ">
          <Link to="/" className="hover:underline">
            {" "}
            Home
          </Link>
          &gt;
          <Link to="/job-detail" className="hover:underline">
            {" "}
            View Jobs
          </Link>
          &gt;
          <Link to="" className="hover:underline">
            {" "}
            {job?.title}
          </Link>
        </div>

        {/* serarch job filter based on  location  */}

        {/* body */}
        <div className="flex flex-col rounded-md shadow-md p-3 gap-3 sm:p-5 drop-shadow-gray-300">
          <div className="flex flex-row items-center">
            <div className="rounded-4xl w-13 h-13 lg:w-20 lg:h-20 sm:w-15 sm:h-15 p-2 items-center font-bold text-3xl justify-center flex bg-gray-200 ">
              {" "}
              {job?.title[0].toUpperCase()}{" "}
            </div>
            <div className="flex flex-col p-3">
              <h2 className=" text-lg  md:text-xl lg:text-2xl font-semibold text-black">
                {job?.title}
              </h2>
              <p className="text-sm sm:text-lg text-gray-500">{job?.company}</p>
            </div>
          </div>

          <div className="flex flex-row px-3 items-center">
            <div className="flex flex-wrap gap-3  items-center ">
              <span className="flex flex-row items-center text-sm  sm:text-[15px] rounded-3xl py-1 px-2 bg-amber-50 gap-1">
                <img className="h-4 w-4 " src="/Icons/location.png" />
                <p> {job?.location} </p>
              </span>
              <span className="flex flex-row text-sm sm:text-[15px] items-center rounded-3xl py-1 px-2 bg-green-50 gap-1">
                <img className="h-4 w-4 " src="/Icons/worktype.png" />
                <p> {job?.jobType}</p>
              </span>
              <span className="flex flex-row text-sm sm:text-[15px] items-center rounded-3xl py-1 px-2 bg-red-50 gap-1">
                <img className="h-5 w-5 " src="/Icons/money.png" />
                <p className="text-gray-700  ">Salary:</p>
                <p> {job?.salary}</p>
              </span>
              <span className="flex flex-row text-sm sm:text-[15px] items-center rounded-3xl py-1 px-2 bg-purple-50 gap-1">
                <img className="h-5 w-5 " src="/Icons/star.png" />
                <p className="text-gray-700  ">Experience:</p>
                <p> 2 years</p>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-0">
            <p className=" px-3 pt-3 text-gray-800 font-semibold">
              {" "}
              Job Description:
            </p>
            <p className="text-gray-600 text-sm sm:text-base px-3">
              {job?.description}
            </p>
          </div>

          <button
            onClick={() => {
              setApply(true);
            }}
            className="px-3 outline-red-100 w-fit rounded-sm font-semibold hover:bg-gray-800 hover:text-white  text-gray-900 p-2"
          >
            {" "}
            Apply Now ￫
          </button>
        </div>
      </section>

      {Apply && (
        <section className="sections sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/3 w-full relative  sm:absolute sm:w-2/3 md:w-1/2 bg-[#FAF9FB] gap-5 flex flex-col rounded-4xl p-1  shadow-xl shadow-gray-300 ">
          <div className="container border-b-2 border-b-black/10 flex flex-row items-center justify-between pb-3  w-full">
            <h1 className=" md:text-xl font-semibold"> Apply for {title}</h1>
            <button
              className="cursor-pointer"
              onClick={() => {
                setApply(false);
              }}
            >
              <img src="/Icons/close.png" />{" "}
            </button>
          </div>

          <div>
            <form encType="multipart/form-data" className="flex flex-col gap-2" onSubmit={handleSubmit(onsubmit)}>
              <label className=" form-label"> Name*</label>
             <input type="text" {...register('name')} className={`rounded-md border-2 border-gray-300 px-4 py-2 w-full ${errors.name ? 'border-red-600' : ''} `} />
              {errors.name && <p className="text-red-600">{errors.name.message}</p>}
              <label className=" form-label"> Email*</label>
              <input type="text" {...register('email')}  className={`rounded-md border-2 border-gray-300 px-4 py-2 w-full ${errors.email ? 'border-red-600' : ''} `}  />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
             
              <label className=" form-label"> Phone Number*</label>
              <input type="number" {...register('phone' , {valueAsNumber : true}) } className={`rounded-md border-2 border-gray-300 px-4 py-2 w-full ${errors.phone ? 'border-red-600' : ''} `} />
              {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}

              <label className="form-label"> Upload your CV here* </label>
              <input type='file' id="resumeUpload"  accept=".pdf , .docx" className='hidden'  {...register('cv')}  />
              {errors.cv && <p className="text-red-600">{errors.cv.message as string}</p>}
             
              <label
                htmlFor="resumeUpload"
                className="px-6 py-3 bg-blue-400 self-start text-black rounded-xl shadow-md cursor-pointer hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
            >
                📄 Choose Resume
              </label>
              {selectedfile && (
                <div className="flex flex-row items-end gap-2 ">
                  <p className="text-sm text-gray-700">
                    Selected File:{" "}
                    <span className="font-medium p-1 rounded-xl flex flex-row w-fit gap-1 bg-gray-300">
                      {selectedfile.name}
                      <img
                        onClick={() => setSelectedFile(null)}
                        className="h-3 w-3"
                        src="/Icons/close.png"
                      />
                    </span>
                  </p>
                  <div onClick={()=> {setPreviewFile(true)}} className=" cursor-pointer p-1 underline text-sm hover:text-blue-600 "> Preview file  </div>
                </div>
              )}

              

              <button
                type="submit"
                className=" cursor-pointer hover:bg-gray-700  mt-2 rounded-md w-full text-center p-2 bg-gray-800 text-white "
              >
                {isSubmitting ? "Applying ..." : "Apply Now"}
              </button>
            </form>
          </div>
        </section>
      )}

     


         {/* (
        <section className="sections sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/3 w-full relative  sm:absolute sm:w-2/3 md:w-1/2 bg-[#FAF9FB] gap-5 flex flex-col rounded-4xl p-1  shadow-xl shadow-gray-300 ">
          <div className="container border-b-2 border-b-black/10 flex flex-row items-center justify-between pb-3  w-full">
            <h1 className=" md:text-xl font-semibold"> Apply for {title}</h1>
            <button
              className="cursor-pointer"
              onClick={() => {
                setApply(false);
              }}
            >
              <img src="/Icons/close.png" />{" "}
            </button>
          </div>

          <div>
            <form encType="multipart/form-data" className="flex flex-col gap-2">
              <label className=" form-label"> Name*</label>
              <input
                type="name"
                required
                name="name"
                className="input-box"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleFormValueChange}
              />
              <label className=" form-label"> Email*</label>
              <input
                type="email"
                required
                name="email"
                className="input-box"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleFormValueChange}
              />
              <label className=" form-label"> Phone Number*</label>
              <input
                type="number"
                required
                name="phonenumber"
                className="input-box"
                placeholder="Enter your phone number"
                value={formData.phonenumber}
                onChange={handleFormValueChange}
              />

              <label className="form-label"> Upload your CV here* </label>
              <input
                type="file"
                name="cv"
                required
                id="resumeUpload"
                className="hidden"
                accept=".pdf,.docx"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="resumeUpload"
                className="px-6 py-3 bg-blue-400 self-start text-black rounded-xl shadow-md cursor-pointer hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
              >
                📄 Choose Resume
              </label>
              {selectedfile && (
                <div className="flex flex-row items-end gap-2 ">
                  <p className="text-sm text-gray-700">
                    Selected File:{" "}
                    <span className="font-medium p-1 rounded-xl flex flex-row w-fit gap-1 bg-gray-300">
                      {selectedfile.name}
                      <img
                        onClick={() => setSelectedFile(null)}
                        className="h-3 w-3"
                        src="/Icons/close.png"
                      />
                    </span>
                  </p>
                  <div onClick={()=> {setPreviewFile(true)}} className=" cursor-pointer p-1 underline text-sm hover:text-blue-600 ">Preview file  </div>
                </div>
              )}

              <button
                type="submit"
                onClick={handleAPplyJobSubmit}
                className=" cursor-pointer hover:bg-gray-700  mt-2 rounded-md w-full text-center p-2 bg-gray-800 text-white "
              >
                {loading ? "Applying ..." : "Apply Now"}
              </button>
            </form>
          </div>
        </section>
      ) */}
    
    </div>
  );
};

export default DetailedJobPage;
