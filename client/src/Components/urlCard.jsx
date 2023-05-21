import propTypes from "prop-types";
import { FiCopy } from "react-icons/fi";

const Card = ({ data, toastFunction }) => {
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toastFunction("URL copied to clipboard", 1);
  };

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 bg-white border rounded-md shadow-md md:flex-row w-4/5 lg:w-4/6 xl:w-3/6 mx-auto mt-5 p-3 hover:cursor-pointer hover:shadow-cyan-800/50"
      onClick={() => copyText(data)}
    >
      <div className="text-start w-11/12 my-auto overflow-auto flex flex-row">
        <FiCopy className="mt-1 me-3" />
        {data}
      </div>
    </div>
  );
};

export default Card;

Card.propTypes = {
  data: propTypes.string,
  toastFunction: propTypes.func,
};
