import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";

const ErrorToast = ({error, setError}) => {
  useEffect(() => {
    const clearErrorTimer = setTimeout(() => setError(""), 3000);
    return () => clearTimeout(clearErrorTimer);
  }, [error]);

  return (
    <div
      className={`transition delay-150 absolute ease-linear ${
        error ? "left-40 top-1" : "right-full"
      } px-4 py-2 bg-white border-2 border-violet-500 w-fit rounded shadow-md`}
    >
      <span className="text-violet-600">
        <FontAwesomeIcon icon={faWarning} /> {error}
      </span>
    </div>
  );
};

export default ErrorToast;
