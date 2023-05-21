import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUrls } from "../features/userUrls";
import axios from "axios";
import { FiCopy } from "react-icons/fi";
import propTypes from "prop-types";
import Card from "./urlCard";

const Home = ({ toastFunction }) => {
  const [url, setUrl] = useState("");
  // const [short, setShort] = useState("");
  const short = useRef("");

  const dispatch = useDispatch();
  const userUrls = useSelector((state) => state.userUrls.value);
  const user = useSelector((state) => state.user.value);
  const urls = userUrls.urls;
  const userName = user.user;
  const length = urls.length;

  const makeShort = () => {
    axios({
      method: "POST",
      url: import.meta.env.VITE_BASE_URL + "/shorturl",
      data: {
        url,
        userName,
      },
    })
      .then((resp) => {
          if (urls.length > 0) {
              dispatch(fetchUrls({ userName, urls: resp.data.urls }));
          } else {
              dispatch(fetchUrls({ userName, urls: [resp.data.urls] }));
          }
        short.current = resp.data.short;
        toastFunction("URL shorted", 1);
        setUrl("");
      })
      .catch(() => {
          toastFunction("Error Occured", 0);
          setUrl("")
      });
  };


  const copyText = () => {
    navigator.clipboard.writeText(short.current);
    toastFunction("URL copied to clipboard", 1);
  };

  return (
    <>
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col outline outline-offset-2 outline-2  rounded-md w-4/5 md:w-2/3 lg:w-1/3 justify-center items-center h-2/3">
          <h1 className="mb-9 text-2xl">Short URL</h1>
          <input
            className="border border-blue-600 w-11/12 mb-1 rounded-md p-1 hover:border-blue-950 hover:border-2"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></input>
          <button
            className="bg-blue-500 rounded-md w-11/12 p-2 hover:bg-blue-950 hover:text-white"
            onClick={makeShort}
          >
            Submit
          </button>
          {short.current.length === 0 ? (
            <div></div>
          ) : (
            <div
              className="w-11/12 mb-1 rounded-md p-1 mt-5 flex flex-row hover:cursor-pointer"
              onClick={copyText}
              disabled
            >
              <FiCopy className="mt-1 me-3" />
              {short.current}
            </div>
          )}
        </div>
      </div>
      {length === 0 ? (
        <div className="text-center text-3xl font-bold">No URLs</div>
      ) : (
        <div className="text-center text-3xl font-bold">URLs</div>
      )}
      {urls.map((url) => {
        return <Card data={url} key={url} toastFunction={toastFunction} />;
      })}
    </>
  );
};

export default Home;

Home.propTypes = {
  toastFunction: propTypes.func,
};