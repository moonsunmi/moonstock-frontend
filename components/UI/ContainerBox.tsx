import { Stack, StackProps, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { ReactNode } from "react";

type ContainerBoxProps = {
  title?: string;
  children: ReactNode;
} & StackProps;

function ContainerBox({ title, children, ...props }: ContainerBoxProps) {
  return (
    // TODO. FormGroup도 합쳐서 formContainer라고 해야 할가?
    <Stack
      spacing={1}
      sx={{
        marginTop: 1,
        padding: 1,
        bgcolor: blue[50],
        width: "auto",
        borderRadius: 2,
      }}
      {...props}
    >
      <Typography variant="subtitle1">{title}</Typography>
      {children}
    </Stack>
  );
}

export default ContainerBox;
