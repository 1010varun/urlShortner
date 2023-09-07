import propTypes from "prop-types";
import { ClipboardCopy, ExternalLink } from "lucide-react";

const Card = ({ data, toastFunction }) => {
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toastFunction("URL copied to clipboard", 1);
  };



  return (
    <div className="grid bg-white border rounded-md shadow-md md:flex-row w-4/5 lg:w-4/6 xl:w-5/6 mx-auto mt-5 p-3 hover:shadow-cyan-800/50">
      <div className="text-start my-auto flex flex-row overflow-hidden">
        <div className="me-3 hover:cursor-pointer bg-sky-300 p-2 rounded-xl hover:bg-sky-500">
          <ClipboardCopy
            color="#0c3fb6"
            className=" "
            onClick={() => copyText(data)}
          />
        </div>
        <a
          href={data}
          target="_blank"
          rel="noreferrer"
          className="sm:hidden ms-1 me-2 bg-sky-300 p-2 rounded-xl hover:bg-sky-500"
        >
          <ExternalLink
            color="#0c3fb6"
            className="ms-auto hover:cursor-pointer"
          />
        </a>
        <p className="mt-2">{data}</p>
        <a
          href={data}
          target="_blank"
          rel="noreferrer"
          className="hidden sm:block ms-auto bg-sky-300 p-2 rounded-xl hover:bg-sky-500"
        >
          <ExternalLink
            color="#0c3fb6"
            className="ms-auto hover:cursor-pointer"
          />
        </a>
      </div>
    </div>
  );
};

export default Card;

Card.propTypes = {
  data: propTypes.string,
  toastFunction: propTypes.func,
};
