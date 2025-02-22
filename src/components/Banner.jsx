import React from "react";
import banner from "../assets/banner.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <div
        style={{
          background: `url(${banner})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
        className="w-full h-[100vh] flex justify-center items-center p-8 lg:p-32"
      >
        <div
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          className="container mx-auto py-14 "
        >
          <h1 className="text-center text-4xl mb-6 lg:w-8/12 mx-auto lg:text-7xl font-bold text-white">
            The Future of Task Management is Here
          </h1>
          <p className="w-9/12 mx-auto text-center text-xl font-semibold text-white">
            Say goodbye to cluttered to-do lists and missed deadlines. Tasify
            revolutionizes the way you manage tasks with a seamless, intuitive,
            and intelligent system. From smart reminders to real-time
            collaboration, Tasify ensures you stay productive without the
            stress. Whether you're organizing personal tasks or coordinating
            with a team, our cutting-edge features help you plan smarter, work
            faster, and achieve more. Experience the future of
            productivity Tasify makes task management effortless! Let me know
            if you want any refinements!
          </p>
          <div className="flex justify-center items-center mt-8">
            <Link to={"/task-management"}>
              <button className="bg-gray-900 cursor-pointer text-white py-3 px-8 rounded-md font-semibold">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
