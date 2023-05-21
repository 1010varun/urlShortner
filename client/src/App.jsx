import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Protected from "./Components/Protected";
import Home from "./Components/Home";

const App = () => {
  const toastFunction = (message, type) => {
    if (type === 0) {
      toast.error(message, { theme: "dark" });
    } else if (type === 1) {
      toast.success(message, { theme: "dark" });
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar toastFunction={toastFunction} />
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Protected Component={<Home toastFunction={toastFunction} />} />
            }
          ></Route>
          <Route
            path="/signup"
            element={<Signup toastFunction={toastFunction} />}
          ></Route>
          <Route
            path="/login"
            element={<Login toastFunction={toastFunction} />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;