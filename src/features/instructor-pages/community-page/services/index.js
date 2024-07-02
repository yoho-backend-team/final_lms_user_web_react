import Client from "../../../../api/index"


export const getAllCommunities = async (data) => {
    try {
    const  response = await Client.Instructor.community.get(data) 
    return response?.data
    } catch (error) {
      return error  
    }
}