import { Box, IconButton, Typography, Grid, Modal } from "@mui/material";
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import NotificationView from "features/student-pages/notification-page/components/NotificationView";
import NotificationTab from "features/student-pages/notification-page/components/NotificationTab";
import { useState } from "react";  
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectStudentNotifications, selectStudentSelectedNotification } from "features/common/redux/studentSelector";
import { setStudentSelectedNotification } from "features/common/redux/studentSlices";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";
import { deleteNotification, updateNotificationStatus } from "features/student-pages/notification-page/services";
import getAllStudentNotifications from "features/common/redux/studentThunks";
import BackgroundImage from 'assets/images/background/student.png';

const StudentNotificationList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [tabValue, setTabValue] = useState(0);
    const [isTabOpen, setIsTabOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const selectedNotification = useSelector(selectStudentSelectedNotification);
    const notificationList = useSelector(selectStudentNotifications);

    const { showSpinner , hideSpinner} = useSpinner();

    // Handles tab change
    const handleTabChange = (event, value) => setTabValue(value);

    // Handles back navigation
    const handleBack = () => navigate(-1);

    // Handles closing the notification tab
    const closeTab = () => setIsTabOpen(true);

    // Handles notification click and updates the status if unread
    const handleNotificationChange = async (notification) => {
        dispatch(setStudentSelectedNotification(notification));
        setModalOpen(false);
        closeTab();

        if (notification?.status === "unread") {
            try {
                showSpinner();
                const response = await updateNotificationStatus({ uuid: notification.uuid });
                dispatch(setStudentSelectedNotification(response));
                dispatch(getAllStudentNotifications());
            } catch (error) {
                // toast.error(`Failed to update notification: ${error.message}`);
                console.log("notification error:",error)
            } finally {
                hideSpinner();
            }
        }
    };

    // Handles deleting a notification
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this notification?");
        if (!confirmDelete) return;

        try {
            showSpinner();
            await deleteNotification(id);
            toast.success("Notification deleted successfully!");
            dispatch(getAllStudentNotifications());
        } catch (error) {
            // toast.error(`Failed to delete notification: ${error.message}`);
            console.log("notification delete:",error)
        } finally {
            hideSpinner();
        }
    };

    return (
        <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "50vh",
        p: 3,
      }}
    >
        <Box sx={{ padding: "70px 39px 20px 40px", zIndex: 1000 }}>
            <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                <IconButton onClick={handleBack} sx={{ display: 'flex', gap: "20px", ":hover": { background: "skyblue" } }}>
                    <KeyboardBackspaceSharpIcon sx={{ width: "26px", height: "26px", color: "#000000" }} />
                    <Typography sx={{ color: '#000000', fontSize: "15px", fontWeight: 700 }}></Typography>
                </IconButton>
            </Box>
            <Grid container spacing={2} sx={{ height: "90vh", pt: "11px" }}>
                {isTabOpen && (
                    <Grid item xs={12} md={3}>
                        <NotificationTab
                            tabValue={tabValue}
                            handleTabChange={handleTabChange}
                            notifications={notificationList}
                            handleNotificationChange={handleNotificationChange}
                            selectedNotification={selectedNotification}
                             closeTab={closeTab}
                            sx={{ position: 'fixed', bottom: 0, width: '100%', background: 'white', boxShadow: 3, zIndex: 1000 }}
                        />
                    </Grid>
                )}
                <Grid item xs={12} md={isTabOpen ? 9 : 12}>
                    <NotificationView
                        handleBack={handleBack}
                        selectedNotification={selectedNotification}
                        handleDelete={handleDelete}
                    />
                </Grid>
            </Grid>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <NotificationView
                    handleBack={() => setModalOpen(false)}
                    selectedNotification={selectedNotification}
                    handleDelete={handleDelete}
                />
            </Modal>
        </Box>
        </Box>
    );
};

export default StudentNotificationList;
