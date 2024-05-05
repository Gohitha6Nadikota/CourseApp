import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { firestore } from "../firebase.js";
import { setDetails } from "../utils/userSlice.js";
import { useDispatch } from "react-redux";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRePassword = (e) => {
    setRePassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleRegister = async () => {
    if (password === repassword) {
      try {
        const ddata = await getDocs(collection(firestore, "logindata"));
        var size = ddata.size;
        size++;
        await setDoc(doc(firestore, "logindata", String(size)), {
          id: size,
          name: name,
          password: password,
          email: email,
        });
        dispatch(setDetails(size));
        dispatch(setDetails(name));
        dispatch(setDetails(email));
        dispatch(setDetails(password));
        alert("User created successfully");
        navigate("/login");
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  };
  return (
    <div className="w-[100vw] h-[92vh] bg-white flex items-center justify-center overflow-y-scroll">
      <form
        className="border border-black my-[14vh] px-[10vw] rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="p-2">
          <p className="text-2xl font-extrabold">Register</p>
        </div>
        <div className="p-2">
          <p className="text-xl font-semibold py-2">Name</p>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={handleName}
            className="border border-black rounded-lg p-2"
          />
        </div>
        <div className="p-2">
          <p className="text-xl font-semibold py-2">Email</p>
          <input
            type="email"
            placeholder="Enter Name"
            value={email}
            onChange={handleEmail}
            className="border border-black rounded-lg p-2"
          />
        </div>
        <div className="p-2">
          <p className="text-xl font-semibold py-2">Password</p>
          <input
            type="Password"
            placeholder="Enter Password"
            value={password}
            onChange={handlePassword}
            className="border border-black rounded-lg p-2"
          />
        </div>
        <div className="p-2">
          <p className="text-xl font-semibold py-2">Re-Enter Password</p>
          <input
            type="Password"
            placeholder="Enter new Password"
            className="border border-black rounded-lg p-2"
            value={repassword}
            onChange={handleRePassword}
          />
        </div>
        <div className="flex justify-center p-5">
          <button
            className="border-2 border-black m-1 font-extrabold p-2"
            onClick={handleRegister}
          >
            Register
          </button>
          <Link to="/login">
            <button className="border-2 border-black m-1 font-extrabold p-2 ">
              Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
