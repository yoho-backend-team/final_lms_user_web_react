import Client from "../../../../api/index"


export const CreateTickets = async (data) => {
    try {
    const response = await Client.Instructor.ticket.create(data) 
    return response?.data   
    } catch (error) {
      throw new Error(error?.message) 
    }
}


export const getTickets = async (query) => {
    try {
    const response = await  Client.Instructor.ticket.get(query)  
    return response?.data
    } catch (error) {
     throw new Error(error?.message)   
    }
}