import { Box, Divider, Tabs, Tab, IconButton, Popover, Typography, Button } from "@mui/material";
import { useState } from "react";
import LaunchSharpIcon from '@mui/icons-material/LaunchSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { getImageUrl } from "utils/common/imageUtlils";
import { profilePlaceholder } from "utils/placeholders";
import axios from "axios";

const NotificationListView = ({handleSelectNotification, id, anchorE2, isOpen, setClose, notifications, unreadCount}) => {
    const [ tabValue, setTabValue ] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Mark all notifications as read
    const markAllAsRead = async () => {
      try {
        await axios.put('/api/notifications/mark-all-read');
        // Refresh the parent component's data
        if (handleSelectNotification) {
          await handleSelectNotification({ refresh: true });
        }
      } catch (error) {
        console.error("Error marking all notifications as read:", error);
      }
    };

    const filteredNotifications = notifications?.filter((notification) => {
        if (tabValue === 0) return true;
        if (tabValue === 1) return notification.status === "read";
        if (tabValue === 2) return notification.status === "unread";
        return true;
    });

    // Function to format time
    const formatTimeAgo = (timestamp) => {
      if (!timestamp) return "";
      
      const now = new Date();
      const notificationTime = new Date(timestamp);
      const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
      
      if (diffInMinutes < 60) {
        return `${diffInMinutes} Minute${diffInMinutes !== 1 ? 's' : ''} Ago`;
      } else if (diffInMinutes < 1440) { // less than a day
        const hours = Math.floor(diffInMinutes / 60);
        return `${hours} Hour${hours !== 1 ? 's' : ''} Ago`;
      } else {
        const days = Math.floor(diffInMinutes / 1440);
        return `${days} Day${days !== 1 ? 's' : ''} Ago`;
      }
    };

    return(
        <Popover 
          id={id}
          open={isOpen} 
          onClose={setClose}
          anchorEl={anchorE2}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          sx={{
            marginTop: "12px"
          }}
        >
          <Box
            sx={{
              width: "492px",
              height: "500px",
              border: "1px solid #DEE2E6",
              borderRadius: "8px"
            }}
          >
            <Box 
              sx={{
                display: 'flex',
                justifyContent: "space-between",
                padding: "24px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center"}} >
                <Typography sx={{ color: "#495057", fontSize: "24px", fontWeight: 500, lineHeight: "32px"}} >Notifications</Typography>
                <Typography sx={{ color: "#495057", fontSize: "24px", fontWeight: 700, lineHeight: "32px", marginLeft: "4px"}} >
                  ({unreadCount})
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: "flex-start", gap: "20px"}} >
                <IconButton 
                  sx={{ width: "19px", height: "19px"}} 
                  component={Link} 
                  to={"/instructor/notifications"} 
                >
                  <LaunchSharpIcon sx={{ height: "19px", width: "19px", color: "#000000"}} /> 
                </IconButton>
                <IconButton sx={{ width: "11px", height: "11px"}} onClick={setClose} >
                  <CloseSharpIcon sx={{ color: "#6C757D"}}  />
                </IconButton>
              </Box>
            </Box>
            <Divider />
            <Box 
              sx={{ 
                px: "24px",
                py: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
              >
                <Tab 
                  label="All" 
                  sx={{
                    color: tabValue === 0 ? '#5611B1' : '#6C757D',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '22px',
                    borderBottom: tabValue === 0 ? '2px solid #5611B1' : 'none'
                  }}
                />
                <Tab 
                  label="Read" 
                  sx={{
                    color: tabValue === 1 ? '#5611B1' : '#6C757D',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '22px',
                    borderBottom: tabValue === 1 ? '2px solid #5611B1' : 'none'
                  }}
                />
                <Tab 
                  label="Unread" 
                  sx={{
                    color: tabValue === 2 ? '#5611B1' : '#6C757D',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '22px',
                    borderBottom: tabValue === 2 ? '2px solid #5611B1' : 'none'
                  }}
                />
              </Tabs>
              {unreadCount > 0 && (
                <Button 
                  onClick={markAllAsRead} 
                  sx={{ 
                    color: "#5611B1", 
                    fontSize: "12px", 
                    textTransform: "none",
                    "&:hover": { backgroundColor: "transparent" }
                  }}
                >
                  Mark all as read
                </Button>
              )}
            </Box>

            <Box key={"notification_list"} sx={{ height: "39vh", overflow: 'auto'}} >
              {filteredNotifications?.length > 0 ? (
                <Box>
                  {filteredNotifications.map((notifi, index) => (
                    <Box key={notifi?._id || index}>
                      <Box
                        onClick={() => handleSelectNotification(notifi)}
                        sx={{
                          padding: "13px 24px",
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          borderBottom: '1px solid #e0e0e0',
                          backgroundColor: notifi?.status === "unread" ? "#F8F9FA" : "transparent"
                        }}
                      >
                        <Box sx={{ flexShrink: 0 }}>
                          <Avatar
                            src={notifi?.staff?.image ? getImageUrl(notifi?.staff?.image) : profilePlaceholder}
                            sx={{
                              width: "48px",
                              height: "48px",
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            flex: 1,
                            marginLeft: "16px",
                            maxWidth: "calc(100% - 130px)", 
                            overflow: 'hidden', 
                          }}
                        >
                          <Typography
                            sx={{ 
                              color: "#343A40", 
                              fontSize: "16px", 
                              fontWeight: notifi?.status === "unread" ? 700 : 500, 
                              overflow: 'hidden', 
                              textOverflow: 'ellipsis' 
                            }}
                            title={notifi?.title} 
                          >
                            {notifi?.title}
                          </Typography>
                          <Typography
                            sx={{ 
                              color: "#6C757D", 
                              fontSize: "12px", 
                              fontWeight: notifi?.status === "unread" ? 400 : 300, 
                              overflow: 'hidden', 
                              textOverflow: 'ellipsis' 
                            }}
                            title={notifi?.body} 
                          >
                            {notifi?.body}
                          </Typography>
                        </Box>
                        <Box sx={{ flexShrink: 0, textAlign: 'right' }}>
                          <Typography
                            sx={{ color: "#86929D", fontSize: "9px", fontWeight: 700 }}
                          >
                            {formatTimeAgo(notifi?.createdAt)}
                          </Typography>
                          {notifi?.status === "unread" && (
                            <Box
                              sx={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                backgroundColor: "#5611B1",
                                marginLeft: "auto",
                                marginTop: "4px"
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                  <Typography sx={{ color: "#6C757D", fontSize: "14px" }}>
                    No notifications found
                  </Typography>
                </Box>
              )}
            </Box>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "end", p: "20px 16px 20px 20px"}} >
              <Button 
                component={Link} 
                to={"/instructor/notifications"} 
                sx={{ 
                  color: "#FBFBFB",
                  backgroundColor: "#5611B1",
                  borderRadius: "8px",
                  boxShadow: "0px 6px 34px -8px #0D6EFD",
                  padding: "9px 24px",
                  ":hover": { backgroundColor: "#5611B1" }
                }}
                onClick={setClose} 
              >
                View all Notifications
              </Button>
            </Box>
          </Box>
        </Popover>
    );
};

export default NotificationListView;