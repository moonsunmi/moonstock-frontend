import { TextField, TextFieldProps } from "@mui/material";
import React, { memo } from "react";

type Props = {
  scroll?: boolean;
} & TextFieldProps;

const NumberInput = memo(({ scroll = false, ...rest }: Props) => {
  return (
    <>
      <TextField
        size="small"
        sx={{ mt: 2 }}
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

export default NumberInput;
