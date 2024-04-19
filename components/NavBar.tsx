import {
  AppBar,
  List,
  ListItem,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "./Link";

const navItems = [
  { name: "물타기", url: "/average-down" },
  { name: "보유종목", url: "/stock-board" },
];

const NavBar = () => (
  <AppBar position="fixed">
    <Toolbar>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
      >
        MoonStock
      </Typography>
      <List component={Stack} direction="row" gap={1}>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Link
              href={item.url}
              sx={{ display: "flex", alignItems: "center", color: "white" }}
            >
              <ListItemText
                primary={item.name}
                sx={{ whiteSpace: "nowrap", overflow: "hidden" }}
              />
            </Link>
          </ListItem>
        ))}
      </List>
    </Toolbar>
  </AppBar>
);

export default NavBar;
