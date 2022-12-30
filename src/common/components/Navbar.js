import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useUserAuth } from "../../features/user/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import UserProfile from "../../features/user/UserProfile";

const Navbar = ({ toggleThemeMode }) => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const settings = ["Profile", "Log out"];
  const theme = useTheme();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
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
            navigate("/");
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
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>

        {localStorage.setItem("vs-mui-theme-mode", theme.palette.mode)}

        {user === null ? (
          <Button color="inherit" href="/user/signin">
            Login
          </Button>
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
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
