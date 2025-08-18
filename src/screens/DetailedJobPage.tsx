import { useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { APICALLHANDLER, type JobListValues } from "../constants/constant";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IndividualJobApplySchema, type IndividualJobApplySchemaType } from "../Validation/validate";

const DetailedJobPage = () => {
  const name: string = localStorage.getItem("name") || "";
  const email: string = localStorage.getItem("email") || "";

  const { id } = useParams();
  const [job, setJob] = useState<JobListValues | null>(null);
  const [PreviewFile , setPreviewFile ] = useState(false);
  const [Apply, setApply] = useState(false);


  const { register ,  formState: { errors ,isSubmitting }, handleSubmit , setValue ,reset } = useForm({ resolver : zodResolver(IndividualJobApplySchema) , defaultValues : {email: email , name:name}} );

 
  useEffect(() => {
  
      const responses = APICALLHANDLER({url: `/api/job/getJob/${id}`, method:'get' })
      responses.then((response)=> {
        setJob(response?.job);
        reset();
      });
  }, []);

 

  // ------------------------------------------------------
   const title: string = job?.title || "";
 
 
  const [selectedfile, setSelectedFile] = useState<File | null>(null);

  const onsubmit = (data: IndividualJobApplySchemaType)=> {
    const formData = new FormData();
    formData.append('cv' , data.cv);
    formData.append('phoneNumber' , String(data.phone));
    
    console.log('Form Data: ', formData.get('cv'));
    console.log("Data = ",data);
    const tokens = localStorage.getItem('token');
     if (tokens) {
        
          const responses = APICALLHANDLER({url: `/api/application/apply/${id}`, method: 'post' , data: formData});
          responses.then((response) => {
            console.log("response= ", response);
            setApply(false);
            setSelectedFile(null);
          })
          responses.catch((error) => {
            const er = error.response?.data?.message || "error!!!";
            console.log("error= ", er);
          });
        }


  };

  

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files?.[0] || null ;
      if (fileList)
        {setValue('cv', fileList, { shouldValidate: true });
        setSelectedFile(fileList); 
      
    }
    else 
      {
        setSelectedFile(null);
      }   
  
  };


  return (
    
      
        <section className="sections sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/3 w-full relative  sm:absolute sm:w-2/3 md:w-1/2 bg-[#FAF9FB] gap-5 flex flex-col rounded-4xl p-1  shadow-xl shadow-gray-300 ">
          <div className="container border-b-2 border-b-black/10 flex flex-row items-center justify-between pb-3  w-full">
            <h1 className=" md:text-xl font-semibold"> Apply for {title}</h1>
            <button
              className="cursor-pointer"
              onClick={() => {
                setApply(false);
              }}
            >
              <img src="/Icons/close.png" />
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
              <input type='file' id="resumeUpload"  accept=".pdf , .docx" className='hidden'  {...register('cv')}  onChange={handleFileUpload} />
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
     

     


        
    
    
  );
};

export default DetailedJobPage;
