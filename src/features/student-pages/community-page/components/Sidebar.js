import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, TextField, InputAdornment, Typography } from '@mui/material';
import { getImageUrl } from 'utils/common/imageUtlils';
import { imagePlaceholder } from 'utils/placeholders';

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
                key={group._id}
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
                    <img style={{ width: "60px", height:"60px", borderRadius:"50%"}} src={group?.batch?.course?.image ? getImageUrl(group?.batch?.course?.image) : imagePlaceholder } alt={group?.batch?.batch_name} />
                  </Box>
                  <Box sx={{display:"flex",flexDirection:"column",justifyContent:"space-between",py:"10px"}} >
                     <Typography sx={{color:"#09132C",fontSize:"16px",fontWeight:500,lineHeight:"24px"}} >{group?.batch?.batch_name}</Typography>
                     <Typography sx={{color:"#09132C",fontSize:"12px",fontWeight:"400",lineHeight:"16px"}} >{group.last_message?group?.last_message:"Haha that's terrifying 😂"}</Typography>
                  </Box>
                  </Box>
                  <Box sx={{display:"flex",flexDirection:"column",justifyContent:"space-between",gap:"10px"}} >
                    <Box>
                    <Typography sx={{color:"#829C99",fontSize:"10px",fontWeight:400,lineHeight:"16px"}}>{group.date}</Typography>
                    </Box>
                    <Box>{group?.chat} </Box>
                  </Box>
                </Box>
            ))
         }
      </Box>
    </Box>
  );
};

export default SideBar;
