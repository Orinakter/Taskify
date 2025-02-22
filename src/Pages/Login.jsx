
import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdOutlineMail } from "react-icons/md";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { authorizedContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { RiLockPasswordFill } from 'react-icons/ri';


const Login = () => {
    const { loginUser, googleLoginBtn } = useContext(authorizedContext);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { state } = useLocation();
  
    const loginFormHandler = (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
  
      setErrorMessage("");
  
      loginUser(email, password)
        .then((result) => {
          toast.success("User Login Successfully");
  
          if (state) {
            navigate(state);
          } else {
            navigate("/");
          }
        })
  
        .catch((error) => {
          setErrorMessage(error.message);
        });
    };
  
    const googleLoginHandler = () => {
      googleLoginBtn()
        .then((result) => {
          if (state) {
            navigate(state);
          } else {
            navigate("/");
          }
  
          toast.success("User Login Successfully");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
    return (
        <div>
            <div className="">
      
      <div className=" flex  items-center justify-center mt-12">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex flex-col lg:flex-row overflow-hidden">
          <div className="lg:w-1/2 p-10">
            <h2 className="text-2xl text-gray-900 text-center font-bold mb-4">
              Welcome to Taskify
            </h2>
            <img
              src="https://i.ibb.co.com/JcsWsPD/tablet-login-concept-illustration-114360-7963.jpg"
              alt=""
              className="w-full h-full"
            />
          </div>

          <div className="lg:w-1/2 p-10">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">
              Log In your Account
            </h2>
            <form onSubmit={loginFormHandler}>
              <div className="form-control mt-2">
                <label className="flex justify-start items-center gap-2 mb-3 mt-4">
                  <span className="text-xl text-gray-900">
                    <MdOutlineMail />
                  </span>
                  <span className="text-gray-900">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="form-control">
                <label className="flex justify-start items-center gap-2 mb-3 mt-2">
                  <span className="text-xl text-gray-900">
                    <RiLockPasswordFill />
                  </span>
                  <span className="text-gray-900">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />

                <label className="label text-base">
                  <a
                    href="#"
                    className="label-text-alt link link-hover text-gray-900"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>

              <div className="form-control mt-6">
                <button className=" btn w-full bg-gray-900 text-white font-bold">
                  Login
                </button>
              </div>
            </form>

            <div class="flex items-center my-6">
              <hr class="flex-grow border-gray-300" />
              <span class="px-4 text-gray-500 text-sm">Or, Login with</span>
              <hr class="flex-grow border-gray-300" />
            </div>

            <div className="text-center flex items-center gap-3">
              <button
                onClick={googleLoginHandler}
                className="flex justify-center items-center gap-3 btn w-full bg-white py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition duration-300"
              >
                <span className="text-2xl">
                  <FcGoogle />
                </span>
                Login with Google
              </button>
            </div>
            <p className="text-center text-sm  mt-4">
              Don't have an Account?
              <Link to="/register">
                {" "}
                <span className="text-gray-900 font-bold hover:underline">
                  Register Now
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
        </div>
    );
};

export default Login;