import React, { useContext } from "react";
import { FaBookOpenReader } from "react-icons/fa6";
import { context } from "../context/context.js";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteDetails } from "../utils/userSlice.js";
const NavBar = () => {
  const data = useSelector((store) => store.user.details);
  const dispatch = useDispatch();
  const { isAuth, setIsAuth } = useContext(context);
  const handleLogout = () => {
    dispatch(deleteDetails());
    setIsAuth(false);
  };
  return (
    <div className="bg-black text-white h-[8vh] flex items-center align-middle justify-between w-[100%] p-0 m-0">
      <div className="pl-[25px] text-2xl">
        <FaBookOpenReader />
      </div>
      <ol className="flex text-sm p-2">
        {isAuth && (
          <li className="p-1 md:p-3">
            <Link to="/dashboard/u">Dashboard</Link>
          </li>
        )}
        {isAuth && (
          <li className="p-1 md:p-3">
            <Link to="/courses">Courses</Link>
          </li>
        )}
        {isAuth && (
          <li className="p-1 md:p-3">
            {data[1]}
          </li>
        )}
        {isAuth && (
          <li className="p-1 md:p-3">
            <Link to="/">
              <button onClick={handleLogout}>Logout</button>
            </Link>
          </li>
        )}
      </ol>
    </div>
  );
};

export default NavBar;
