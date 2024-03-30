import { StockInfo } from "types/stockTypes";

export enum ActionType {
  ADD_ROW = "ADD_ROW",
  UPDATE_ROW = "UPDATE_ROW",
  REMOVE_ROW = "REMOVE_ROW",
}

interface AddRowAction {
  type: ActionType.ADD_ROW;
  payload: StockInfo;
}

interface UpdateRowAction {
  type: ActionType.UPDATE_ROW;
  payload: StockInfo;
}

interface RemoveRowAction {
  type: ActionType.REMOVE_ROW;
  payload: { id: string };
}

export type StockAction = AddRowAction | UpdateRowAction | RemoveRowAction;
