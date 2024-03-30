import { StockInfo } from "types/stockTypes";

export enum ActionType {
  ADD_ROW = "ADD_ROW",
  UPDATE_ROW = "UPDATE_ROW",
  REMOVE_ROW = "REMOVE_ROW",
}

interface AddRowAction {
  type: ActionType;
  payload: StockInfo;
}

interface UpdateRowAction {
  type: ActionType;
  payload: StockInfo;
}

interface RemoveRowAction {
  type: ActionType;
  payload: { id: string };
}

export type StockAction = AddRowAction | UpdateRowAction | RemoveRowAction;
