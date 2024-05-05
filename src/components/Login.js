import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../context/context.js";
import { firestore } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { setDetails } from "../utils/userSlice.js";
import { useDispatch } from "react-redux";
const Login = () => {
  const { setIsAuth } = useContext(context);
  const [logins, setLogins] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const dbref = collection(firestore, "logindata");
      const ddata = await getDocs(dbref);
      setLogins(ddata.docs.map((val) => ({ ...val.data(), id: val.id })));
    };
    getData();
  }, []);
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleLogin = () => {
    if (logins) {
      const user = logins.find(
        (login) => login.name === name && login.password === password
      );
      if (user) {
        setIsAuth(true);
        dispatch(setDetails(user.id));
        dispatch(setDetails(user.name));
        dispatch(setDetails(user.email));
        dispatch(setDetails(user.password));
        navigate("/courses");
      } else {
        alert("Wrong credentials. Register if you are a new user.");
      }
    }
  };
  return (
    <div className="w-[100%] h-[92vh] bg-white flex items-center justify-center ">
      <form
        className="border border-black p-3 sm:p-[16vh] rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="p-3">
          <p className="text-2xl font-extrabold ">Login</p>
        </div>
        <div className="p-3">
          <p className="text-xl font-semibold py-2">Name</p>
          <input
            type="text"
            placeholder="Enter Name"
            className="border border-black rounded-lg p-2"
            value={name}
            onChange={handleName}
          />
        </div>
        <div className="p-3">
          <p className="text-xl font-semibold py-2">Password</p>
          <input
            type="Password"
            placeholder="Enter Password"
            className="border border-black rounded-lg p-2"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div className="flex justify-center p-5">
          <button
            type="submit"
            className="border-2 border-black m-1 font-extrabold p-2"
            onClick={handleLogin}
          >
            Login
          </button>
          <Link to="/register">
            <button className="border-2 border-black m-1 font-extrabold p-2">
              Register
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
