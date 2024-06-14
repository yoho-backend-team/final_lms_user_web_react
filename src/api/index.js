import httpClient from "./httpClient"
import HTTP_END_POINTS from "./http_end_points"



class Client{

   Student = {
      login : (data) => httpClient.post(HTTP_END_POINTS.Student.auth.login,data)
   }

   Instructor = {
      login : (data) => httpClient.post(HTTP_END_POINTS.Instructor.auth.login,data)
   }
}

export default new Client()