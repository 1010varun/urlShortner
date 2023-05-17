const Navbar = () => {
    return (
      <div className="bg-blue-900 flex text-white justify-end">
        <div
          className="p-5 hover:bg-blue-950 rounded-md cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          Home
        </div>
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
      </div>
    );
}

export default Navbar;