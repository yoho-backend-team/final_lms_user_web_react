import React from "react";
import {
  Typography,
  Box,
  Button,
  Grid,
  Breadcrumbs,
  AvatarGroup,
  Avatar,
  Tooltip,
} from "@mui/material";
import NavigateNext from "@mui/icons-material/NavigateNext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate, Link } from "react-router-dom";
import {
  ClassStudentViewCard,
  ClassCoordinatorViewCard,
  ClassInstructorViewCard,
} from "utils/images";
import { formatDate, formatTime } from "utils/formatDate";
import { profilePlaceholder } from "utils/placeholders";
import { getImageUrl } from "utils/common/imageUtlils";
import { getFile } from "features/common/upload";
import StudyMaterialIcon from "assets/icons/study-material-icon";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import { useSpinner } from "context/SpinnerProvider";

const ClassCard = ({ type, classDetails, getClass }) => {
  const navigate = useNavigate();
  const { showSpinner, hideSpinner } = useSpinner();

  const showJoinClassButtons = classDetails?.study_materials?.length === 0 || classDetails?.notes?.length === 0;

  const handleBack = () => {
    navigate(-1);
  };


  const handleDownload = async (item) => {
    try {
      showSpinner();
      const url = getImageUrl(item?.file);
      const response = await getFile(url);
      const blob = new Blob([response?.data], {
        type: response?.headers["content-type"],
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = item.file?.split("/")[2];
      link.click();

      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.log(error, "error");
    } finally {
      hideSpinner();
    }
  };

  return (
    <Box sx={{ paddingTop: "40px", width: "100%", overflow: "auto" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNext sx={{ color: "blue" }} />}
        sx={{ mb: 2 }}
      >
        <Link
          underline="hover"
          sx={{
            color: "#484848",
            fontSize: "28px",
            fontWeight: "700",
            lineHeight: "22px",
          }}
          color="inherit"
          href="#"
        >
          Classes
        </Link>
        <Link
          underline="hover"
          sx={{
            color: "#495057",
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "32px",
          }}
          color="inherit"
          href="#"
        >
          {type} Class
        </Link>
        <Typography
          color="text.primary"
          sx={{ fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}
        >
          Upcoming Class
        </Typography>
      </Breadcrumbs>
        <Box
          sx={{
            boxShadow: "0px 0px 64px 0px rgba(0, 0, 0, 0.14)",
            borderRadius: "10px",
            border: "1px solid #C3C3C3",
            backgroundColor: "white",
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Box sx={{ padding: "20px" }}>
            <Box sx={{ display: "flex", gap: "24px", mb: 3 }}>
              <ArrowBackIcon
                onClick={() => handleBack()}
                sx={{ cursor: "pointer" }}
              />
              <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    color: "#ADB5BD",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "16px",
                    pr: 1,
                  }}
                >
                  Batch No:
                </Typography>
                <Typography
                  sx={{
                    color: "#495057",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "24px",
                  }}
                >
                  #{classDetails?.batch?.id}
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={8} md={6}>
                <Box sx={{ paddingLeft: "40px" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "800",
                      mb: 2,
                      color: "#000",
                      fontSize: "20px",
                      lineHeight: "16px",
                    }}
                  >
                    Class Details
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: "#495057",
                      fontSize: "20px",
                      lineHeight: "32px",
                    }}
                  >
                    {classDetails?.class_name}
                  </Typography>
                  <Typography
                    sx={{
                      mb: 2,
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "16px",
                      color: "#6C757D",
                      pr: "171px",
                    }}
                  >
                    {classDetails?.course?.description}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        gap: "40px",
                        display: "flex",
                        backgroundColor: "#DFC7FF",
                        borderRadius: "16px",
                        padding: "26px 38px",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#000",
                            fontSize: "16px",
                            fontWeight: 600,
                            lineHeight: "16px",
                            pb: "6px",
                          }}
                        >
                          Date
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 500,
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#7149A5",
                          }}
                        >
                          {formatDate(classDetails?.start_date)}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#000",
                            fontSize: "16px",
                            fontWeight: 600,
                            lineHeight: "16px",
                            pb: "6px",
                          }}
                        >
                          Start At
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 500,
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#7149A5",
                          }}
                        >
                          {formatTime(classDetails?.start_time)}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#000",
                            fontSize: "16px",
                            fontWeight: 600,
                            lineHeight: "16px",
                            pb: "6px",
                          }}
                        >
                          End At
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 500,
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#7149A5",
                          }}
                        >
                          {formatTime(classDetails?.end_time)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <>
   
      {showJoinClassButtons ? (
        <>
           <Typography
        sx={{
          color: "#495057",
          fontSize: "20px",
          fontWeight: 800,
          lineHeight: "32px",
          pb: "10px",
        }}
      >
        Class Meeting Link
      </Typography>

          <Typography
            sx={{
              color: "#828282",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "32px",
            }}
          >
            Join the class @{formatTime(classDetails?.start_time)}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-start", gap: "200px", pt: "5px" }}>
            <Button
              variant="contained"
              sx={{
                borderRadius: "24px", 
                backgroundColor: "#0D6EFD",
                padding: "8px 18px", 
                color: "white",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "24px",
                width: "220px", 
                height: "46px",       
                boxShadow: "0px 6px 34px -8px #A4A4A4", 
              }}
            >
              Join Now
            </Button>

            <Button
              variant="outlined"
              component={Link}
              to="/student/attendances"
              disabled
              sx={{
                padding: "8px 18px",
                color: "#5611B1",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "24px",
                border: "2px solid #5611B1",
                borderRadius: "24px",
              }}
            >
              Check Attendance
            </Button>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-start", gap: "40px", pt: "5px" }}>
            <Box sx={{ display: "flex", gap: "10px", width: "300px" }}>
              <InfoOutlinedIcon sx={{ color: "#828282", height: '18px', width: '18px' }} />
              <Typography
                sx={{
                  color: "#828282",
                  fontSize: "11px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Make sure your presence in the class & If you are unable to attend, please inform the coordinator.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <InfoOutlinedIcon sx={{ color: "#828282", height: '18px', width: '18px' }} />
              <Typography
                sx={{
                  color: "#828282",
                  fontSize: "11px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                If any Issue in attendance please raise a Ticket
              </Typography>
            </Box>
          </Box>
        </>
      ) : (
        <>
        <Typography
              sx={{
                color: "#495057",
                fontSize: "20px",
                fontWeight: 800,
                lineHeight: "32px",
                pb: "10px",
              }}
            >
              Class Status
            </Typography>    
            <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between",marginRight:'50px', marginBottom: "10px" }}>
              <Typography
                sx={{
                  color: "#828282",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "32px",
                  marginRight: "10px"
                }}
              >
                Class Finished @{formatTime(classDetails?.end_time)}
              </Typography>

              <Button
                variant="outlined"
                component={Link}
                to="/student/attendances"
                sx={{
                  padding: "8px 18px",
                  color: "#5611B1",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  border: "2px solid #5611B1",
                  borderRadius: "24px",
                }}
              >
                Check Attendance
              </Button>
            </Box>

            <Box sx={{ display: "flex", justifyContent:'flex-end' ,marginTop: "5px" }}>
              <InfoOutlinedIcon sx={{ color: "#828282", height: '18px', width: '18px', marginRight: '5px' }} />
              <Typography
                sx={{
                  color: "#828282",
                  fontSize: "11px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                If any Issue in attendance please raise a Ticket
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </>

                 
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "20px",
                      fontWeight: 800,
                      lineHeight: "32px",
                    }}
                  >
                    Session Notes
                  </Typography>
                  <Box
  sx={{
    display: "flex",
    gap: "40px",
    flexDirection: "column",
  }}
>
  <Box>
    <Box
      sx={{
        display: "flex",
        pl: "30px",
        pt: "36px",
        gap: "20px",
        flexDirection: "column",
        width: "max-content",
        pb: "20px",
        justifyContent: "flex-start",
      }}
    >
      {classDetails?.notes?.length === 0 && ( 
        <Typography
          sx={{
            color: "black",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "16px",
          }}
        >
          Once Class Finished Videos will be uploaded
        </Typography>
      )}
      {classDetails?.notes?.map((item) => (
        <Box
          key={item.id} 
          sx={{
            display: "flex",
            padding: "14px 20px 14px 5px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #CCCCCC",
            borderRadius: "8px",
            gap: "23px",
          }}
        >
          <Box>
            <StudyMaterialIcon />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "flex-start",
              alignItems: "start",
            }}
          >
            <Typography>{item?.title}</Typography>
            <Typography>{item?.description}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "column",
            }}
          >
            <SaveAltOutlinedIcon
              sx={{
                color: "#8E8383",
                height: "24px",
                width: "24px",
                cursor: "pointer",
              }}
              onClick={() => handleDownload(item)}
            />
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
</Box>

                </Box>
              </Grid>
              <Grid item xs={8} md={6}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Other Details
                  </Typography>
                  <Box sx={{ display: "flex", gap: "40px", mb: 2 }}>
                    <Box
                      sx={{
                        backgroundImage: `url(${ClassStudentViewCard})`,
                        width: "240px",
                        height: "150px",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#000",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "16px",
                          p: "20px",
                        }}
                      >
                        Students
                      </Typography>
                      <Box sx={{ px: "20px" }}>
                        <AvatarGroup
                          total={classDetails?.batch?.student?.length}
                        >
                          {classDetails?.batch?.student?.map((user) => (
                            <Tooltip
                              title={user?.full_name}
                              key={user?.full_name}
                            >
                              <Avatar
                                src={
                                  user?.image
                                    ? getImageUrl(user?.image)
                                    : profilePlaceholder
                                }
                              />
                            </Tooltip>
                          ))}
                        </AvatarGroup>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "500",
                          fontSize: "12px",
                          lineHeight: "16px",
                          color: "#435D85",
                          p: "20px",
                        }}
                      >
                        {" "}
                        Total {classDetails?.batch?.student?.length}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        backgroundImage: `url(${ClassInstructorViewCard})`,
                        width: "240px",
                        height: "150px",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#000000",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "16px",
                          p: "20px",
                        }}
                      >
                        Instructors
                      </Typography>
                      <Box sx={{ px: "20px" }}>
                        <AvatarGroup total={classDetails?.instructors?.length}>
                          {classDetails?.instructors?.map((user) => (
                            <Tooltip
                              title={user?.full_name}
                              key={user?.full_name}
                            >
                              <Avatar
                                src={
                                  user?.image
                                    ? getImageUrl(user?.image)
                                    : profilePlaceholder
                                }
                              />
                            </Tooltip>
                          ))}
                        </AvatarGroup>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "500",
                          fontSize: "12px",
                          lineHeight: "16px",
                          color: "#435D85",
                          p: "20px",
                        }}
                      >
                        {" "}
                        Total {classDetails?.instructors?.length}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      mt: 2,
                      backgroundImage: `url(${ClassCoordinatorViewCard})`,
                      width: "240px",
                      height: "150px",
                      pt: "5px",
                    }}
                  >
                    {/* <Typography variant="body1" sx={{ fontWeight: '500',fontSize:"12px",lineHeight:"16px",color:"#435D85",p:"20px" }} >Jerome Bell</Typography> */}
                    <Box sx={{ padding: "20px" }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#000000",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "16px",
                          pb: "10px",
                        }}
                      >
                        Student Details
                      </Typography>
                      <AvatarGroup total={classDetails?.batch?.student?.length}>
                        {classDetails?.batch?.student?.map((user) => (
                          <Tooltip
                            title={user?.full_name}
                            key={user?.full_name}
                          >
                            <Avatar
                              src={
                                user?.image
                                  ? getImageUrl(user?.image)
                                  : profilePlaceholder
                              }
                            />
                          </Tooltip>
                        ))}
                      </AvatarGroup>
                      <Typography
                        sx={{
                          color: "#91642E",
                          fontWeight: 500,
                          fontSize: "12px",
                          lineHeight: "16px",
                          pt: "10px",
                        }}
                      >
                        Total {classDetails?.batch?.student?.length}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ mt: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                      color: "#000",
                      fontSize: "20px",
                    }}
                  >
                    Study Materials
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      textAlign: "center",
                      border: "1px solid #C3C3C3",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 64px 0px rgba(0, 0, 0, 0.14)",
                      minHeight: "200px",
                      maxHeight: "200px",
                      overflow: "auto",
                    }}
                  >
                    <Box sx={{ overflow: "auto" }}>
                      <Box
                        sx={{
                          display: "flex",
                          pl: "30px",
                          pt: "36px",
                          gap: "20px",
                          flexDirection: "column",
                          width: "max-content",
                          pb: "20px",
                        }}
                      >                
                      {classDetails?.study_materials?.length === 0 && ( 
                        <Typography
                          sx={{
                            color: "black",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "16px",
                          }}
                        >
                       Once Class Finished Study Materials will be upoaded
                        </Typography>
                      )}      
                        {classDetails?.study_materials?.map((item) => (
                          <Box
                            sx={{
                              display: "flex",
                              padding: "14px 20px 14px 5px",
                              backgroundColor: "#FFFFFF",
                              border: "1px solid #CCCCCC",
                              borderRadius: "8px",
                              gap: "23px",
                            }}
                          >
                            <Box>
                              <StudyMaterialIcon />
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                justifyContent: "flex-start",
                                alignItems: "start",
                              }}
                            >
                              <Typography>{item?.title}</Typography>
                              <Typography>{item?.description}</Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                flexDirection: "column",
                              }}
                            >
                              <SaveAltOutlinedIcon
                                sx={{
                                  color: "#8E8383",
                                  height: "24px",
                                  width: "24px",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleDownload(item)}
                              />
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      
    </Box>
  );
};

export default ClassCard;