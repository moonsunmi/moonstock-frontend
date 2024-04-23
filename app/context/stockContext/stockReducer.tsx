import { ActionType, PurchaseAction } from "@/app/types/actionTypes";
import { StockPurchaseInfo } from "@/app/types/stockTypes";

export default function stockReducer(
  state: StockPurchaseInfo,
  action: PurchaseAction
): StockPurchaseInfo {
  switch (action.type) {
    case ActionType.ADD_ADDITIONAL:
      return {
        ...state,
        additions: [...state.additions, action.payload],
      };
    case ActionType.REMOVE_ADDITIONAL:
      const removedAdditionals = state.additions.filter(
        (stock) => stock.id !== action.payload.id
      );
      return { ...state, additions: removedAdditionals };
    case ActionType.UPDATE_ADDITIONAL:
      const updatedAdditionals = state.additions.map((stock) =>
        stock.id === action.payload.id ? { ...stock, ...action.payload } : stock
      );
      return { ...state, additions: updatedAdditionals };
    case ActionType.UPDATE_HOLDING: // TODO. 여기도 부분 수정 가능하게 바꾸기
      return { ...state, holding: { ...action.payload } };
    default:
      throw new Error("Unhandled action type");
  }
}
