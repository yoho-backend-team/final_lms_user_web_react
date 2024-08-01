import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  IconButton,
  Button,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BoySharpIcon from "@mui/icons-material/BoySharp";
import Groups2Icon from "@mui/icons-material/Groups2";
import {
  getprofilewithId,
  UpdateprofilewithId,
  changePassword,
} from "features/student-pages/Profile-page/services";
import { getImageUrl } from "utils/common/imageUtlils";
import studentheaderpic from "../../../assets/images/background/studentprofile.svg";
import { fileUpload } from "features/common/upload";
import toast from "react-hot-toast";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, Link } from "react-router-dom";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import { FaIdCard } from "react-icons/fa";
import asignedicon from "../../../assets/images/icons/assigned.svg";
import percentage from "../../../assets/images/icons/percentage.svg";
import pendingcourse from "../../../assets/images/icons/pendingcourse.svg";
import { CircularProgressWithLabel } from "./CircularProgress";
import ProgressChart from "./Charts";
import { useSpinner } from "context/SpinnerProvider";
import PasswordIcon from "@mui/icons-material/Password";
import EnterNewPassword from "./../../../features/Auth/Forms/newPassword";
import Client from "../../../api/index";

const ProfilePage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const { showSpinner, hideSpinner } = useSpinner();

  const [personalInfo, setPersonalInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    contact: "",
    address1: "",
    address2: "",
    pincode: "",
    image: "",
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [editing, setEditing] = useState(false);

  const [editedPersonalInfo, setEditedPersonalInfo] = useState({});

  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      showSpinner();
      const response = await getprofilewithId();
      setPersonalInfo({
        ...response,
        contact: response.contact_info.phone_number,
        address1: response.contact_info.address1,
        address2: response.contact_info.address2,
        pincode: response.contact_info.pincode,
      });
      setEditedPersonalInfo({
        ...response,
        contact: response.contact_info.phone_number,
        address1: response.contact_info.address1,
        address2: response.contact_info.address2,
        pincode: response.contact_info.pincode,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      hideSpinner();
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const editProfile = async () => {
    try {
      const data = {
        ...editedPersonalInfo,
        contact_info: {
          ...editedPersonalInfo?.contact_info,
          phone_number: editedPersonalInfo?.contact,
          address1: editedPersonalInfo?.address1,
          address2: editedPersonalInfo?.address2,
          pincode: editedPersonalInfo?.pincode,
        }
      }
      
      const updatedData = await UpdateprofilewithId(data);
      
      setPersonalInfo(updatedData);
      setEditing(false);
      navigate("student/home");
      toast.success("Profile Updated Sucessfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedPersonalInfo({
      ...editedPersonalInfo,
      [field]: value,
    });
  };

  const fileEditHandler = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const imageUrl = await fileUpload(formData);
      console.log(imageUrl, "image");
      setPersonalInfo({
        ...personalInfo,
        image: imageUrl.file,
      });

      setEditedPersonalInfo({
        ...editedPersonalInfo,
        image: imageUrl?.file,
      });

      toast.success("File changed successfully");
    } catch (error) {
      toast.error(error?.message);
    }
  };
  console.log(personalInfo, "personalInfor");
  const genderIcon =
    personalInfo.gender === "male" ? <MaleIcon /> : <FemaleIcon />;
  const image = getImageUrl(personalInfo.image);

  const infoItems = [
    {
      icon: <MailOutlineIcon />,
      label: "Mail Address",
      value: personalInfo.email,
    },
    {
      icon: <PersonIcon />,
      label: "Name",
      value: `${personalInfo.first_name} ${personalInfo.last_name}`,
    },
    { icon: genderIcon, label: "Gender", value: personalInfo.gender },
    {
      icon: <PhoneIcon />,
      label: "Contact Number",
      value: personalInfo.contact,
    },
    {
      icon: <CalendarTodayIcon />,
      label: "Date of Birth",
      value: personalInfo.dob,
    },
    {
      icon: <LocationOnIcon />,
      label: "Pin Code",
      value: personalInfo.pincode,
    },
    {
      icon: <HomeIcon />,
      label: "Address",
      value: `${personalInfo.address1}, ${personalInfo.address2}`,
    },
  ];

  const Instituteinfo = [
    {
      icon: <AutoStoriesIcon />,
      label: "Course",
      value: personalInfo?.userDetail?.course?.course_name,
    },
    {
      icon: <Groups2Icon />,
      label: "Batch",
      value: personalInfo?.userDetail?.course?.course_name,
    },
    {
      icon: <BoySharpIcon />,
      label: "Roll Number",
      value: personalInfo.userDetail?.id,
    },
    {
      icon: <FaIdCard style={{ fontSize: "23px" }} />,
      label: "Student ID",
      value: personalInfo?.userDetail?.id,
    },
  ];

  const AcademicInfo = [
    {
      icon: <img src={percentage} alt="percentage" />,
      label: "Total Percentage",
      value: "75%",
    },
    {
      icon: <img src={asignedicon} alt="Assigned icon" />,
      label: "Projects Assigned",
      value: "2",
    },
    {
      icon: <img src={pendingcourse} alt="pendingcourse" />,
      label: "Pending Course",
      value: "4",
    },
  ];
  const handleNavigateBack = () => {
    navigate("student/home");
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSave = async () => {
    const newErrors = {
      oldPassword: !oldPassword,
      newEmail: !newPassword,
      confirmPassword: !confirmPassword,
    };
    setErrors(newErrors);
    if (oldPassword && newPassword) {
      try {
        const response = await changePassword({
          oldPassword,
          newPassword,
          email: editedPersonalInfo.email,
          confirmPassword,
        });
        console.log(response, "responce");
        if (response.status === "success") {
          navigate("/student/login");
          toast.success("Password updated successfully");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          toast.error(response.message || "Error updating password");
        }
      } catch (error) {
        toast.error(error.message || "Error updating password");
      }
    }
  };

  return (
    <Box sx={{ p: 5 }}>
      <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
        <Typography
          variant="body1"
          style={{
            color: "black",
            fontFamily: "Nunito Sans",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "22px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            marginTop: isSmallScreen ? "auto" : "36px",
          }}
          onClick={handleNavigateBack}
        >
          <KeyboardBackspaceIcon style={{ marginRight: "5px" }} /> Back to
          Dashboard
        </Typography>
      </Grid>
      <Grid
        container
        xs={12}
        spacing={2}
        sx={{ p: 3, gap: { md: "20px", xl: "72px" } }}
      >
        <Grid item xs={7.3} md={7.3}>
          <Card
            item
            sx={{
              backgroundColor: "white",
              overflow: "auto",
              padding: "20px",
              maxHeight: "100%",
              maxWidth: "100%",
            }}
          >
            <Card sx={{ mb: 4, position: "relative", boxShadow: "none" }}>
              <Box sx={{ position: "relative" }}>
                <img
                  src={studentheaderpic}
                  alt="Background"
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <Avatar
                  alt="userimage"
                  src={image}
                  variant="rounded"
                  sx={{
                    width: 120,
                    height: 120,
                    position: "absolute",
                    top: 70,
                    left: 30,
                  }}
                />
                {editing && (
                  <>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="avatar-upload"
                      type="file"
                      onChange={fileEditHandler}
                    />
                    <label htmlFor="avatar-upload">
                      <Button
                        variant="contained"
                        component="span"
                        sx={{
                          position: "absolute",
                          top: 170,
                          left: 30,
                          backgroundColor: "#0D6EFD",
                          color: "white",
                          width: 120,
                          height: 20,
                          fontSize: "12px",
                          fontWeight: 400,
                          fontFamily: "Nunito Sans",
                        }}
                      >
                        <FileUploadOutlinedIcon
                          style={{ color: "white", fontSize: "16px" }}
                        />{" "}
                        Upload
                      </Button>
                    </label>
                  </>
                )}
                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                    top: 140,
                    right: 30,
                  }}
                >
                  {editing ? (
                    <>
                      <IconButton
                        aria-label="cancel"
                        onClick={handleCancelEdit}
                        style={{
                          color: "black",
                          fontFamily: "Nunito Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "22px",
                          display: "flex",
                          alinItgems: "center",
                          cursor: "pointer",
                          marginRight: "10px",
                          borderRadius: "10px",
                        }}
                      >
                        <CancelIcon
                          style={{ color: "red", marginRight: "5px" }}
                        />{" "}
                        Cancel
                      </IconButton>
                      <Button
                        variant="contained"
                        onClick={editing ? editProfile : () => setEditing(true)}
                        sx={{
                          borderRadius: "24px",
                          backgroundColor: "#0D6EFD",
                          padding: "8px 18px",
                          color: "white",
                          fontSize: "13px",
                          fontWeight: 600,
                          lineHeight: "16px",
                          width: "130px",
                          height: "auto",
                          boxShadow: "0px 6px 34px -8px #A4A4A4",
                        }}
                      >
                        Save Profile
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => setEditing(true)}
                      sx={{
                        borderRadius: "24px",
                        backgroundColor: "#0D6EFD",
                        padding: "8px 18px",
                        color: "white",
                        fontSize: "13px",
                        fontWeight: 600,
                        lineHeight: "16px",
                        width: "130px",
                        height: "auto",
                        boxShadow: "0px 6px 34px -8px #A4A4A4",
                      }}
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </Box>
              <CardContent sx={{ mt: 10 }}>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                    color: "#000000",
                    fontFamily: "Nunito Sans",
                    fontSize: "20px",
                    fontWeight: 700,
                    lineHeight: "32px",
                    textAlign: "left",
                  }}
                >
                  Personal info
                </Typography>
                <Grid container spacing={2} justifyContent="space-between">
                  {editing ? (
                    <>
                      <TextField
                        label="Email"
                        margin="normal"
                        value={editedPersonalInfo.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                      <TextField
                        label="First Name"
                        margin="normal"
                        value={editedPersonalInfo.first_name}
                        onChange={(e) =>
                          handleInputChange("first_name", e.target.value)
                        }
                      />
                      <TextField
                        label="Last Name"
                        margin="normal"
                        value={editedPersonalInfo.last_name}
                        onChange={(e) =>
                          handleInputChange("last_name", e.target.value)
                        }
                      />
                      <TextField
                        label="Gender"
                        margin="normal"
                        value={editedPersonalInfo.gender}
                        onChange={(e) =>
                          handleInputChange("gender", e.target.value)
                        }
                      />
                      <TextField
                        label="Contact"
                        margin="normal"
                        value={editedPersonalInfo.contact}
                        onChange={(e) =>
                          handleInputChange("contact", e.target.value)
                        }
                      />
                      <TextField
                        label="Address Line 1"
                        margin="normal"
                        value={editedPersonalInfo.address1}
                        onChange={(e) =>
                          handleInputChange("address1", e.target.value)
                        }
                      />
                      <TextField
                        label="Address Line 2"
                        margin="normal"
                        value={editedPersonalInfo.address2}
                        onChange={(e) =>
                          handleInputChange("address2", e.target.value)
                        }
                      />
                      <TextField
                        label="Pincode"
                        margin="normal"
                        value={editedPersonalInfo.pincode}
                        onChange={(e) =>
                          handleInputChange("pincode", e.target.value)
                        }
                      />
                    </>
                  ) : (
                    <>
                      {infoItems.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Box display="flex" alignItems="center">
                            <div style={{ color: "black" }}>{item.icon}</div>
                            <Box ml={1}>
                              <Typography
                                sx={{
                                  fontFamily: "Nunito Sans",
                                  fontSize: "14px",
                                  fontWeight: 700,
                                  lineHeight: "15px",
                                  textAlign: "left",
                                  color: "black",
                                }}
                              >
                                {item.value}
                              </Typography>
                              <Typography
                                variant="body2"
                                style={{
                                  fontFamily: "Nunito Sans",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  lineHeight: "20px",
                                  textAlign: "left",
                                }}
                              >
                                {item.label}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </>
                  )}
                </Grid>
                <Typography
                  variant="body1"
                  sx={{
                    mt: 4,
                    mb: 2,
                    color: "#000000",
                    fontFamily: "Nunito Sans",
                    fontSize: "20px",
                    fontWeight: 700,
                    lineHeight: "32px",
                    textAlign: "left",
                  }}
                >
                  Institute info
                </Typography>
                <Grid container spacing={2} justifyContent="space-between">
                  {Instituteinfo.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Box display="flex" alignItems="center">
                        <div style={{ color: "black" }}>{item.icon}</div>
                        <Box ml={1}>
                          <Typography
                            sx={{
                              fontFamily: "Nunito Sans",
                              fontSize: "14px",
                              fontWeight: 700,
                              lineHeight: "15px",
                              textAlign: "left",
                              color: "black",
                            }}
                          >
                            {item.value}
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{
                              fontFamily: "Nunito Sans",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: "20px",
                              textAlign: "left",
                            }}
                          >
                            {item.label}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box width="100%" mt={5}>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 2,
                        color: "#000000",
                        fontFamily: "Nunito Sans",
                        fontSize: "20px",
                        fontWeight: 700,
                        lineHeight: "32px",
                        textAlign: "left",
                      }}
                    >
                      Security
                    </Typography>
                    <Box sx={{ mb: 1 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={4}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <TextField
                              label="Old Password"
                              type="password"
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                              error={errors.oldPassword}
                              helperText={
                                errors.oldPassword
                                  ? "Old Password is required"
                                  : ""
                              }
                              fullWidth
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <TextField
                              label="New Password"
                              type="Password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              error={errors.newEmail}
                              helperText={
                                errors.newEmail ? "Email  is required" : ""
                              }
                              fullWidth
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <TextField
                              label="Confirm Password"
                              type="password"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              error={errors.confirmPassword}
                              helperText={
                                errors.confirmPassword
                                  ? "Confirm Password is required"
                                  : ""
                              }
                              fullWidth
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                    <Button
                      sx={{ mt: "9px" }}
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Card>
        </Grid>
        <Grid item xs={4} md={4}>
          <Box sx={{ p: 2 }}>
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                color: "#000000",
                fontFamily: "Nunito Sans",
                fontSize: "20px",
                fontWeight: 700,
                lineHeight: "32px",
                textAlign: "left",
              }}
            >
              Academic Info
            </Typography>
            <Grid container spacing={2} justifyContent="space-between">
              {AcademicInfo.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box display="flex" alignItems="center">
                    <div>{item.icon}</div>
                    <Box ml={1}>
                      <Typography
                        sx={{
                          fontFamily: "Nunito Sans",
                          fontSize: "28px",
                          fontWeight: 700,
                          lineHeight: "40px",
                          textAlign: "left",
                          color: "black",
                        }}
                      >
                        {item.value}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          fontFamily: "Nunito Sans",
                          fontSize: "12px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          textAlign: "left",
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  color: "#000000",
                  fontFamily: "Nunito Sans",
                  fontSize: "20px",
                  fontWeight: 700,
                  lineHeight: "26px",
                  textAlign: "left",
                }}
              >
                Current Chapter / Topic
              </Typography>
              <Typography
                variant="body2"
                style={{
                  color: "#403B3B",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "21px",
                  textAlign: "left",
                }}
              >
                Chapter 2
              </Typography>
            </div>
            <div style={{ position: "relative" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                }}
              >
                <CircularProgressWithLabel
                  value={72}
                  size={90}
                  thickness={5}
                  sx={{
                    color: "#23A2CB",
                  }}
                />
              </Box>
            </div>
          </Box>

          <Box sx={{ backgroundColor: "white", borderRadius: "10px" }}>
            <ProgressChart />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
