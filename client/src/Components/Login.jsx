import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/login";
import { fetchUrls } from "../features/userUrls";
import propTypes from "prop-types";

const Login = ({ toastFunction }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUserUrls = () => {
    axios({
      method: "POST",
      url: import.meta.env.VITE_BASE_URL + "/allUrls",
      data: {
        userName,
      },
    })
      .then((resp) => {
        dispatch(fetchUrls({ user: userName, urls: resp.data.urls }));
      })
      .catch(() => {
        dispatch(fetchUrls({ user: userName, urls: [] }));
      });
  };

  const handelClick = () => {
    if (userName === "" || password === "") {
      toastFunction("PROVIDE CREDENTIALS", 0);
    } else {
      axios({
        method: "POST",
        url: import.meta.env.VITE_BASE_URL + "/login",
        data: {
          userName,
          password,
        },
      })
        .then(() => {
          fetchUserUrls();
          localStorage.setItem("login", true);
          dispatch(login({ login: true, user: userName }));
          toastFunction("Login successful", 1);
          setUserName("");
          setPassword("");
          navigate("/");
        })
        .catch((err) => {
          toastFunction(err.response.data, 0);
          setUserName("");
          setPassword("");
        });
      
    }
  };

  return (
    <div className="flex justify-center items-center h-96 mt-24">
      <div className="flex flex-col rounded-md w-4/5 md:w-2/3 lg:w-1/3 justify-center items-center h-2/3 shadow-xl border-2 border-gray-100">
        <h1 className="mb-9 text-2xl">Login</h1>
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
  toastFunction: propTypes.func,
};

export default Login;
