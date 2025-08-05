

interface Props{
    content: string,
}

const Notification = ({content}:Props) => {
    
  return (
    <div className="fixed top-0 right-0 p-4 flex flex-row m-2 items-center justify-between   bg-gray-400 ">
        {content}  
        {/* <img src="/Icons/close.png" alt="close_btn"  className="w-4 h-4 ml-2 cursor-pointer" /> */}
    </div>
  
  )
}

export default Notification