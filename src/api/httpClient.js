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

const backendUrl = process.env.REACT_APP_BACK_END_URL;

const Axios = axios.create({
  baseURL: backendUrl,
  timeout: 5000000,
  headers: {
    "Content-Type": "application/json",
  },
});

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
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
       Cookies.remove(isAuthenticatedInstructor)
       Cookies.remove(isAuthenticatedStudent)
       Cookies.remove(Instructor_Details);
       Cookies.remove(Student_Details);
    }
    console.log(error,"error")
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
