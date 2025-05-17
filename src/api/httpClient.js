import axios from "axios";
import {
  AUTH_TOKEN_KEY,
  Instructor_Details,
  Instructor_Token,
  instructorDetails,
  isAuthenticatedInstructor,
  isAuthenticatedStudent,
  Student_Details,
  Student_Token,
  studentDetails,
} from "lib/constants";
import Cookies from "js-cookie";
import { getAndDecompress } from "utils/auth_helpers";
import React from "react";
import { createRoot } from "react-dom/client";
import { Modal,Box,Typography,Button } from "@mui/material";

const backendUrl = process.env.REACT_APP_BACK_END_URL;

const Axios = axios.create({
  baseURL: backendUrl,
  timeout: 5000000,
  headers: {
    "Content-Type": "application/json",
  },
});

const removeSecureItem = (key) => {
  // secureLocalStorage.removeItem(key);
  // localStorage.removeItem(key)
};

export const showSessionExpiredModal = () => {
  const modalContainer = document.createElement("div");    
  modalContainer.setAttribute("id", "session-expired-modal"); 
  document.body.appendChild(modalContainer);
  const root = createRoot(modalContainer);

  const handleLogout =() => {
        const modalToRemove = document.getElementById("session-expired-modal");
        if (modalToRemove) {
            root.unmount(); 
            document.body.removeChild(modalToRemove); 
        }

    console.log("all cleared");
    const data = Cookies.get(Instructor_Details) || null
    const datas = Cookies.get(Student_Details) || null
     if(data){
      window.location.replace("/instructor/login");
     }
     if (datas){
      window.location.replace("/#/login");
     }
      Cookies.remove(isAuthenticatedInstructor)
      Cookies.remove(isAuthenticatedStudent)
      Cookies.remove(Instructor_Details);
      Cookies.remove(Student_Details);
  };

  root.render(
      <Modal open={true} sx={{opacity:0.6}}>
          <Box
              sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
                  textAlign: "center",
              }}
          >
              <Typography variant="h6">Your session has expired</Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                  Please log in again to continue.
              </Typography>
              <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ mt: 3 }} 
                  onClick={handleLogout}
              >
                  Logout
              </Button>
          </Box>
      </Modal>
  );
};





Axios.interceptors.request.use((config) => {
  const instructorUser = getAndDecompress(Instructor_Details)
  const studentUser = getAndDecompress(Student_Details);

  const userType = config.headers["User-Type"];

  if (userType === "instructor" && instructorUser) {
    const instructorToken = getAndDecompress(Instructor_Token);
  
    if (instructorToken) {
      config.headers["Authorization"] = `Token ${instructorToken}`;
    }
  } else if (userType === "student" && studentUser) {
    const studentToken = getAndDecompress(Student_Token);
    if (studentToken) {
      config.headers["Authorization"] = `Token ${studentToken}`;
    }
  }

  delete config.headers["User-Type"];

  return config;
});

Axios.interceptors.response.use(
  (response) =>response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      //  Cookies.remove(isAuthenticatedInstructor)
      //  Cookies.remove(isAuthenticatedStudent)
      //  Cookies.remove(Instructor_Details);
      //  Cookies.remove(Student_Details);
      showSessionExpiredModal();
    }
    return Promise.reject(error);
  },
);

class HttpClient {
  async get(url, params, userType) {
    const response = await Axios.get(url, {
      params: params,
      headers: {
        "User-Type": userType,
      },
    });
    return response.data;
  }

  async post(url, data, params, userType) {
    const response = await Axios.post(url, data, {
      params: params,
      headers: {
        "User-Type": userType,
      },
    });
    return response.data;
  }

  async update(url, data, userType) {
    
    const response = await Axios.put(url, data, {
      headers: {
        "User-Type": userType,
      },
    });
    return response?.data;
  }

  async delete(url,userType){
    const response = await Axios.delete(url,{ headers:{ "User-Type": userType } })
    return response?.data
  }

  async fileGet(url, userType) {
    const response = Axios.get(url, {
      responseType: "blob",
      headers: {
        "User-Type": userType,
      },
    });
    return response;
  }

  async uploadFile(url, data, userType) {
    const response = await Axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "User-Type": userType,
      },
    });
    return response?.data;
  }
}

export default new HttpClient();
