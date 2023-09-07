import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUrls } from "../features/userUrls";
import axios from "axios";
import { ClipboardCopy } from "lucide-react";
import propTypes from "prop-types";
import Card from "./urlCard";
import Loader from "./Loader";
import Navbar from "./Navbar";

const Home = ({ toastFunction }) => {
  const [url, setUrl] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [loading, setLoading] = useState(false);
  // const [short, setShort] = useState("");
  const short = useRef("");

  const dispatch = useDispatch();
  const userUrls = useSelector((state) => state.userUrls.value);
  const urls = userUrls.urls;
  const length = urls.length;
  const userName = localStorage.getItem('username');

  useEffect(() => {
    var path = location.protocol + '//' + location.host;
    setBaseUrl(path);
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
  }, [])

  const makeShort = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: import.meta.env.VITE_BASE_URL + "/shorturl",
      data: {
        url,
        userName,
      },
    })
      .then((resp) => {
        setLoading(false);
          if (urls.length > 0) {
              dispatch(fetchUrls({ userName, urls: resp.data.urls }));
          } else {
              dispatch(fetchUrls({ userName, urls: [resp.data.urls] }));
          }
        short.current = baseUrl + '/' + resp.data.short;
        toastFunction("URL shorted", 1);
        setUrl("");
      })
      .catch(() => {
        setLoading(false);
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
      <Navbar toastFunction={toastFunction} />
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col rounded-md w-4/5 md:w-2/3 lg:w-1/3 justify-center items-center h-2/3 shadow-xl border-2 border-gray-100">
          <h1 className="mb-9 text-2xl">Short URL</h1>
          <input
            className="border border-gray-200 w-11/12 mb-1 rounded-md p-1 hover:border-gray-500 hover:border-2"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></input>
          {loading ? (
            <Loader />
          ) : (
            <button
              className="bg-blue-500 rounded-md w-11/12 p-2 hover:bg-blue-950 hover:text-white"
              onClick={makeShort}
              disabled={loading}
            >
              Submit
            </button>
          )}
          {short.current.length === 0 ? (
            <div></div>
          ) : (
            <div
              className="w-11/12 mb-1 rounded-md p-1 mt-5 flex flex-row hover:cursor-pointer"
              onClick={copyText}
              disabled
            >
              <ClipboardCopy color="#0c3fb6" className="me-3" />
              {short.current}
            </div>
          )}
        </div>
      </div>
      {length === 0 ? (
        <div className="text-center text-3xl font-bold">No URLs</div>
      ) : (
        <div className="text-center text-3xl font-bold">
          Previously shorted URLs
        </div>
      )}
      {urls.map((url) => {
        return (
          <Card
            data={baseUrl + "/" + url}
            key={url}
            toastFunction={toastFunction}
          />
        );
      })}
    </>
  );
};

export default Home;

Home.propTypes = {
  toastFunction: propTypes.func,
};
