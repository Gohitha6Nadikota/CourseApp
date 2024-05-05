import React, { useEffect, useState, useContext } from "react";
import { firestore } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { context } from "../context/context.js";
import CourseCard from "./CourseCard.js";
import { useNavigate, Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../utils/dataSlice.js";

const CoursePage = () => {
  const dispatch = useDispatch();
  const courses = useSelector((store) => store.data.data);
  const [filteredcourses, setFilteredCourses] = useState([]);
  const { isAuth } = useContext(context);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth === false) {
      navigate("/");
    }
    const getData = async () => {
      const dataRef = collection(firestore, "courses");
      const fdata = await getDocs(dataRef);
      const ffdata = fdata.docs.map((val) => ({ ...val.data(), id: val.id }));
      dispatch(setData(ffdata));
      setFilteredCourses(ffdata);
    };
    getData();
  }, []);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") setFilteredCourses(courses);
  };
  const handleClearSearch = () => {
    setSearchText("");
    setFilteredCourses(courses);
  };
  const handleSearch = () => {
    const list = courses.filter(
      (c) =>
        c.name.toLowerCase().includes(searchText.toLowerCase()) ||
        c.instructor.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCourses(list);
  };
  return (
    <div className="flex w-[100vw] h-[92vh] m-0 p-0">
      <div className="">
        <p className="ml-9 sm:mx-[4vw] mt-2 text-xl font-bold">
          Check out our Courses
        </p>
        <div className="flex justify-center p-3 ">
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            className="border w-[65vw] rounded-l-xl border-black p-2 border-r-white focus:border-red-500"
          />
          {searchText && (
            <button
              className="border border-black p-2 border-l-white"
              onClick={handleClearSearch}
            >
              X
            </button>
          )}
          <button
            className="border border-black p-2 rounded-r-xl"
            onClick={handleSearch}
          >
            <ImSearch />
          </button>
        </div>
        <div className="flex items-center justify-center flex-wrap overflow-y-auto">
          {filteredcourses.map((c) => (
            <Link to={`/courses/${c.id}`} key={c.id}>
              <CourseCard data={c} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
