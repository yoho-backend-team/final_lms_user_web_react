import {
  Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Avatar,
} from "@mui/material";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import NoteIcon from "assets/icons/noteIcon";
import SmartDisplayOutlined from "@mui/icons-material/SmartDisplayOutlined";
import StudyMaterialIcon from "assets/icons/study-material-icon";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import SandClockIcon from "assets/icons/course/sandClockIcon";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import oridinalSuffix from "utils/course/addOridinalSuffix";
import { handleDownload } from "utils/downloadHelpers";
import { useSpinner } from "context/SpinnerProvider";
import NoDataFoundIcon from "assets/instructor/course/empty.png";

const SingleCourseView = ({ selectedClass, selectedClassId }) => {
  const { showSpinner, hideSpinner } = useSpinner();

  return (
    <Box sx={{ padding: "16px", mt: "12px" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pr: "20px",
        }}
      >
        <Box sx={{ display: "flex", gap: "12px" }}>
          <Box>
            <Typography
              sx={{
                backgroundColor: "#2E80F9",
                borderRadius: "8px",
                padding: "8px 10px",
                fontSize: "20px",
                fontWeight: 600,
                color: "white",
              }}
            >
              {oridinalSuffix(selectedClassId)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Typography
              sx={{
                color: "black",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Chapter
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              {selectedClass?.class_name}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#000000",
              }}
            >
              97%
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Typography sx={{ display: "inline-flex", gap: "6px" }}>
              <NoteIcon width="20px" height="20px" fill="black" />
              <Typography sx={{ fontSize: "13px", fontWeight: 700 }}>
                {selectedClass?.notes?.length} Notes
              </Typography>
            </Typography>
            <Typography sx={{ display: "inline-flex", gap: "6px" }}>
              <SmartDisplayOutlined sx={{ color: "black" }} />
              <Typography sx={{ fontSize: "13px", fontWeight: 700 }}>
                {selectedClass?.study_materials?.length} Videos
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Study Materials Section */}
      <Box sx={{ mt: "12px" }}>
        <Typography
          variant="h6"
          sx={{
            color: "#4C4C4C",
            fontSize: "14px",
            fontWeight: 600,
            mb: "10px",
          }}
        >
          Study Materials
        </Typography>
        <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {selectedClass?.study_materials?.length ? (
            selectedClass?.study_materials.map((material) => (
              <Card
                key={material?._id}
                sx={{
                  minWidth: "300px",
                  borderRadius: "6px",
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
                        flex: 1,
                        ml: "8px",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          mb: "6px",
                        }}
                      >
                        {material?.title}
                      </Typography>
                      <Typography sx={{ fontSize: "12px", fontWeight: 300 }}>
                        {material?.description}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleDownload(material, showSpinner, hideSpinner)
                      }
                    >
                      <SaveAltOutlinedIcon sx={{ color: "#8E8383" }} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Box
              sx={{
                textAlign: "center",
                backgroundColor: "#F9F9F9",
                padding: "16px",
                borderRadius: "6px",
              }}
            >
              <Avatar
                src={NoDataFoundIcon}
                sx={{ width: "80px", height: "80px", margin: "0 auto" }}
                variant="square"
              />
              <Typography
                sx={{
                  color: "#888",
                  fontSize: "14px",
                  fontWeight: 400,
                  mt: "10px",
                }}
              >
                No Data Found
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Notes Section */}
      <Box sx={{ mt: "12px" }}>
        <Typography
          variant="h6"
          sx={{
            color: "#4C4C4C",
            fontSize: "14px",
            fontWeight: 600,
            mb: "10px",
          }}
        >
          Notes
        </Typography>
        <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {selectedClass?.notes?.map((material) => (
            <Card
              key={material?._id}
              sx={{
                minWidth: "300px",
                borderRadius: "6px",
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
                      flex: 1,
                      ml: "8px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        mb: "6px",
                      }}
                    >
                      {material?.title}
                    </Typography>
                    <Typography sx={{ fontSize: "12px", fontWeight: 300 }}>
                      {material?.description}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleDownload(material, showSpinner, hideSpinner)
                    }
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
  );
};

export default SingleCourseView;
