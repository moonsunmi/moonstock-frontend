import { PurchaseAction } from "@/types/actionTypes";
import { IPurchase } from "@/types/stockTypes";
import { Dispatch, createContext, useContext } from "react";

interface IAdditionsContext {
  additions: IPurchase[];
  additionsDispatch: Dispatch<PurchaseAction>;
}

const AdditionsContext = createContext<IAdditionsContext | null>(null);

const useAdditionsContext = () => {
  const additions = useContext(AdditionsContext);
  if (!additions) {
    throw new Error("useAdditionsContext should be within AdditionsProvider");
  }
  return additions;
};

export { AdditionsContext, useAdditionsContext };
