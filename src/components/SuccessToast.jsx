import { useEffect } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SuccessToast = ({ msg, setSuccessMsg }) => {
  useEffect(() => {
    const clearSuccesssTimer = setTimeout(() => setSuccessMsg(""), 3000);
    return () => clearTimeout(clearSuccesssTimer);
  }, [msg]);

  return (
    <>
      {msg &&
        <div
          className={`transition delay-150 absolute ease-linear ${msg ? "left-40 top-1" : "right-full"
            } px-4 py-2 bg-white border-2 border-violet-500 w-fit rounded shadow-md`}
        >
          <span className="text-violet-600">
            <FontAwesomeIcon icon={faCheck} /> {msg}
          </span>
        </div>
      }
    </>
  );
};

export default SuccessToast;
