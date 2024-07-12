import React from "react";
import { SlBadge } from "react-icons/sl";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import badge from "../images/badge.avif"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const EnhancedCourseCard = (CourseCard) => {
  const userStoreData = useSelector((store) => store.user.details);

  return (props) => {
    const handleUpdateDoc = (id, user) => {
      toast("Marked as Completed");
      props.handleUpdate(id, user);
    };
    const { completed, id } = props.data;
   const date = new Date();
   date.setDate(date.getDate() + 5);
   const formattedDate = date.toDateString();
    return (
      <div className="shadow-2xl relative m-2">
        {completed && (
          <div className="absolute z-60 ">
            <img className="w-[50px] h-[50px]" src={badge} alt="badge" />
          </div>
        )}
        <CourseCard {...props} />
        <div className="flex justify-center flex-col">
          {!completed && (
            <h2 className="pl-[15px] flex justify-center bg-white">
              <Box sx={{ width: "90%" }}>
                <LinearProgress
                  value={Math.floor(Math.random() * 101)}
                  variant="determinate"
                  valueBuffer={80}
                />
              </Box>
            </h2>
          )}
          {!completed && (
            <p className="flex justify-center">Due Date :{formattedDate}</p>
          )}
          {!completed && (
            <>
              <button
                className="p-2 bg-black text-white my-2 mx-[35px]"
                onClick={() => handleUpdateDoc(id, userStoreData[0])}
              >
                Mark as Completed
              </button>
              <ToastContainer />
            </>
          )}
        </div>
      </div>
    );
  };
};
