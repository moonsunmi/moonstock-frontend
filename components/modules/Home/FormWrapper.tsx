import { Box } from "@mui/material";
import React, { ReactNode } from "react";

const FormWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      component="form"
      display="flex"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      {children}
    </Box>
  );
};

export default FormWrapper;
