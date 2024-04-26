import { PurchaseAction } from "@/app/types/actionTypes";
import { Purchase } from "@/app/types/stockTypes";
import { Dispatch, createContext, useContext } from "react";

// TODO. createContext's type
interface AdditionalContext {
  // TODO. rectify. Addition
  additions: Purchase[];
  additionDispatch: Dispatch<PurchaseAction>;
}

const AdditionsContext = createContext<AdditionalContext | null>(null);

const useAdditionsContext = () => {
  const additions = useContext(AdditionsContext);
  if (!additions) {
    throw new Error("useAdditionsContext should be within AdditionsProvider");
  }
  return additions;
};

export { AdditionsContext, useAdditionsContext };
