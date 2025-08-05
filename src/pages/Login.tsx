import { useNavigate } from "react-router-dom";
import { ConstantValue } from "../constants/constant";
import {  useEffect, useState } from "react";
import Notification from "../Components/Notification";
import axios from "axios";

interface Props {
  type: "SignIn" | "SignUp";
}




const Login = ({ type }: Props) => {
  // const  baseurl = process.env.

// const apiUrl = process.env.REACT_APP_API_URL;  
const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [content, setContent ] = useState ("");
  const [showNotification , setShowNotification] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  function servenotification() {
  setShowNotification(true);
       setTimeout(() => {
        setShowNotification(false);
      },2000);

    setLoading(false);
}

  const handleClick = () => {
    if (type == "SignIn") {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  };

  const handleSubmit = async(e:React.FormEvent)=> {
    e.preventDefault();
    
    setLoading(true);
    let data:{ name?: string; email: string; password: string } = {
        'email' : formData.email,
        'password' : formData.password,
    }

    if (type === 'SignUp') {
        data = { ...data , name: formData.name  }
        try {
          const response = await axios.post('https://jg4npv8c-4000.inc1.devtunnels.ms/api/auth/register', data);
          setContent( ` Hurray! ${response['data']['message']}`);
          navigate('/login')
          
        }
        catch(e:any)
        {
          const errorMessage = e.response?.data?.message || 'Error!';
          console.log('Error =',errorMessage );
          setContent(errorMessage);
        }
      }   

      if (type == 'SignIn')
      {
        try {
          const response = await axios.post('https://jg4npv8c-4000.inc1.devtunnels.ms/api/auth/login', data);
          console.log(response.data);
          setContent(response['data']['message'])
          localStorage.setItem('token ', response['data']['token']);
          // localStorage.setItem('user', JSON.stringify({ response?['data']['user']['name'] , email }));
          navigate('/job-detail')
        }
        catch(e:any)
        {
          const errorMessage = e.response?.data?.message || 'Error!';
          console.log('Error = ', errorMessage);
          setContent(errorMessage);
        }
      }
    
    
    // console.log(data);
    setFormData({
    email: "",
    password: "",
    name: "",
  } );
    
     servenotification();
    setLoading(false);
   
  }


 

  const handleFormValueChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
    const {name,value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  return (
    <section className="h-[100vh] p-5 flex flex-col gap-10 bg-[#f3f2f1] justify-center items-center  ">

      
      {showNotification && (
        <Notification
         content={content}
        />
      )}

     <div className='flex flex-col justify-center items-center gap-2'>
      <h1 className="font-bold text-xl sm:text-3xl">{ConstantValue.title} </h1>
      {/* <p className="text-lg">{ type == 'SignIn' ? ConstantValue.loginWord : ConstantValue.signUpWord} </p> */}
      </div>
      <div className="p-5 rounded-xl bg-white shadow-md w-full sm:w-1/2 md:w-1/3 shadow-gray-300 ">
        <form className="flex flex-col gap-4 p-3 w-full " onSubmit={handleSubmit}>
          {type == "SignUp" && (
            <>
              <label className=" form-label">Full Name</label>
              <input
                type="text"
                required
                name="name"
                className="input-box"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleFormValueChange}

              />
            </>
          )}

          <label className=" form-label"> Email</label>
          <input
            type="email"
            required
            name="email"
            className="input-box"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleFormValueChange}

          />
          <label className="form-label"> Password</label>
          <input
            type="password"
            required
            name="password"
            className="input-box"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleFormValueChange}
            autoComplete= 'off'
          />

          <button
            type="submit"
            className="mt-5 w-full p-2 bg-gray-700 rounded-xl text-white "
          >
            {
                loading == true ? ' Loading...' :   `${type == "SignIn" ? "Continue ➞" : "Sign Up ➞"}`
            }
          
          </button>
          <div className="self-center my-3">
            <p>
              {" "}
              {type == "SignIn"
                ? "Don't have an account? "
                : "Already have an account? "}
              <span
                className=" cursor-pointer font-semibold text-blue-600 "
                onClick={handleClick}
              >
                {type == "SignUp" ? "Log In" : "Sign Up"}
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
