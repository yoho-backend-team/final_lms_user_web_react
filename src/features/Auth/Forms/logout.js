import React from "react";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useStudentLogout } from "../services";

const ProfilePage = () => {
  const studentLogout = useStudentLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await studentLogout();
      navigate("/login"); // Redirect to login page after logout
      toast.success("Successfully logged out!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred while logging out.");
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <Button onClick={handleLogout} variant="outlined">
        Logout
      </Button>
    </div>
  );
};

export default ProfilePage;
