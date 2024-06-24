import httpClient from "./httpClient";
import HTTP_END_POINTS from "./http_end_points";

class Client {
  Student = {
    login: (data) => httpClient.post(HTTP_END_POINTS.Student.auth.login, data),
    verifyOtp : (data) => httpClient.post(HTTP_END_POINTS.Student.auth.verify_otp,data)
  };

  Instructor = {
    login: (data) => httpClient.post(HTTP_END_POINTS.Instructor.auth.login, data),
    verifyOtp: (data) => httpClient.post(HTTP_END_POINTS.Instructor.auth.verify_otp, data),
    log_out : (data) => httpClient.post(HTTP_END_POINTS.Instructor.auth.log_out,data),
    attendance: {
      get: (params) => httpClient.get(`${HTTP_END_POINTS.Instructor.attendance.get}${params.userId}`),
    },
  };
}

export default new Client();
