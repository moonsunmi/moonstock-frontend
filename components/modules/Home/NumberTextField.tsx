import { TextField, TextFieldProps } from "@mui/material";
import { memo } from "react";
import { formatNumberToKorean } from "utils/formatNumber";

type Props = {
  scroll?: boolean;
  value: string;
} & TextFieldProps;

const formatNumberToKoreanOrEmpty = (price: string | number) => {
  return price === "" ? "" : formatNumberToKorean(Number(price));
};

const NumberTextField = memo(({ scroll = false, value, ...rest }: Props) => {
  return (
    <>
      <TextField
        size="small"
        value={formatNumberToKoreanOrEmpty(value)}
        InputProps={{
          sx: {
            "& input": {
              textAlign: "right",
            },
            "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button":
              scroll
                ? {}
                : {
                    WebkitAppearance: "none",
                    margin: 0,
                  },
          },
        }}
        {...rest}
      />
    </>
  );
});
NumberTextField.displayName = "NumberTextField";

export default NumberTextField;
