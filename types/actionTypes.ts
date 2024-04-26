import { Purchase } from "@/types/stockTypes";

export enum ActionType {
  ADD = "add",
  UPDATE = "update",
  REMOVE = "remove",
}

interface AddPurchase {
  type: ActionType.ADD;
  payload: Purchase;
}

interface UpdatePurchase {
  type: ActionType.UPDATE;
  payload: Purchase;
}

interface RemovePurchase {
  type: ActionType.REMOVE;
  payload: { id: string };
}

export type PurchaseAction = AddPurchase | UpdatePurchase | RemovePurchase;
