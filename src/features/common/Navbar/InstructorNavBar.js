import React, { useEffect, useState } from "react";
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
  Typography,
} from "@mui/material";
import {
  NotificationsOutlined as NotificationsOutlinedIcon,
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  Ballot,
  Diversity1,
  Home,
  Person,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import logo from "assets/images/logo.png";
import InstructorNavLinks from "./InstructorNavLinks";
import { checkUser, getInstituteDetails, getInstructorDetails } from "store/atoms/authorized-atom";
import { useTabResponsive } from "utils/tabResponsive";
import { getImageUrl } from "utils/common/imageUtlils";
import NotificationListView from "../Components/NotificationListModel";
import { selectNotificationList,selectNotifcationsLoading,selectSelectedNotification} from "features/common/redux/selector"
import { useDispatch, useSelector } from "react-redux";
import updateInstructorNotifications, { getInstructorNotifications } from "../redux/thunks";
import { setSelectedNotification } from "../redux/slices";
import { useNavigate } from "react-router-dom";
import { useSocket } from "context/instructorSocket";
import { Instructor_Details } from "lib/constants";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";
import { useInstructorLogout } from "features/Auth/services";

export default function InstructorNavBar() {
  const theme = useTheme();
  const { tabView } = useTabResponsive();
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorE2, setAnchorE2] = React.useState(null)
  const isMenuOpen = Boolean(anchorEl);
  const isNotificationOpen = Boolean(anchorE2)
  const notification_id = isNotificationOpen ? "notification-popover" : undefined
  const [instructor, setInstructor] = React.useState(checkUser(Instructor_Details));
  const { showSpinner, hideSpinner } = useSpinner()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const Notifications = useSelector(selectNotificationList)
  const selectedNotification = useSelector(selectSelectedNotification)
  const socket = useSocket()
  const instructorLogout = useInstructorLogout()
  const institute_details = getInstituteDetails()
  console.log(institute_details,"institute")
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  console.log(instructor,"instructor")
  useEffect(() => {
    const user = getInstructorDetails();
    setInstructor(user)
  }, []);

  useEffect(() => {
    dispatch(getInstructorNotifications())
  },[])

  useEffect(() => {
   
  },[])

  const handleSelectNotification = (data) => {
    dispatch(setSelectedNotification(data))
    setAnchorE2(null)
    navigate("/instructor/notifications")
    // window.location.href = "/instructor/notifications"
  }

  const handleLogout = async () => {
     try {
      showSpinner()
      await instructorLogout()
      toast.success("Logout sucessfully")
     } catch (error) {
       toast.error(error?.message)
     }finally{
      hideSpinner()
      navigate("/instructor/login")
     }
  }
   
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      sx={{
        top: "56px",
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
      <MenuItem onClick={() => {navigate("/instructor/profile");setAnchorEl(null)}} >Profile</MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      <MenuItem onClick={handleLogout} >Log Out</MenuItem>
    </Menu>
  );

  const handleNotification = (event) => {
        setAnchorE2(event.currentTarget)
  } 

  const handleClose = () => {
    setAnchorEl(null);
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
            alignItems="center"
            sx={{ flexWrap: tabView ? "nowrap" : "wrap" }}
          >
            <Grid
              item
              xs={4}
              md={4}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box
                sx={{
                  display: { xs: "flex", md: "flex" },
                  justifyContent: "start",
                }}
              >
                <img style={{ cursor: "pointer"}} onClick={() => navigate("/instructor/home")} src={getImageUrl(institute_details?.image)} alt={institute_details?.institute_name} height={40} />
                
              </Box>
            </Grid>
            <InstructorNavLinks />
            <Grid
              item
              xs={8}
              md={4}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <IconButton 
              size="large" 
              sx={{ color: "white" }} 
              onClick={handleNotification} 
              aria-controls={notification_id}
              >
                <Badge badgeContent={Notifications?.filter((i)=>i.status === "unread").length} color="error">
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
                  gap: tabView ? 0 : 1,
                  padding: tabView && "0px",
                }}
                size="medium"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                disableRipple
              >
                <Avatar src={getImageUrl(instructor?.image)} />
                <Box>
                  <Typography
                    sx={{
                      fontSize: 17,
                      fontFamily: "Poppins",
                      color : "black",
                      fontWeight: 600,
                      display: { xs: "none", lg: "block" },
                    }}
                  >
                    {instructor?.full_name}
                  </Typography>
                  <Typography
                    sx={{
                      display: { xs: "none", lg: "block" },color: "black",textOverflow: "ellipsis",
                    }}
                  >
                    ID: {instructor?.userDetail?.staffId}
                  </Typography>
                </Box>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <NotificationListView handleSelectNotification={handleSelectNotification} id={notification_id} notifications={Notifications} anchorE2={anchorE2} isOpen={isNotificationOpen} setClose={()=>setAnchorE2(null)} />
    </Box>
  );
}
