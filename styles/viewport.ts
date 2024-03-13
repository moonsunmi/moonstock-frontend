import { useMediaQuery } from "react-responsive";

export enum ViewportBoundary {
  mobile = 421,
}

export const Device = {
  mobile: `(max-width : ${ViewportBoundary.mobile - 1}px)`,
  desktop: `(min-width : ${ViewportBoundary.mobile}px)`,
};

export const isDesktopOrLaptop = () => {
  return useMediaQuery({ query: `(min-width : ${ViewportBoundary.mobile}px)` });
};

export const isMobile = () => {
  return useMediaQuery({
    query: `(max-width : ${ViewportBoundary.mobile - 1}px)`,
  });
};
