// ClassCard.js
import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  Breadcrumbs,
  Link,
  AvatarGroup,
  Avatar,
  Tooltip,
} from "@mui/material";
import NavigateNext from "@mui/icons-material/NavigateNext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useNavigate } from "react-router-dom";
import Attendance from "./Attedence/Attedance";
import {
  ClassStudentViewCard,
  ClassCoordinatorViewCard,
  ClassInstructorViewCard,
} from "utils/images";
import { formatDate, formatTime } from "utils/formatDate";
import { profilePlaceholder } from "utils/placeholders";
import { getImageUrl } from "utils/common/imageUtlils";
import { fileUpload, getFile } from "features/common/upload";
import toast from "react-hot-toast";
import { updateClassDetails } from "../services";
import StudyMaterialUpload from "./model/studyMaterialUpload";
import NotesUpload from "./model/notesUpload";
import StudyMaterialIcon from "assets/icons/study-material-icon";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import { useSpinner } from "context/SpinnerProvider";
import VideoUpload from "./model/videoUpload";
import VideoCard from "./card/videoCard";

const ClassCard = ({ type, classDetails, getClass,group }) => {
  const navigate = useNavigate();
  const [showAttendance, setShowAttendance] = useState(false);
  const { showSpinner, hideSpinner } = useSpinner();
  const isUpCommingClass = group === "upcoming" ? true : false

  const handleStartAttendance = () => {
    setShowAttendance(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleFileChange = async (event, setFieldValue) => {
    try {
      showSpinner();
      const files = event.target.files;
      const formData = new FormData();
      formData.append("file", files[0]);
      const response = await fileUpload(formData);
      setFieldValue("file", response?.file);
      toast.success("notes upload successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      hideSpinner();
    }
  };

  const updateClass = async (values) => {
    try {
      showSpinner();
      const data = { ...values, uuid: classDetails?.uuid, type };
      const response = await updateClassDetails(data);
      toast.success("class updated successfully");
      getClass();
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };

  const handleStudyMaterialUpload = async (event, setFieldValue) => {
    try {
      showSpinner();
      const files = event?.target?.files;
      const data = new FormData();
      data.append("file", files[0]);
      const response = await fileUpload(data);
      toast.success("study material upload success fully");
      setFieldValue("file", response?.file);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
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
          {String(type)?.charAt(0).toUpperCase()+type.slice(1)} Class
        </Link>
        <Typography
          color="text.primary"
          sx={{ fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}
        >
          {group?.charAt(0).toUpperCase()+group.slice(1)} Class
        </Typography>
      </Breadcrumbs>
      {!showAttendance ? (
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
                  <Box sx={{ display: "flex", gap: "72px", pt: "5px" }}>
                    {
                      isUpCommingClass ?
                      <Button
                      variant="contained"
                      sx={{
                        borderRadius: "24px",
                        backgroundColor: "#5611B1",
                        padding: "16px 88px",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: 600,
                        lineHeight: "24px",
                      }}
                      >
                        Host Now
                      </Button>
                      :
                      <Typography sx={{ color:"#828282", fontSize:"14px",fontWeight:400,lineHeight:"32px"}} >Class Finished {formatDate(classDetails?.start_date)} - {formatTime(classDetails?.end_time)}</Typography>
                    }
                    <Button
                      variant={ isUpCommingClass ? "outlined" : "contained" }
                      onClick={() => handleStartAttendance()}
                      sx={{
                        padding: "8px 18px",
                        color: isUpCommingClass ? "#5611B1" : "white" ,
                        backgroundColor : isUpCommingClass ? "transparent" : "#0D6EFD",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        border: `2px solid ${isUpCommingClass ? "#5611B1" : "#0D6EFD" }`,
                        borderRadius: "24px",
                        ":hover":{
                          backgroundColor : isUpCommingClass ? "transparent" : "#0D6EFD",
                        }
                      }}
                    >
                      {isUpCommingClass? "Start Attendance": "Attendance Log" }
                    </Button>
                  </Box>
                  <Box sx={{ display: "flex", gap: "80px", pt: "5px" }}>
                    <Box
                      sx={{
                        display: isUpCommingClass ? "inline-flex" : "hidden",
                        gap: "10px",
                        width: "200px",
                      }}
                    >
                      <InfoOutlinedIcon sx={{ color: "#828282", display: isUpCommingClass ? "block" : "none" }} />
                      <Typography
                        sx={{
                          display: group !== "upcoming" && "none",
                          color: "#828282",
                          fontSize: "12px",
                          fontWeight: 700,
                          lineHeight: "20px",
                        }}
                      >
                        {
                          isUpCommingClass &&
                          "Please host the class 10 minutes of the class starting time"
                        }
                        
                      </Typography>
                    </Box>
                    <Box sx={{ display: "inline-flex", gap: "10px" }}>
                      <InfoOutlinedIcon sx={{ color: "#828282" }} />
                      <Typography
                        sx={{
                          color: "#828282",
                          fontSize: "11px",
                          fontWeight: 400,
                          lineHeight: "20px",
                        }}
                      >
                        {
                          isUpCommingClass ?
                          "Once started with class please start your attendance"
                          :
                          "If any Issue in attendance please raise a Ticket"
                        }
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "20px",
                      fontWeight: 800,
                      lineHeight: "32px",
                    }}
                  >
                    Session Videos
                  </Typography>
                  {
                    classDetails?.videos?.length !== 0 && 
                    (
                      classDetails?.videos?.map((video)=>
                       <Box sx={{ height: "120px", width: "241px"}} >
                         <VideoCard url={video?.url} />
                      </Box>
                      )
                    )
                  }
                  <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "33px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "16px",
                        }}
                      >
                        Once Class Finished Upload Videos
                      </Typography>
                     <VideoUpload 
                     updateClass={updateClass}
                     />
                    </Box>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "20px",
                      fontWeight: 800,
                      lineHeight: "32px",
                    }}
                  >
                    Notes
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
                        {classDetails?.notes?.map((item) => (
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
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "33px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "16px",
                        }}
                      >
                        Upload Notes
                      </Typography>
                      <NotesUpload
                        classDetails={classDetails}
                        handleFileChange={handleFileChange}
                        updateClass={updateClass}
                      />
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
                      <StudyMaterialUpload
                        classDetails={classDetails}
                        handleFileChange={handleStudyMaterialUpload}
                        updateClass={updateClass}
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        Once the class is finished, please upload the Study
                        Materials.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <Attendance
          setShowAttendance={setShowAttendance}
          classDetails={classDetails}
        />
      )}
    </Box>
  );
};

export default ClassCard;
