
import React, { useContext, useState } from "react";



import { Link, useNavigate } from "react-router-dom";
import { authorizedContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUserLarge } from 'react-icons/fa6';
import { MdOutlineMail, MdPhotoLibrary } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';


const Register = () => {
    const {registerUser,userProfileUpdate,googleLoginBtn} = useContext(authorizedContext)
    const [errorMessage,setErrorMessage] = useState(null)
    const navigate = useNavigate()
    const registerFormHandler = (e)=>{
      e.preventDefault()
      const name = e.target.name.value;
      const photoUrl = e.target.photoUrl.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
  
      setErrorMessage("")
      const lowercaseRegex = /^(?=.*[a-z]).+$/;
      if(!lowercaseRegex.test(password)){
        toast.error("You Should need one Lowercase")
        return
  
      }
  
     const uppercaseRegex = /^(?=.*[A-Z]).+$/;
     if(!uppercaseRegex.test(password)){
      toast.error("You Should need one Uppercase")
      return
     }
  
     if(password.length<6){
      toast.error("Password Should be 6 digit")
      
     }
  
     registerUser(email, password)
        .then((data) => {
          userProfileUpdate(name,photoUrl)
           navigate("/")
  
          toast.success("User Registation Successfully");
        })
        .catch((error) => {
          navigate("/")
          toast.error("All fields are required")
          setErrorMessage(error.message);
        });
       
    };
    const googleRegisterHandler  = ()=>{
      googleLoginBtn()
  
      .then(result=>{
        if(state){
          navigate(state)
        }
        else{
          navigate("/")
  
        }
        navigate("/")
        toast.success ("User Login Successfully")
      })
      .catch(error=>{
        setErrorMessage(error.message)
        
      })
      
  
    }
    return (
      <div className="">
      
      <div className="flex  items-center justify-center mt-12">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex flex-col lg:flex-row overflow-hidden">
        <div className="lg:w-1/2 p-10">
          <h2 className="text-2xl text-gray-900lo text-center font-bold mb-4">
            Welcome to Taskify
          </h2>
          <img
            src="https://i.ibb.co.com/JcsWsPD/tablet-login-concept-illustration-114360-7963.jpg"
            alt=""
            className="w-full h-full"
          />
        </div>

        <div className="lg:w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-3 text-gray-900 text-center">
            Log In your Account
          </h2>
          <form onSubmit={registerFormHandler} className="card-body">
            <div className="form-control">
              <label className="flex justify-start items-center gap-2 mb-2 ">
                <span className="text-xl text-gray-900">
                  <FaUserLarge />
                </span>
                <span className="text-gray-900">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your Name"
                name="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="flex justify-start items-center gap-2 mb-2 mt-2">
                <span className="text-xl text-gray-900">
                  <MdPhotoLibrary />
                </span>
                <span className="text-gray-900">Photo-URL</span>
              </label>
              <input
                type="text"
                placeholder="Enter your photo-url"
                name="photoUrl"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="flex justify-start items-center gap-2 mb-2 mt-2">
                <span className="text-xl text-gray-900 ">
                  <MdOutlineMail />
                </span>
                <span className="text-gray-900">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="flex justify-start items-center gap-2 mb-2 mt-2">
                <span className="text-xl text-gray-900">
                  <RiLockPasswordFill />
                </span>
                <span className="text-gray-900">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-3">
              <button className="btn w-full bg-gray-800 text-white font-bold ">
                Register
              </button>
            </div>
          </form>
          <div className="text-center px-8">
            <button onClick={googleRegisterHandler} className="btn w-full bg-white shadow-xl text-black font-semibold gap-3 p-2 text-lg">
              <FcGoogle className="text-2xl" />
              Login With Google
            </button>
          </div>

          <p className="text-center text-sm mt-4">
            Don't have an Account?
            <Link to="/login">
              <span className="text-gray-900 hover:underline font-bold"> Login Now</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
    </div>
    );
};

export default Register;