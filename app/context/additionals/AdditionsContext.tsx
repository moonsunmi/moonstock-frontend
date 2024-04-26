import { PurchaseAction } from "@/app/types/actionTypes";
import { Purchase } from "@/app/types/stockTypes";
import { Dispatch, createContext, useContext } from "react";

// TODO. createContext's type
interface AdditionalContext {
  state: Purchase[];
  dispatch: Dispatch<PurchaseAction>;
}

const AdditionsContext = createContext<AdditionalContext | null>(null);

const useAdditionsContext = () => {
  const value = useContext(AdditionsContext);
  if (value === null) {
    throw new Error("useAdditionalContext should be within AdditionalContext");
  }
  return value;
};

export { AdditionsContext, useAdditionsContext };
