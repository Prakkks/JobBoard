import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { JobFilterSchema, type JobFilterSchemaType } from "../Validation/validate";



const FilterJob = () => {
    const {register , formState: {errors}, handleSubmit} = useForm( {resolver: zodResolver(JobFilterSchema)} );
    const onSubmit = (data:JobFilterSchemaType)=> {
        console.log(data)
    }
  return (
    <div className="flex flex-row ">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row items-center justify-around w-full " > 
           
           <label className="flex flex-col flex-1/4 bg-white "> <p className="text-sm">TYPE</p>  
           <select {...register('jobType')} className="border-none  bg-[#f6f3f4] w-1/2 rounded-md px-4 py-2  outline-none" >
                <option className="" value={''}> Select </option>
                <option value={'Contract'}> Contract </option>
                <option value={'Part-tie'}> Part Time</option>
                <option value={'Full-time'}> Full Time</option>
                <option value={'Internship'}> Internship</option>
            </select>
            {errors.jobType && <div>{errors.jobType.message}</div>}
            </label>
            <label className="flex flex-col flex-1/4 "><p className="text-sm" > CATEGORY</p> <input placeholder="Eg. Kathmandu"  type="text" {...register('location')} className=" border-[#f6f3f4]  bg-[#f6f3f4] w-1/2 rounded-md px-4 py-2 " />
            {errors.location && <div>{errors.location.message}</div>}
            </label>
            <span className="flex-1/4  flex-row  justify-center w-full "> <button className=" cursor-pointer  rounded-md w-1/2 justify-center border-2 hover:bg-[#f6f3f4] border-[#f6f3f4] px-4 py-2 flex flex-row gap-2 items-center font-semibold text-black"> <img src="/Icons/search.png" className="w-5 h-5" /> Search</button></span>
 
        </form>

    </div>
  )
}

export default FilterJob