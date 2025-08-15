import React from 'react'
import type { JobPosted } from '../constants/constant'
import { JOBTYPE } from '../constants/enums'

interface Props{
    DetailJobCurrentIndex : JobPosted,
}

const DetailJobView = ({DetailJobCurrentIndex}:Props) => {
  return (
    <>
         {/* title name cpmany name  */}
         <div className="flex flex-row items-center">
            <div className="rounded-4xl w-13 h-13 lg:w-16 lg:h-16 sm:w-12 sm:h-12 p-2 items-center font-bold text-2xl justify-center flex bg-gray-200 ">
             
              {DetailJobCurrentIndex.title[0].toUpperCase()}
            </div>
            <div className="flex flex-col p-3">
              <h2 className=" text-md  md:text-lg lg:text-xl font-semibold text-black">
                {DetailJobCurrentIndex.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-500">{DetailJobCurrentIndex.company}</p>
            </div>
          </div>

        {/* salary , opening , time  */}
            <div className="flex flex-row px-3 items-center">
            <div className="flex flex-wrap gap-3  items-center ">
              <span className="flex flex-row items-center text-sm  sm:text-[15px] rounded-3xl py-1 px-2 bg-amber-50 gap-1">
                <img className="h-4 w-4 " src="/Icons/location.png" />
                <p> {DetailJobCurrentIndex.location} </p>
              </span>
              <span className="flex flex-row text-sm sm:text-[15px] items-center rounded-3xl py-1 px-2 bg-green-50 gap-1">
                <img className="h-4 w-4 " src="/Icons/worktype.png" />
                <p> {JOBTYPE[DetailJobCurrentIndex.jobType]}</p>
              </span>
              <span className="flex flex-row text-sm sm:text-[15px] items-center rounded-3xl py-1 px-2 bg-red-50 gap-1">
                <img className="h-5 w-5 " src="/Icons/money.png" />
                <p className="text-gray-700  ">Salary:</p>
                <p> {DetailJobCurrentIndex.salary}</p>
              </span>
              <span className="flex flex-row text-sm sm:text-[15px] items-center rounded-3xl py-1 px-2 bg-purple-50 gap-1">
                <img className="h-5 w-5 " src="/Icons/star.png" />
                <p className="text-gray-700  ">Total Opening :</p>
                <p> {DetailJobCurrentIndex.opennings}</p>
              </span>
            </div>
          </div> 
        {/* description */}
          <div className="flex flex-col gap-0">
            <p className=" px-3 pt-3 text-gray-800 font-semibold">
              {" "}
              Job Description:
            </p>
            <p className="text-gray-600 text-sm sm:text-base px-3">
              {DetailJobCurrentIndex.description}
            </p>
    </div>

    </>
  )
}

export default DetailJobView