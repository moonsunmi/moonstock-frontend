import { StockContext } from "@/contexts/stockContext/StockContext";
import { initialPurchases } from "@/contexts/stockContext/initialStocks";
import stockReducer from "@/contexts/stockContext/stockReducer";
import { Paper } from "@mui/material";
import { useReducer } from "react";
import HoldingStock from "./HoldingStock";
import AdditionalStocks from "./AdditionalStocks";
import Result from "./Result";

const AverageDownInPrice = () => {
  const [state, dispatch] = useReducer(stockReducer, initialPurchases);

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        mt: 10,
      }}
      aria-label="Calculate Average Down In Price"
    >
      <StockContext.Provider value={{ state, dispatch }}>
        <HoldingStock />
        <AdditionalStocks />
        <Result />
      </StockContext.Provider>
    </Paper>
  );
};

export default AverageDownInPrice;
