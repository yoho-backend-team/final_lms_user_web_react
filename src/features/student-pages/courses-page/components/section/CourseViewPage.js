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

const SingleCourseStudentView = ({ Course, selectedClassId }) => {
  const classes3 = Course?.notes[0] || [];
  console.log(classes3, "classes3");

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
    <Box sx={{ padding: "16px", backgroundColor: "#F5F5F5", borderRadius: "8px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",width:"97%" }}>
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
            <Box sx={{ display: "flex", gap: "25px", p: 4, m: 2 }}>
              <Box>
                <Typography
                  sx={{
                    backgroundColor: "#2E80F9",
                    borderRadius: "11px",
                    padding: "16px 11px",
                    fontFamily: "Poppins",
                    fontSize: "21px",
                    fontWeight: 600,
                    color: "#FFF",
                  }}
                >
                  {oridinalSuffix(selectedClassId)}
                </Typography>
              </Box>
              <Box sx={{ display: "inline-flex", flexDirection: "column", gap: "7px" }}>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    fontWeight: 900,
                    color: "#333",
                  }}
                >
                  Chapter
                </Typography>
                <Typography sx={{
                  width: "150px",
                  fontFamily: "Nunito Sans",
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "#000",
                }}>
                  {Course?.class_name}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "36px",
                    fontWeight: 800,
                    color: "#333",
                    textAlign: "center",
                    borderRadius: "5px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#5F1AA4",
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
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  fontWeight: 900,
                  color: "#333",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#5F1AA4",
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
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  fontWeight: 900,
                  color: "#333",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#5F1AA4",
                    transform: "scale(1.05)",
                  },
                }}
              >
                {Course?.study_materials?.length} Videos
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ overflowX: "auto", marginTop: "-26px" }}>
          <Box sx={{ display: "flex", gap: "10px", p: 4, m: 2 }}>
            {/* Additional content can be added here */}
          </Box>
        </Box>
        <Box sx={{ paddingTop: "16px", pb: "25px", p: 4, m: 2, marginTop: "-26px" }}>
          <Typography
            variant="h6"
            sx={{
              color: "#4C4C4C",
              fontSize: "16px",
              fontWeight: 600,
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
              {Course?.study_materials?.map((course, index) => (
                <Card
                  key={index}
                  sx={{
                    minWidth: "320px",
                    borderRadius: "8px",
                    border: "1px solid #CCC",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                    },
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
                            "&:hover": {
                              color: "#5611B1",
                              cursor: "pointer",
                              transform: "scale(1.05)",
                              transition: "all 0.3s ease",
                            },
                          }}
                        >
                          {course?.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "12px",
                            color: "#000",
                            fontWeight: 300,
                          }}
                        >
                          {course?.description}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <SaveAltOutlinedIcon sx={{ color: "#8E8383", cursor: "pointer" }} onClick={downloadPdf} />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
        <Box sx={{ paddingTop: "16px", pb: "25px", p: 4, m: 2, marginTop: "-26px" }}>
          <Typography
            variant="h6"
            sx={{
              color: "#4C4C4C",
              fontSize: "16px",
              fontWeight: 600,
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
              {Course?.notes?.map((note, index) => (
                <Card
                  key={index}
                  sx={{
                    minWidth: "320px",
                    borderRadius: "8px",
                    border: "1px solid #CCC",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                    },
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
                        <SaveAltOutlinedIcon sx={{ color: "#8E8383", cursor: "pointer" }} onClick={downloadNotesPdf} />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleCourseStudentView;