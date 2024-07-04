import { Skeleton,Grid,Box } from "@mui/material";


const TicketLoader = () => {
    return(
           <Grid container sx={{ px:"80px", py : "40px"}} >
             <Box sx={{ display: "flex", gap:"40px", width: "100%", marginTop: "40px" }} >
                <Skeleton variant="rectangular" width={"386px"} height={"203px"} sx={{ borderRadius:"10px"}} />
                <Skeleton variant="rectangular" width={"386px"} height={"203px"} sx={{ borderRadius:"10px"}} />
                <Skeleton variant="rectangular" width={"386px"} height={"203px"} sx={{ borderRadius:"10px"}} />
                <Skeleton variant="rectangular" width={"386px"} height={"203px"} sx={{ borderRadius:"10px"}} />
             </Box>
           </Grid>
    )
}

export default TicketLoader