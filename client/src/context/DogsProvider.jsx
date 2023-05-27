import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../views/components/Error";
import { getDogs } from "../redux/actions";

export const DogsContext = createContext();

export const DogsProvider = ({ children }) => {
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogs());
    //     .then(() => setLoading(false))
    //     .catch((error) => {
    //         setError({
    //             error: true,
    //             message: error.message,
    //     });
    // });
  }, []);
  const loading = useSelector((state) => state.loading);

  return (
    <DogsContext.Provider
      value={{
        error,
        loading,
      }}
    >
      {error.error ? (
        <Error msg={error.message} />
      ) : (
        children
      )}
    </DogsContext.Provider>
  );
};
