import axios from "axios"
import { AUTH_TOKEN_KEY,instructorDetails, studentDetails } from "lib/constants"
import Cookies from "js-cookie"

const backendUrl = process.env.REACT_APP_BACK_END_URL

const Axios = axios.create({
    baseURL : backendUrl ,
    timeout : 5000000,
    headers : {
        "Content-Type" : "application/json"
    }
})

Axios.interceptors.request.use((config)=>{
    const user = Cookies.get(instructorDetails)
    const student = Cookies.get(studentDetails) 
    
    const token = user ?  JSON.parse(user)?.token : ''
    const studentToken = student ? JSON.parse(student)?.token : ''


    if(token){
      config.headers["Authorization"] = `Token ${token ? token :''}`
    }

    if(studentToken){
       config.headers['Authorization'] = 'Token'
    }

    return config
})

Axios.interceptors.response.use(
    (response)=>response,
    (error) => {
     if(error.response && error.response.status === 401 && error.response.statusText === "Unauthorized"){
        Cookies.remove(instructorDetails)
     }
     return Promise.reject(error)
    }
)

class HttpClient{
    async get(url,params){
        const response = await Axios.get(url,{params:params})
        return response.data
    }
    
    async post(url,data,params){
       const response = await Axios.post(url,data,params)
       return response.data
    }

    async update(url,data){
        const response = await Axios.put(url,data)
        return response?.data
    }

    async fileGet(url){
        const response = Axios.get(url,{"responseType":"blob"})
        return response
    }

    async uploadFile(url,data){
        const response = await Axios.post(url,data,{ headers: { "Content-Type" : "multipart/form-data" }})
        return response?.data
    }
}

export default new HttpClient()