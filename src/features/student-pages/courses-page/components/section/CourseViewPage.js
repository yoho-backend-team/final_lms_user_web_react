import {
  Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import NoteIcon from "assets/icons/noteIcon";
import SmartDisplayOutlined from "@mui/icons-material/SmartDisplayOutlined";
import StudyMaterialIcon from "assets/icons/study-material-icon";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import SandClockIcon from "assets/icons/course/sandClockIcon";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { formatDate, formatTime } from "utils/formatDate";
import oridinalSuffix from "utils/course/addOridinalSuffix";

const SingleCourseStudentView = ({ Course,selectedClassId }) => {
  // const classes = Course?.batches[0]?.classes || [];
  // const classes2 = Course?.studymaterials || [];
  const classes3 = Course?.notes[0] || [];
  console.log(classes3,"classes3")
  
  const downloadPdf = () => {
    
    const pdfContent = '...'; 
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${Course?.study_materials?.title}.pdf`; 
    document.body.appendChild(a);
    a.click();

    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const downloadNotesPdf = () => {
    
    const pdfContent = '...'; 
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${classes3?.title}.pdf`; 
    document.body.appendChild(a);
    a.click();

    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  
  return (
    <Box sx={{ padding: "16px" ,backgroundColor: "#E0E0E0",}}>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pr: "40px",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
  
    <Box  sx={{ display: "flex", gap: "25px",p:4,m:2 }}>
      <Box>
        <Typography
          sx={{
            backgroundColor: "#2E80F9",
            borderRadius: "11px",
            padding: "16px 11px",
            fontfamily: "Poppins",
            fontSize: "21.087px",
            fontWeight: 600,
            lineHeight: "14.761px",
            color: "#FFF",
            fontFamily:"Poppins"
            
          }}
        >
         {oridinalSuffix(selectedClassId)}
        </Typography>
      </Box>
      <Box sx={{ display: "inline-flex", flexDirection: "column", gap: "7px" }}>
        <Typography
          sx={{
            fontfamily: "Poppins",
            fontSize: "16px",
            fontWeight: 900,
            lineHeight: "1.5",
            color: "#333",
            letterSpacing: "1px",
          }}
        >
          Chapter
        </Typography>
        <Typography sx={{ width: "150px",
           fontfamily: "Nunito Sans",
           fontSize: "10.087px",
           fontWeight: 600,
           lineHeight: "14px",
           color: "##000",
           
         }}>
          {Course?.class_name}
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            fontfamily: "Poppins",
            fontSize: "36px",
            fontWeight: 800,
            lineHeight: "1.2",
            color: "#333",
            marginLeft: '0',
            textAlign:"center",
            letterSpacing: "1px", 
            background: "linear-gradient(90deg, #5F1AA4, #00A9FF)", 
            borderRadius: "5px", 
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease", 
            "&:hover": {
              color: "#fff",
              background: "linear-gradient(90deg, #00A9FF, #5F1AA4)", 
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
              transform: "scale(1.05)", 
            },
          }}
        >
          97%
        </Typography>
      </Box>
    </Box>
 
</Box>
              <Box sx={{ display: "flex", gap: "74px" }}>
                <Box sx={{ display: "inline-flex", gap: "8px" }}>
                  <NoteIcon width="22px" height="22px" fill="black" />
                  <Typography
                    sx={{ 
                      fontfamily: "Poppins",
                      fontSize: "16px",
                      fontWeight: 900,
                      lineHeight: "1.5",
                      color: "#333",
                      letterSpacing: "1px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s ease", 
                      "&:hover": {
                        color: "#fff",
                        background: "linear-gradient(90deg, #00A9FF, #5F1AA4)", 
                        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                        transform: "scale(1.05)", 
                      },
                       }}
                  >
                    {Course?.notes?.length} Notes
                  </Typography>
                </Box>
                <Box sx={{ display: "inline-flex", gap: "8px" }}>
                  <SmartDisplayOutlined sx={{ color: "black" }} />
                  <Typography
                sx={{ 
                  fontfamily: "Poppins",
                      fontSize: "16px",
                      fontWeight: 900,
                      lineHeight: "1.5",
                      color: "#333",
                      letterSpacing: "1px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s ease", 
                      "&:hover": {
                        color: "#fff",
                        background: "linear-gradient(90deg, #00A9FF, #5F1AA4)", 
                        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                        transform: "scale(1.05)", 
                      },
                 }}
              >
                {" "}
                {Course?.study_materials?.length} Videos{" "}
              </Typography>
                </Box>
              
              </Box>
            
            </Box>
              
          </Box>
          <Box sx={{ overflowX: "auto", marginTop: "-26px" }}>
            <Box sx={{ display: "flex", gap: "10px" , p:4, m:2}}>
              
                <Card
                  key={Course}
                  sx={{
                    minWidth: "310px",
                    padding: "15px",
                    borderRadius: "16px",
                    boxShadow: "0px 5.044px 38.968px 0px rgba(0, 0, 0, 0.19)",
                    backgroundColor: "#f5f5f5", 
                    transition: "all 0.3s ease", 
                    "&:hover": {
                    backgroundColor: "#e0e0e0", 
                    transform: "scale(1.05)", 
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)", 
                   },
                  }}
                  tabIndex={1}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    sx={{ borderRadius: "9px" }}
                    image={`https://via.placeholder.com/150?text=Chapter+${1}`}
                    alt={`Chapter ${Course}`}
                  />
                  <CardContent sx={{ padding: "0px", pt: "5px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        pb: "5px",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            color: "#000000",
                            fontSize: "12px",
                            fontWeight: 700,
                            lineHeight: "22px",
                          }}
                        >
                          {Course?.class_name}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: "4px" }}>
                        <SandClockIcon />
                        <Typography
                          sx={{
                            color: "#000000",
                            fontSize: "12px",
                            fontWeight: 700,
                            lineHeight: "22px",
                          }}
                        >
                          01:32:00
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ pb: "5px" }}>
                      <Typography
                        sx={{
                          color: "#747474",
                          fontWeight: 700,
                          fontSize: "13px",
                          lineHeight: "22px",
                        }}
                      >
                        By {Course?.instructors[0]?.full_name}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        py: "5px",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "inline-flex", gap: "5px" }}>
                        <CalendarMonthIcon
                          sx={{ color: "#5611B1", width: "15px", height: "15px" }}
                        />
                        <Typography
                          sx={{
                            color: "#747474",
                            fontSize: "10px",
                            fontWeight: 700,
                            lineHeight: "22px",
                          }}
                        >
                          {formatDate(Course?.createdAt)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "inline-flex", gap: "5px" }}>
                        <AccessTimeIcon
                          sx={{ color: "#5611B1", height: "15px", width: "15px" }}
                        />
                        <Typography
                          sx={{
                            color: "#747474",
                            fontSize: "10px",
                            fontWeight: 700,
                            lineHeight: "22px",
                          }}
                        >
                         {formatTime(Course?.createdAt)}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
            
            </Box>
          </Box>
          <Box sx={{
             paddingTop: "16px", 
             pb: "25px" , p:4, m:2,marginTop: "-26px"}}>
            <Typography
              variant="h6"
              sx={{
                color: "#4C4C4C",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "14px",
                pb: "25px",
                "&:hover": {
                color: "#5611B1",  
                cursor: "pointer", 
                transform: "scale(1.05)", 
                transition: "all 0.3s ease", 
      },
              }}
            >
              Study Materials
            </Typography>
            <Box sx={{ overflowX: "auto", marginTop: "8px" }}>
              <Box sx={{ display: "flex", gap: "16px" }}>
                {Course?.study_materials?.map((course,index) => (
                  <Card
                  key={{index}}
                    sx={{
                      minWidth: "320px",
                      borderRadius: "8px",
                      border: "1px solid #CCC",
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex" }}>
                        <Box>
                          <StudyMaterialIcon />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            pr: "23px",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: "#000000",
                              fontSize: "16px",
                              fontWeight: 700,
                              lineHeight: "14px",
                              "&:hover": {
                              color: "#5611B1",  
                              cursor: "pointer", 
                              transform: "scale(1.05)", 
                              transition: "all 0.3s ease", 
                             },
                            }}
                          >
                            Chapter-1
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "12px",
                              color: "#000",
                              fontWeight: 300,
                            }}
                          >
                            {course?.title}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <SaveAltOutlinedIcon sx={{ color: "#8E8383",cursor: "pointer" }} onClick={downloadPdf} tabIndex={2} />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
          <Box sx={{ paddingTop: "16px", pb: "25px", p:4, m:2 ,marginTop: "-26px"}}>
            <Typography
              variant="h6"
              sx={{
                color: "#4C4C4C",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "14px",
                pb: "25px",
                "&:hover": {
                color: "#5611B1",  
                cursor: "pointer", 
                transform: "scale(1.05)", 
                transition: "all 0.3s ease", 
      },
              }}
            >
              Notes
            </Typography>
            <Box sx={{ overflowX: "auto", marginTop: "8px" }}>
              <Box sx={{ display: "flex", gap: "16px" }}>
                {Course?.notes?.map((note,index) => (
                  <Card
                    key={index}
                    sx={{
                      minWidth: "320px",
                      borderRadius: "8px",
                      border: "1px solid #CCC",
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex" }}>
                        <Box>
                          <StudyMaterialIcon />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            pr: "23px",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: "#000000",
                              fontSize: "16px",
                              fontWeight: 700,
                              lineHeight: "14px",
                            }}
                          >
                            {note?.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "12px",
                              color: "#000",
                              fontWeight: 300,
                            }}
                          >
                            {note?.description}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <SaveAltOutlinedIcon sx={{ color: "#8E8383", cursor:"pointer"  }}onClick={downloadNotesPdf} tabIndex={3} />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
        
    </Box>
  );
};

export default SingleCourseStudentView;
