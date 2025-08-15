import { Link } from "react-router-dom"

interface Props{
    'id' : string,
    'title':string,
    'createdAt':string,
    'location':string,
    'company':string,
    'jobType':number,
    'salary' : number,
    'letter' : string,
    'keyed':number,

}

const ListedJobCard = ({keyed,letter,id,title,company,location,salary,jobType,createdAt}:Props ) => {
  return (
    <div key={keyed} className=" rounded-lg p-3 border-1 border-gray-500 flex flex-col gap-3 shadow-md shadow-gray-200">
                  <div className="flex flex-row items-center">
                    <div className="rounded-4xl w-13 h-13 lg:w-20 lg:h-20 sm:w-15 sm:h-15 p-2 items-center font-bold text-3xl justify-center flex bg-gray-200 "> {letter} </div>
                    <div className="flex flex-col p-3">
                      <h2 className=" text-lg  md:text-xl lg:text-2xl font-semibold text-black">{title}</h2>
                      <p className="text-lg text-gray-500">{company}</p>
                      

                    </div>
                  </div>
                     
                    <div className="flex flex-row px-3 items-center">
                      
                    <div className="flex flex-row gap-3  items-center ">
                        <span className="flex flex-row items-center text-sm  sm:text-[15px] rounded-3xl py-1 px-2 bg-amber-50 gap-1" >
                          <img className="h-4 w-4 " src="/Icons/location.png"  />
                          <p> {location} </p>
                        </span>
                        <span className="flex flex-row text-sm sm:text-[15px] items-center rounded-3xl py-1 px-2 bg-green-50 gap-1" >
                          <img className="h-4 w-4 " src="/Icons/worktype.png"  />
                          <p> {jobType}</p>
                        </span>
                      </div>
                     
                    </div>

                      <div>
                        <div className="flex flex-row items-center px-3 justify-between  text[15px] sm:text-base">
                           <div className="flex flex-col gap-0">
                        <span className=" flex flex-row gap-2 items-center">
                         
                          <p className="text-gray-700 text-sm ">Experience</p>
                          <img className="h-5 w-5 " src="/Icons/star.png"  />
                        </span>
                          <p className="text-[15px]"> +2 years</p>
                          </div>
                        
                          <div className="flex flex-col gap-0">
                        <span className=" flex flex-row gap-2 items-center">
                         
                          <p className="text-gray-700 text-sm ">Salary</p>
                          <img className="h-5 w-5 " src="/Icons/money.png"  />
                        </span>
                          <p className="text-[15px]"> {salary}</p>
                          </div>

                          <div className="flex flex-col gap-0">
                        <span className=" flex flex-row gap-2 items-center">
                         
                          <p className="text-gray-700 text-sm ">Job Posted</p>
                          <img className="h-5 w-5 " src="/Icons/date.png"  />
                        </span>
                          <p className="text-[15px]"> {createdAt}</p>
                          </div>
                        </div>

                    </div>
                    
                    <Link to={`/detail-job/${id}`}  className=" outline-red-100 self-center rounded-sm font-semibold bg-gray-800 text-white w-full text-center hover:bg-white hover:border-gray-800 hover:border-2 hover:text-gray-900 p-2"> View More to Apply  ￫</Link>
                     </div>
  )
}

export default ListedJobCard