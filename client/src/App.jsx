import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"

import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Protected from "./Components/Protected";
import Home from "./Components/Home";
import MapUrlPage from "./Components/MapUrl";
import Footer from "./Components/Footer";

const App = () => {
  const toastFunction = (message, type) => {
    if (type === 0) {
      toast.error(message);
    } else if (type === 1) {
      toast.success(message);
    }
  };

  return (
    <>
      <Toaster />
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
          <Route
            path="/:id"
            element={<MapUrlPage />}
          ></Route>
        </Routes>
      </Router>
    <Footer />
    </>
  );
};

export default App;