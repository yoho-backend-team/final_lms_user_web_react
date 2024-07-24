import { Box, IconButton, Typography, Grid } from "@mui/material";
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import ZoomInMapOutlinedIcon from '@mui/icons-material/ZoomInMapOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import NotificationView from "features/student-pages/notification-page/components/NotificationView";
import NotificationTab from "features/student-pages/notification-page/components/NotificationTab";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectStudentNotifications, selectStudentSelectedNotification } from "features/common/redux/studentSelector";
import { setStudentSelectedNotification } from "features/common/redux/studentSlices";

const StudentNotificationList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [tabValue, setTabValue] = useState(0);
    const selectedNotification = useSelector(selectStudentSelectedNotification);
    const notificationList = useSelector(selectStudentNotifications);

    const handleTabChange = (event, value) => {
        setTabValue(value);
    };

    const handleBack = () => {
        navigate(-1); // Adjust navigation as needed
    };

    const handleNotificationChange = (notification) => {
        dispatch(setStudentSelectedNotification(notification));
    };

    return (
        <Box sx={{ padding: "50px 39px 20px 40px" }}>
            <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                <IconButton onClick={handleBack} variant="text" sx={{ display: 'flex', gap: "20px", cursor: "pointer", ":hover": { background: "none" } }}>
                    <KeyboardBackspaceSharpIcon sx={{ width: "26px", height: "26px", color: "#000000" }} />
                    <Typography sx={{ color: '#000000', fontSize: "15px", fontWeight: 7000, lineHeight: "24px" }}> Back </Typography>
                </IconButton>
                <Box sx={{ display: "flex", gap: "20px", cursor: "pointer" }}>
                    <IconButton sx={{ width: "16px", height: "18.5px" }}>
                        <ZoomInMapOutlinedIcon sx={{ color: "#000000" }} />
                    </IconButton>
                    <IconButton sx={{ width: "11px", height: "11px" }}>
                        <CloseOutlinedIcon sx={{ color: "#000000" }} />
                    </IconButton>
                </Box>
            </Box>
            <Grid container spacing={2} sx={{ height: "90vh", pt: "11px" }}>
                <Grid item xs={12} md={3}>
                    <NotificationTab
                        tabValue={tabValue}
                        handleTabChange={handleTabChange}
                        notifications={notificationList}
                        handleNotificationChange={handleNotificationChange}
                    />
                </Grid>
                <Grid item xs={12} md={9}>
                    <NotificationView
                        handleBack={handleBack}
                        selectedNotification={selectedNotification}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default StudentNotificationList;
