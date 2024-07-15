import React, { createContext, useContext, useState, useCallback } from "react";
import Spinner from "./spinner";

const SpinnerContext = createContext();

export const useSpinner = () => useContext(SpinnerContext);

export const SpinnerProvider = ({ children }) => {
  const [spinnerState, setSpinnerState] = useState({
    open: false,
    text: "Loading...",
  });

  const showSpinner = useCallback((text = "Loading...") => {
    setSpinnerState({ open: true, text });
  }, []);

  const hideSpinner = useCallback(() => {
    setSpinnerState({ open: false, text: "Loading..." });
  }, []);

  return (
    <SpinnerContext.Provider value={{ showSpinner, hideSpinner }}>
      <Spinner open={spinnerState.open} text={spinnerState.text} />
      {children}
    </SpinnerContext.Provider>
  );
};
