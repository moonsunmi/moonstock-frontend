import {
  AppBar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

const navItems = ["물타기 계산기"];

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
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemText
                primary={item}
                sx={{ whiteSpace: "nowrap", overflow: "hidden" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Toolbar>
  </AppBar>
);

export default NavBar;
