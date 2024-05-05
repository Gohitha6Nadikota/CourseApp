import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import './App.css';
import Home from "./components/Home";
import CoursePage from "./components/CoursePage";
import Register from './components/Register'
import Login from "./components/Login";
import { context } from "./context/context";
import DetailedCourseCard from "./components/DetailedCourseCard";
import Dashboard from "./components/Dashboard";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState("Login");
  return (
    <context.Provider value={{ isAuth, setIsAuth,user,setUser}}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/courses/:id" element={<DetailedCourseCard />} />
          <Route path="/dashboard/u" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </context.Provider>
  );
}

export default App;
