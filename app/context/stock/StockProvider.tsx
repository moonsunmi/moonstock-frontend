// "use client";
// import { ReactNode, useReducer } from "react";
// import { StockContext } from "./StockContext";
// import { initialPurchase } from "@/app/context/stock/initialPurchases";
// import stockReducer from "@/app/context/stock/stockReducer";

// export default function StockProvider({ children }: { children: ReactNode }) {
//   const [state, dispatch] = useReducer(stockReducer, initialPurchase);

//   return (
//     <StockContext.Provider value={{ state, dispatch }}>
//       {children}
//     </StockContext.Provider>
//   );
// }
// z
