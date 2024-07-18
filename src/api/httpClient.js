import axios from "axios";
import {
  AUTH_TOKEN_KEY,
  instructorDetails,
  studentDetails,
} from "lib/constants";
import Cookies from "js-cookie";

const backendUrl = process.env.REACT_APP_BACK_END_URL;

const Axios = axios.create({
  baseURL: backendUrl,
  timeout: 5000000,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use((config) => {
  const instructorUser = Cookies.get(instructorDetails);
  const studentUser = Cookies.get(studentDetails);

  const userType = config.headers["User-Type"];

  if (userType === "instructor" && instructorUser) {
    const instructorToken = JSON.parse(instructorUser)?.token;
    if (instructorToken) {
      config.headers["Authorization"] = `Token ${instructorToken}`;
    }
  } else if (userType === "student" && studentUser) {
    const studentToken = JSON.parse(studentUser)?.token;
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
       Cookies.remove(instructorDetails);
       Cookies.remove(studentDetails);
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

  async update(url, data,userType) {
    const response = await Axios.put(url, data,{headers:{"User-Type":userType}});
    return response?.data;
  }

  async delete(url,userType){
    const response = await Axios.delete(url,{ headers:{ "User-Type": userType } })
    return response?.data
  }

  async fileGet(url) {
    const response = Axios.get(url, { responseType: "blob" });
    return response;
  }

  async uploadFile(url, data) {
    const response = await Axios.post(url, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response?.data;
  }
}

export default new HttpClient();
