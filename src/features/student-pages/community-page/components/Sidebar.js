import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box, TextField, InputAdornment, Typography, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { getCommunityMessages } from "../services";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";
import { formatTime } from "utils/formatDate";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { getImageUrl } from "utils/common/imageUtlils";
import { imagePlaceholder } from "utils/placeholders";

const SideBar = ({ communities, currentChat, setCurrentChat, socket, Messages, setMessages }) => {
  const { showSpinner, hideSpinner } = useSpinner();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCommunities, setFilteredCommunities] = useState(communities);

  useEffect(() => {
    setFilteredCommunities(
      communities.filter((group) =>
        group?.batch?.batch_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, communities]);

  const handleChat = async (group) => {
    try {
      showSpinner();
      setCurrentChat(group);
      const data = await getCommunityMessages({ community: group?._id });
      setMessages(data);
      socket.emit("joinGroup", { groupId: group?._id }, (error) => {
        if (error) console.log(error, "error");
      });
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };

  return (
    <Box>
      {/* Search Bar */}
      <Box sx={{ padding:"24px" }}>
        <TextField
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search or start a new chat"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon sx={{ color: "#9393C1" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "24px",
              "& fieldset": { borderColor: "#D1E4E8" },
              "&:hover fieldset": { borderColor: "#D1E4E8" },
              "&.Mui-focused fieldset": { borderColor: "#D1E4E8" },
              "& input": { padding: "16px" },
            },
          }}
        />
      </Box>
      {/* Community List */}
      <Box sx={{ padding: "18px", height: "60vh", overflowY: "auto" }}>
        {filteredCommunities.length > 0 ? (
          filteredCommunities.map((group) => (
            <Box
              key={group._id}
              onClick={() => handleChat(group)}
              sx={{
                display: "flex",
                padding: "10px",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: group?._id === currentChat?._id ? "#D1E4E8" : "transparent",
                borderRadius: "8px",
                cursor: "pointer",
                ":hover": { backgroundColor: "#D1E4E8" },
              }}
            >
              {/* <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Avatar
                  src={group?.batch?.course?.image ? getImageUrl(group?.batch?.course?.image) : imagePlaceholder}
                  alt={group?.batch?.batch_name}
                  sx={{ width: 95, height: 70 }}
                /> */}
                <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
  <Avatar
    src={group?.batch?.course?.image ? getImageUrl(group?.batch?.course?.image) : imagePlaceholder}
    alt={group?.batch?.batch_name}
    sx={{
      width: 80,
      height: 55,
      borderRadius: "50%", // Makes it circular like WhatsApp
      border: "1px solid #ddd", // Subtle border like WhatsApp
      boxShadow: 1, // Adds a slight shadow for depth
    }}
  />
  


                <Box>
                  <Typography sx={{ fontWeight: 500 }}>{group?.batch?.batch_name}</Typography>
                  <Typography sx={{ fontSize: "12px", color: "#09132C" }}>
                    {group?.last_message?.message || "No messages yet"}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "10px", color: "#829C99" }}>
                  {group?.last_message?.createdAt ? formatTime(group?.last_message?.createdAt) : "Now"}
                </Typography>
                {group?.last_message?.status?.some((s) => s.delivered) && !group?.last_message?.status?.every((s) => s.read) ? (
                  <DoneAllIcon sx={{ color: "black" }} />
                ) : group?.last_message?.status?.every((s) => s.read) ? (
                  <DoneAllIcon sx={{ color: "#0D6EFD" }} />
                ) : (
                  <DoneIcon sx={{ color: "black" }} />
                )}
              </Box>
            </Box>
          ))
        ) : (
          <Typography sx={{ textAlign: "center", color: "#9393C1", marginTop: "20px" }}>
            No results found
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SideBar;
