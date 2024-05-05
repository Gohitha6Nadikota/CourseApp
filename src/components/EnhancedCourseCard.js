import React from "react";
import { SlBadge } from "react-icons/sl";
import { useSelector } from "react-redux";

export const EnhancedCourseCard = (CourseCard) => {
  const userStoreData = useSelector((store) => store.user.details);

  return (props) => {
    const handleUpdateDoc = (id, user) => {
      props.handleUpdate(id, user);
    };
    const { completed, id } = props.data;
    return (
      <div className="shadow-2xl relative m-2">
        {completed && (
          <div className="absolute z-40 ">
            <SlBadge className="text-4xl text-yellow-400" />
          </div>
        )}
        <CourseCard {...props} />
        <div className="flex justify-center flex-col">
          {!completed && (
            <h2 className="pl-[15px] flex ">
              <progress value={0.5} className="border border-black" />
            </h2>
          )}
          {!completed && (
            <button
              className="p-2 bg-black text-white my-2 mx-[35px]"
              onClick={() => handleUpdateDoc(id, userStoreData[0])}
            >
              Mark as Completed
            </button>
          )}
        </div>
      </div>
    );
  };
};
