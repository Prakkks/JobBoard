
interface Porps 
{
    
    value: any;
    icon : string;
}
const JobDescriptionProp = ({value,icon}:Porps) => {
  return (
    <span className="flex flex-row items-center text-sm  sm:text-[15px] rounded-3xl py-1 px-2 border-1 border-gray-800 gap-1" >
    <img className="h-4 w-4 " src={icon}  />
    <p> {value} </p>
  </span>
  )
}

export default JobDescriptionProp