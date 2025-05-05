import { Card, Grid, Box, Typography, CircularProgress } from "@mui/material";
import { ProgressBgLeft, ProgressBgRight } from "utils/images";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";


const CourseProgressCard = () => {
  const batches = [
    // your batch data here (could be empty)
  ];

  const isOddNumber = (num) => {
    return num % 2 !== 0;
  };

  return (
    <Card sx={{ mt: 3, minHeight: "200px" }}>
      <Grid
        xs={12}
        sx={{
          display: "flex",
          backgroundColor: "#FFDCB3",
          borderColor: "#D39349",
          border: "1px",
          padding: "20px",
          p: 2,
          flexDirection: "column",
          height: "100%",
          minHeight: "410px",
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#481D0C",
              textAlign: "start",
              fontWeight: 900,
              fontSize: 20,
              lineHeight: "20px",
            }}
          >
            Course Progress
          </Typography>
        </Box>

        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
            gap: 2,
            flex: 1, // important to center properly
          }}
        >
          {batches.length > 0 ? (
            batches.map((item, index) => (
              <Box
                key={item.name}
                sx={{
                  display: "flex",
                  backgroundImage: `url(${
                    isOddNumber(index + 1) ? ProgressBgLeft : ProgressBgRight
                  })`,
                  backgroundSize: "cover",
                  gap: "136px",
                  borderRadius: 2,
                  alignItems: "center",
                  maxWidth: "320px",
                }}
              >
                {isOddNumber(index + 1) ? (
                  <>
                    <Box sx={{ p: 2 }}>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          lineHeight: "19px",
                          fontWeight: 600,
                          color: "#272835",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 400,
                          fontSize: "13px",
                          lineHeight: "19px",
                        }}
                      >
                        {item.registered} Registered
                      </Typography>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <CircularProgress
                        variant="determinate"
                        value={item.progress}
                        sx={{ zIndex: 100, position: "relative" }}
                        size={75}
                      />
                    </Box>
                  </>
                ) : (
                  <>
                    <Box sx={{ p: 2 }}>
                      <CircularProgress
                        variant="determinate"
                        value={item.progress}
                        sx={{ position: "relative", zIndex: 100 }}
                        size={75}
                      />
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          lineHeight: "19px",
                          fontWeight: 600,
                          color: "#272835",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 400,
                          fontSize: "13px",
                          lineHeight: "19px",
                        }}
                      >
                        {item.registered} Registered
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mt:1,
              }}
            >
             <InfoOutlinedIcon sx={{ fontSize: 40, color: "#6fa8dc", mb: 2 }} />
              <Typography
                sx={{
                  color: "#481D0C",
                  fontWeight: 500,
                  fontSize: "15px",
                  textAlign: "center",
                  mt: 1,
                }}
              >
                "No data available"
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default CourseProgressCard;
