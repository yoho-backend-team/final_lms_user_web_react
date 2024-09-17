import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  IconButton,
  Typography,
  FormHelperText,styled
} from "@mui/material";
// import { useFormik } from "formik";
import * as yup from "yup"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useInstructorChangePassword } from "../services";
import { instructorOtpAtom } from "store/atoms/authAtoms";
import { useAtom } from "jotai";
import { useSpinner } from "context/SpinnerProvider";


const PasswordValidationSchema = yup.object({
  new_password : yup.string()
  .min(8,'Password must be at least 8 characters')
  .required('New Password is required'),
  confirm_password : yup.string()
  .oneOf([yup.ref("new_password")],'Password must match')
  .required("Confirm Password is required")
})

const WaveButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  padding: '10px 20px',
  color: '#fff',
  backgroundColor: '#5611B1', // Original color
  borderRadius: '4px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#7B2FCE', // Lighter color on hover
  },
  '& .wave': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '300%',
    height: '300%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0) 60%)',
    transform: 'translate(-50%, -50%)',
    animation: 'wave-animation 1.5s infinite',
    pointerEvents: 'none',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover .wave': {
    opacity: 1,
  },
}));

const EnterNewPassword = () => {
  const changePassword = useInstructorChangePassword();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpAtom, setOtpAtom] = useAtom(instructorOtpAtom);
  const {showSpinner,hideSpinner} = useSpinner()

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError("");
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async () => {
    if (!password) {
      setPasswordError("Enter new password");
      return;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Enter confirm password");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    try {
      showSpinner()
      const response = await changePassword({confirm_password:confirmPassword,new_password:password});
      toast.success(response.message);
    } catch (error) {
      console.error("Error resetting password", error);
      toast.error(error);
    }finally{
      hideSpinner()
    }
  };

  return (
    <>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "109px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "60px" }}>
        <Box
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: "#242424",
              fontSize: "1.5rem",
            }}
          >
            Enter New Password
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <FormControl
            fullWidth
            sx={{ maxWidth: 330, minWidth: 300, gap: "10px" }}
            error={!!passwordError}
          >
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                mb : "0px",
                width: "100%",
                fontSize: "12.80px",
                color: "#757575",
                fontWeight: 400,
                lineHeight: "18px",
              }}
            >
              Password
            </Typography>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              aria-describedby="password-error-text"
              sx={{
                marginTop : "0px",
                color: "#212121",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "22px",
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {passwordError && (
              <FormHelperText id="password-error-text">
                {passwordError}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            sx={{ maxWidth: 330, minWidth: 300, gap: "10px" }}
            error={!!confirmPasswordError}
          >
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                mb : "0px",
                width: "100%",
                fontSize: "12.80px",
                color: "#757575",
                fontWeight: 400,
                lineHeight: "18px",
              }}
            >
              Confirm Password
            </Typography>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              aria-describedby="confirm-password-error-text"
              sx={{
                color: "#212121",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "22px",
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowConfirmPassword} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {confirmPasswordError && (
              <FormHelperText id="confirm-password-error-text">
                {confirmPasswordError}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <WaveButton >Animation Button
          <div className="wave"></div>
          </WaveButton>
          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            sx={{
              backgroundColor: "#5611B1",
              maxWidth: 100,
              alignSelf: "flex-end",
              borderRadius: 36,
              boxShadow:
                "0px 8.581698417663574px 26.405227661132812px -5.281045436859131px rgba(13, 110, 253, 0.23)",
              px: 2,
              py: 1,
              "&:hover": {
                backgroundColor: "#4A00A0",
              },
            }}
          >
            CONFIRM
          </Button>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default EnterNewPassword;
