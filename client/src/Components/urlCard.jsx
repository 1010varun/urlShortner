import propTypes from "prop-types";
import { ClipboardCopy } from "lucide-react";

const Card = ({ data, toastFunction }) => {
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toastFunction("URL copied to clipboard", 1);
  };

  return (
    <div
      className="grid bg-white border rounded-md shadow-md md:flex-row w-4/5 lg:w-4/6 xl:w-5/6 mx-auto mt-5 p-3 hover:cursor-pointer hover:shadow-cyan-800/50"
      onClick={() => copyText(data)}
    >
      <div className="text-start my-auto overflow-hidden flex flex-row">
          <ClipboardCopy color="#0c3fb6" className="me-3" />
        { data }
      </div>
    </div>
  );
};

export default Card;

Card.propTypes = {
  data: propTypes.string,
  toastFunction: propTypes.func,
};
