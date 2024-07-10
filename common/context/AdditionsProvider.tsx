"use client";

import { ReactNode, useReducer } from "react";
import { AdditionsContext } from "./AdditionsContext";
import purchaseReducer from "./purchaseReducer";

const AdditionsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(purchaseReducer, []);

  return (
    <AdditionsContext.Provider
      value={{ additions: state, additionsDispatch: dispatch }}
    >
      {children}
    </AdditionsContext.Provider>
  );
};

export default AdditionsProvider;
