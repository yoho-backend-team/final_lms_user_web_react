// import { Box, IconButton, Typography, Grid,Modal, Paper } from "@mui/material";
// import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
// import NotificationView from "features/student-pages/notification-page/components/NotificationView";
// import NotificationTab from "features/student-pages/notification-page/components/NotificationTab";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { selectStudentNotifications, selectStudentSelectedNotification } from "features/common/redux/studentSelector";
// import { setStudentSelectedNotification } from "features/common/redux/studentSlices";
// import { useSpinner } from "context/SpinnerProvider";
// import toast from "react-hot-toast";
// import { deleteNotification, updateNotificationStatus } from "features/student-pages/notification-page/services";
// import getAllStudentNotifications from "features/common/redux/studentThunks";

// const StudentNotificationList = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [tabValue, setTabValue] = useState(0);
//     const [isTabOpen, setIsTabOpen] = useState(true);
//     const selectedNotification = useSelector(selectStudentSelectedNotification);
//     const notificationList = useSelector(selectStudentNotifications);
//     const { showSpinner, hideSpinner } = useSpinner();
//     const [modalOpen, setModalOpen] = useState(false);

//     const handleTabChange = (event, value) => {
//         setTabValue(value);
//         setIsTabOpen(false);
//     };

//     const handleBack = () => {
//         navigate(-1);
//     };

//     const closeTab = () => {
//       setIsTabOpen(false);
//   };

//     const handleNotificationChange = async (notification) => {
//         dispatch(setStudentSelectedNotification(notification));
//         setModalOpen(false);
//         handleCloseModal();
//         closeTab();
//         if (notification?.status === "unread") {
//             try {
//                 showSpinner();
//                 const response = await updateNotificationStatus({ uuid: notification?.uuid });
//                 dispatch(setStudentSelectedNotification(response));
//                 dispatch(getAllStudentNotifications());
//             } catch (error) {
//                 toast.error(error?.message);
//             } finally {
//                 hideSpinner();
//             }
//         }
//     };
//     const handleCloseModal = () => {
//         setModalOpen(false);
//     };



//     const handleDelete = async (id) => {
//       const confirmDelete = window.confirm("Are you sure you want to delete this notification?");
//     if (!confirmDelete) return;

//       try {
//           showSpinner();
//           await deleteNotification(id); 
//           toast.success("Notification deleted successfully!");
//           dispatch(getAllStudentNotifications()); 
//       } catch (error) {
//           toast.error(error?.message);
//       } finally {
//           hideSpinner();
//       }
//   };


//     return (
//         <Box sx={{ padding: "70px 39px 20px 40px", zIndex: 1000 }}>
//             <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
//                 <IconButton onClick={handleBack} variant="text" sx={{ display: 'flex', gap: "20px", cursor: "pointer", ":hover": { background: "none" } }}>
//                     <KeyboardBackspaceSharpIcon sx={{ width: "26px", height: "26px", color: "#000000" }} />
//                     <Typography sx={{ color: '#000000', fontSize: "15px", fontWeight: 7000, lineHeight: "24px" }}> Back </Typography>
//                 </IconButton>
//             </Box>
//             <Grid container spacing={2} sx={{ height: "90vh", pt: "11px" }}>
//                 {isTabOpen && (
//                     <Grid item xs={12} md={3}>
//                         <NotificationTab
//                             tabValue={tabValue}
//                             handleTabChange={handleTabChange}
//                             notifications={notificationList}
//                             handleNotificationChange={handleNotificationChange}
//                             selectedNotification={selectedNotification}
//                             closeTab={closeTab}
//                         />
//                     </Grid>
//                 )}
//                 <Grid item xs={12} md={isTabOpen ? 9 : 12}>
//                     <NotificationView
//                         handleBack={handleBack}
//                         selectedNotification={selectedNotification}
//                         handleDelete={handleDelete}
//                     />
//                 </Grid>
//             </Grid>
//             <Modal
//                 open={modalOpen}
//                 onClose={handleCloseModal}
//                 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//             >
                
//                     <NotificationView
//                         handleBack={handleCloseModal}
//                         selectedNotification={selectedNotification}
//                         handleDelete={handleDelete}
//                     />
                
//             </Modal>
//         </Box>
//     );
// };

// export default StudentNotificationList;


