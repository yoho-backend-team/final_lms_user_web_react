import httpClient from "./httpClient";
import HTTP_END_POINTS from "./http_end_points";

class Client {
  Student = {
    login: (data) => httpClient.post(HTTP_END_POINTS.Student.auth.login, data),
    verifyOtp : (data) => httpClient.post(HTTP_END_POINTS.Student.auth.verify_otp,data),
<<<<<<< HEAD
    course : {
      get : (params) => httpClient.get(HTTP_END_POINTS.Student.course.get,params)
    },
    class : {
      get : (params) => httpClient.get(HTTP_END_POINTS.Student.class.get,params)
    },
=======
    attendance : (params) => httpClient.get(HTTP_END_POINTS.Student.attendance,params)
>>>>>>> eba8bb5e155608da69af8dc6ec287615bdc19852
  };

  common = {
    file : {
      upload : (data) => httpClient.uploadFile(HTTP_END_POINTS.common.file.upload,data),
      get : (url) => httpClient.fileGet(url)
    }
  }

  Instructor = {
    login: (data) => httpClient.post(HTTP_END_POINTS.Instructor.auth.login, data),
    verifyOtp: (data) => httpClient.post(HTTP_END_POINTS.Instructor.auth.verify_otp, data),
    log_out : (data) => httpClient.post(HTTP_END_POINTS.Instructor.auth.log_out,data),
    attendance: {
      get: (params) => httpClient.get(`${HTTP_END_POINTS.Instructor.attendance.get}${params.userId}`),
      get_class_attendance : (data) => httpClient.get(HTTP_END_POINTS.Instructor.attendance.class_attendance+data.classId),
      update : (data) => httpClient.update(HTTP_END_POINTS.Instructor.attendance.class_attendance+data.uuid,data)
    },
    course : {
      get : (params) => httpClient.get(HTTP_END_POINTS.Instructor.course.get,params)
    },
    class : {
      get : (params) => httpClient.get(HTTP_END_POINTS.Instructor.class.get,params),
      getWithId : (params) => httpClient.get(HTTP_END_POINTS.Instructor.class.getwithId+params.course,params),
      update : (data) => httpClient.update(HTTP_END_POINTS.Instructor.class.update+data?.uuid,data)
    },
    community : {
      get : () => httpClient.get(HTTP_END_POINTS.Instructor.community.get)
    },
    payment : {
      get : () => httpClient.get(HTTP_END_POINTS.Instructor.payments.getSalaries)
    },
    ticket : {
      create : (data) => httpClient.post(HTTP_END_POINTS.Instructor.ticket.create,data),
      get : (params) => httpClient.get(HTTP_END_POINTS.Instructor.ticket.get,params)
    }
  };
}

export default new Client();
