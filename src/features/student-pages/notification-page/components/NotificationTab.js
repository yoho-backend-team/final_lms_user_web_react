import React, { useState, useMemo } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  InputBase,
  Tab,
  Tabs,
  Typography,
  Grid,
  Paper
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { profilePlaceholder } from "utils/placeholders";
import { getImageUrl } from "utils/common/imageUtlils";

const NotificationTab = ({
  tabValue,
  handleTabChange,
  notifications,
  handleNotificationChange,
  closeTab,
  selectedNotification,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const readCount = notifications?.filter((i) => i.status === "read").length;
  const unreadCount = notifications?.filter((i) => i.status === "unread").length;

  const filteredNotifications = useMemo(() => {
    return notifications?.filter((notification) => {
      const matchesTab =
        tabValue === 0 ||
        (tabValue === 1 && notification.status === "read") ||
        (tabValue === 2 && notification.status === "unread");

      const matchesSearch =
        searchQuery === '' ||
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.body.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [notifications, tabValue, searchQuery]);

  const handleClickNotification = (notification) => {
    handleNotificationChange(notification);
    closeTab();
  };

  return (
    <Box
      sx={{
        height: "90vh",
        backgroundColor: "#FFF",
        color: "#333",
        borderLeft: "1px solid #E0E0E0",
        // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        ml: "15px",
        mr: "10px"
      }}
    >
      <Box
        sx={{
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          height: "95vh",
          gap: "16px",
        }}
      >
        {/* Header Section */}
        <Box>
          <Typography sx={{ fontSize: "22px", fontWeight: 600 }}>Notification</Typography>
          <Typography sx={{ fontSize: "12px", color: "#757575" }}>
            {readCount} messages, {unreadCount} unread
          </Typography>
        </Box>

        <Paper
          component="form"
          sx={{ display: 'flex', alignItems: 'center', padding: '6px 12px', borderRadius: '20px', backgroundColor: "#F5F5F5" }}
        >
          <IconButton sx={{ p: '10px' }}>
            <SearchIcon sx={{ color: "#757575" }} />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: "14px" }}
            placeholder="Search notifications"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Paper>

        {/* Tabs Section */}
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="All" sx={{ fontSize: "14px" }} />
          <Tab label="Read" sx={{ fontSize: "14px" }} />
          <Tab label="Unread" sx={{ fontSize: "14px" }} />
        </Tabs>

        {/* Notifications List */}
        <Box sx={{ overflowY: "auto", height: "60vh", padding: "8px" }}>
          {filteredNotifications?.map((notifi) => (
            <Grid
              container
              key={notifi._id}
              onClick={() => handleClickNotification(notifi)}
              sx={{
                padding: "12px",
                cursor: "pointer",
                backgroundColor: notifi?._id === selectedNotification?._id ? "#F0F0F0" : "transparent",
                border: notifi?._id === selectedNotification?._id ? "1px solid #B0BEC5" : "none",
                borderRadius: "8px",
                marginBottom: "8px",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="profile"
                src={
                  notifi?.student?.image
                    ? getImageUrl(notifi?.student?.image)
                    : profilePlaceholder
                }
                sx={{ width: "40px", height: "40px" }}
              />
              <Box sx={{ marginLeft: "12px", flex: 1 }}>
                <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                  {notifi?.title}
                </Typography>
                <Typography sx={{ fontSize: "12px", color: "#757575" }}>
                  {notifi?.body}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "11px", color: "#9E9E9E" }}>
                {new Date(notifi?.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Typography>
            </Grid>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationTab;
