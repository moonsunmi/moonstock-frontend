import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

type ComponentType = "PurchaseDetailContainer" | "default";

export const useResponsiveHeight = (type: ComponentType) => {
  const theme = useTheme();
  const isWide = useMediaQuery(theme.breakpoints.up("sm"));

  const heights: Record<ComponentType, "auto" | number> = {
    PurchaseDetailContainer: isWide ? 96 : 144,
    default: "auto",
  };

  return heights[type] || heights["default"];
};
