import { StockAction } from "types/actionTypes";
import { StockInfo } from "types/stockTypes";

export default function stockReducer(
  state: StockInfo[],
  action: StockAction
): StockInfo[] {
  switch (action.type) {
    case "ADD_ROW":
      return state.concat(action.payload);
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
