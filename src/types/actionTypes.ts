import { IPurchase } from "@/types/stockTypes";

export enum ActionType {
  ADD = "add",
  UPDATE = "update",
  REMOVE = "remove",
}

interface AddPurchase {
  type: ActionType.ADD;
  payload: IPurchase;
}

interface UpdatePurchase {
  type: ActionType.UPDATE;
  payload: IPurchase;
}

interface RemovePurchase {
  type: ActionType.REMOVE;
  payload: { id: string };
}

export type PurchaseAction = AddPurchase | UpdatePurchase | RemovePurchase;
