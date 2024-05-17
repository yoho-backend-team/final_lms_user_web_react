import * as React from "react";
import Box from "@mui/material/Box";
import { Input, InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OTPInput from "./OTPScreen";
import { FormControl, InputAdornment, IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";

const steps = ["Enter your Email", "Account Setup", "Confirmation"];

export default function UserRegistrationStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [userData, setUserData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [ShowReenteredPassword, setShowReenteredPassword] =
    React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowReEnteredPassword = () =>
    setShowReenteredPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownReEnteredPasssword = (event) => {
    event.preventDefault();
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ pt: { xs: 10, sm: 30 } }}>
      {activeStep === 0 && (
        <Box>
          <Box sx={{ justifyContent: "center", display: "flex", mb: 3 }}>
            <Typography
              variant="h3"
              sx={{ fontFamily: "poppins", color: "black", fontWeight: 500 }}
            >
              Forget Password ?
            </Typography>
          </Box>
          <FormControl>
            <InputLabel>Enter Mail ID</InputLabel>
            <Input
              required
              label="Enter mail Address"
              id="firstName"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
            />
          </FormControl>
        </Box>
      )}
      {activeStep === 1 && (
        <Box>
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
              mb: 3,
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontFamily: "poppins", color: "black", fontWeight: 500 }}
            >
              Enter the 4 digit that we sent to your number
            </Typography>
          </Box>
          <OTPInput />
        </Box>
      )}
      {activeStep === 2 && (
        <Box>
          <Box sx={{ justifyContent: "center", display: "flex" }}>
            <Typography
              variant="h4"
              sx={{ fontFamily: "poppins", color: "black", fontWeight: 500 }}
            >
              Enter New Password
            </Typography>
          </Box>
          <FormControl sx={{ m: 1 }} variant="filled" fullWidth>
            <InputLabel htmlFor="filled-adornment-password">
              Password
            </InputLabel>
            <Input
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl sx={{ m: 1 }} variant="filled" fullWidth>
            <InputLabel htmlFor="filled-adornment-password">
              Password
            </InputLabel>
            <Input
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowReEnteredPassword}
                    onMouseDown={handleMouseDownReEnteredPasssword}
                    edge="end"
                  >
                    {ShowReenteredPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          flexDirection: "row",
          pt: 2,
        }}
      >
        <Button
          variant="contained"
          size="medium"
          onClick={handleNext}
          sx={{ borderRadius: 5 }}
        >
          {isLastStep() ? "Change Password" : "Verify"}
        </Button>
      </Box>
    </Box>
  );
}
