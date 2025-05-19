import { Card, Grid, Box, Typography, CircularProgress } from "@mui/material";
import { ProgressBgLeft, ProgressBgRight } from "utils/images";

const CourseProgressCard = () => {
  const batches = [
    {
      name: "Batch A",
      registered: 78,
      progress: 32,
      progressColor: "#B40000",
      backgroundColor: "#FDCBCB",
    },
    {
      name: "Batch B",
      registered: 78,
      progress: 82,
      progressColor: "#60CB50",
      backgroundColor: "#C9FEC1",
    },
    //  { name: 'Batch C', registered: 78, progress: 52, progressColor: '#23A2CB', backgroundColor: '#A9E5F8' },
    //  { name: 'Batch D', registered: 78, progress: 80, progressColor: '#6600EB', backgroundColor: '#D2AFFF' },
  ];

  const isOddNumber = (num) => {
    return num % 2 !== 0;
  };

  return (
    <Card sx={{ mt: 3}}>
      <Grid
        xs={12}
        sx={{
          display: "flex",
          backgroundColor: "#FFDCB3",
          borderColor: "#D39349",
          border: "1px",
          padding : "20px",
          p: 2,
          flexDirection: "column",
          height: "100%",
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
            justifyContent: "space-between",
            mt: 2,
            gap: 2,
            justifyContent: "center",
          }}
        >
          {batches?.map((item, index) => (
            <>
              {isOddNumber(index + 1) ? (
                <Box
                  key={item.name}
                  sx={{
                    display: "flex",
                    // clipPath: "polygon(0 0, 100% 15%, 100% 75%, 0% 100%)",
                    backgroundImage: `url(${ProgressBgLeft})`,
                    backgroundSize: "cover",
                    gap: "136px",
                    borderRadius: 2,
                    alignItems: "center",
                    maxWidth: "320px"
                  }}
                >
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
                </Box>
              ) : (
                <Box
                  key={item.name}
                  sx={{
                    display: "flex",
                    // clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 75%);",
                    backgroundImage: `url(${ProgressBgRight})`,
                    backgroundSize: "cover",
                    // backgroundColor: "white",
                    gap: "136px",
                    alignItems: "center",
                  }}
                >
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
                </Box>
              )}
            </>
          ))}
        </Grid>
      </Grid>
    </Card>
  );
};

export default CourseProgressCard;
