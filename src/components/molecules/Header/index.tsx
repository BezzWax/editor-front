import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FC, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { AuthDrawer } from "components";

const Header: FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [authDrawerOpen, setAuthDrawerOpen] = useState(false);

  const isAuth = false; // TODO: заменить на Redux

  const handleAuthDrawer = () => {
    setAuthDrawerOpen(!authDrawerOpen);
  };

  const user = { name: "Eugene", avatarUrl: "" };

  const navItems = isAuth
    ? [{ label: "Статьи" }]
    : [{ label: "Статьи" }, { label: "Войти", action: handleAuthDrawer }];

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    console.log(authDrawerOpen);
  }, [authDrawerOpen]);

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">📝 EditorApp</Typography>

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
              >
                <Box
                  width={200}
                  role="presentation"
                  onClick={handleDrawerToggle}
                >
                  <List>
                    {navItems.map((item) => (
                      <ListItem component="div" key={item.label}>
                        <ListItemText
                          primary={item.label}
                          onClick={item.action}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box display="flex" alignItems="center" gap={2}>
              {navItems.map((item) => (
                <Button key={item.label} color="inherit" onClick={item.action}>
                  {item.label}
                </Button>
              ))}
              {isAuth && <Avatar>{user.name[0]}</Avatar>}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <AuthDrawer open={authDrawerOpen} onClose={handleAuthDrawer} />
    </>
  );
};

export default Header;
