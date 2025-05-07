import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Paper,
  Tooltip,
  useTheme,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { profilePlaceholder } from "utils/placeholders";
import { getImageUrl } from "utils/common/imageUtlils";
import { useDispatch } from "react-redux";
import { deleteInstructorNotifications } from "features/common/redux/thunks";

const NotificationView = ({ selectedNotification }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleDelete = () => {
    if (selectedNotification?.uuid) {
      dispatch(deleteInstructorNotifications({ uuid: selectedNotification.uuid }));
    }
  };

  const getFormattedTime = (time) => {
    if (!time) return "--";
    const date = new Date(time);
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "70vh",
        bgcolor: theme.palette.background.default,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 900,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          p: 4,
          borderRadius: 4,
          bgcolor: "#f9fafe",
          boxShadow: "0 12px 24px rgba(0,0,0,0.06)",
        }}
      >
        {/* Top Heading */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 3,
            pb: 2,
            borderBottom: "1px solid #E0E0E0",
          }}
        >
          <NotificationsActiveIcon sx={{ color: "#5611B1", fontSize: 28 }} />
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: "#1A1A1A", letterSpacing: 0.5 }}
          >
            Notification
          </Typography>
        </Box>

        {/* Header Info */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 2, minWidth: 0, flex: 1 }}>
            <Avatar
              src={
                selectedNotification?.staff?.image
                  ? getImageUrl(selectedNotification.staff.image)
                  : profilePlaceholder
              }
              alt="Profile"
              sx={{ width: 56, height: 56 }}
            />
            <Box sx={{ overflow: "hidden" }}>
              <Typography variant="h6" fontWeight={600} noWrap>
                {selectedNotification?.title || "Select a notification"}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: theme.palette.text.secondary }}
              >
                {getFormattedTime(selectedNotification?.createdAt)}
              </Typography>
            </Box>
          </Box>

          {/* Delete Button – only show if notification selected */}
          {selectedNotification?.uuid && (
            <Tooltip title="Delete Notification">
              <IconButton
                onClick={handleDelete}
                sx={{
                  color: "white",
                  background: "linear-gradient(145deg, #FF3D00, #FF6A00)",
                  "&:hover": {
                    background: "linear-gradient(145deg, #FF6A00, #FF3D00)",
                    transform: "scale(1.1)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                  },
                  borderRadius: "50%",
                  padding: "12px",
                }}
              >
                <DeleteOutlineOutlinedIcon sx={{ fontSize: 28 }} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Body */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            pr: 1,
            maxHeight: "35vh",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: "16px",
              lineHeight: 1.75,
              color: "#333",
              whiteSpace: "pre-wrap",
            }}
          >
            {selectedNotification?.body || "Please select a notification to view its details."}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default NotificationView;
