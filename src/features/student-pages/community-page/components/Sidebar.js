import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box, TextField, InputAdornment, Typography } from "@mui/material";
import { getStudentDetails } from "store/atoms/authorized-atom";
import { getImageUrl } from "utils/common/imageUtlils";
import { imagePlaceholder } from "utils/placeholders";
import { getCommunityMessages } from "../services";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";
import { formatTime } from "utils/formatDate";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const SideBar = ({ communities, currentChat, setCurrentChat, socket, Messages,setMessages }) => {
  const { showSpinner , hideSpinner } = useSpinner()
  const student = getStudentDetails()

  const handleChat = async (group) => {
    try {
      showSpinner()
      setCurrentChat(group);
      const communituy_id = group?._id;
      const student = getStudentDetails()
      const data = await getCommunityMessages({ community: communituy_id})
      setMessages(data)
      socket.emit("joinGroup", { groupId: communituy_id, userId: student?._id }, (error) => {
        console.log(error, "error");
      });
    } catch (error) {
       toast.error(error?.message)
    }finally{
     hideSpinner()
    }
  };

  return (
    <Box>
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
                <SearchOutlinedIcon sx={{ color: "#9393C1" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box
        sx={{
          padding: "30px",
          height : "60vh",
          overflow : "auto",
         
        }}
      >
        {communities?.map((group) => (
          <Box
            key={group._id}
            onClick={() => handleChat(group)}
            sx={{
              display: "flex",
              padding: "8px",
              width: "100%",
              justifyContent: "space-between",
              backgroundColor : group?._id === currentChat?._id && "#D1E4E8",
              borderRadius: group?._id === currentChat?._id && "8px",
              cursor: "pointer",
              ":hover" : {
                  backgroundColor : "#D1E4E8",
                  borderRadius: "8px"
              }
            }}
          >
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Box>
                <img
                  style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                  src={
                    group?.batch?.course?.image
                      ? getImageUrl(group?.batch?.course?.image)
                      : imagePlaceholder
                  }
                  alt={group?.batch?.batch_name}
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
                  {group?.batch?.batch_name}
                </Typography>
                <Typography
                  sx={{
                    color: "#09132C",
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "16px",
                  }}
                >
                  {group.last_message
                    ? group?.last_message?.message
                    : "Haha that's terrifying 😂"}
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
                  { group?.last_message ? formatTime(group?.last_message?.createdAt) : formatTime(new Date())  }
                </Typography>
              </Box>
              <Box sx={{ textAlign: "end"}} > 
              <Typography>
                   { group?.last_message && group?.last_message?.status?.some(s => s.delivered) && !group?.last_message?.status?.every(s => s.delivered) && (
                     <DoneIcon sx={{ color: "black", width: "17px", height: "17px" }} />
                   )}
                 
                   {group?.last_message && group?.last_message?.status?.every(s => s.delivered) && !group?.last_message?.status?.every(s => s.read) && (
                     <DoneAllIcon sx={{  color: "black", width: "17px", height: "17px" }} />
                   )}
                 
                   { group?.last_message && group?.last_message && group?.last_message?.status?.every(s => s.read) && (
                     <DoneAllIcon sx={{ color: "#0D6EFD", width: "17px", height: "17px" }} />
                   )}
                   { !group?.last_message && (
                     <DoneAllIcon sx={{ color: "#0D6EFD", width: "17px", height: "17px" }} />
                   )}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SideBar;
