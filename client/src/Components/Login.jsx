import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { login } from "../features/login";
import propTypes from "prop-types";

const Login = ({toastFunction}) => {
  const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const handelClick = (e) => {
      if (userName === "" || password === "") {
          toastFunction("PROVIDE CREDENTIALS", 0);
      }
      else {
          axios({
              method: "POST",
              url: import.meta.env.VITE_BASE_URL + "/login",
              data: {
                  userName,
                  password
              },
          })
              .then(() => {
                  localStorage.setItem("login", true);
                  dispatch(login({ "login": true, "user": userName }))
                  toastFunction("Login successful", 1);
                  navigate('/')
              })
              .catch((err) => {
                  toastFunction(err.response.data, 0);
              });
          e.preventDefault();
          setUserName("");
          setPassword("");
      }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col outline outline-offset-2 outline-2  rounded-md w-1/2 md:w-1/3 justify-center items-center h-1/3">
        <h1 className="mb-9 text-2xl">Login</h1>
        <input
          className="border border-blue-600 w-11/12 mb-1 rounded-md p-1 hover:border-blue-950 hover:border-2"
          value={userName}
          placeholder="Enter UserName"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        ></input>
        <input
          className="border border-blue-600 w-11/12 mb-1 rounded-md p-1 hover:border-blue-950 hover:border-2"
          value={password}
          type="password"
          placeholder="Enter UserName"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button
          className="bg-blue-500 rounded-md w-11/12 p-2 hover:bg-blue-950 hover:text-white"
          onClick={handelClick}
        >
          Login
        </button>
      </div>
    </div>
  );
};

Login.propTypes = {
    toastFunction: propTypes.func
}

export default Login;
