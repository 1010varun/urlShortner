import { useDispatch } from "react-redux";
import { logout } from "../features/login";
import { useSelector } from "react-redux";
import propTypes from "prop-types";

const Navbar = ({ toastFunction }) => {

  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const login = user.login;

  const handelLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("login");
    toastFunction("Logout Successful", 1);
    dispatch(logout());
    window.location.href = '/'
  }


  return (
    <div className="bg-blue-900 flex text-white justify-end">
      <div
        className="p-5 hover:bg-blue-950 rounded-md cursor-pointer"
        onClick={() => (window.location.href = "/")}
      >
        Home
      </div>
      {login ? (
        <div
          className="p-5 hover:bg-blue-950 rounded-md cursor-pointer"
          onClick={handelLogout}
        >
          Logout
        </div>
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
  toastFunction : propTypes.func
}

export default Navbar;