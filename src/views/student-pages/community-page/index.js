import { Box, Grid } from "@mui/material";
import { JavaCourseImage, SqlCourseImage } from "utils/images";
import SideBar from "features/student-pages/community-page/components/Sidebar";
import Chat from "features/student-pages/community-page/components/Chat";
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import { useState } from "react";

const Batches = [
  { batch_name: "Java Class", image: JavaCourseImage , id: "1",chat:<PushPinOutlinedIcon sx={{rotate:"35deg"}}  />,date:"5:14 pm",last_message : "Haha oh man" },
  { batch_name: "SQL", image: SqlCourseImage , id: "2",chat : <DoneAllOutlinedIcon sx={{color:"#2361FF"}} />,date:"7:38 am",last_message:"Haha that's terrifying 😂" },
];

const CommunityPage = () => {
  const [currentChat,setCurrentChat] = useState(null)
  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "40px" }}>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "18px",
          border: "1px solid #C3C3C3",
          boxShadow: "0px 0px 64px 0px rgba(0, 0, 0, 0.10)",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container sx={{ flex: 1 }}>
          <Grid item xs={4}>
            <SideBar communities={Batches} currentChat={currentChat} setCurrentChat={setCurrentChat} />
          </Grid>
          <Grid item xs={8}>
            <Chat currentChat={currentChat} setCurrentChat={setCurrentChat} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CommunityPage;
