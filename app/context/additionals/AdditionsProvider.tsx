"use client";

import { ReactNode, useReducer } from "react";
import { initialPurchase } from "../stock/initialPurchases";
import purchaseReducer from "../stock/purchaseReducer";
import { AdditionsContext } from "./AdditionsContext";

const AdditionsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(purchaseReducer, [initialPurchase]);

  return (
    <AdditionsContext.Provider value={{ state, dispatch }}>
      {children}
    </AdditionsContext.Provider>
  );
};
export default AdditionsProvider;
