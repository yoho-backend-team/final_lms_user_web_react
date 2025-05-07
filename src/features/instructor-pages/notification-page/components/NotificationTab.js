import { Avatar, Box, IconButton, Input, Tab, Tabs, Typography, InputAdornment, Badge, Paper, Stack, Divider, useTheme, Fade } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { profilePlaceholder } from "utils/placeholders";
import { getImageUrl } from "utils/common/imageUtlils";

const NotificationTab = ({ tabValue, handleTabChange, notifications, handleNotificationChange }) => {
  const theme = useTheme();

  const readCount = notifications?.filter(i => i.status === "read")?.length || 0;
  const unreadCount = notifications?.filter(i => i.status === "unread")?.length || 0;

  const filteredNotifications =
    notifications?.filter((n) => {
      if (tabValue === 0) return true;
      if (tabValue === 1) return n.status === "read";
      if (tabValue === 2) return n.status === "unread";
      return true;
    }) || [];

  return (
    <Box
      sx={{
        height: "90vh",
        bgcolor: theme.palette.background.default,
        borderLeft: `1px solid ${theme.palette.divider}`,
        px: 3,
        py: 3,
        overflow: "hidden"
      }}
    >
      {/* Header */}
      <Box mb={3} sx={{ textAlign: 'center' }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: theme.palette.primary.main,
            textTransform: "uppercase",
            letterSpacing: 1,
            background: "linear-gradient(135deg, #5611B1, #6a1b9a)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            mb: 1,
          }}
        >
          Notifications
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {readCount} messages, {unreadCount} unread
        </Typography>
      </Box>

      {/* Search Section */}
      <Stack direction="row" spacing={1} mb={3} justifyContent="center">
        <Input
          placeholder="Search notifications..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "text.secondary" }} />
            </InputAdornment>
          }
          sx={{
            bgcolor: "linear-gradient(135deg, #e8f0fe, #d1e4fc)",
            px: 2,
            borderRadius: 3,
            width: "100%",
            maxWidth: 400,
            fontSize: 14,
            height: 45,
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
            borderBottom: "none",
            '&:focus': {
              boxShadow: "0 0 8px rgba(86, 17, 177, 0.4)"
            }
          }}
        />
        <IconButton
          sx={{
            bgcolor: "#5611B1",
            '&:hover': { bgcolor: "#430c91" },
            width: 45,
            height: 45,
            boxShadow: 2,
            borderRadius: "50%"
          }}
        >
          <SearchIcon sx={{ color: "white" }} />
        </IconButton>
      </Stack>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{
          mb: 2,
          ".MuiTab-root": {
            fontWeight: 600,
            fontSize: 14
          }
        }}
      >
        <Tab label="All" />
        <Tab label={`Read (${readCount})`} />
        <Tab
          label={
            <Badge
              badgeContent={unreadCount}
              color="error"
              max={99}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              sx={{
                "& .MuiBadge-dot": {
                  borderRadius: "50%",
                  backgroundColor: "#ff4081",
                },
                "& .MuiBadge-dot": {
                  top: 8,
                  right: 8,
                }
              }}
            >
              Unread
            </Badge>
          }
        />
      </Tabs>

      <Divider sx={{ mb: 2 }} />

      {/* Notification List */}
      <Box sx={{ height: "63vh", overflowY: "auto", pr: 1 }}>
        {filteredNotifications.length === 0 ? (
          <Typography variant="body2" color="text.secondary" align="center" mt={5}>
            No notifications found.
          </Typography>
        ) : (
          filteredNotifications.map((notifi, index) => {
            const unread = notifi.status === "unread";

            return (
              <Fade in timeout={500} key={index}>
                <Paper
                  elevation={unread ? 4 : 1}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    p: 2,
                    mb: 2,
                    borderRadius: 3,
                    backdropFilter: unread ? "blur(8px)" : "none",
                    background: unread
                      ? "linear-gradient(145deg, #f0f4ff, #ffffff)"
                      : "#fff",
                    transition: "all 0.2s ease-in-out",
                    boxShadow: unread
                      ? "0 8px 24px rgba(86, 17, 177, 0.12)"
                      : "0 2px 6px rgba(0,0,0,0.05)",
                    cursor: "pointer",
                    "&:hover": {
                      background: unread
                        ? "linear-gradient(145deg, #e6eeff, #fafafa)"
                        : "#f9f9f9"
                    }
                  }}
                  onClick={() => handleNotificationChange(notifi)}
                >
                  <Avatar
                    src={
                      notifi?.staff?.image
                        ? getImageUrl(notifi.staff.image)
                        : profilePlaceholder
                    }
                    alt="profile"
                    sx={{ width: 48, height: 48 }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight={600}>
                        {notifi?.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {notifi?.time || "3:13 PM"}
                      </Typography>
                    </Box>
                    <Typography fontSize={13} color="primary">
                      Starts @2:50pm
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mt={0.5}
                      sx={{ fontSize: 13 }}
                    >
                      {notifi?.body}
                    </Typography>
                  </Box>
                </Paper>
              </Fade>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default NotificationTab;
