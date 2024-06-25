import CourseModuleCard from "../courseNotesComponents/courseModuelCard"
import { Grid, Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { useTabResponsive } from "utils/tabResponsive"


const modules = [
    {id:1,title:"Foundation of Python& SQl Basic ...",progress:"97%",notes:2,videos:32,style:{card:"120deg, #0068FF 2.28%, #141BC4 100%",color:'#FFFFFF',background:"#2E80F9"}},
    {id:2,title:"Foundation of Python& SQl Basic ...",progress:"88%",notes:2,videos:22,style:{card:"118deg, #CF75FF 1.82%, #670BC3 97.62%",color:'#801FBB',background:"#D68AFF"}},
    {id:3,title:"Prototype Functionalities ...",progress:"0%",notes:0,videos:0,style:{card:"118deg, #FADB39 1.75%, #F90 100%",color:'#E19F10',background:"#FFE686"}},
    {id:4,title:"Prototype Functionalities ...",progress:"0%",notes:0,videos:0,style:{card:"118deg, #ED7071 1.82%, #C30BBC 97.62%",color:'#BE2563',background:"#FFA3BC"}},
    {id:5,title:"Prototype Functionalities ...",progress:"0%",notes:0,videos:0,style:{card:"118deg, #70ED7C 1.82%, #0BADC3 97.62%",color:'#26A456',background:"#8AEFB2"}},
    {id:6,title:"Padding with Python",progress:"0%",notes:0,videos:0,style:{card:"118deg, #9070ED 1.82%, #0BADC3 97.62%",color:'#646CDC',background:"#A4ACF4"}}
]


const CourseAndNotesPage = ({openCourseView,closeCourseView}) => {
    const { tabView } = useTabResponsive()
    return(
       <Box sx={{ padding : tabView ? "20px" :'60px'}} >
         <Grid container xs={12} gap={ tabView ? "60px" : "20px"} >
         {
            modules.map((module)=>(
                <Grid item  >
                    <CourseModuleCard id={module.id} style={module.style} title={module.title} notes={module.notes} videos={module.videos} progress={module.progress} closeCourseView={closeCourseView} openCourseView={openCourseView} />
                </Grid>
            ))
         }
         <Grid sx={{ display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center",border:"1px dashed #5611B1",px:"66px", borderRadius:"12px",cursor:"pointer"}} >
            <Box  >
                <Typography sx={{ color: "#5611B1", fontSize:"16px", fontWeight:500,lineHeight:"14px"}} component={Link} to={"/instructor/StudyMaterialsPage"} > 
                  Add Notes & Videos
                </Typography>
            </Box>
         </Grid>
         </Grid>
         <Box sx={{ display:"flex",justifyItems:"center",width:"100%", py:"20px",justifyContent:"center", height:"100%"}}>
                <Typography sx={{ fontSize:"14px", fontWeight:600,lineHeight:"24px"}}  >
                   Click the Card to view Preview Details
                </Typography>
         </Box>
       </Box>
    )
}

export default CourseAndNotesPage