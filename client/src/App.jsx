import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";


const App = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<div>home page</div>}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;