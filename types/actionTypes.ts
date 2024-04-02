import { Purchase } from "types/stockTypes";

export enum ActionType {
  ADD_PURCHASE = "addPurchase",
  UPDATE_PURCHASE = "updatePurchase",
  REMOVE_PURCHASE = "removePurchase",
  UPDATE_HOLDING_STOCKS = "updateHoldingStocks",
}

interface AddPurchaseAction {
  type: ActionType.ADD_PURCHASE;
  payload: Purchase;
}

interface UpdatePurchaseAction {
  type: ActionType.UPDATE_PURCHASE;
  payload: Purchase;
}

interface RemovePurchaseAction {
  type: ActionType.REMOVE_PURCHASE;
  payload: { id: string };
}

interface UpdateHoldingStocksAction {
  type: ActionType.UPDATE_HOLDING_STOCKS;
  payload: Purchase;
}

export type PurchaseAction =
  | AddPurchaseAction
  | UpdatePurchaseAction
  | RemovePurchaseAction
  | UpdateHoldingStocksAction;
