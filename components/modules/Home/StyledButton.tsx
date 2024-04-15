import { Button, ButtonProps } from "@mui/material";

const StyledButton = ({ children, onClick, ...rest }: ButtonProps) => (
  <Button
    fullWidth
    variant="outlined"
    onClick={onClick}
    sx={{ wordBreak: "keep-all" }}
    {...rest}
  >
    {children}
  </Button>
);
export default StyledButton;
