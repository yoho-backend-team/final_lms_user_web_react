import {
  Box,
  IconButton,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import ZoomInMapOutlinedIcon from "@mui/icons-material/ZoomInMapOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import NotificationView from "features/instructor-pages/notification-page/components/NotificationView";
import NotificationTab from "features/instructor-pages/notification-page/components/NotificationTab";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNotificationList,
  selectSelectedNotification,
} from "features/common/redux/selector";
import {
  setNotifications,
  setSelectedNotification,
} from "features/common/redux/slices";
import {
  getInstructorNotifications,
  updateInstructorNotifications,
} from "features/common/redux/thunks";

const NotificationList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);

  const notificationList = useSelector(selectNotificationList);
  const selectedNotification = useSelector(selectSelectedNotification);

  useEffect(() => {
    dispatch(getInstructorNotifications());
  }, [dispatch]);

  const handleTabChange = (e, value) => {
    setTabValue(value);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleNotificationChange = (notification) => {
    dispatch(updateInstructorNotifications({ uuid: notification?.uuid }));
    dispatch(getInstructorNotifications());
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 4, pb: 3 }}>
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <IconButton
          onClick={handleBack}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1,
            "&:hover": { background: "transparent" },
          }}
        >
          <KeyboardBackspaceSharpIcon sx={{ fontSize: 26, color: "#000" }} />
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: "#000" }}>
            Back
          </Typography>
        </IconButton>

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton>
            <ZoomInMapOutlinedIcon sx={{ color: "#000" }} />
          </IconButton>
          <IconButton>
            <CloseOutlinedIcon sx={{ color: "#000" }} />
          </IconButton>
        </Box>
      </Box>

      {/* Main Layout */}
      <Grid container spacing={4} sx={{ height: "85vh" }}>
        <Grid item xs={12} md={4} lg={3}>
          <NotificationTab
            tabValue={tabValue}
            handleTabChange={handleTabChange}
            handleBack={handleBack}
            notifications={notificationList}
            handleNotificationChange={handleNotificationChange}
          />
        </Grid>

        <Grid item xs={12} md={8} lg={9}>
          <NotificationView
            handleBack={handleBack}
            selectedNotification={selectedNotification}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotificationList;
