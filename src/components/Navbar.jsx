import React, { useContext } from 'react';
import { authorizedContext } from '../AuthProvider/AuthProvider';

const Navbar = () => {
    const {user} = useContext(authorizedContext)
    const signoutHandler = () => {
        logOut()
          .then(() => {
            navigate("/login");
            toast.success("User Logout Successfully");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      };
    return (
        <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a>Item 1</a></li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Taskify</a>
        </div>
        
        <div className="navbar-end flex items-center gap-3">
        <div className="">
         <img
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full"
                    src={user?.photoURL}
                    alt=""
                  />

         </div>
         <div className="">
            <button className='btn bg-gray-900 text-white rounded-lg'>LogOut</button>

         </div>
         
        </div>
      </div>
    );
};

export default Navbar;