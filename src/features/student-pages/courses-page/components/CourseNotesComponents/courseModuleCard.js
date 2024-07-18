import { Grid, Typography, Box } from "@mui/material";
import oridinalSuffix from "utils/course/addOridinalSuffix";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import NoteIcon from "assets/icons/noteIcon";
import { useTabResponsive } from "utils/tabResponsive";

const CourseStudentModuleCard = ({
  id,
  style,
  title,
  progress,
  notes,
  videos,
  closeCourseView,
  openCourseView,
  module
}) => {
  const { tabView } = useTabResponsive();
  const currentModule = module
  return (
    <Grid
      onClick={()=>openCourseView(currentModule)}
      item
      sx={{
        width: "291px",
        height: "247px",
        borderRadius: "12px",
        padding: "25.867px 23.1px 30.367px 23px",
        background: `linear-gradient(${style.card})`,
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          justifyContent: "flex-start",
          pb: "24px",
          alignItems: "center",
          fontSize: "21px",
          fontWeight: 600,
          lineHeight: "14px",
        }}
      >
        <Typography
          sx={{
            padding: "10px",
            backgroundColor: style.background,
            color: style.color,
            borderRadius: "12px",
          }}
        >
          {oridinalSuffix(id)}
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "11px",
          }}
        >
          Chapter
        </Typography>
      </Box>
      <Box sx={{ pb: "24px", display: "flex", gap: "31px" }}>
        <Typography
          sx={{
            color: "white",
            fontSize: "13px",
            fontWeight: 800,
            lineHeight: "22px",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: "38px",
            fontWeight: 900,
            lineHeight: "40px",
          }}
        >
          {progress}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "inline-flex", gap: "5px", alignItems: "center" }}>
          <NoteIcon color="white" width="22px" heiht="22px" fill="white" />
          <Typography
            sx={{
              color: "white",
              fontSize: "13px",
              fontWeight: 700,
              lineHeight: "22px",
            }}
          >
            {notes?.length} Notes
          </Typography>
        </Box>
        <Box sx={{ display: "inline-flex", gap: "5px" }}>
          <SmartDisplayOutlinedIcon
            sx={{ color: "white", height: "22px", width: "22px" }}
          />
          <Typography
            sx={{
              color: "white",
              fontSize: "13px",
              fontWeight: 700,
              lineHeight: "22px",
            }}
          >
            {videos} Videos
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default CourseStudentModuleCard;
