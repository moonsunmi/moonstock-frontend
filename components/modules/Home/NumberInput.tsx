import { TextField, TextFieldProps } from "@mui/material";
import React, { memo } from "react";

type Props = {
  scroll?: boolean;
} & TextFieldProps;

const NumberInput = memo(({ scroll = false, ...rest }: Props) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        size="small"
        sx={{ mt: 1.5 }}
        InputProps={{
          sx: {
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
