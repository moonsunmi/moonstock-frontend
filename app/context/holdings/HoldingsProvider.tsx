"use client";

import { ReactNode, useReducer } from "react";
import { HoldingsContext } from "./HoldingsContext";
import { initialPurchase } from "../stock/initialPurchases";
import purchaseReducer from "../stock/purchaseReducer";

const HoldingsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(purchaseReducer, [initialPurchase]);
  return (
    <HoldingsContext.Provider
      value={{ holdings: state, holdingsDispatch: dispatch }}
    >
      {children}
    </HoldingsContext.Provider>
  );
};

export default HoldingsProvider;
