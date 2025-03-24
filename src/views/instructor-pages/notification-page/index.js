import { Box, IconButton, Typography, Grid } from "@mui/material";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import ZoomInMapOutlinedIcon from "@mui/icons-material/ZoomInMapOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import NotificationView from "features/instructor-pages/notification-page/components/NotificationView";
import NotificationTab from "features/instructor-pages/notification-page/components/NotificationTab";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectNotificationList,selectSelectedNotification } from "features/common/redux/selector";
import { setNotifications,setSelectedNotification } from "features/common/redux/slices";
import { getInstructorNotifications, updateInstructorNotifications } from "features/common/redux/thunks";

const NotificationList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [tabValue, setTabValue] = useState(0);

    // Redux state
    const notificationList = useSelector(selectNotificationList);
    const selectedNotification = useSelector(selectSelectedNotification);

    // Fetch notifications from the API when the component mounts
    const fetchNotifications = async () => {
        // try {
        //     const response = await fetch("/api/notifications");
        //     const data = await response.json();

        //     if (data) {
        //         dispatch(setNotifications(data));
        //         localStorage.setItem("notifications", JSON.stringify(data)); // Sync with localStorage
        //     }
        // } catch (error) {
        //     console.error("Error fetching notifications:", error);
        //     // If API fails, use stored notifications
        //     const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
        //     dispatch(setNotifications(storedNotifications));
        // }
        dispatch(getInstructorNotifications())
    };

    useEffect(() => {
        fetchNotifications();
    }, [dispatch]);

    // Handles tab change
    const handleTabChange = (e, value) => {
        setTabValue(value);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleNotificationChange = (notification) => {
          dispatch(updateInstructorNotifications({uuid: notification?.uuid}))
          fetchNotifications();
    }

    return(
          <>
            <Box 
            sx={{
                padding : "50px 39px 20px 40px ",
                // width: "100%"
            }}
            >
               <Box sx={{ display: 'flex', justifyContent: "space-between"}}>
                  <Box >
                     <IconButton onClick={handleBack} variant="text" sx={{ display: 'flex', gap: "20px",cursor:"pointer",":hover":{ background: "none"}}} >
                        <KeyboardBackspaceSharpIcon sx={{ width: "26px", height: "26px", color : "#000000" }} />
                        <Typography sx={{ color : '#000000', fontSize: "15px", fontWeight: 7000, lineHeight: "24px"}} > Back </Typography>
                     </IconButton>
                  </Box>
                  <Box sx={{ display: "none", gap: "20px",cursor:"pointer"}} >
                    <IconButton sx={{ width: "16px", height: "18.5px"}} >
                      <ZoomInMapOutlinedIcon sx={{ color : "#000000"}} />
                    </IconButton>
                    <IconButton sx={{ width: "11px", height: "11px" }}>
                        <CloseOutlinedIcon sx={{ color: "#000000" }} />
                    </IconButton>
                  </Box>
               </Box>
               <Grid container xs={12}  gap={"40px"} sx={{ height: "90vh",pt:"11px"}} >
                   <Grid item xs={3} >
                     <NotificationTab 
                     tabValue = {tabValue}
                     handleTabChange = {handleTabChange}
                     handleBack = {handleBack}
                     notifications = {notificationList}
                     handleNotificationChange ={handleNotificationChange}
                     />
                   </Grid>
                   <Grid item xs={8.6}>
                    <NotificationView 
                    handleBack={handleBack}
                    selectedNotification={selectedNotification}
                    />
                   </Grid>
               </Grid>
            </Box>
          </>
    )
}

export default NotificationList
