import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  Divider,
  ListItemText,
  ListItemIcon,
  Stack,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import UserProfile from "../../features/user/UserProfile";
import { useUserAuth } from "../../contexts/UserAuthContext";
import { setMessage } from "../../features/message/messageSlice";
import { HOME, USER_SIGN_IN } from "../../constants/routes";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = ({ toggleThemeMode }) => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logOut();
      dispatch(setMessage({ text: "You are now logged out" }));
      navigate(HOME);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event) => {
    if (event.target.innerText) {
      handleLogout();
    }
    setAnchorElUser(null);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" color="inherit" sx={{ marginRight: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => {
              navigate(HOME);
            }}
          >
            Vistex Community
          </Typography>

          <IconButton
            color="inherit"
            sx={{ marginRight: 2 }}
            onClick={toggleThemeMode}
          >
            {theme.palette.mode === "dark" ? (
              <Tooltip title="Light Theme" arrow>
                <LightModeOutlinedIcon />
              </Tooltip>
            ) : (
              <Tooltip title="Dark Theme" arrow>
                <DarkModeOutlinedIcon />
              </Tooltip>
            )}
          </IconButton>

          {localStorage.setItem("vs-mui-theme-mode", theme.palette.mode)}

          {!user ? (
            <>
              {location.pathname !== USER_SIGN_IN ? (
                <Button color="inherit" href={USER_SIGN_IN}>
                  Login
                </Button>
              ) : null}
            </>
          ) : (
            <IconButton color="inherit" onClick={handleOpenUserMenu}>
              <UserProfile
                width=""
                height=""
                name={user.displayName}
              ></UserProfile>
            </IconButton>
          )}

          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem>
              <Stack sx={{ margin: 1 }}>
                <Typography textAlign="center" variant="subtitle2">
                  {user && user.displayName ? user.displayName : null}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {user && user.email}
                </Typography>
              </Stack>
            </MenuItem>
            <Divider></Divider>
            <MenuItem onClick={handleCloseUserMenu}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Log out</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
