import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/login";
import { eraseUrls } from "../features/userUrls";
("../features/userUrls.js");
import { useSelector } from "react-redux";
import propTypes from "prop-types";

const Navbar = ({ toastFunction }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const statelogin = user.login;
  const stateuserName = user.user;
  const [login, setLogin] = useState(false);
  const [userName, setuserName] = useState("");


  useEffect(() => {
    if (localStorage.getItem('login')) {
      setLogin(localStorage.getItem('login'))
      setuserName(localStorage.getItem("username"));
    }
  }, []);

  

  const handelLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("login");
    toastFunction("Logout Successful", 1);
    dispatch(logout());
    dispatch(eraseUrls());
    window.location.href = "/login";
  };

  return (
    <div className="bg-blue-900 flex text-white justify-end">
      {login||statelogin ? (
        <>
          <div className="p-5 rounded-md cursor-pointer">
            Login as {userName || stateuserName}
          </div>
          <div
            className="p-5 hover:bg-blue-950 rounded-md cursor-pointer"
            onClick={handelLogout}
          >
            Logout
          </div>
        </>
      ) : (
        <>
          <div
            className="p-5 hover:bg-blue-950 rounded-md cursor-pointer"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </div>
          <div
            className="p-5 hover:bg-blue-950 rounded-md cursor-pointer mr-3"
            onClick={() => (window.location.href = "/signup")}
          >
            Signup
          </div>
        </>
      )}
    </div>
  );
};

Navbar.propTypes = {
  toastFunction: propTypes.func,
};

export default Navbar;
