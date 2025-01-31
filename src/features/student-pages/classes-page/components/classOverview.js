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

const ClassCard = ({ type, classDetails, getClass, group }) => {
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
    <Box sx={{ paddingTop: "65px", width: "100%", overflow: "none" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNext sx={{ color: "blue" }} />}
        sx={{ mb: 2 }}
      >
       <p
          // underline="hover"
          style={{
            color: "blue",
            fontSize: "15px",
            fontWeight: 300,
            lineHeight: "32px",
          }}
          // color="inherit"
          onClick={() => handleBack()}
        >
          Classes
        </p>
        <p
          // underline="hover"
          style={{
            color: "blue",
            fontSize: "15px",
            fontWeight: 300,
            lineHeight: "32px",
          }}
          // color="inherit"
          onClick={() => handleBack()}
        >
          {String(type)?.charAt(0).toUpperCase()+type.slice(1)} Class
        </p>
        <Typography
          color="text.primary"
          sx={{ fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}
        >
          {group?.charAt(0).toUpperCase()+group.slice(1)} Class
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
                    color: "#6A0DAD",
                    fontSize: "16px",
                    fontFamily:"Poppins",
                    fontWeight: 600,
                    lineHeight: "16px",
                    pr: 1,
                    mt:3,
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
                    fontFamily:"Poppins",
                    mt:3,
                  }}
                >
                  #{classDetails?.batch?.id}
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "800",
                      mt: 2,
                      ml:15,
                      color: "#000",
                      fontSize: "20px",
                      lineHeight: "16px",
                      fontFamily:"Nunito Sans",
                    }}
                  >
                    Class Details
                  </Typography>
              </Box>
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={8} md={6}>
                <Box sx={{ paddingLeft: "40px" }}>
                 {/* <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "800",
                      mb: 2,
                      color: "#000",
                      fontSize: "20px",
                      lineHeight: "16px",
                      fontFamily:"Nunito Sans",
                    }}
                  >
                    Class Details
                  </Typography>*/}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      ml:8,
                      color: "#495057",
                      fontSize: "20px",
                      lineHeight: "32px",
                      fontFamily:"Nunito Sans",
                    }}
                  >
                    {classDetails?.class_name}
                  </Typography>
                  <Typography
                    sx={{
                      mb: 2,
                      ml:8,
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "16px",
                      color: "#6C757D",
                      pr: "171px",
                      fontFamily:"Nunito Sans",
                    }}
                  >
                    {classDetails?.course?.description}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      mb: 2,
                      borderRadius: "18px",
                      padding: "20px 20px",
                      
                    }}
                  >
                    <Box
                      sx={{
                        gap: "30px",
                        display: "flex",
                        backgroundColor: "#BCE1F1",
                        borderRadius: "18px",
                        padding: "28px 20px",
                        borderTop: "1px solid #427A92", 
                        borderBottom: "2px solid #427A92", 
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
                            fontFamily:"Poppins",
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
                            color: "#427A92",
                            fontFamily:"Poppins",
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
                            fontFamily:"Poppins",
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
                            color: "#427A92",
                            fontFamily:"Poppins",
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
                            fontFamily:"Poppins",
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
                            color: "#427A92",
                            fontFamily:"Poppins",
                          }}
                        >
                          {formatTime(classDetails?.end_time)}
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
                            fontFamily:"Poppins",
                            pb: "6px",
                          }}
                        >
                          Duration
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 500,
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#427A92",
                            fontFamily:"Poppins",
                          }}
                        >
                          {classDetails?.course?.duration} hrs
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <>
   
      {showJoinClassButtons ? (
        <>
           <Typography
        sx={{
          color: "blue",
          fontSize: "20px",
          fontWeight: 800,
          ml:8,
          lineHeight: "32px",
          fontFamily:"Nunito Sans",
          pb: "10px",
        }}
        tabIndex={1}
      >
        Class Meeting Link
      </Typography>

          <Typography
            sx={{
              color: "black",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily:"Nunito Sans",
              lineHeight: "32px",
              ml:8,
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
                ml:6,      
                boxShadow: "0px 6px 34px -8px #A4A4A4", 
                cursor : "pointer",
               "&:hover": {
                background: "linear-gradient(45deg, #FF5733, #EA0234)", 
               transform: "scale(1.05)", 
                boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.2)",
                
                },
            
              }}
              tabIndex={2}
            >
              Join Now
            </Button>

            <Button
              variant="outlined"
              component={Link}
              to="/student/attendances"
              disabled
              sx={{
                
                color: "#0D6EFD",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "24px",
                border: "2px solid #5611B1",
                fontFamily:"Nunito Sans",
                borderRadius: "24px",
              }}
              tabIndex={3}
            >
              Check Attendance
            </Button>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-start", gap: "40px", pt: "5px" }}>
            <Box sx={{ display: "flex", gap: "10px", width: "300px" }}>
              <InfoOutlinedIcon sx={{ color: "#828282", height: '18px', width: '18px',ml:5 }} />
              <Typography
                sx={{
                  color: "gray",
                  fontSize: "11px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  fontFamily:"Nunito Sans",
                
                
                }}
              >
                Make sure your presence in the class & If you are unable to attend, please inform the coordinator.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <InfoOutlinedIcon sx={{ color: "#828282", height: '18px', width: '18px',ml:14,mb:22 }} />
              <Typography
                sx={{
                  color: "gray",
                  fontSize: "11px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  fontFamily:"Nunito Sans",
                  mb:21,
                  
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
                color: "black",
                fontSize: "20px",
                fontWeight: 800,
                lineHeight: "32px",
                fontFamily:"Nunito Sans",
                pb: "10px",
                ml:8,
              }}
            >
              Class Status
            </Typography>    
            <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between",marginRight:'50px', marginBottom: "10px" }}>
              <Typography
                sx={{
                  color: "red",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "32px",
                  marginRight: "10px",
                  fontFamily:"Poppins",
                  ml:8,
                }}
              >
                Class Finished @{formatTime(classDetails?.end_time)}
              </Typography>
              </Box>
              <Button
                variant="outlined"
                component={Link}
                to="/student/attendances"
                sx={{
                 paddingright:"100px",
                  color: "#0D6EFD",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  width:"190px",
                  border: "2px solid #5611B1",
                  borderRadius: "24px",
                  ml:"25px",
                }}
                tabIndex={4}
                onClick={() => handleDownload()}
              >
                Check Attendance
              </Button>
            

            <Box sx={{ display: "flex", justifyContent:'flex-end' ,marginTop: "5px" }}>
              <InfoOutlinedIcon sx={{ color: "#828282", height: '18px', width: '18px', marginRight: '5px' }} />
              <Typography
                sx={{
                  color: "#828282",
                  fontSize: "11px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  fontFamily:"Poppins",
                  mr:95,
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
                      fontFamily:"Nunito Sans",
                      ml:9,
                      mb:1,
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
        <Box
        sx={{
          display: "flex",
          flexDirection: "row", 
          justifyContent: "center", 
          alignItems: "center", 
          padding: "10px", 
          backgroundColor: "#F5F5F5", 
          borderRadius: "8px", 
          border: "1px solid #ddd", 
        }}
      >
        <Typography
          sx={{
            color: "black",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "16px",
            fontFamily:"Nunito Sans",
            mb:1,
          }}
        >
          Once Class Finished Videos will be uploaded
        </Typography>
      </Box>
      
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
            gap: "18px",
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
              tabIndex={5}
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
                  <Typography variant="h5" 
                  sx={{ 
                    fontWeight: "800",
                      mb: 2,
                      color: "#000",
                      fontSize: "20px",
                      lineHeight: "16px",
                      fontFamily:"Nunito Sans",
                       }}>
                    Other Details
                  </Typography>
                  <Box sx={{ display: "flex", gap: "40px", mb: 2 ,}}>
                    <Box
                      sx={{
                        backgroundImage: `url(${ClassStudentViewCard})`,
                        width: "240px",
                        height: "150px",
                        transition: "all 0.3s ease", 
                       "&:hover": {
                        transform: "scale(1.05)", 
                        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                         background: "linear-gradient(120deg, rgb(158, 255, 234) 2.28%, #FF7F50 100%)", 
                         },
                        }}
   >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#000",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "16px",
                          fontFamily:"Poppins",
                          p: "20px",
                          transition: "color 0.3s ease", 
                          "&:hover": {
                            color: "#1976d2", 
                          },
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
                          fontFamily:"Poppins",
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
                        transition: "all 0.3s ease", 
                       "&:hover": {
                        transform: "scale(1.05)", 
                        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                         background: "linear-gradient(120deg,rgb(158, 255, 234) 2.28%, #FF7F50 100%)", 
                         },
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#000000",
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: "16px",
                          fontFamily:"Poppins",
                          p: "20px",
                          transition: "color 0.3s ease", 
                          "&:hover": {
                            color: "#1976d2", 
                          },
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
                          fontFamily:"Poppins",
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
                      transition: "all 0.3s ease", 
                       "&:hover": {
                        transform: "scale(1.05)", 
                        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                         background: "linear-gradient(120deg,rgb(158, 255, 234) 2.28%, #FF7F50 100%)", 
                         },
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
                          fontFamily:"Poppins",
                          pb: "10px",
                          transition: "color 0.3s ease", 
                          "&:hover": {
                            color: "#1976d2", 
                          },
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
                          fontFamily:"Poppins",
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
                      fontFamily:"Nunito Sans",
                      transition: "color 0.3s ease", 
                          "&:hover": {
                            color: "#1976d2", 
                          },
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
                      minHeight: "140px",
                      maxHeight: "200px",
                      overflow: "auto",
                      mb:"140px",
                      
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
                       Once Class Finished Study Materials will be uploaded
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
                              height:"70px",
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
                              <Typography sx={{fontFamily:"Lato",fontSize:"12px",fontWeight:300}}>{item?.title}</Typography>
                              <Typography sx={{fontFamily:"Lato",fontSize:"12px",fontWeight:300}}>{item?.description}</Typography>
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
                                tabIndex={6}
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
