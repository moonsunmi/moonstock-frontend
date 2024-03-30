import { Purchase } from "types/stockTypes";

export enum ActionType {
  ADD_ROW = "ADD_ROW",
  UPDATE_ROW = "UPDATE_ROW",
  REMOVE_ROW = "REMOVE_ROW",
}

interface AddRowAction {
  type: ActionType.ADD_ROW;
  payload: Purchase;
}

interface UpdateRowAction {
  type: ActionType.UPDATE_ROW;
  payload: Purchase;
}

interface RemoveRowAction {
  type: ActionType.REMOVE_ROW;
  payload: { id: string };
}

export type PurchaseAction = AddRowAction | UpdateRowAction | RemoveRowAction;
