import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box, TextField, InputAdornment, Typography } from "@mui/material";
import { getImageUrl } from "utils/common/imageUtlils";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import { useEffect } from "react";
import { getInstructorDetails } from "store/atoms/authorized-atom";
import { getInstructorCommunityMessages } from "../services";

const SideBar = ({ communities, currentChat, setCurrentChat, socket, Messages, setMessages }) => {
  const handleChat = async (group) => {
    try {
      setCurrentChat(group);
      const communituy_id = group?._id;
      const instructor = getInstructorDetails();
      const data = { community: communituy_id };
      const response = await getInstructorCommunityMessages(data);
      setMessages(response);
      socket.emit("joinGroup", { groupId: communituy_id, userId: instructor?._id }, (error) => {
        console.log(error, "error");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        height: "75.8vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f6ff", // Light purple background
        borderRadius: "24px",
        overflow: "hidden"
      }}
    >
      {/* Search Bar */}
      <Box
        sx={{
          paddingLeft: "32px",
          paddingTop: "20px",
          paddingRight: "12px",
          
        }}
      >
        <TextField
          variant="outlined"
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              borderRadius: "24px",
              "& fieldset": {
                borderColor: "#D1E4E8",
                borderRadius: "24px",
              },
              "&:hover fieldset": {
                borderColor: "#D1E4E8",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#D1E4E8",
              },
              "& input": {
                padding: "16px",
              },
              "& input::placeholder": {
                color: "#9393C1",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
              },
            },
          }}
          placeholder="Search or start a new chat"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon sx={{ color: "blue" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Communities List */}
      <Box
        sx={{
          flex: 1, // Use remaining space for the chat list
          padding: "20px",
          overflowY: "auto",
        }}
      >
        {communities &&
          communities.map((group) => (
            <Box
              key={group.id}
              onClick={() => handleChat(group)}
              sx={{
                display: "flex",
                padding: "8px",
                width: "100%",
                justifyContent: "space-between",
                backgroundColor: group?._id === currentChat?._id && "white",
                borderRadius: group?._id === currentChat?._id && "6px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "white",
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease, background-color 0.3s ease",
                },
              }}
            >
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Box>
                  <img
                    src={getImageUrl(group?.batch?.course?.image)}
                    alt={group?.group}
                    style={{ height: "60px", width: "60px", borderRadius: "50%" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    py: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#09132C",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                    }}
                  >
                    {group?.group}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#09132C",
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "16px",
                    }}
                  >
                    {group.last_message ? group?.last_message?.message : "No messages yet"}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: "#829C99",
                      fontSize: "10px",
                      fontWeight: 400,
                      lineHeight: "16px",
                    }}
                  >
                    {group.date ? group?.date : "7:38 am"}
                  </Typography>
                </Box>
                <Box>
                  <DoneAllOutlinedIcon sx={{ color: "black" }} />
                </Box>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default SideBar;

