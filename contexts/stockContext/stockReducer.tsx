import { ActionType, PurchaseAction } from "types/actionTypes";
import { StockPurchaseInfo } from "types/stockTypes";

export default function stockReducer(
  state: StockPurchaseInfo,
  action: PurchaseAction
): StockPurchaseInfo {
  switch (action.type) {
    case ActionType.ADD_PURCHASE:
      return {
        ...state,
        additionalPurchases: [...state.additionalPurchases, action.payload],
      };
    case ActionType.REMOVE_PURCHASE:
      const removedAdditionalPurchases = state.additionalPurchases.filter(
        (stock) => stock.id !== action.payload.id
      );
      return { ...state, additionalPurchases: removedAdditionalPurchases };
    case ActionType.UPDATE_PURCHASE:
      const updatedAdditionalPurchases = state.additionalPurchases.map(
        (stock) =>
          stock.id === action.payload.id ? { ...action.payload } : stock
      );
      return { ...state, additionalPurchases: updatedAdditionalPurchases };
    case ActionType.UPDATE_HOLDING_STOCKS:
      return { ...state, holdingStocks: { ...action.payload } };
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
}
