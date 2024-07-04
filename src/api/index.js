import httpClient from "./httpClient";
import HTTP_END_POINTS from "./http_end_points";

class Client {
  Student = {
    login: (data) => httpClient.post(HTTP_END_POINTS.Student.auth.login, data),
    verifyOtp : (data) => httpClient.post(HTTP_END_POINTS.Student.auth.verify_otp,data),
    course : {
      get : (params) => httpClient.get(HTTP_END_POINTS.Student.course.get,params)
    },
    class : {
      get : (params) => httpClient.get(HTTP_END_POINTS.Student.class.get,params)
    },
  };

  Instructor = {
    login: (data) => httpClient.post(HTTP_END_POINTS.Instructor.auth.login, data),
    verifyOtp: (data) => httpClient.post(HTTP_END_POINTS.Instructor.auth.verify_otp, data),
    log_out : (data) => httpClient.post(HTTP_END_POINTS.Instructor.auth.log_out,data),
    attendance: {
      get: (params) => httpClient.get(`${HTTP_END_POINTS.Instructor.attendance.get}${params.userId}`),
    },
    course : {
      get : (params) => httpClient.get(HTTP_END_POINTS.Instructor.course.get,params)
    },
    class : {
      get : (params) => httpClient.get(HTTP_END_POINTS.Instructor.class.get,params)
    },
    community : {
      get : () => httpClient.get(HTTP_END_POINTS.Instructor.community.get)
    },
    payment : {
      get : () => httpClient.get(HTTP_END_POINTS.Instructor.payments.getSalaries)
    }
  };
}

export default new Client();
