import type { FieldError,UseFormRegister } from "react-hook-form"



interface Props{
    title:string,
    errors:FieldError | undefined,
    register:UseFormRegister<any>,
    subtitle : string,
    placeholder: string,
    name: string,
    type?: "text" | "email" | "password" | "number"| 'radio' | 'option' | 'date',
   
}


const FormComponentPost = ({title,errors,register,subtitle,placeholder,name,type = "number"}:Props) => {
  return (
    
              <div className="flex sm:flex-row flex-col p-2 sm:px-5 py-2  border-b-gray-200 border-b-2">
                <label className="flex flex-1 flex-col text-lg sm:text-xl  font-semibold"> {title} 
                <span className="font-normal text-sm sm:text-base text-gray-400"> {subtitle }</span> </label>
                <div className="flex flex-col flex-1 px-3 py-1  ">
               {type != 'option' &&
                <input className={`rounded-md border-2 border-gray-300 px-4 py-2 w-full ${errors ? 'border-red-600' : ''} `} type={type} placeholder={placeholder} {...register(name, { valueAsNumber: type==='number'  })} />}
               {type == 'option' &&
               <>
               <select {...register(name)} className={`rounded-md border-2 border-gray-300 px-4 py-2 w-full ${errors ? 'border-red-600' : ''} `}>
                  <option value="Full-time">Full Time</option>
                  <option value="Part-time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
               </> }
               
                {errors?.message && <p className="text-red-400">{errors.message.toString()}</p>}
               </div>
              </div>
              
         
  )
}

export default FormComponentPost