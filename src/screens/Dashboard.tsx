import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import DeletePopUp from "../Components/DeletePopUp";

type JobPosted = {
  _id: string;
  __v: number;
  user: string;
  title: string;
  salary: number;
  location: string;
  description: string;
  createdAt: string;
  company: string;
  time?: string;
};

type JobApplied = {
  _id: string;
  cv: string; // file path
  job: string; // job ID
  phoneNumber: number;
  user: string; // user ID
  userName: string;
  __v: number;
};



const JobApplyPage = () => {
  const [job, setJob] = useState<JobPosted[]>([]);
  const base_url = import.meta.env.VITE_BASE_URL;
  const [appliedjob, setAppliedJob] = useState<JobApplied[]>([]);
  const [deletejob, setDeleteJob] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const role = localStorage.getItem("role") || null;

 

  useEffect(() => {
    const token = localStorage.getItem("token") || null;

    const urlAdmin = 'https://jg4npv8c-4001.inc1.devtunnels.ms'+"/api/job/alljobByAdmin";
    const urlUser = base_url+"/api/job/alljobAppliedByUser";
    if (token && role) {
      axios
        .get(role == "admin" ? urlAdmin : urlUser, {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        })
        .then((response) => {
          if (role == "admin") setJob(response.data.jobs);
          if (role == "user") setAppliedJob(response.data.jobs);
          console.log(response.data.jobs);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(job);
  }, []);

    return (
    <section className="sections ">
      <div className="overflow-x-auto sm:p-10">
        <table className="min-w-full divide-y divide-gray-200 text-left">
          <thead className="bg-gray-100 ">
            <tr className="">
              <th className="px-4 py-5 w-[30%]">Company</th>
              <th className="px-4 py-5 w-[40%]">Job Title</th>
              <th className="px-4 py-5 w-[20%]">Created Date</th>
              <th className="px-4 py-5 w-[20%]">Status</th>
              <th className="px-4 py-5 w-[10%]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y  divide-gray-100">
            {role == "admin" &&
              job.map((items) => {
                const today = new Date();
                const expiredate = items.time ? new Date(items.time) : null;
                const status =
                  expiredate && expiredate < today ? "Expired" : "Active";

                return (
                  <tr key={items._id} className="hover:bg-gray-100">
                    <td className="px-4 py-5">{items.company}</td>
                    <td className="px-4 py-5">{items.title}</td>
                    <td className="px-4 py-5">
                      {items.createdAt.split("T")[0]}
                    </td>
                    <td
                      className={`px-4 py-5 font-semibold ${
                        status == "Active" ? "text-green-600" : "text-gray-400"
                      }  `}
                    >
                      {status}
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex flex-row gap-2">
                        <button className=" cursor-pointer ">
                          <img className="h-5 w-5" src="/Icons/edit.png" />
                        </button>
                        <button className="cursor-pointer " onClick={()=>{setOpenPopUp(true)}}>
                          <img className="h-5 w-5" src="/Icons/delete.png" />
                        </button>
                      </div>
                      
                    </td>
                  </tr>

                  
                );
              })}
            {role == "user" &&
              appliedjob.map((items) => {
                return <tr key={items._id} ><td className="px-4 py-5"> {items.phoneNumber} </td></tr>
              })}
          </tbody>
        </table>
      </div>
      <DeletePopUp
        title={'hi'}
        setOpenPopUp={setOpenPopUp}
        openPopUp={openPopUp}
        setDeleteJob={setDeleteJob}
      />
    </section>
  );
};

export default JobApplyPage;
