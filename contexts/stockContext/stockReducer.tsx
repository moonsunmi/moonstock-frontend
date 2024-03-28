type NumberInput = "" | number;

type StockInfoType = {
  id: string;
  label: string;
  price: NumberInput;
  quantity: NumberInput;
};

enum ActionType {
  ADD_ROW = "ADD_ROW",
  UPDATE_ROW = "UPDATE_ROW",
  REMOVE_ROW = "REMOVE_ROW",
}

interface AddRowAction {
  type: ActionType;
  payload: StockInfoType;
}

interface UpdateRowAction {
  type: ActionType;
  payload: StockInfoType;
}

interface RemoveRowAction {
  type: ActionType;
  payload: { id: string };
}

type StockAction = AddRowAction | UpdateRowAction | RemoveRowAction;

function stockReducer(
  state: StockInfoType[],
  action: StockAction
): StockInfoType[] {
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

export type { StockInfoType, StockAction };
export { stockReducer, ActionType };
