import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="w-[100%] h-[92vh] m-0">
      <div className="flex items-center justify-center flex-col w-[100%] h-[92vh] ">
        <div className="flex items-center flex-col md:flex-row justify-center">
          <h1 className="text-2xl text-black font-extrabold pl-[10px] pr-[50px] py-[30px] md:px-1">
            Take the first step
          </h1>
          <h1 className="text-2xl text-black font-extrabold pl-[45px] pr-[30px] py-[30px] md:px-1">
            towards your goals
          </h1>
          <h1 className="text-2xl text-black font-extrabold pl-[40px] pr-[50px] py-[30px] md:px-1">
            with Us ✨
          </h1>
        </div>
        <div className="items-center justify-center">
          <Link to="/register">
            <button className="bg-black text-white my-6 ml-[60px] p-3 md:mx-auto">
              Click to proceed
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
