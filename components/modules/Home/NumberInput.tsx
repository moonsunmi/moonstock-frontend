import { TextField, TextFieldProps } from "@mui/material";
import React, { ChangeEvent, HTMLAttributes } from "react";

type Props = {} & TextFieldProps;

const NumberInput = ({ label, value, onChange, ...rest }: Props) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        label={label}
        size="small"
        type="number"
        value={value}
        onChange={onChange}
        InputProps={{
          sx: {
            "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button":
              {
                WebkitAppearance: "none",
                margin: 0,
              },
          },
        }}
        {...rest}
      />
    </>
  );
};

export default NumberInput;
