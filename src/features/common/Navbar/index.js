import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
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
  Menu,
  Grid,
  Avatar,
  Button,
  Typography
} from "@mui/material";
import logo from "assets/images/logo.png";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Menu as MenuIcon } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Ballot, Diversity1, Home, Person } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import StudentNavLinks from "./StudentNavLinks";
import InstructorNavLinks from "./InstructorNavLinks";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { checkUser, getStudentDetails } from "store/atoms/authorized-atom";
import { getImageUrl } from "utils/common/imageUtlils";
import StudentNotification from "../Components/StudentNotification";
import { useDispatch, useSelector } from "react-redux";

import { selectStudentNotifications } from "../redux/studentSelector";
import getAllStudentNotifications from "../redux/studentThunks";
import { setStudentSelectedNotification } from "../redux/studentSlices";
import { Student_Details } from "lib/constants";


export default function NavBar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNotificationOpen = Boolean(anchorE2)
  const notification_id = isNotificationOpen ? "notification-popover" : undefined
  const navigate = useNavigate();
  const [student, setStudent] = React.useState(checkUser(Student_Details).userDetails);
  const notifications = useSelector(selectStudentNotifications)

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

  const handleNotification = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove('student');
    Cookies.remove('instructor');
    navigate('/student/login');
    handleMenuClose();
  };

  const handleProfile = () => {
    navigate('/student/profile');
    handleMenuClose();
  };

  const handleNotificationChange = (notification) => {
    dispatch(setStudentSelectedNotification(notification));
    navigate("/student/notifications");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      sx={{
        "& .MuiPaper-root": {
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
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 5,
          boxShadow: "none",
          backgroundColor: theme.palette.primary.main,
          color: "whitesmoke",
        },
      }}
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
    if (auth.role === "instructor") {
      return <InstructorNavLinks />;
    }
    return <StudentNavLinks />;
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

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
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <img src={logo} alt="logo" height={10} />
              </Box>
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

            {getRouteLinks()}

            <Grid item md={4} sx={{ justifyContent: "end", display: "flex" }}>
              {" "}
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  sx={{ color: "white" }}
                  onClick={handleNotification}
                  aria-controls={notification_id}
                >
                  <Badge
                    badgeContent={notifications?.filter((i) => i.status === "unread").length}
                    color="error"
                  >
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
                  <Avatar src={getImageUrl(student?.image)} />
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
                        {student?.full_name}
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
                          (you) ID: {student?.id}
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
      <StudentNotification
        handleNotificationChange={handleNotificationChange}
        notifications={notifications}
        id={notification_id}
        anchorE2={anchorE2}
        isOpen={isNotificationOpen}
        setClose={() => setAnchorE2(null)}
      />
    </Box>
  );
}
