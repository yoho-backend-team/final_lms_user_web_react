import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid, Avatar, TextField, FormControl, FormLabel,OutlinedInput, Select, MenuItem } from "@mui/material";
import ProfileLayout from "features/instructor-pages/profile-page/components/layout";
import { useSpinner } from "context/SpinnerProvider";
import { getInstructorProfile, updateInstructorProfile } from "features/instructor-pages/profile-page/services";
import toast from "react-hot-toast";
import { getImageUrl } from "utils/common/imageUtlils";
import { imagePlaceholder } from "utils/placeholders";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { fileUpload } from "features/common/upload";

const ProfilePage = () => {
  const fileInputRef = useRef(null)
  const [isEditMode, setIsEditMode] = useState(false);
  const [instructor,setInstructor] = useState(null)
  const [loading,setLoading] = useState(true)
  const { showSpinner, hideSpinner} = useSpinner()
  const naviagate = useNavigate()

  const updateProfile = async () => {
    try{
    showSpinner()
    const response = await getInstructorProfile()
    setInstructor(response) 
    }catch(error){
     toast.error(error?.message)
    }finally{
     hideSpinner()
     setLoading(false)
    }
  }

  useEffect(() => {
  updateProfile()
  },[])

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = async (e) => {
    try {
    showSpinner()
    const file = e.target.files[0]
    const form_data = new FormData()
    form_data.append("file",file)
    const response =  await fileUpload(form_data)
    setInstructor((prev)=>({...prev,image:response?.file}))
    toast.success("profile changed successfully")
    } catch (error) {
      toast.error(error?.message)
    }finally{
      hideSpinner()
    }
  }

  const handleUpdateProfile = async () => {
    try {
    showSpinner()
    const response = await updateInstructorProfile(instructor)
    await updateProfile()
    toast.success("profile updated successfully")
    setIsEditMode(false)
    } catch (error) {
      toast.error(error?.message)
    }finally{
      hideSpinner()
    }
  }

  const handleBack = () => {
    naviagate(-1)
  }

  return (
    <ProfileLayout handleBack={handleBack} >
      <Box sx={{ padding: "24px 24px 31px 61px" }}>
        <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
          <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: "700", lineHeight: "32px" }}>
            Personal info
          </Typography>
          {
            isEditMode ? 
            <>
              <Box sx={{ display: "flex", gap: "20px"}} >
                 <Button variant="outlined" sx={{ color: "red" }} onClick={()=>setIsEditMode(false)} >Cancel</Button>
                 <Button
                   sx={{
                    backgroundColor: "#5611B1",
                    color: "#FFFFFF",
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "10px",
                    fontWeight: 600,
                    border : "1px solid #D9D9D9"
                  }}
                  onClick={handleUpdateProfile}
                 >
                  Save profile
                 </Button>
              </Box>
            </>
            :
            <Button
            sx={{
              backgroundColor: "#5611B1",
              color: "#FFFFFF",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "10px",
              fontWeight: 600
            }}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            Edit Profile
          </Button>
          }
        </Box>
        <Grid container spacing={2} sx={{ marginTop: "16px" }}>
          <Grid item xs={12} md={3}>
            <Avatar
              alt="user"
              src={ instructor?.image ? getImageUrl(instructor?.image): imagePlaceholder}
              sx={{ width: '232px', height: "232px", borderRadius: "10px", minHeight: '232px',maxWidth: "232px" }}
            />
            {
            isEditMode &&
            <> 
            <Button
             sx={{
              position : "fixed",
              background: "#0D6EFD",
              borderRadius : "0px 0px 10px 10px",
              color : "#FFFFFF",
              width : "232px",
              height : "48px",
              marginTop : "-48px",
              ":hover":{
                backgroundColor : "#0D6EFD"
              }
             }}
             onClick={handleButtonClick}
             startIcon={
              <FileUploadOutlinedIcon sx={{ height: "24px", width: "24px"}} />
             }
            >
             Upload Photo
            </Button>
            <input 
            type="file"
            ref={fileInputRef}
            style={{ display: "none"}}
            onChange={handleFileChange}
            />
            </>
            }
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth margin="normal" sx={{ display: 'flex', flexDirection: 'column', gap: "16px"}} >
                  <FormLabel sx={{ color: "#232323", fontSize: "16px",fontWeight:400}} >Name</FormLabel>
                  <OutlinedInput
                    readOnly={!isEditMode}
                    size="small"
                    defaultValue="Preethi Nair"
                    value={instructor?.full_name || ''}
                    onChange={(e) => setInstructor((prev) => ({...prev,full_name: e.target.value}))}
                    variant="outlined"
                    sx={{
                      maxWidth: "187px",
                      border : isEditMode ? "1px solid #D9D9D9" : "",
                      borderRadius : "8px",
                      background : isEditMode ? "#FFFFFF" : "",
                      padding : isEditMode ? "10px 16px" : "",
                      color : "#000000",
                      fontSize : "16px",
                      width : "187px",
                      fontWeight : 400,
                      maxHeight : "40px"
                    }}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal" sx={{ display: 'flex', flexDirection: 'column', gap: "16px"}} >
                  <FormLabel sx={{ color: "#232323", fontSize: "16px",fontWeight:400}} > Gender </FormLabel>
                  {
                    isEditMode ?
                    <Select
                    value={instructor?.gender||''}
                    onChange={(e) => setInstructor((prev) => ({...prev,gender:e.target.value}))}
                    sx={{
                      maxWidth: "187px",
                      borderRadius : "8px",
                      background : isEditMode ? "#FFFFFF" : "",
                      padding : isEditMode ? "10px 16px" : "",
                      color : "#000000",
                      fontSize : "16px",
                      width : "187px",
                      fontWeight : 400,
                      maxHeight : "40px"
                    }}
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"} >Female</MenuItem>
                      <MenuItem value={"Other"} >Other</MenuItem>
                    </Select>
                    :
                    <OutlinedInput
                    readOnly={!isEditMode}
                    defaultValue="LMSTRN231"
                    value={instructor?.gender}
                    sx={{
                      maxWidth: "187px",
                      border : isEditMode ? "1px solid #D9D9D9" : "",
                      borderRadius : "8px",
                      background : isEditMode ? "#FFFFFF" : "",
                      padding : isEditMode ? "10px 16px" : "",
                      color : "#000000",
                      fontSize : "16px",
                      width : "187px",
                      fontWeight : 400,
                      maxHeight : "40px"
                    }}
                  />
                  }
                  
                </FormControl>
                <FormControl fullWidth margin="normal" sx={{ display: 'flex', flexDirection: 'column', gap: "16px"}} >
                  <FormLabel sx={{ color: "#232323", fontSize: "16px",fontWeight:400}} >Contact Number</FormLabel>
                  <OutlinedInput
                    readOnly={!isEditMode}
                    defaultValue=""
                    value={instructor?.contact_info?.phone_number || ''}
                    onChange={(e) => setInstructor((prev)=>({...prev,contact_info:{...prev.contact_info,phone_number:e.target.value}}))}
                    sx={{
                      maxWidth: "187px",
                      border : isEditMode ? "1px solid #D9D9D9" : "",
                      borderRadius : "8px",
                      background : isEditMode ? "#FFFFFF" : "",
                      padding : isEditMode ? "10px 16px" : "",
                      color : "#000000",
                      fontSize : "16px",
                      width : "187px",
                      fontWeight : 400,
                      maxHeight : "40px"
                    }}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal" sx={{ display: 'flex', flexDirection: 'column', gap: "16px"}} >
                  <FormLabel sx={{ color: "#232323", fontSize: "16px",fontWeight:400}} >State</FormLabel>
                  <OutlinedInput
                    readOnly={!isEditMode}
                    defaultValue=""
                    value={instructor?.contact_info?.state || ''}
                    onChange={(e) => setInstructor((prev)=>({...prev,contact_info:{...prev.contact_info,state:e.target.value}}))}
                    sx={{
                      maxWidth: "187px",
                      border : isEditMode ? "1px solid #D9D9D9" : "",
                      borderRadius : "8px",
                      background : isEditMode ? "#FFFFFF" : "",
                      padding : isEditMode ? "10px 16px" : "",
                      color : "#000000",
                      fontSize : "16px",
                      width : "187px",
                      fontWeight : 400,
                      maxHeight : "40px"
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth margin="normal" sx={{ display: 'flex', flexDirection: 'column', gap: "16px"}} >
                  <FormLabel sx={{ color: "#232323", fontSize: "16px",fontWeight:400}} >Email</FormLabel>
                  <OutlinedInput
                    readOnly={!isEditMode}
                    defaultValue="preethinair@design.com"
                    value={ instructor?.email || ''}
                    onChange={(e) => setInstructor((prev) =>({...prev,email:e.target.value}))}
                    sx={{
                      maxWidth: "187px",
                      border : isEditMode ? "1px solid #D9D9D9" : "",
                      borderRadius : "8px",
                      background : isEditMode ? "#FFFFFF" : "",
                      padding : isEditMode ? "10px 16px" : "",
                      color : "#000000",
                      fontSize : "16px",
                      width : "187px",
                      fontWeight : 400,
                      maxHeight : "40px"
                    }}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal" sx={{ display: 'flex', flexDirection: 'column', gap: "16px"}} >
                  <FormLabel sx={{ color: "#232323", fontSize: "16px",fontWeight:400}} >Address Line 1</FormLabel>
                  <OutlinedInput
                    readOnly={!isEditMode}
                    value={instructor?.contact_info?.address1}
                    onChange={(e) => setInstructor((prev) => ({...prev,contact_info:{...prev.contact_info,address1:e.target.value}}))}
                    sx={{
                      maxWidth: "187px",
                      border : isEditMode ? "1px solid #D9D9D9" : "",
                      borderRadius : "8px",
                      background : isEditMode ? "#FFFFFF" : "",
                      padding : isEditMode ? "10px 16px" : "",
                      color : "#000000",
                      fontSize : "16px",
                      width : "187px",
                      fontWeight : 400,
                      maxHeight : "40px"
                    }}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal" sx={{ display: 'flex', flexDirection: 'column', gap: "16px"}} >
                  <FormLabel>Alternate Number</FormLabel>
                  <OutlinedInput
                    readOnly={!isEditMode}
                    value={instructor?.contact_info?.alternate_phone_number}
                    onChange={(e) => setInstructor((prev) =>({...prev,contact_info:{...prev.contact_info,alternate_phone_number:e.target.value}}))}
                    sx={{
                      maxWidth: "187px",
                      border : isEditMode ? "1px solid #D9D9D9" : "",
                      borderRadius : "8px",
                      background : isEditMode ? "#FFFFFF" : "",
                      padding : isEditMode ? "10px 16px" : "",
                      color : "#000000",
                      fontSize : "16px",
                      width : "187px",
                      fontWeight : 400,
                      maxHeight : "40px"
                    }}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal" sx={{ display: 'flex', flexDirection: 'column', gap: "16px"}} >
                  <FormLabel>Pin code</FormLabel>
                  <OutlinedInput
                    readOnly={!isEditMode}
                    value={instructor?.contact_info?.pincode}
                    onChange={(e) => setInstructor((prev) =>({...prev,contact_info:{...prev.contact_info,pincode:e.target.value}}))}
                    sx={{
                      maxWidth: "187px",
                      border : isEditMode ? "1px solid #D9D9D9" : "",
                      borderRadius : "8px",
                      background : isEditMode ? "#FFFFFF" : "",
                      padding : isEditMode ? "10px 16px" : "",
                      color : "#000000",
                      fontSize : "16px",
                      width : "187px",
                      fontWeight : 400,
                      maxHeight : "40px"
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth margin="normal" sx={{ display: 'flex', flexDirection: 'column', gap: "16px"}} >
                  <FormLabel>Qualification</FormLabel>
                  <OutlinedInput
                    readOnly={!isEditMode}
                    value={instructor?.qualification || ''}
                    onChange={(e) => setInstructor((prev)=>({...prev,qualification:e.target.value}))}
                    sx={{
                      maxWidth: "187px",
                      border : isEditMode ? "1px solid #D9D9D9" : "",
                      borderRadius : "8px",
                      background : isEditMode ? "#FFFFFF" : "",
                      padding : isEditMode ? "10px 16px" : "",
                      color : "#000000",
                      fontSize : "16px",
                      width : "187px",
                      fontWeight : 400,
                      maxHeight : "40px"
                    }}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal" sx={{ display: 'flex', flexDirection: 'column', gap: "16px"}} >
                  <FormLabel>Address Line 2</FormLabel>
                  <OutlinedInput
                    readOnly={!isEditMode}
                    value={instructor?.contact_info?.address2}
                    onChange={(e) => setInstructor((prev) =>({...prev,contact_info:{...prev.contact_info,address2:e.target.value}}))}
                    sx={{
                      maxWidth: "187px",
                      border : isEditMode ? "1px solid #D9D9D9" : "",
                      borderRadius : "8px",
                      background : isEditMode ? "#FFFFFF" : "",
                      padding : isEditMode ? "10px 16px" : "",
                      color : "#000000",
                      fontSize : "16px",
                      width : "187px",
                      fontWeight : 400,
                      maxHeight : "40px"
                    }}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal" sx={{ display: 'flex', flexDirection: 'column', gap: "16px"}} >
                  <FormLabel>City</FormLabel>
                  <OutlinedInput
                    readOnly={!isEditMode}
                    defaultValue="chennai"
                    value={instructor?.contact_info?.city}
                    onChange={(e) => setInstructor((prev) => ({...prev,contact_info:{...prev.contact_info,city:e.target.value}}))}
                    sx={{
                      maxWidth: "187px",
                      border : isEditMode ? "1px solid #D9D9D9" : "",
                      borderRadius : "8px",
                      background : isEditMode ? "#FFFFFF" : "",
                      padding : isEditMode ? "10px 16px" : "",
                      color : "#000000",
                      fontSize : "16px",
                      width : "187px",
                      fontWeight : 400,
                      maxHeight : "40px"
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ProfileLayout>
  );
};

export default ProfilePage;
