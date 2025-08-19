import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { APICALLHANDLER, ConstantValue, type JwtPayload } from "../constants/constant";
import { useContext,  useEffect,  useState } from "react";
import { MyContext } from "../ContextProvider/Provider";
// import { jwtDecode } from 'jwt-decoder';
import { jwtDecode,  } from "jwt-decode";
import { USER_ROLE } from "../constants/enums";

interface Props {
  type: "SignIn" | "SignUp";
}

const Login = ({ type }: Props) => {
  



const navigate = useNavigate();
const location = useLocation();
const context = useContext(MyContext);
const [alreadyloggedIn , setAlreadyLoggedIn] = useState(false);
  const [loading,setLoading] = useState(false);
  if (!context)
  {
    throw Error('error');
  }
  const {setUser ,setShowUserTitle} = context;
  const [selectedrole, setSelectedRole] = useState<number>(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",

  });

  
 
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
    let data:{ name?: string; email: string; password: string; role?: number } = {
        'email' : formData.email,
        'password' : formData.password,
        
    }

    if (type === 'SignUp') {
        data = { ...data , name: formData.name , role: selectedrole  }
         
           const response = await APICALLHANDLER({method:'post' , data: data , url: '/api/auth/register' , token: false });  
           console.log(response);
           if (response != null)    
           navigate('/login');  
      }   

      if (type == 'SignIn')
      {
        try {
         

          const response = await APICALLHANDLER({method: 'post' , data: data , url: '/api/auth/login' , token: false });

          console.log("data" , response.data);
          // const role = response.data.role;
          const tokens = JSON.stringify(response.data['token']);
          localStorage.setItem('token', tokens);

          const decoded = jwtDecode<JwtPayload>(JSON.parse(tokens));
          localStorage.setItem('name',decoded.name);
          localStorage.setItem('email',decoded.email);
          localStorage.setItem('role',USER_ROLE[decoded?.role ?? 1] );
          console.log('decoded = ', decoded);
          setUser({'name':decoded.name, 'email': decoded.email, 'role':USER_ROLE[decoded?.role ?? 1] });
          setShowUserTitle(true);

          // navigate('/');
           const redirectToJobId = location.state?.redirectToJobId;
           if (redirectToJobId) {
             navigate(`/detail-job/${redirectToJobId}`, { replace: true });
              }
            else if (  decoded.role === USER_ROLE.reviewer)
              {
            navigate("/reviewer-screen", { replace: true }); 

              }  
              else  {
            navigate("/job-detail", { replace: true }); 
            }
        
          
        }
        catch(e:any)
        {
         
        }
      }
    
    
    
    setFormData({
    email: "",
    password: "",
    name: "",
  } );
    
     
    setLoading(false);
   
  }


  const handleRadioChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
      setSelectedRole(parseInt(e.target.value) )
  }

  const handleFormValueChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
    const {name,value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  useEffect(()=> {
    setAlreadyLoggedIn( localStorage.getItem('role') !== null  );
  },[]);

 
  if(alreadyloggedIn)
  return <Navigate to="/dashboard" />

  
  return (
    <section className="h-[100vh] p-5 flex flex-col gap-10 bg-[#f3f2f1] justify-center items-center  ">

      
    

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
            value={USER_ROLE['admin']}
            checked = {selectedrole === USER_ROLE['admin']}
            onChange={handleRadioChange}

          />
           Company
          </label>
           <label className=" flex flex-row gap-2">
           
          <input
            type= 'radio'
            required
            name="category"
            className=""
            value={USER_ROLE['user']}
            checked = {selectedrole ===  USER_ROLE.user}
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
            disabled = {loading}
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


