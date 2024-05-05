import React from "react";

const CourseCard = ({ data }) => {
  return (
    <div className="w-[250px] h-[250px] border border-black m-3 rounded-lg shadow-xl">
      <div className="p-2">
        <img
          src={data.thumbnail}
          className="bg-cover w-[250px] h-[125px]"
          alt={data.name}
        />
      </div>
      <div className="">
        <p className="px-3 pt-2 pb-1 text-xl font-semibold line-clamp-2">
          {data.name}
        </p>
        <p className="px-3 py-1">By {data.instructor}</p>
      </div>
    </div>
  );
};

export default CourseCard;
