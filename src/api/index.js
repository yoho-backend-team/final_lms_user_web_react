import httpClient from "./httpClient";
import HTTP_END_POINTS from "./http_end_points";

class Client {
  Student = {
    login: (data) => httpClient.post(HTTP_END_POINTS.Student.auth.login, data,"student"),
    verifyOtp : (data) => httpClient.post(HTTP_END_POINTS.Student.auth.verify_otp,data,"student"),
    course : {
      get : (params) => httpClient.get(HTTP_END_POINTS.Student.course.get,params,"student")
    },
    class : {
      get : (params) => httpClient.get(HTTP_END_POINTS.Student.class.get,params,"student")
    },
    attendance : (params) => httpClient.get(HTTP_END_POINTS.Student.attendance.get,params,"student"),
    community : {
      get : (params) => httpClient.get(HTTP_END_POINTS.Student.community.get,params,"student")
    }
  };

  common = {
    file : {
      upload : (data) => httpClient.uploadFile(HTTP_END_POINTS.common.file.upload,data),
      get : (url) => httpClient.fileGet(url)
    }
  }

  Instructor = {
    login: (data) => httpClient.post(HTTP_END_POINTS.Instructor.auth.login, data,'instructor'),
    verifyOtp: (data) => httpClient.post(HTTP_END_POINTS.Instructor.auth.verify_otp, data,'instructor'),
    log_out : (data) => httpClient.post(HTTP_END_POINTS.Instructor.auth.log_out,data,'instructor'),
    attendance: {
      get: (params) => httpClient.get(`${HTTP_END_POINTS.Instructor.attendance.get}${params.userId}`,params,'instructor'),
      get_class_attendance : (data) => httpClient.get(HTTP_END_POINTS.Instructor.attendance.class_attendance+data.classId,data,'instructor'),
      update : (data) => httpClient.update(HTTP_END_POINTS.Instructor.attendance.class_attendance+data.uuid,data,'instructor')
    },
    course : {
      get : (params) => httpClient.get(HTTP_END_POINTS.Instructor.course.get,params,'instructor')
    },
    class : {
      get : (params) => httpClient.get(HTTP_END_POINTS.Instructor.class.get,params,'instructor'),
      getWithId : (params) => httpClient.get(HTTP_END_POINTS.Instructor.class.getwithId+params.course,params,'instructor'),
      update : (data) => httpClient.update(HTTP_END_POINTS.Instructor.class.update+data?.uuid,data,'instructor')
    },
    community : {
      get : () => httpClient.get(HTTP_END_POINTS.Instructor.community.get,'instructor')
    },
    payment : {
      get : () => httpClient.get(HTTP_END_POINTS.Instructor.payments.getSalaries,'instructor')
    },
    ticket : {
      create : (data) => httpClient.post(HTTP_END_POINTS.Instructor.ticket.create,data,'instructor'),
      get : (params) => httpClient.get(HTTP_END_POINTS.Instructor.ticket.get,params,'instructor')
    }
  };
}

export default new Client();
