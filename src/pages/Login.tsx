import { Link, useLocation, useNavigate } from "react-router-dom";
import { ConstantValue } from "../constants/constant";
import { useContext, useState } from "react";
import Notification from "../Components/Notification";
import axios from "axios";
import { MyContext } from "../ContextProvider/Provider";

interface Props {
  type: "SignIn" | "SignUp";
}




const Login = ({ type }: Props) => {
const apiUrl = import.meta.env.VITE_BASE_URL;  

const navigate = useNavigate();
const context = useContext(MyContext);
  const [loading,setLoading] = useState(false);
  if (!context)
  {
    throw Error('error');
  }
  const {setUser ,setShowUserTitle} = context;
  const [content, setContent ] = useState ("");
  const [showNotification , setShowNotification] = useState(false);
  const [selectedrole, setSelectedRole] = useState<'admin'|'user'|'' >("");
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
    let data:{ name?: string; email: string; password: string; role?: string } = {
        'email' : formData.email,
        'password' : formData.password,
        
    }

    if (type === 'SignUp') {
        data = { ...data , name: formData.name , role: selectedrole  }
        console.log('data =',data );
        try {
          const url = `${apiUrl}/api/auth/register`;
          console.log(url)
          const response = await axios.post(apiUrl+'/api/auth/register', data, {timeout:30000});
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
          const response = await axios.post(apiUrl+'/api/auth/login', data, {timeout: 30000});
          console.log(response.data);
          setContent(response['data']['message']);
          const role = response.data.user.role;
          console.log(role);
          const tokens = JSON.stringify(response['data']['token']);
          localStorage.setItem('token', tokens);
          localStorage.setItem('role',response.data.user.role);
          localStorage.setItem('name',response.data.user.name);
          localStorage.setItem('email',response.data.user.email);
          setUser({'name':response.data.user.name, 'email': response.data.user.email, 'role':response.data.user.role});
          setShowUserTitle(true);
          
          // axios.defaults.headers.common['Authorization'] = `Bearer ${response['data']['token']}`;
         if (role == 'admin')
          {
            navigate('/');
          }
          else
          navigate('/job-detail')
          
        }
        catch(e:any)
        {
           
          const errorMessage = e.response?.data?.message || 'Error!';
          console.log('Error = ', errorMessage);  
          setContent(errorMessage);
        }
      }
    
    
    
    setFormData({
    email: "",
    password: "",
    name: "",
  } );
    
     servenotification();
    setLoading(false);
   
  }


  const handleRadioChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
      setSelectedRole(e.target.value as 'admin'| 'user' | '')
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
      <Link to={'/'} className="font-bold text-xl sm:text-3xl hover:text-blue-600">{ConstantValue.title} </Link >
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

          {type == "SignUp" &&
          (
            <>
          <label className=" form-label"> Select Category</label>
          <div className="flex flex-row gap-5">
          <label className=" flex flex-row gap-2">
           
          <input
            type= 'radio'
            required
            name="category"
            className=""
            value={'admin'}
            checked = {selectedrole === 'admin'}
            onChange={handleRadioChange}

          />
           Admin
          </label>
           <label className=" flex flex-row gap-2">
           
          <input
            type= 'radio'
            required
            name="category"
            className=""
            value={'user'}
            checked = {selectedrole === 'user'}
            onChange={handleRadioChange}

          />
           User
          </label>
          </div>
          </>
          )}
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
