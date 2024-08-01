import httpClient from "./httpClient";
import HTTP_END_POINTS from "./http_end_points";

class Client {
  Student = {
    login: (data, params) =>
      httpClient.post(
        HTTP_END_POINTS.Student.auth.login,
        data,
        params,
        "student"
      ),
    verifyOtp: (data, params) =>
      httpClient.post(
        HTTP_END_POINTS.Student.auth.verify_otp,
        data,
        params,
        "student"
      ),
    forgetPassword: (data, params) =>
      httpClient.post(
        HTTP_END_POINTS.Student.auth.forget_password,
        data,
        params,
        "student"
      ),
    reset_password: (data, params) =>
      httpClient.post(
        HTTP_END_POINTS.Student.auth.reset_password,
        data,
        params,
        "student"
      ),
    change_password: (data, params) =>
      httpClient.post(
        HTTP_END_POINTS.Student.auth.change_password,
        data,
        params,
        "student"
      ),
    course: {
      get: (params) =>
        httpClient.get(HTTP_END_POINTS.Student.course.get, params, "student"),
    },
    profile: {
      get: (params) =>
        httpClient.get(HTTP_END_POINTS.Student.profile.get, params, "student"),
      update: (data) =>
        httpClient.update(
          HTTP_END_POINTS.Student.profile.update,
          data,
          "student"
        ),
    },
    class: {
      get: (params) =>
        httpClient.get(HTTP_END_POINTS.Student.class.get, params, "student"),
      getWithId: (params) =>
        httpClient.get(
          HTTP_END_POINTS.Student.class.getwithId + params.id,
          params,
          "student"
        ),
    },
    payment: {
      get: (params) =>
        httpClient.get(
          HTTP_END_POINTS.Student.payments.getFees,
          params,
          "student"
        ),
    },
    // attendance : (params) => httpClient.get(HTTP_END_POINTS.Student.attendance,params,"student"),
    attendance: {
    get: (params) => httpClient.get(`${HTTP_END_POINTS.Student.attendance.get}`,params,'student'),
    get_class_attendance: (data) => httpClient.get(`${HTTP_END_POINTS.Student.attendance.class_attendance}/${data.classId}`, { params: data })
  },
  notification : {
    get : (params) => httpClient.get(HTTP_END_POINTS.Student.notification.get,params,"student"),
    update : (data) => httpClient.update(HTTP_END_POINTS.Student.notification.update_status + data.uuid , data, "student" )
  },
  ticket: {
    create: (data, params) =>
      httpClient.post(
        HTTP_END_POINTS.Student.ticket.create,
        data,
        params,
        "student",
      ),
    get: (params) =>
      httpClient.get(
        HTTP_END_POINTS.Student.ticket.get,
        params,
        "student",
      ),
      getById: (params) =>
        httpClient.get(
          HTTP_END_POINTS.Student.ticket.getById + params.id,
          params,
          "student"
        ),
  },

  reports : {
    get : (params) => httpClient.get(HTTP_END_POINTS.Student.reports.get,params,'student')
  },
  activity: {
    get: (params) => httpClient.get(`${HTTP_END_POINTS.Student.activity.get}`,params,'student'),
  },
  faq: {
    get: (params) => httpClient.get(`${HTTP_END_POINTS.Student.faq.get}`,params,'student'),
  },
  help:{
    get: (params) => httpClient.get(`${HTTP_END_POINTS.Student.help.get}`,params,'student'),
  },


    community: {
      get: (params) =>
        httpClient.get(
          HTTP_END_POINTS.Student.community.get,
          params,
          "student"
        ),
    },
  };

  common = {
    file: {
      upload: (data) =>
        httpClient.uploadFile(HTTP_END_POINTS.common.file.upload, data),
      get: (url) => httpClient.fileGet(url),
    },
  };

