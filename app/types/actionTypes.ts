import { Purchase } from "@/app/types/stockTypes";

export enum ActionType {
  ADD_ADDITIONAL = "addAdditional",
  UPDATE_ADDITIONAL = "updateAdditional",
  REMOVE_ADDITIONAL = "removeAdditional",
  UPDATE_HOLDING = "updateHolding",
}

interface AddAdditional {
  type: ActionType.ADD_ADDITIONAL;
  payload: Purchase;
}

interface UpdateAdditional {
  type: ActionType.UPDATE_ADDITIONAL;
  payload: Purchase;
}

interface RemoveAdditional {
  type: ActionType.REMOVE_ADDITIONAL;
  payload: { id: string };
}

interface UpdateHolding {
  type: ActionType.UPDATE_HOLDING;
  payload: Purchase;
}

export type PurchaseAction =
  | AddAdditional
  | UpdateAdditional
  | RemoveAdditional
  | UpdateHolding;
