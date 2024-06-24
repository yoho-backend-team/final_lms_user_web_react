import * as React from "react";
import AppBar from "@mui/material/AppBar";
// import List from "@mui/material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Drawer,
  //   Divider,
  Menu,
  //   List,
  //   ListItem,
  //   ListItemButton,
  //   ListItemText,
  Grid,
  Avatar,
  //   List,
} from "@mui/material";
import logo from "assets/images/logo.png";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Menu as MenuIcon } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button, Typography } from "@mui/material";
// import ListItemIcon from "@mui/material/ListItemIcon";
import { Ballot, Diversity1, Home, Person } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import StudentNavLinks from "./StudentNavLinks";
import InstructorNavLinks from "./InstructorNavLinks";
// import { colorModeContext, tokens } from "../../assets/Styles/theme";

export default function NavBar() {
  const theme = useTheme();

  //   const colors = tokens(theme.palette.mode);
  //   const colorMode = React.useContext(colorModeContext);

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      sx={{
        "& .MuiPaper-root.MuiPopover-paper.MuiMenu-paper": {
          borderRadius: 2,
          boxShadow: "none",
          backgroundColor: "#00215E",
          color: "whitesmoke",
        },
      }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      sx={{
        "& .MuiPaper-root.MuiPopover-paper.MuiMenu-paper": {
          borderRadius: 5,
          boxShadow: "none",
          backgroundColor: theme.palette.primary.main,
          color: "whitesmoke",
        },
      }}
      // sx={{
      //   "&.MuiPopover-paper .MuiPaper-root .MuiMenu-paper": {
      //     backgroundColor: "yellow !important",
      //   },
      // }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const auth = {
    isLoggedIn: true,
    role: "instructor",
  };

  const getRouteLinks = () => {
    if(auth.role==="instructor"){
      return <InstructorNavLinks />
    }
    return <StudentNavLinks />
  }

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box>
      <Box sx={{ mt: 1, p: 2 }}>
        <img src={logo} height={100} />
      </Box>
      <Box role="presentation" onClick={toggleDrawer(false)} p={1}>
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Ballot />
              </ListItemIcon>

              <ListItemText primary="Products" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Diversity1 />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        sx={{
          height: 60,
          backgroundColor: theme.palette.common.white,
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <Grid
            container
            sx={{
              display: { xs: "flex", md: "none", alignItems: "center" },
            }}
          >
            <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon sx={{ color: theme.palette.primary.main }} />
              </IconButton>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <img src={logo} alt="logo" height={10} />
              </Box>
            </Grid>
            <Grid xs={8} sx={{ display: "flex", justifyContent: "end" }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon sx={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            sx={{ display: { sm: "flex", xs: "none" } }}
          >
            <Grid item md={4}>
              {" "}
              <Box
                variant="h5"
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <img src={logo} alt="logo" height={70} />
              </Box>
            </Grid>
            {/* <Grid
              item
              md={4}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  ml: 5,
                  display: { xs: "none", sm: "flex" },
                }}
              >
                <Typography
                  component={Link}
                  to="/home"
                  sx={{ textDecoration: "none" }}
                >
                  Home
                </Typography>
                <Typography
                  component={Link}
                  to="/products"
                  sx={{ textDecoration: "none" }}
                >
                  Products
                </Typography>
                <Typography
                  component={Link}
                  to="/about"
                  sx={{ textDecoration: "none" }}
                >
                  About
                </Typography>
                <Typography
                  component={Link}
                  to="/contact"
                  sx={{ textDecoration: "none" }}
                >
                  Contact
                </Typography>
              </Box>
            </Grid> */}
            <StudentNavLinks />
            <Grid item md={4} sx={{ justifyContent: "end", display: "flex" }}>
              {" "}
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton size="sm" sx={{ color: "white", P: 0 }}>
                  <Badge badgeContent={17} color="error">
                    <NotificationsOutlinedIcon
                      sx={{ color: theme.palette.dark.main }}
                    />
                  </Badge>
                </IconButton>
                <Button
                  sx={{
                    background: "none",
                    boxShadow: "none",
                    color: "white",
                    textTransform: "none",
                    gap: 1,
                  }}
                  size="medium"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  disableRipple
                >
                  <Avatar src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" />
                  <Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 17,
                          fontFamily: "poppins",
                          fontWeight: "600",
                          display: {
                            xs: "none",
                            sm: "none",
                            md: "none",
                            lg: "block",
                          },
                        }}
                      >
                        Jimmy Tommy
                      </Typography>
                    </Box>
                    <Box>
                      {" "}
                      <Box>
                        <Typography
                          sx={{
                            display: {
                              xs: "none",
                              sm: "none",
                              md: "none",
                              lg: "block",
                            },
                          }}
                        >
                          {"(you)"} ID: Stu23#
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    </Box>
  );
}
