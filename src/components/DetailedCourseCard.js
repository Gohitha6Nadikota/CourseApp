import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { firestore } from "../firebase.js";
import { context } from "../context/context.js";
import { useSelector } from "react-redux";
import {
  collection,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { BiArrowBack } from "react-icons/bi";
import Tabs from "./Tabs.js";

const DetailedCourseCard = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [enroll, setEnrolled] = useState("Enroll Now");
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user.details);
  const { isAuth } = useContext(context);
  useEffect(() => {
    if (!isAuth) navigate("/login");
    const getData = async () => {
      const userRef = doc(collection(firestore, "logindata"), userData[0]);
      const docSnapshot = await getDoc(userRef);
      const courseData = docSnapshot.data().courses;
      if (courseData) {
        for (const course of courseData) {
          if (course.id === id) {
            setEnrolled("Enrolled");
          }
        }
      }
    };
    getData();
    const fetchCourseData = async () => {
      try {
        const courseRef = doc(collection(firestore, "courses"), id);
        const docSnapshot = await getDoc(courseRef);

        if (docSnapshot.exists()) {
          setData(docSnapshot.data());
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    fetchCourseData();
  }, [id]);
  const handleEnroll = async () => {
    setEnrolled("Enrolled");
    try {
      const userRef = doc(collection(firestore, "logindata"), userData[0]);
      await getDoc(userRef);
      await updateDoc(userRef, {
        courses: arrayUnion({
          id: id,
          completed: false,
        }),
      });

      const courseRef = doc(collection(firestore, "courses"), id);
      const courseSnapshot = await getDoc(courseRef);

      if (courseSnapshot.exists()) {
        const courseData = courseSnapshot.data();
        const students = courseData.students || [];
        const studentExists = students.some(
          (student) => student.name === userData[1]
        );

        if (!studentExists) {
          await updateDoc(courseRef, {
            students: [
              ...students,
              {
                id: userData[0],
                name: userData[1],
                email: userData[2],
              },
            ],
          });
        }
      } else {
        await setDoc(
          courseRef,
          {
            students: [
              {
                id: userData[0],
                name: userData[0],
                email: userData[1],
              },
            ],
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  return (
    <div className="w-[100%] h-[92vh] flex flex-col items-center ">
      <div className="text-xl w-full flex items-center justify-start pl-4 pt-4">
        <Link to="/courses">
          <BiArrowBack />
        </Link>
      </div>
      <div className="flex flex-col md:flex-row mt-[2vh] shadow-2xl rounded-lg">
        <div className="w-[80vw] h-[250px] m-3 p-4 md:w-[350px] md:h-[300px]">
          <img
            src={data.thumbnail}
            className="object-fill w-[100%] h-[100%]"
            alt="thumbnail"
          />
        </div>
        <div className="w-[80vw] md:h-[450px] md:w-[50vw] m-3 p-4">
          <p className="text-2xl font-bold p-3 md:px-5 ">{data.name}</p>
          <p className="px-3 py-1 md:px-5">
            created by
            <span className="text-[#7d3fd3] font-serif">
              {" " + data.instructor}
            </span>
          </p>
          <p className="px-3 py-1 md:px-5">{data.description}</p>
          <p className="px-3 md:px-5">
            Duration : <span className="font-semibold">{data.duration}</span>
          </p>
          <p className="p-3 md:px-5">
            Tuesdays & Thursdays <br /> 6:00 PM - 8:00 PM
          </p>
          <p className="px-3 md:px-5">Location : {data.location}</p>
          <div className="flex  max-w-[545px]">
            <p className="px-3 md:px-5">Enrollment Status</p>
            <button
              className={`px-4 text-white w-[104px] h-[24px] m-1 ${
                data.enrollmentStatus === "Open"
                  ? "bg-green-500"
                  : data.enrollmentStatus === "Closed"
                  ? "bg-red-500"
                  : data.enrollmentStatus === "InProgress"
                  ? "bg-yellow-500"
                  : "bg-gray-500"
              }`}
            >
              {data.enrollmentStatus}
            </button>
          </div>
          {data.enrollmentStatus === "Open" && (
            <div className="flex items-center justify-start">
              <button
                className="px-4 bg-black text-white w-[124px] h-[44px] m-2 md:ml-[20px] "
                onClick={() => handleEnroll(id)}
              >
                {enroll}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="">
        <Tabs datas={data} />
      </div>
    </div>
  );
};

export default DetailedCourseCard;