// // import { Box, IconButton, Typography, Grid } from "@mui/material"
// // import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
// // import ZoomInMapOutlinedIcon from '@mui/icons-material/ZoomInMapOutlined';
// // import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// // import NotificationView from "features/student-pages/notification-page/components/NotificationView";
// // import NotificationTab from "features/student-pages/notification-page/components/NotificationTab";
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useSelector, useDispatch } from "react-redux";
// // import { setStudentSelectedNotification } from "features/common/redux/studentSlices";
// // import { selectStudentNotificationLoadig, selectStudentNotifications, selectStudentSelectedNotification } from "features/common/redux/studentSelector";

// // const StudentNotificationList = () => {
// //     const navigate = useNavigate()
// //     const dispatch = useDispatch()
// //     const [isTabOpen, setIsTabOpen] = useState(true);
// //     const [tabValue,setTabValue] = useState(0)
// //     const selectedNotification = useSelector(selectStudentSelectedNotification);
// //     const notificationList = useSelector(selectStudentNotifications)

// //     const handleTabChange = (e,value) => {
// //       setTabValue(value)
// //     }
    
// //     const handleBack = () => {
// //       navigate(-1)
// //     }
// //     const handleNotificationChange = (notification) => {
// //       dispatch(setStudentSelectedNotification(notification));
// //       setIsTabOpen(false);
// //     };
    

// //     console.log(selectedNotification,"selectedNotification")
// //     console.log(notificationList,"notificationList")

// //     return(
// //           <>
// //             <Box 
// //             sx={{
// //                 padding : "50px 39px 20px 40px ",
// //                 // width: "100%"
// //             }}
// //             >
// //                <Box sx={{ display: 'flex', justifyContent: "space-between"}}>
// //                   <Box >
// //                      <IconButton onClick={handleBack} variant="text" sx={{ display: 'flex', gap: "20px",cursor:"pointer",":hover":{ background: "none"}}} >
// //                         <KeyboardBackspaceSharpIcon sx={{ width: "26px", height: "26px", color : "#000000" }} />
// //                         <Typography sx={{ color : '#000000', fontSize: "15px", fontWeight: 7000, lineHeight: "24px"}} > Back </Typography>
// //                      </IconButton>
// //                   </Box>
// //                   <Box sx={{ display: "none", gap: "20px",cursor:"pointer"}} >
// //                     <IconButton sx={{ width: "16px", height: "18.5px"}} >
// //                       <ZoomInMapOutlinedIcon sx={{ color : "#000000"}} />
// //                     </IconButton>
// //                     <IconButton sx={{ width: "11px", height: "11px"}} >
// //                       <CloseOutlinedIcon sx={{ color: "#000000"}} />
// //                     </IconButton>
// //                   </Box>
// //                </Box>
// //                <Grid container xs={12}  gap={"40px"} sx={{ height: "90vh",pt:"11px"}} >
// //                <Grid item xs={3}>
// //           {isTabOpen && (
// //             <NotificationTab
// //               tabValue={tabValue}
// //               handleTabChange={handleTabChange}
// //               notifications={notificationList}
// //               handleNotificationChange={handleNotificationChange}
// //             />
// //           )}
// //         </Grid>
// //                    <Grid item xs={8.6}>
// //                     <NotificationView 
// //                     handleBack={handleBack}
// //                     selectedNotification={selectedNotification}
// //                     />
// //                    </Grid>
// //                </Grid>
// //             </Box>
// //           </>
// //     )
// // }

// // export default StudentNotificationList
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

const StudentNotificationList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [tabValue, setTabValue] = useState(0);
    const [isTabOpen, setIsTabOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const selectedNotification = useSelector(selectStudentSelectedNotification);
    const notificationList = useSelector(selectStudentNotifications);

    const { showSpinner, hideSpinner } = useSpinner();

    // Handles tab change
    const handleTabChange = (event, value) => setTabValue(value);

    // Handles back navigation
    const handleBack = () => navigate(-1);

    // Handles closing the notification tab
    const closeTab = () => setIsTabOpen(false);

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
                toast.error(`Failed to update notification: ${error.message}`);
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
            toast.error(`Failed to delete notification: ${error.message}`);
        } finally {
            hideSpinner();
        }
    };

    return (
        <Box sx={{ padding: "70px 39px 20px 40px", zIndex: 1000 }}>
            <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                <IconButton onClick={handleBack} sx={{ display: 'flex', gap: "20px", ":hover": { background: "none" } }}>
                    <KeyboardBackspaceSharpIcon sx={{ width: "26px", height: "26px", color: "#000000" }} />
                    <Typography sx={{ color: '#000000', fontSize: "15px", fontWeight: 700 }}>Back</Typography>
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
    );
};

export default StudentNotificationList;
