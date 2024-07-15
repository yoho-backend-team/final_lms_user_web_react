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

const SingleCourseStudentView = ({ Course }) => {
  const classes = Course?.batches[0]?.classes || [];
  console.log(Course, "Course Student")
  return (
    <Box sx={{ padding: "16px" }}>
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
  {classes.map((chapter, index) => (
    <Box key={index} sx={{ display: "flex", gap: "15px" }}>
      <Box>
        <Typography
          sx={{
            backgroundColor: "#2E80F9",
            borderRadius: "11px",
            padding: "16px 11px",
            fontSize: "21px",
            fontWeight: 600,
            lineHeight: "14px",
            color: "white",
          }}
        >
          1st
        </Typography>
      </Box>
      <Box sx={{ display: "inline-flex", flexDirection: "column", gap: "7px" }}>
        <Typography
          sx={{
            color: "black",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "11px",
          }}
        >
          Chapter
        </Typography>
        <Typography sx={{ width: "150px" }}>
          {chapter?.class_name}
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: 900,
            lineHeight: "40px",
            color: "#000000",
          }}
        >
          97%
        </Typography>
      </Box>
    </Box>
  ))}
</Box>
              <Box sx={{ display: "flex", gap: "74px" }}>
                <Box sx={{ display: "inline-flex", gap: "8px" }}>
                  <NoteIcon width="22px" height="22px" fill="black" />
                  <Typography
                    sx={{ fontSize: "13px", fontWeight: 700, lineHeight: "22px" }}
                  >
                    2 Notes
                  </Typography>
                </Box>
                <Box sx={{ display: "inline-flex", gap: "8px" }}>
                  <SmartDisplayOutlined sx={{ color: "black" }} />
                  <Typography
                    sx={{ fontSize: "13px", fontWeight: 700, lineHeight: "22px" }}
                  >
                    32 Videos
                  </Typography>
                </Box>
              
              </Box>
            
            </Box>
              
          </Box>
          <Box sx={{ overflowX: "auto", marginTop: "16px" }}>
            <Box sx={{ display: "flex", gap: "16px" }}>
              {classes.map((chapter) => (
                <Card
                  key={chapter}
                  sx={{
                    minWidth: "200px",
                    padding: "15px",
                    borderRadius: "16px",
                    boxShadow: "0px 5.044px 38.968px 0px rgba(0, 0, 0, 0.19)",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    sx={{ borderRadius: "9px" }}
                    image={`https://via.placeholder.com/150?text=Chapter+${1}`}
                    alt={`Chapter ${chapter}`}
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
                          {chapter?.class_name}
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
                        By {chapter?.instructors[0]?.full_name}
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
                          {formatDate(chapter?.createdAt)}
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
                         {formatTime(chapter?.createdAt)}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
          <Box sx={{ paddingTop: "16px", pb: "25px" }}>
            <Typography
              variant="h6"
              sx={{
                color: "#4C4C4C",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "14px",
                pb: "25px",
              }}
            >
              Study Materials
            </Typography>
            <Box sx={{ overflowX: "auto", marginTop: "8px" }}>
              <Box sx={{ display: "flex", gap: "16px" }}>
                {Course?.studymaterials?.map((course,index) => (
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
                          <SaveAltOutlinedIcon sx={{ color: "#8E8383" }} />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
          <Box sx={{ paddingTop: "16px", pb: "25px" }}>
            <Typography
              variant="h6"
              sx={{
                color: "#4C4C4C",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "14px",
                pb: "25px",
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
                            {note.title}
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
                          <SaveAltOutlinedIcon sx={{ color: "#8E8383" }} />
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
