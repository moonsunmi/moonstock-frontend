"use client";

import { ReactNode, useReducer } from "react";
import { initialPurchase } from "./initialPurchases";
import purchaseReducer from "./purchaseReducer";
import { AdditionsContext } from "./AdditionsContext";
const AdditionsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(purchaseReducer, [initialPurchase]);

  // TODO. additions로 할지 -ion으로 할지 정하기 복수형 어떻게 할 것인가.
  return (
    <AdditionsContext.Provider
      value={{ additions: state, additionDispatch: dispatch }}
    >
      {children}
    </AdditionsContext.Provider>
  );
};

export default AdditionsProvider;
