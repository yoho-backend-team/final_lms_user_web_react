import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, TextField, InputAdornment, Typography } from '@mui/material';
import { getImageUrl } from 'utils/common/imageUtlils';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import { useEffect } from 'react';

const SideBar = ({communities,currentChat,setCurrentChat,socket}) => {

  const handleChat = (group) => {
      setCurrentChat(group)
      const communituy_id = group?._id
      console.log(communituy_id,"communityId")
      socket.emit("join", { group: communituy_id, user : "user" },(error)=>{
        console.log(error,"error")
      })
  }

  return (
    <Box>
      <Box 
        sx={{
          paddingLeft: '32px',
          paddingTop: '20px',
          paddingRight: '12px'
        }}
      >
        <TextField
          variant="outlined"
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
                '& fieldset': {
                  borderColor: '#D1E4E8',
                  borderRadius: '24px',
                },
                '&:hover fieldset': {
                  borderColor: '#D1E4E8',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#D1E4E8',
                },
                '& input': {
                  padding: '16px',
                },
                '& input::placeholder': {
                  color: '#9393C1',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '24px',
                },
              },
          }}
          placeholder="Search or start a new chat"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon sx={{ color: '#9393C1' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box 
      sx={{
        padding : "20px"
      }}>
         {
            communities?.map((group)=>(
                <Box 
                key={group.id}
                onClick={()=>handleChat(group)}
                sx={{
                    display : "flex",
                    padding : "8px",
                    width : "100%",
                    justifyContent : "space-between",
                    cursor : "pointer"
                }}>
                  <Box sx={{display:"flex",gap:"10px"}}>
                  <Box>
                    <img src={ getImageUrl(group?.batch?.course?.image)} alt={group?.group} style={{ height:"60px",width:"60px",borderRadius:"50%" }} />
                  </Box>
                  <Box sx={{display:"flex",flexDirection:"column",justifyContent:"space-between",py:"10px"}} >
                     <Typography sx={{color:"#09132C",fontSize:"16px",fontWeight:500,lineHeight:"24px"}} >{group?.group}</Typography>
                     <Typography sx={{color:"#09132C",fontSize:"12px",fontWeight:"400",lineHeight:"16px"}} >{group.last_message ? group?.last_message : "Hahah oh man"}</Typography>
                  </Box>
                  </Box>
                  <Box sx={{display:"flex",flexDirection:"column",justifyContent:"space-between",gap:"10px"}} >
                    <Box>
                    <Typography sx={{color:"#829C99",fontSize:"10px",fontWeight:400,lineHeight:"16px"}}>{group.date ? group?.date : "7:38 am"}</Typography>
                    </Box>
                    <Box>
                      <DoneAllOutlinedIcon sx={{color:"#2361FF"}} />
                    </Box>
                  </Box>
                </Box>
            ))
         }
      </Box>
    </Box>
  );
};

export default SideBar;
