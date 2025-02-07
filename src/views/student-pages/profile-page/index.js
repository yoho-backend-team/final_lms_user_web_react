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
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import { FaIdCard } from "react-icons/fa";
import { useSpinner } from "context/SpinnerProvider";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isTabletScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
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
  const [activeSection, setActiveSection] = useState("personalInfo");
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
        first_name: editedPersonalInfo.first_name,
        last_name: editedPersonalInfo.last_name,
        email: editedPersonalInfo.email,
        gender: editedPersonalInfo.gender,
        contact_info: {
          phone_number: editedPersonalInfo.contact,
          address1: editedPersonalInfo.address1,
          address2: editedPersonalInfo.address2,
          pincode: editedPersonalInfo.pincode,
        },
        image: editedPersonalInfo.image,
      };

      const updatedData = await UpdateprofilewithId(data);
      setPersonalInfo(updatedData);
      setEditing(false);
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedPersonalInfo(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const fileEditHandler = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const imageUrl = await fileUpload(formData);
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

  const handleNavigateBack = () => {
    navigate('/');
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSave = async () => {
    const newErrors = {
      oldPassword: !oldPassword,
      newPassword: !newPassword,
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
    {
      icon: personalInfo.gender === "male" ? <MaleIcon /> : <FemaleIcon />,
      label: "Gender",
      value: personalInfo.gender,
    },
    {
      icon: <PhoneIcon />,
      label: "Contact Number",
      value: personalInfo?.contact_info?.phone_number,
    },
    {
      icon: <CalendarTodayIcon />,
      label: "Date of Birth",
      value: personalInfo.dob,
    },
    {
      icon: <LocationOnIcon />,
      label: "Pin Code",
      value: personalInfo?.contact_info?.pincode,
    },
    {
      icon: <HomeIcon />,
      label: "Address",
      value: `${personalInfo?.contact_info?.address1}, ${personalInfo?.contact_info?.address2}`,
    },
  ];

  const instituteInfoItems = [
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

  return (
    <Box sx={{ display: 'flex', height: '100vh', padding: '70px' }}>
      <Box
        sx={{
          width: '300px',
          background: 'white',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', // Changed to space-between
          alignItems: 'center',
          padding: 2,
          margin: 2,
          height: 'auto',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          paddingTop: 4,
          paddingBottom: 4,
          marginTop: '140px',
          marginBottom: '70px',
          marginLeft: '60px',
          marginRight: '20px',
        }}
      >
        <Box sx={{ width: '107%' }}>
        <Box
            onClick={() => setActiveSection("personalInfo")}
            sx={{
              position: 'relative',
              padding: '12px 20px',
              marginBottom: '8px',
              borderRadius: '4px',
              cursor: 'pointer',
              background: activeSection === "personalInfo" 
                ? 'linear-gradient(90deg, rgba(13, 110, 253, 0.1) 0%, rgba(13, 110, 253, 0.05) 100%)' 
                : 'transparent',
              '&:hover': {
                background: 'rgba(13, 110, 253, 0.05)'
              },
              borderLeft: activeSection === "personalInfo" 
                ? '4px solid #0D6EFD' 
                : 'none'
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                color: activeSection === "personalInfo" ? '#0D6EFD' : '#666',
                fontSize: '16px'
              }}
            >
              Profile Info
            </Typography>
          </Box>
          <Box
            onClick={() => setActiveSection("security")}
            sx={{
              position: 'relative',
              padding: '12px 20px',
              marginBottom: '8px',
              borderRadius: '4px',
              cursor: 'pointer',
              background: activeSection === "security" 
                ? 'linear-gradient(90deg, rgba(13, 110, 253, 0.1) 0%, rgba(13, 110, 253, 0.05) 100%)' 
                : 'transparent',
              '&:hover': {
                background: 'rgba(13, 110, 253, 0.05)'
              },
              borderLeft: activeSection === "security" 
                ? '4px solid #0D6EFD' 
                : 'none'
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                color: activeSection === "security" ? '#0D6EFD' : '#666',
                fontSize: '16px'
              }}
            >
              Security
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          onClick={handleNavigateBack}
          fullWidth
          sx={{
            mt: 1,
            background: 'linear-gradient(45deg, #FF5722 30%, #D84315 90%)',
            color: 'white',
            padding: '10px 20px',
            boxShadow: '0 3px 5px 2px rgba(255, 87, 34, .3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #D84315 30%, #FF5722 90%)',
            },
          }}
        >
          Go Back
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', padding: 2, marginLeft: '250px', mt: 2, mb: 2 }}>
        <Grid container xs={12} spacing={2} sx={{ gap: { md: "20px", xl: "72px" } }}>
          <Grid item xs={12}>
            <Card
              sx={{
                backgroundColor: "white",
                overflow: "auto",
                padding: "20px",
                height: '90%',
                boxShadow: 3,
                width: 'calc(100% - 80px)',
                marginLeft: '80px',
                borderRadius: '10px',
              }}
            >
              <Card sx={{ mb: 4, position: "relative", boxShadow: "none" }}>
                {activeSection === "personalInfo" && (
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
                      src={getImageUrl(personalInfo.image)}
                      variant="rounded"
                      sx={{ width: 120, height: 120, position: "absolute", top: 70, left: 30 }}
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
                            <FileUploadOutlinedIcon style={{ color: "white", fontSize: "16px" }} />{" "}
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
                              alignItems: "center",
                              cursor: "pointer",
                              marginRight: "10px",
                              borderRadius: "10px",
                            }}
                          >
                            <CancelIcon style={{ color: "red", marginRight: "5px" }} />{" "}
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
                )}
                <CardContent sx={{ mt: 10 }}>
                  {activeSection === "personalInfo" && (
                    <>
                      <Typography
                        variant="body1"
                        sx={{
                          mb: 2,
                          color: "#000000",
                          fontFamily: "Nunito Sans",
                          fontSize: isTabletScreen ? "22px" : "20px",
                          fontWeight: 700,
                          lineHeight: "32px",
                          textAlign: "left",
                        }}
                      >
                        Profile Info
                      </Typography>
                      <Grid container spacing={2} justifyContent="space-between">
                        {editing ? (
                          <>
                            <Grid item xs={12}>
                              <TextField
                                label="Email"
                                margin="normal"
                                value={editedPersonalInfo.email}
                                disabled
                                onChange={(e) =>
                                  handleInputChange("email", e.target.value)
                                }
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="First Name"
                                margin="normal"
                                value={editedPersonalInfo.first_name}
                                onChange={(e) =>
                                  handleInputChange("first_name", e.target.value)
                                }
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Last Name"
                                margin="normal"
                                value={editedPersonalInfo.last_name}
                                onChange={(e) =>
                                  handleInputChange("last_name", e.target.value)
                                }
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Gender"
                                margin="normal"
                                value={editedPersonalInfo.gender}
                                disabled
                                onChange={(e) =>
                                  handleInputChange("gender", e.target.value)
                                }
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Contact Number"
                                margin="normal"
                                value={editedPersonalInfo.contact}
                                onChange={(e) =>
                                  handleInputChange("contact", e.target.value)
                                }
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Address Line 1"
                                margin="normal"
                                value={editedPersonalInfo.address1}
                                onChange={(e) =>
                                  handleInputChange("address1", e.target.value)
                                }
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Address Line 2"
                                margin="normal"
                                value={editedPersonalInfo.address2}
                                onChange={(e) =>
                                  handleInputChange("address2", e.target.value)
                                }
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Pincode"
                                margin="normal"
                                value={editedPersonalInfo.pincode}
                                onChange={(e) =>
                                  handleInputChange("pincode", e.target.value)
                                }
                                fullWidth
                              />
                            </Grid>
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

                      {/* Institute Info Section */}
                      <Typography
                        variant="body1"
                        sx={{
                          mt: 4,
                          mb: 2,
                          color: "#000000",
                          fontFamily: "Nunito Sans",
                          fontSize: isTabletScreen ? "22px" : "20px",
                          fontWeight: 700,
                          lineHeight: "32px",
                          textAlign: "left",
                        }}
                      >
                        Institute Info
                      </Typography>
                      <Grid container spacing={2} justifyContent="space-between">
                        {instituteInfoItems.map((item, index) => (
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
                    </>
                  )}
                  {activeSection === "security" && (
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <Box width="100%" mt={5}>
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 2,
                            color: "#000000",
                            fontFamily: "Nunito Sans",
                            fontSize: isTabletScreen ? "22px" : "20px",
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
                                  type="password"
                                  value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                  error={errors.newPassword}
                                  helperText={
                                    errors.newPassword ? "New Password is required" : ""
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
                  )}
                </CardContent>
              </Card>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfilePage;