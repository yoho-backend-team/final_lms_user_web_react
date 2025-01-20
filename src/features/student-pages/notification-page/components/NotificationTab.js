import React, { useState, useMemo } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  Input,
  Tab,
  Tabs,
  Typography,
  InputAdornment,
  Grid,
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
        paddindLeft:"100px",
        backgroundColor: "#FFF",
        color: "#333",
        borderLeft: "1px solid #E0E0E0",
      }}
    >
      <Box
        sx={{
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
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

        {/* Search Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: "12px" }}>
          <Input
            placeholder="Search notifications"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              backgroundColor: "#F5F5F5",
              border: "1px solid #E0E0E0",
              padding: "8px 12px",
              borderRadius: "6px",
              width: "100%",
              maxWidth: "300px",
              fontSize: "14px",
              "&::placeholder": {
                color: "#9E9E9E",
              },
            }}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#757575" }} />
              </InputAdornment>
            }
          />
        </Box>

        {/* Tabs Section */}
        <Tabs value={tabValue} onChange={handleTabChange}>
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
