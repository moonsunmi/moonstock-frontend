type StockInfoType = {
  id: string;
  title: string;
  price: "" | number;
  quantity: "" | number;
  total: "" | number;
};

enum ActionType {
  ADD_ROW = "ADD_ROW",
  UPDATE_ROW = "UPDATE_ROW",
}

interface AddRowAction {
  type: ActionType;
  payload: StockInfoType;
}

interface UpdateRowAction {
  type: ActionType;
  payload: StockInfoType;
}

type StockAction = AddRowAction | UpdateRowAction;

function stockReducer(
  state: StockInfoType[],
  action: StockAction
): StockInfoType[] {
  switch (action.type) {
    case "ADD_ROW":
      return state;
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
