import {  type JobPosted } from "../constants/constant";
import { motion } from "framer-motion";

interface Props
{
  
    setRejectedRow : React.Dispatch<React.SetStateAction<JobPosted | null>>,
    rejectrow : JobPosted | null,
   
}



const RejectJobPostForm = ({ setRejectedRow, rejectrow}: Props) => {
  

  return (
  <>
    
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <motion.div
        className="w-fit h-fit flex flex-col items-center"
        initial={{ y: "-200vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="bg-white p-6 rounded-xl shadow-md w-[90%] sm:w-[30rem]">
          <h2 className="font-semibold text-lg mb-2">Rejection Details</h2>

          <p className="mb-3">
            <span className="font-semibold">Job Title:</span>{" "}
            {rejectrow?.title}
          </p>

          <p className="mb-3">
            <span className="font-semibold">Reason:</span>{" "}
            {rejectrow?.rejectionReason || "No reason provided"}
          </p>

          <p className="text-gray-400 text-sm italic">
            <strong>Note:</strong> You can still update the job by covering
            what’s mentioned in this reason.
          </p>

          <button
            onClick={() => setRejectedRow(null)}
            className="mt-5 w-full p-2 rounded-xl border border-gray-600 text-black font-semibold transition hover:bg-red-500 hover:text-white"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  </>
);

}

export default RejectJobPostForm