import { Box, IconButton, Typography, Grid } from "@mui/material";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import ZoomInMapOutlinedIcon from "@mui/icons-material/ZoomInMapOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import NotificationView from "features/instructor-pages/notification-page/components/NotificationView";
import NotificationTab from "features/instructor-pages/notification-page/components/NotificationTab";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectNotificationList, selectSelectedNotification } from "features/common/redux/selector";
import { setNotifications, setSelectedNotification } from "features/common/redux/slices";
import { updateInstructorNotifications } from "features/common/redux/thunks";

const NotificationList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [tabValue, setTabValue] = useState(0);

    // Redux state
    const notificationList = useSelector(selectNotificationList);
    const selectedNotification = useSelector(selectSelectedNotification);

    // Fetch notifications from the API when the component mounts
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch("/api/notifications");
                const data = await response.json();

                if (data) {
                    dispatch(setNotifications(data));
                    localStorage.setItem("notifications", JSON.stringify(data)); // Sync with localStorage
                }
            } catch (error) {
                console.error("Error fetching notifications:", error);
                // If API fails, use stored notifications
                const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
                dispatch(setNotifications(storedNotifications));
            }
        };

        fetchNotifications();
    }, [dispatch]);

    // Handles tab change
    const handleTabChange = (e, value) => {
        setTabValue(value);
    };

    const handleBack = () => {
        navigate(-1);
    };

    // Marks a notification as read and updates Redux + localStorage + API
    const handleNotificationChange = async (notification) => {
        if (notification.status === "unread") {
            const updatedNotification = { ...notification, status: "read" };
            try {
                // Update on the server
                // await fetch(`/api/institutes/staff/notification/status/${notification.uuid}`, {
                //     method: "PUT",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify(updatedNotification),
                // });

                dispatch(updateInstructorNotifications({}))

                // Update Redux state and localStorage
                const updatedNotifications = notificationList.map((n) =>
                    n.id === notification.id ? updatedNotification : n
                );
                dispatch(setNotifications(updatedNotifications));
                localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
            } catch (error) {
                console.error("Failed to update notification:", error);
            }
        }
        dispatch(setSelectedNotification(notification));
    };

    return (
        <Box sx={{ padding: "50px 39px 20px 40px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <IconButton
                    onClick={handleBack}
                    variant="text"
                    sx={{ display: "flex", gap: "20px", cursor: "pointer", ":hover": { background: "none" } }}
                >
                    <KeyboardBackspaceSharpIcon sx={{ width: "26px", height: "26px", color: "#000000" }} />
                    <Typography sx={{ color: "#000000", fontSize: "15px", fontWeight: 700, lineHeight: "24px" }}>
                        Back
                    </Typography>
                </IconButton>
                <Box sx={{ display: "none", gap: "20px", cursor: "pointer" }}>
                    <IconButton sx={{ width: "16px", height: "18.5px" }}>
                        <ZoomInMapOutlinedIcon sx={{ color: "#000000" }} />
                    </IconButton>
                    <IconButton sx={{ width: "11px", height: "11px" }}>
                        <CloseOutlinedIcon sx={{ color: "#000000" }} />
                    </IconButton>
                </Box>
            </Box>

            <Grid container spacing={4} sx={{ height: "90vh", pt: "11px" }}>
                <Grid item xs={3}>
                    <NotificationTab
                        tabValue={tabValue}
                        handleTabChange={handleTabChange}
                        notifications={notificationList}
                        handleNotificationChange={handleNotificationChange}
                    />
                </Grid>
                <Grid item xs={8.6}>
                    <NotificationView selectedNotification={selectedNotification} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default NotificationList;
