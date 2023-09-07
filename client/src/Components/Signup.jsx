import { useState } from "react";
import axios from "axios";
import propTypes from "prop-types";
import { login } from "../features/login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUrls } from "../features/userUrls";
import Loader from "./Loader";
import Navbar from "./Navbar";

const Signup = ({ toastFunction }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelClick = () => {
    if (userName === "" || password === "") {
      toastFunction("PROVIDE CREDENTIALS", 0);
    } else {
      setLoading(true);
      axios({
        method: "POST",
        url: import.meta.env.VITE_BASE_URL + "/signup",
        data: {
          userName,
          password,
        },
      })
        .then(() => {
          setLoading(false);
          dispatch(login({ login: true, user: userName }));
          dispatch(fetchUrls({ user: userName, urls: [] }));
          localStorage.setItem("login", true);
          localStorage.setItem("username", userName);
          toastFunction("Signup successful", 1);
          setUserName("");
          setPassword("");
          navigate("/");
        })
        .catch((err) => {
          setLoading(false);
          toastFunction(err.response.data, 0);
          setUserName("");
          setPassword("");
        });
    }
  };

  return (
    <>
      <Navbar toastFunction={toastFunction} />
      <div className="flex justify-center items-center h-96 mt-24">
        <div className="flex flex-col rounded-md w-4/5 md:w-2/3 lg:w-1/3 justify-center items-center h-2/3 shadow-xl border-2 border-gray-100">
          <h1 className="mb-9 text-2xl">Signup</h1>
          <input
            className="border border-gray-200 w-11/12 mb-1 rounded-md p-1 hover:border-gray-500 hover:border-2"
            value={userName}
            placeholder="Enter UserName"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></input>
          <input
            className="border border-gray-200 w-11/12 mb-1 rounded-md p-1 hover:border-gray-500 hover:border-2"
            value={password}
            type="password"
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          {loading ? (
            <Loader />
          ) : (
            <button
              className="bg-blue-500 rounded-md w-11/12 p-2 hover:bg-blue-950 hover:text-white"
              onClick={handelClick}
              disabled={loading}
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </>
  );
};

Signup.propTypes = {
  toastFunction: propTypes.func,
};

export default Signup;
