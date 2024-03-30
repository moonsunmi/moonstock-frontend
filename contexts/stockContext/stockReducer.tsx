import { PurchaseAction } from "types/actionTypes";
import { Purchase } from "types/stockTypes";

export default function stockReducer(
  state: Purchase[] = [],
  action: PurchaseAction
): Purchase[] {
  switch (action.type) {
    case "ADD_ROW":
      return [...state, action.payload];
    case "REMOVE_ROW":
      return state.filter((stock) => stock.id !== action.payload.id);
    case "UPDATE_ROW":
      return state.map((stock) =>
        stock.id === action.payload.id ? { ...action.payload } : stock
      );
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
}
