import { Avatar, Box, Typography, IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import { profilePlaceholder } from "utils/placeholders";
import { getImageUrl } from "utils/common/imageUtlils";
import { formatDate, formatTime } from "utils/formatDate";

const NotificationView = ({ handleBack, selectedNotification,handleDelete }) => {
   const onDeleteClick = () => {
      if (selectedNotification) {
          handleDelete(selectedNotification.id);
      }
  };


    return (
        <Box sx={{ height: "90vh", backgroundColor: "#FFF", padding: "31px 28px 18px 24px" }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <IconButton onClick={handleBack}>
                    <KeyboardBackspaceSharpIcon />
                </IconButton>
                <Box sx={{ display: 'flex', gap: "22px", alignItems: "center" }}>
                    <IconButton onClick={onDeleteClick}>
                        <DeleteOutlineOutlinedIcon sx={{ color: "#7F7F7F" }} />
                    </IconButton>
                    <Typography sx={{ color: "#7F7F7F", fontSize: "11.5px", fontWeight: 400 }}>
                        {selectedNotification?.createdAt ? formatDate(selectedNotification?.createdAt) + " - " + formatTime(selectedNotification?.createdAt) : new Date().toDateString()}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: "13px", mt: 2 }}>
                <Avatar
                    src={selectedNotification?.student?.image ? getImageUrl(selectedNotification?.student?.image) : profilePlaceholder}
                    alt="image"
                    sx={{ width: "52px", height: "52px", borderRadius: "52px" }}
                />
                <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: 700 }}>{selectedNotification?.title}</Typography>
                    <Typography>{selectedNotification?.body}</Typography>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ color: '#000000', fontSize: "23px", fontWeight: 400, py: "22px" }}>
                    {selectedNotification?.body}
                </Typography>
                <Typography sx={{ color: "#7F7F7F", fontSize: "11.4px", fontWeight: 400, lineHeight: "normal" }}>
                    {selectedNotification?.title}
                </Typography>
            </Box>
        </Box>
    );
};

export default NotificationView;


// import { Avatar, Box, IconButton, Typography } from "@mui/material"
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import { imagePlaceholder, profilePlaceholder } from "utils/placeholders"
// import { getImageUrl } from "utils/common/imageUtlils";

// const NotificationView = ({selectedNotification}) => {
//     return(
//            <Box sx={{ height: "90vh", backgroundColor: "#FFF",color:"0px 0px 64px 0px #0000001a",padding: "31px 28px 18px 24px"}} >
//               <Box sx={{ display: 'flex', justifyContent: 'space-between'}} >
//                  <Box sx={{ display: 'flex', gap:"13px"}} >
//                     <Box>
//                      <Avatar
//                      src={selectedNotification?.student?.image ? getImageUrl(selectedNotification?.student?.image):profilePlaceholder}
//                      alt="image"
//                      sx={{
//                         width : "52px",
//                         height : "52px",
//                         borderRadius : "52px"
//                      }}
//                      />
//                     </Box>
//                     <Box sx={{ display: "flex", flexDirection: "column", gap:"5px"}} >
//                       <Typography sx={{ color: "#000000",fontSize:"16px",fontWeight:700}} >{selectedNotification?.title}</Typography>
//                       <Typography>{selectedNotification?.body}</Typography>
//                     </Box>
//                  </Box>
//                  <Box sx={{ display: 'flex', gap:"22px", alignItems : "center"}} >
//                     <Box >
//                        <DeleteOutlineOutlinedIcon sx={{ color: "#7F7F7F"}} />
//                     </Box>
//                     <Box>
//                       <Typography sx={{ color: "#7F7F7F", fontSize: "11.5px",fontWeight:400}} >20 june 2022 : 9:16AM</Typography>
//                     </Box>
//                  </Box>
//               </Box>
//               <Box sx={{ display: "flex", flexDirection: "column"}} >
//               <Box sx={{ display: "flex", flexDirection: "column" }}>
//                  <Typography sx={{ color: '#000000', fontSize: "23px", fontWeight: 400, py: "22px" }}>
//                     {selectedNotification?.body}
//                 </Typography>
//                <Typography sx={{ color: "#7F7F7F", fontSize: "11.4px", fontWeight: 400, lineHeight: "normal" }}>
//                    {selectedNotification?.title}
//          </Typography>
//            </Box>
//               </Box>
//            </Box>
//     )
// }

// export default NotificationView