import NextLink from "next/link";
import { LinkProps, Link as MuiLink } from "@mui/material";

export default function Link(props: LinkProps<"a">) {
  return <MuiLink component={NextLink} {...props} passHref />;
}
