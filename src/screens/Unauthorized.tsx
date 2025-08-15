import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate(); // hook to navigate programmatically

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Timer expired");
      navigate("/", { replace: true }); // correct usage
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center h-[80vh] w-full items-center text-center text-gray-900 font-bold text-xl px-4 sm:text-2xl md:text-4xl">
      You are not authorized to use this page.
    </div>
  );
};

export default Unauthorized;