  Instructor = {
    login: (data, params) =>
      httpClient.post(
        HTTP_END_POINTS.Instructor.auth.login,
        data,
        params,
        "instructor"
      ),
    verifyOtp: (data, params) =>
      httpClient.post(
        HTTP_END_POINTS.Instructor.auth.verify_otp,
        data,
        params,
        "instructor"
      ),
    log_out: (data) =>
      httpClient.post(
        HTTP_END_POINTS.Instructor.auth.log_out,
        data,
        "instructor"
      ),
    attendance: {
      get: (params) =>
        httpClient.get(
          `${HTTP_END_POINTS.Instructor.attendance.get}${params.userId}`,
          params,
          "instructor"
        ),
      get_class_attendance: (data) =>
        httpClient.get(
          HTTP_END_POINTS.Instructor.attendance.class_attendance + data.classId,
          data,
          "instructor"
        ),
      update: (data) =>
        httpClient.update(
          HTTP_END_POINTS.Instructor.attendance.class_attendance + data.uuid,
          data,
          "instructor"
        ),
    },
    course: {
      get: (params) =>
        httpClient.get(
          HTTP_END_POINTS.Instructor.course.get,
          params,
          "instructor"
        ),
      notes: {
        create: (data, params) =>
          httpClient.post(
            HTTP_END_POINTS.Instructor.course.notes.create,
            data,
            params,
            "instructor"
          ),
        update: (data) =>
          httpClient.update(
            HTTP_END_POINTS.Instructor.course.notes.update + data.NoteId,
            data,
            "instructor"
          ),
        delete: (data) =>
          httpClient.delete(
            HTTP_END_POINTS.Instructor.course.notes.delete + data.id,
            "instructor"
          ),
      },
      study_material: {
        create: (data, params) =>
          httpClient.post(
            HTTP_END_POINTS.Instructor.course.study_material.index,
            data,
            params,
            "instructor"
          ),
        update: (data) =>
          httpClient.update(
            HTTP_END_POINTS.Instructor.course.study_material.index +
              data.materialId,
            data,
            "instructor"
          ),
        delete: (data) =>
          httpClient.delete(
            HTTP_END_POINTS.Instructor.course.study_material.index + data?.id,
            "instructor"
          ),
      },
    },
    class: {
      get: (params) =>
        httpClient.get(
          HTTP_END_POINTS.Instructor.class.get,
          params,
          "instructor"
        ),
      getWithId: (params) =>
        httpClient.get(
          HTTP_END_POINTS.Instructor.class.getwithId + params.course,
          params,
          "instructor"
        ),
      update: (data) =>
        httpClient.update(
          HTTP_END_POINTS.Instructor.class.update + data?.uuid,
          data,
          "instructor"
        ),
    },
    community: {
      get: (params) =>
        httpClient.get(
          HTTP_END_POINTS.Instructor.community.get,
          params,
          "instructor"
        ),
    },
    notification : {
      get : (params) => httpClient.get(HTTP_END_POINTS.Instructor.notification.get,params,"instructor")
    },
    payment: {
      get: (params) =>
        httpClient.get(
          HTTP_END_POINTS.Instructor.payments.getSalaries,
          params,
          "instructor"
        ),
    },
    ticket: {
      create: (data, params) =>
        httpClient.post(
          HTTP_END_POINTS.Instructor.ticket.create,
          data,
          params,
          "instructor"
        ),
      get: (params) =>
        httpClient.get(
          HTTP_END_POINTS.Instructor.ticket.get,
          params,
          "instructor"
        ),
    },
    reports: {
      get: (params) =>
        httpClient.get(
          HTTP_END_POINTS.Instructor.reports.get,
          params,
          "instructor"
        ),
    },
    activity : {
      get : (params) => httpClient.get(HTTP_END_POINTS.Instructor.activity.get,params,"instructor")
    },
    index: {
      get: (params) =>
        httpClient.get(
          HTTP_END_POINTS.Instructor.index.get,
          params,
          "instructor"
        ),
      update: (data) =>
        httpClient.update(
          HTTP_END_POINTS.Instructor.index.get,
          data,
          "instructor"
        ),
    },
  };
}

export default new Client();
