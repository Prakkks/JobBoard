import {  ChevronLeftIcon, ChevronRight, ChevronsLeft, ChevronsRight, User } from "lucide-react";
import type { JobPostType } from "../../constants/constant";
import type { Table } from "@tanstack/react-table";

interface Props{
 pagination: {
    pageIndex: number;
    pageSize: number;
};
  setPagination: React.Dispatch<React.SetStateAction<{
    pageIndex: number;
    pageSize: number;
}>>;
  pendingjob : JobPostType[],
  pendingjobTable : Table<JobPostType>,
}

const PaginationComponent = ({pagination, setPagination, pendingjob, pendingjobTable}: Props) => {
  return (
     <div className="flex flex-row   justify-between items-center px-2"> 

        <div className="flex flex-row gap-2 items-center">
            <p>
            Page 
            {pagination.pageIndex + 1} of {Math.ceil(pendingjob.length / pagination.pageSize) }
            </p>

            <select
  value={pagination.pageSize}
  onChange={(e) =>
    setPagination((prev) => ({
        ...prev,
        pageSize: Number(e.target.value),
        pageIndex: 0 // reset to first page when size changes
    }))
  }
  className="border p-1"
>
  {[3, 5, 7].map((value) => (
    <option key={value} value={value}>
      Show {value}
    </option>
  ))}
</select>
        </div>
        
        <div>
        <button
  onClick={() => pendingjobTable.firstPage()}
  disabled={!pendingjobTable.getCanPreviousPage()}
  className={`p-2 border-1 border-gray-100 cursor-pointer bg-white disabled:opacity-50 disabled:cursor-not-allowed`}
>
  <ChevronsLeft size={14} />
</button>

<button
  onClick={() => pendingjobTable.previousPage()}
  disabled={!pendingjobTable.getCanPreviousPage()}
  className={`p-2 border-1 border-gray-100 cursor-pointer bg-white disabled:opacity-50 disabled:cursor-not-allowed`}
>
  <ChevronLeftIcon size={14} />
</button>

<button
  onClick={() => pendingjobTable.nextPage()}
  disabled={!pendingjobTable.getCanNextPage()}
  className={`p-2 border-1 border-gray-100 cursor-pointer bg-white disabled:opacity-50 disabled:cursor-not-allowed`}
>
  <ChevronRight size={14} />
</button>

<button
  onClick={() => {
                      return pendingjobTable.lastPage()
                  }}
  disabled={!pendingjobTable.getCanNextPage()}
  className={`p-2 border-1 border-gray-100 cursor-pointer bg-white disabled:opacity-50 disabled:cursor-not-allowed`}
>
  <ChevronsRight size={14} />
</button>

        </div>
                
    </div>
  )
}

export default PaginationComponent