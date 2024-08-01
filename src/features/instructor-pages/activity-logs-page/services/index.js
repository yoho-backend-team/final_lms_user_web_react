import Client from "api/index"


export const getAllLogs = async (data) => {
    try {
    const response = await Client.Instructor.activity.get(data)
    return response 
    } catch (error) {
      throw new error 
    }
}