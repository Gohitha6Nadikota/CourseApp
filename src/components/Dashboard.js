import React, { useEffect, useState, useContext } from "react";
import CourseCard from "./CourseCard";
import { firestore } from "../firebase.js";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { context } from "../context/context.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateEnroll } from "../utils/enrollSlice.js";
import { EnhancedCourseCard } from "./EnhancedCourseCard.js";

const Dashboard = () => {
  const [enrolls, setEnrolls] = useState([]);
  const { isAuth } = useContext(context);
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user.details);
  const navigate = useNavigate();
  const NewCard = EnhancedCourseCard(CourseCard);
  const handleUpdate = async (id, user) => {
    const userRef = doc(collection(firestore, "logindata"), user);
    const docSnapshot = await getDoc(userRef);
    const userData = docSnapshot.data();
    const courseIndex = userData.courses.findIndex((course) => {
      return parseInt(course.id) === parseInt(id);
    });
    if (courseIndex !== -1) {
      const updatedCourses = [...userData.courses];

      updatedCourses[courseIndex].completed = true;
      await updateDoc(userRef, {
        courses: updatedCourses,
      });
      getData();
    }
  };

  const getData = async () => {
    const userRef = doc(collection(firestore, "logindata"), userData[0]);
    const docSnapshot = await getDoc(userRef);
    const courseDetails = docSnapshot.data().courses;
    const enrollsData = [];
    if (courseDetails) {
      for (const courseInfo of courseDetails) {
        const courseRef = doc(collection(firestore, "courses"), courseInfo.id);
        const courseSnapshot = await getDoc(courseRef);
        if (courseSnapshot.exists()) {
          enrollsData.push({
            ...courseSnapshot.data(),
            completed: courseInfo.completed,
          });
        }
      }
      setEnrolls(enrollsData);
      dispatch(updateEnroll(enrollsData));
    }
  };

  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
      return;
    }
    getData();
  }, []);

  return (
    <div className="flex w-[100%] h-[92vh] m-0 p-0 flex-col overflow-y-auto ">
      <div className="text-xl font-bold p-6">Your Learnings</div>
      <div className="flex items-center justify-center flex-wrap md:flex-row md:justify-start md:items-start px-1">
        {enrolls &&
          enrolls.map((c) => (
              <NewCard
                key={c.id}
                data={c}
                completed={c.completed}
                handleUpdate={handleUpdate}
              />
          ))}
      </div>
    </div>
  );
};
export default Dashboard;
