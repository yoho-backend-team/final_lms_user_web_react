import { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";
import { useStudentNewPassword } from "../services";

const FullHeightContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
}));

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
  maxWidth: "400px",
});

const ConfirmButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#007bff",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
}));

const ForgetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { resetPassword } = useStudentNewPassword(); 

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    resetPassword(newPassword); 
  };

  return (
    <FullHeightContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        Enter New Password
      </Typography>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Enter New Password"
          type="password"
          variant="outlined"
          value={newPassword}
          onChange={handleNewPasswordChange}
          fullWidth
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          fullWidth
        />
        <ConfirmButton type="submit" variant="contained" fullWidth>
          Confirm
        </ConfirmButton>
      </Form>
    </FullHeightContainer>
  );
};

export default ForgetPasswordPage;
