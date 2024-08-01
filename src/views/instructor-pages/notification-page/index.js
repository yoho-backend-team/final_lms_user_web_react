import { Box, IconButton, Typography, Grid } from "@mui/material"
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import ZoomInMapOutlinedIcon from '@mui/icons-material/ZoomInMapOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import NotificationView from "features/instructor-pages/notification-page/components/NotificationView";
import NotificationTab from "features/instructor-pages/notification-page/components/NotificationTab";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectNotificationList,selectSelectedNotification } from "features/common/redux/selector";
import { setNotifications,setSelectedNotification } from "features/common/redux/slices";

const NotificationList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [tabValue,setTabValue] = useState(0)
    const selectedNotification = useSelector(selectSelectedNotification)
    const notificationList = useSelector(selectNotificationList)

    const handleTabChange = (e,value) => {
      setTabValue(value)
    }
    console.log(notificationList,selectedNotification)
    const handleBack = () => {
      navigate(-1)
    }

    const handleNotificationChange = (notification) => {
          dispatch(setSelectedNotification(notification))
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
                    <IconButton sx={{ width: "11px", height: "11px"}} >
                      <CloseOutlinedIcon sx={{ color: "#000000"}} />
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