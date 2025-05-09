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

        {/* Search Box */}
        <Paper
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '6px 16px',
            borderRadius: '24px',
            backgroundColor: "#F9F9F9",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
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
        <Box
          sx={{
            overflowY: "auto",
            height: "60vh",
            padding: "8px",
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#c1c1c1',
              borderRadius: '10px',
            },
          }}
        >
          {filteredNotifications?.map((notifi) => (
            <Grid
              container
              key={notifi._id}
              onClick={() => handleClickNotification(notifi)}
              sx={{
                padding: "12px",
                cursor: "pointer",
                backgroundColor: notifi?._id === selectedNotification?._id ? "#E3F2FD" : "#FFF",
                border: "1px solid #E0E0E0",
                borderRadius: "12px",
                marginBottom: "10px",
                alignItems: "center",
                transition: "0.2s",
                '&:hover': {
                  backgroundColor: "#F5F5F5",
                },
              }}
            >
              <Avatar
                alt="profile"
                src={
                  notifi?.student?.image
                    ? getImageUrl(notifi?.student?.image)
                    : profilePlaceholder
                }
                sx={{ width: "44px", height: "44px" }}
              />
              <Box sx={{ marginLeft: "14px", flex: 1 }}>
                <Typography sx={{ fontSize: "15px", fontWeight: 600, color: "#212121" }}>
                  {notifi?.title}
                </Typography>
                <Typography sx={{ fontSize: "13px", color: "#616161", mt: "4px" }}>
                  {notifi?.body}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "11px", color: "#B0BEC5" }}>
                {new Date(notifi?.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Typography>
            </Grid>
          ))}

          {/* Empty state */}
          {filteredNotifications?.length === 0 && (
            <Typography sx={{ fontSize: "14px", color: "#9E9E9E", textAlign: "center", mt: 2 }}>
              No notifications found.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationTab;
