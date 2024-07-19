import { Box ,Typography} from "@mui/material"
import { ProfileBackground } from "utils/images"
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';


const ProfileLayout = ({children,handleBack}) => {
    return(
        <Box 
        sx={{
            backgroundImage : `url(${ProfileBackground})`,
            backgroundSize : "cover",
            backgroundRepeat: "no-repeat",
            width: "100vw",
            height: "85vh",
            overflow : "auto"
        }}
        >
          <Box
          sx={{
            padding : "60px 40px 20px 40px",
            height: "100%",
            width : "100%"
          }}
          >
          <Box sx={{ py: "10px",px:"8px", zIndex: "1000"}} onClick={handleBack} >
            <KeyboardBackspaceOutlinedIcon sx={{ height: '24px', width: "24px", cursor: "pointer"}}  />
          </Box>
          <Box
          sx={{
               backgroundColor : "#FFFFFF",
               width : "100%",
               height : "100%",
               borderRadius : "18px",
               border : "1px solid #C3C3C3",
               overflow : "auto"
          }}
          >
            {children}
          </Box>
          </Box>
        </Box>
    )
}

export default ProfileLayout